import express from "express"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from '@apollo/server/express4'
import { json } from 'express'
import cors from 'cors'
import { context } from './context'
import { typeDefs as baseTypeDefs, resolvers as baseResolvers } from './schema'
import { typeDefs as authTypeDefs, resolvers as authResolvers } from './services/auth/graphql/schema'

const app = express()

const typeDefs = [baseTypeDefs, authTypeDefs]
const resolvers = [baseResolvers, authResolvers]

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  includeStacktraceInErrorResponses: true
})



async function startServer() {
  await server.start()

  // Add CORS middleware before GraphQL middleware
  app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:4000'], // URLs do frontend
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }))

  app.use('/graphql',
    json(),
    expressMiddleware(server, {
      context,
    })
  )

  const PORT = 4000
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/graphql`)
  })
}

startServer().catch((error) => {
  console.error('Error starting server:', error)
})
