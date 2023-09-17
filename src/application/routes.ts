import { FastifyInstance } from 'fastify'
import { createUserController } from './users'

export async function appRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    return { message: 'hello from Eteg - John Doe user form request challenge' }
  })

  app.post('/users', createUserController)
}
