import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import colors from 'colors'
import { config } from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
config()
colors ;

const PORT = process.env.PORT || 5000

const main = async() => {
    const app = express()
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [__dirname + '/resolvers/**/*.js'],
            validate: false
        }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground({ settings: { "request.credentials": 'include' } })]
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({ app })

    const conn = await mongoose.connect(process.env.MONGO_URL as string)
    
    console.log(`MongoDb connected : ${conn.connection.host}`.cyan.white)

    app.listen(PORT , () => console.log('Server is listening on ' + PORT))
}


main()