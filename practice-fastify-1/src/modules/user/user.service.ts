import prisma from '../../utils/prisma'

function createUser(input) {
  const user = await prisma.user.create({
    data: input,
  })
}
