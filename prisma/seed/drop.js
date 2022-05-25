const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// async function dropStationsFavored(){
//     await prisma.StationsFavoredByUsers.deleteMany({})
// }

async function dropStations(){
    await prisma.station.deleteMany({})
}

dropStations()