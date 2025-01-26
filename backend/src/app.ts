import express from "express"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from '@apollo/server/express4'
import { json } from 'express'
//import cors from 'cors'
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

  /*const corsOptions = {
    origin: [
      'https://studio.apollographql.com',
      'https://sandbox.embed.apollographql.com',
      'http://localhost:4000'
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  }
  // Add CORS middleware before GraphQL middleware
  //app.use(cors(corsOptions))
  //app.options('*', cors(corsOptions))

  // Options para preflight
  //app.options('/graphql', cors())*/

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
