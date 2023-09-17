import { PrismaUserRepository } from '#/infra/db/repositories'
import { CreateUser } from '../create'

export const makeCreateUserUseCase = () => {
  return new CreateUser.UseCase(new PrismaUserRepository())
}
