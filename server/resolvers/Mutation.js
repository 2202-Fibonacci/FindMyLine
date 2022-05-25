const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const { APP_SECRET, getUserId } = require('../utils')


async function signup(parent, args, context) {
    const password = await bcrypt.hash(args.password, 10)
  
    const user = await context.prisma.user.create({ data: { ...args, password } })
  
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
  
    return {
      token,
      user,
    }
  }
  
  async function login(parent, args, context) {
    const user = await context.prisma.user.findUnique({ where: { email: args.email } })
    if (!user) {
      throw new Error('No such user found')
    }
  
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }
  
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
  
    return {
      token,
      user,
    }
  }

  async function post(root, args, context){
    const { userId } = context;
    
    return await context.prisma.comment.create({
        data: {
            text: args.text,
            postedBy: { connect: { id: userId }}
        }
    })
}

async function favorite(root, args, context){
  const { userId } = context;
   
  return await context.prisma.station.create({
    data: {
      text: args.text,
      favoritedBy: { connect: {id: userId }}
    }
  })
}
  
  module.exports = {
    signup,
    login,
    post,
    favorite
  }
