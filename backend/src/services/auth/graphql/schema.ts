import { gql } from 'graphql-tag'
import { AuthService } from '../service'
import { ResolverContext } from '../../../context'


// Interface for login arguments
interface LoginArgs {
    email: string;
    password: string;
  }

export const typeDefs = gql`
  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    login(email: String!, password: String!): AuthPayload!
  }
`

export const resolvers = {
  Query: {
    me: async (_: any, __: any, { user }:ResolverContext) => {
      if (!user) {
        throw new Error('Not authenticated')
      }
      return user
    }
  },
  Mutation: {
    login: async (_: any, { email, password }:LoginArgs) => {
      return AuthService.login(email, password)
    }
  }
}