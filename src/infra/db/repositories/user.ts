import { CpfValueObject } from '#/data/value-objects'
import { User } from '#/domain/entities'
import { UserRepositoryInterface } from '#/domain/use-cases/users'
import { prisma } from '../prisma'
import { Prisma } from '@prisma/client'

export class PrismaUserRepository
  implements UserRepositoryInterface<User.Entity, User.Model>
{
  async create(data: User.Entity): Promise<User.Model> {
    const user = await prisma.user.create({
      data: data.toJSON() as Prisma.UserCreateInput,
    })
    return {
      ...user,
      cpf: new CpfValueObject(user.cpf).formatCpf(),
    } as User.Model
  }
}
