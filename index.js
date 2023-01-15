require('dotenv').config()

const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const jwt = require('jsonwebtoken')

const getUser = require('./utils/getUser')

const typeDefs = require('./gql/typedefs')
const resolvers = require('./gql/resolvers')

const AuthData = require("./gql/classes/AuthData")

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen = () => {
    startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req, res }) => {
            const token = req.headers.token || ''

            let tokenResult = null 

            if (token) {
                jwt.verify(token, process.env.AUTH_KEY, async (err, result) => {
                    if (err) tokenResult = { message: err.message }
                    else tokenResult = result 
                })
            } else tokenResult = { message: "unauthorized" }

            let user = null
            if (tokenResult?._id) user = await getUser(tokenResult.role, tokenResult._id)

            return new AuthData(user, tokenResult.role)
        }
    }).then(({ url }) => {
        console.log(`SERVER LISTENING ON ${url}`)
    })
}

server.listen()