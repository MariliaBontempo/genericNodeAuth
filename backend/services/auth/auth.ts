import {Request} from 'express';
import {prisma} from '../../src/prisma'
import jwt from 'jsonwebtoken'

export interface AuthUser{
    userId:number
}

export async function getUser(req:Request){
    const token = req.headers.authorization?.replace('Bearer ','')
    if(!token) return null

    try{
        const jwtSecret = process.env.JWT_SECRET
        if(!jwtSecret){
            throw new Error('JWT_SECRET must be defined')
        }

        const decoded = jwt.verify(token,jwtSecret) as AuthUser
        const user = await prisma.user.findUnique({
            where: {id: decoded.userId}
        })
        return user
    }catch(error){
        console.error('Error',error)
        return null
    }

}