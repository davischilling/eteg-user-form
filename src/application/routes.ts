import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    return { message: 'hello from Eteg - John Doe user form request challenge' }
  })
}
