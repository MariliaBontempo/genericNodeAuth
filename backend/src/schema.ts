import { gql } from 'graphql-tag';
import { prisma } from './context';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


interface LoginArgs{
  email: string;
  password: string;
}


interface CreateUserArgs {
  name: string;
  email: string;
  password: string;
}

interface ResolverParent {}

export const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    role: String!
    createdAt: String!
  }
  
  type AuthPayload{
    token: String!
    user:User!
  }

  type Query {
    hello: String!
    users: [User!]!
    me: User
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    login(email:String!,password:String!):AuthPayload!
  }
`

export const resolvers = {
  Query: {
    hello: () => 'Hello',
    users: async () => {
      return await prisma.user.findMany()
    },
    me: async (_: any, __dirname: any, {user}: any) => {
      if (!user) throw new Error('Not authenticated')
      return await prisma.user.findUnique({
        where: {id:user.id}
      })
    }
  },
  Mutation: {
    createUser: async (_parent: ResolverParent, args: CreateUserArgs) => {

      const hashedPassword = await bcrypt.hash(args.password,10)

      return await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashedPassword,
          role: 'USER'
        }
      })
    },
    login: async (_:never,args:LoginArgs) => {
      //find user by email

      const user = await prisma.user.findUnique({
        where: {email: args.email}

      })
      if (!user) throw new Error('No user found with this email')

      //verify password
      const valid = await bcrypt.compare(args.password,user.password)
      if (!valid) throw new Error('Invaid Password')

      //check if JWT_secret is defined
      const jwtSecret = process.env.JWT_SECRET
      if (!jwtSecret){
        throw new Error('JWT_SECRET must be defined')
      }

      //Generate JWT token
      const token = jwt.sign(
        { userId:user.id},
        jwtSecret,
        {expiresIn:'1d'}
      )
      return{
        token,
        user
      }
    }
  }
}
