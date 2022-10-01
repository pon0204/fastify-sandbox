import Fastify, { FastifyInstance, FastifyPluginOptions } from 'fastify'
import userRoutes from './modules/user/user.route'
import helmet from '@fastify/helmet'
import cors from '@fastify/cors'
import fp from 'fastify-plugin'
import { FastifyError } from 'fastify'

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        singleLine: true,
      },
    },
  },
})

app.get('/healthcheck', async function (request, response) {
  return { status: 'OK' }
})

async function main() {
  app.register(userRoutes, { prefix: 'api/users' })
  app.register(helmet)
  app.register(cors, { credentials: true })

  try {
    await app.listen(3000, '0.0.0.0')
    console.log('Server listening on port 3000')
  } catch (e) {
    console.error(e)
  }
}

main()

fp(function (
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done: (error?: FastifyError) => void
): void {
  fastify.decorateRequest('user', null)
  fastify.addHook('onRequest', async (req, _) => {})
  done()
})
