import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../../prisma.js'
import { AuthenticationError } from './middleware/auth.js'

export class AuthService {
  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      throw new AuthenticationError('Invalid credentials')
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      throw new AuthenticationError('Invalid credentials')
    }

    const token = this.generateToken(user.id)

    return {
      token,
      user
    }
  }

  static generateToken(userId: number) {
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      throw new Error('JWT_SECRET must be defined')
    }

    return jwt.sign(
      { userId },
      jwtSecret,
      { expiresIn: '1d' }
    )
  }

  static async validateToken(token: string) {
    try {
      const jwtSecret = process.env.JWT_SECRET
      if (!jwtSecret) {
        throw new Error('JWT_SECRET must be defined')
      }

      return jwt.verify(token, jwtSecret) as { userId: number }
    } catch (error) {
      throw new AuthenticationError('Invalid token')
    }
  }
}