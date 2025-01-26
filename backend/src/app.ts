import { context,Context } from "./context";
import express,{json} from 'express';
import { ApolloServer } from "@apollo/server";
import {expressMiddleware} from '@apollo/server/express4'
import {typeDefs,resolvers} from './schema'



const app = express();
const apolloServer = new ApolloServer<Context>({typeDefs,resolvers});

async function startServer() {
  await apolloServer.start();
  app.use('/graphql',json(),expressMiddleware(apolloServer,{context}));
const PORT = 4000;
app.listen(PORT, () => {console.log(`Server running on ${PORT}`)}); 
};

startServer().catch( (error) => {
    console.error('error starting server',error);
});
