function comments(parent, args, context) {
    return context.prisma.user.findUnique({ where: { id: parent.id } }).comments()
  }

  function stations(parent, args, context) {
    return context.prisma.user.findUnique({ where: { id: parent.id } }).stations()
  }
  
  module.exports = {
    comments,
    stations
  }