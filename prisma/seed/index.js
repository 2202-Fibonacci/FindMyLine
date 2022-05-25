const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const Users = require("./user_data")
const stations = require('../../MTA/stations')
const stationIds = Object.keys(stations)

async function runSeed() {

//     await Promise.all(
//         Users.map(async (user) =>
//             prisma.user.upsert({
//                 where: {id: user.id},
//                 update: {},
//                 create: user,
//             })
//         )
//     );
// }

    await Promise.all(
        stationIds.map(async (stationId) =>
            prisma.station.create({
                data: {
                    id: stationId,
                    user: undefined
                }
            })
        )
    )
}

runSeed()
    .catch((e)=>{
        console.log(e)
        process.exit(1)
    })
    .finally(async ()=>{
        console.log('Successfully seeded database')
        await prisma.$disconnect()
    })