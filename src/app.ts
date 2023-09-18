import fastify from 'fastify'
import cors from '@fastify/cors'
import { appRoutes } from './application/routes'

export const app = fastify()
app.register(cors)

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof SyntaxError) {
    return reply.status(400).send({ message: 'Invalid JSON' })
  } else if (error.name === 'FastifyError') {
    return reply.status(400).send({ message: error.message })
  }
  reply.status(500).send({ message: 'Internal server error' })
})
