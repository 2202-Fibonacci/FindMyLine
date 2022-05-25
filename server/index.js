const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const fs = require("fs");
const path = require("path");
const resolvers = require("./resolvers/index.js");
const ServiceAlert = require("./datasources/ServiceAlert");
const TripFeed = require("./datasources/TripFeed");
const ElevatorAlert = require("./datasources/ElevatorAlert");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
//TODO do we need dataloader since we are not really using DataSource? maybe at our level it doesn't matter?
//dataloader, to "batch and de-dupe requests"
require("dotenv").config();
const { getUserId } = require("./utils");

const server = new ApolloServer({
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: ({ req }) => {
    // console.log(req.body)
    return {
      ...req,
      prisma,
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    }
  },
  dataSources: () => ({
    tripFeed: new TripFeed(),
    alertFeed: new ServiceAlert(),
    elevatorFeed: new ElevatorAlert(),
  }),
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚍 JML server ready at ${url}`);
});
