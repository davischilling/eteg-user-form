import fastify from 'fastify'
import { appRoutes } from './application/routes'
import { env } from '#/infra/env'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }
  reply.status(500).send({ message: 'Internal server error' })
})
