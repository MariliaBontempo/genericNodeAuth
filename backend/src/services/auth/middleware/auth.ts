import { Request } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../../../prisma'

export interface AuthUser {
  userId: number
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthenticationError'
  }
}

export async function getUser(req: Request) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  
  if (!token) return null
  
  try {
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      throw new Error('JWT_SECRET must be defined')
    }

    const decoded = jwt.verify(token, jwtSecret) as AuthUser
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })
    
    if (!user) {
      throw new AuthenticationError('User not found')
    }

    return user
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AuthenticationError('Invalid token')
    }
    throw error
  }
}
