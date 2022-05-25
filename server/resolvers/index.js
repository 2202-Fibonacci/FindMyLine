const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

module.exports = {
  Query: {
    info: () => "This is JML group MTA app",
    station: (root, { id }, { dataSources }) =>
      dataSources.tripFeed.getStationById(id),
    arrivalTimes: async (_, { stationId, train, direction }, { dataSources }) =>
      await dataSources.tripFeed.getArrivalTimes(stationId, train, direction),
    serviceAlert: async (_, { train, onlyActive }, { dataSources }) =>
      await dataSources.alertFeed.getServiceAlert(train, onlyActive),
    elevatorAlert: async (_, { stationId }, { dataSources }) =>
      await dataSources.elevatorFeed.getElevatorAlerts(stationId),
    stationUpdate: async (_, { stationId }, { dataSources }) =>
      await dataSources.tripFeed.getStationUpdate(stationId),
    getFavorites: async (_, __, context) => {
      const { userId } = context;
      return await context.prisma.station.findMany({
        where: {
          favoritedById: userId
          }
        })
      },
  },
  Mutation: {
    signup: async (parent, args, context) => {
      const password = await bcrypt.hash(args.password, 10)
      const user = await context.prisma.user.create({ data: { ...args, password } })
      const token = jwt.sign({ userId: user.id }, APP_SECRET)
      return {
        token,
        user,
      }
    },
    login: async (parent, args, context) => {
      const user = await context.prisma.user.findUnique({ where: { email: args.email } })
      if (!user) {
        throw new Error('No such user found')
      }
      const valid = await bcrypt.compare(args.password, user.password)
      if (!valid) {
        throw new Error('Invalid password')
      }
      const token = jwt.sign({ userId: user.id }, APP_SECRET)
      return {
        token,
        user,
      }
    },
    favorite: async (root, args, context) => {
      const { userId } = context;
      return await context.prisma.station.create({
          data: {
              stopId: args.stopId,
              favoritedBy: { connect: { id: userId }}
          }
      })
    },
  }
}




// const Query = require('./Query')
// const Mutation = require('./Mutation')
// const User = require('./User')
// const Comment = require('./Comment')


// module.exports = {
//   Query,
//   Mutation,
//   User,
//   Comment
// 

 // favorite: async (root, args, context) => {
    //   const { userId } = context;

    //   return await context.prisma.StationsFavoredByUsers.create({
    //     data:{
    //       userId: userId,
    //       stationId: args.stopId
    //     }
    //   })
    // },
    // favorite: async (root, args, context) => {
    //   return await context.prisma.StationsFavoredByUsers.create({
    //     data:{
    //       userId: context.userId,
    //       stationId: args.stopId
    //     }
    //   })
    // },
    // favorite: async (root, {stopId}, context) => {
    //   const { userId } = context;

    //   return await context.prisma.user.update({
    //     where: {
    //       id: userId
    //     },
    //     data:{
    //       stations:{
    //         connect:{
    //           id: stopId
    //         }
    //       }
    //     }
    //   })
    // },
    // favorite: async (root, {stopId}, context) => {
    //   const { userId } = context;
    //   const station = await context.prisma.station.findUnique({
    //     where: {
    //       id: stopId
    //     }
    //   })

    //   return await context.prisma.station.update({
    //     data:{
    //       user:{
    //         connect:{
    //           id: userId
    //         }
    //       }
    //     }
    //   })
    // },
    // favorite: async (root, {stopId}, context) => {
    //   const { userId } = context;
    //   const station = await context.prisma.station.findUnique({
    //     where: {
    //       id: stopId
    //     }
    //   })

    //   return await context.prisma.station.update({
    //     data:{
    //       user:{
    //         connect:{
    //           id: userId
    //         }
    //       }
    //     }
    //   })
    // },
    // favorite: async (root, {stopId}, context) => {
    //   const { userId } = context;
    //   return await context.prisma.station.update({
    //     where: {
    //       id: stopId
    //     },
    //     data: {
    //       user: { connect: {
    //         id: userId 
    //       }
    //     }
    //     }
    //   })
    // },
  // // },
  //   favorite: async (root, args, context) => {
  //     const { userId } = context;
  //     return await context.prisma.station.create({
  //       data: {
  //         stopId: args.stopId,
  //         favoritedBy: { connect: {id: userId }}
  //       }
  //     })
  //   },
  // },
  // User:{
  //   stations: async (root, args, context) => {
  //     return context.prisma.user.findUnique({ where: { id: parent.id } }).stations()
  //   }
  //},
  // favoritedBy(root, args, context) {
  //   return context.prisma.comment.findUnique({ where: { id: parent.id } }).favoritedBy()
  // }