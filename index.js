require('dotenv').config()

const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const jwt = require('jsonwebtoken')

const typeDefs = require('./gql/typedefs')
const resolvers = require('./gql/resolvers')

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen = () => {
    startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req, res }) => {
            const token = req.headers.token || ''

            let user = null 

            if (token) {
                jwt.verify(token, process.env.AUTH_KEY, async (err, result) => {
                    if (err) user = { message: err.message }
                    else user = result 
                })
            } else {
                user = { message: "unauthorized" }
            }

            return user 
        }
    }).then(({ url }) => {
        console.log(`SERVER LISTENING ON ${url}`)
    })
}

server.listen()