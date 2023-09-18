import { UserAlreadyExistsError } from '#/data/errors'
import { CpfValueObject } from '#/data/value-objects'
import { User } from '#/domain/entities'
import { UserRepositoryInterface } from '#/domain/use-cases/users'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { prisma } from '../prisma'
import { Prisma } from '@prisma/client'

export class PrismaUserRepository
  implements UserRepositoryInterface<User.Entity, User.Model>
{
  async create(data: User.Entity): Promise<User.Model> {
    try {
      const userToCreate: Prisma.UserCreateInput = {
        ...data.toJSON(),
        cpf: new CpfValueObject(data.cpf).getCpfDigits(),
      }
      const user = await prisma.user.create({
        data: userToCreate,
      })
      return {
        ...user,
        cpf: new CpfValueObject(user.cpf).formatCpf(),
      } as User.Model
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new UserAlreadyExistsError()
      }
      throw e
    }
  }
}
