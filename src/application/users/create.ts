import { InvalidFieldError, UserAlreadyExistsError } from '#/data/errors'
import { makeCreateUserUseCase } from '#/domain/use-cases/users/factories'
import { FastifyReply, FastifyRequest } from 'fastify'

export const createUserController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const createUserUsecase = makeCreateUserUseCase()
    await createUserUsecase.handle(request.body as any)
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    } else if (err instanceof InvalidFieldError) {
      return reply.status(400).send({ err })
    }
    throw err
  }

  reply.status(201).send()
}
