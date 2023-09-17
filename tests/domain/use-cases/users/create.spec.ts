import { CpfValueObject } from '#/data/value-objects'
import { User } from '#/domain/entities'
import { CreateUser, UserRepositoryInterface } from '#/domain/use-cases/users'
import { prisma } from '#/infra/db/prisma'
import { PrismaUserRepository } from '#/infra/db/repositories'

describe('CreateUserUseCase Integration Tests', () => {
  let userRepo: UserRepositoryInterface<User.Entity, User.Model>
  let userCreateSpy: jest.SpyInstance
  let sut: CreateUser.UseCase
  let userMock: CreateUser.InputDto

  beforeEach(async () => {
    const deleteUser = prisma.user.deleteMany()
    await prisma.$transaction([deleteUser])

    userMock = {
      full_name: 'John Doe',
      cpf: '000.000.000-00',
      email: 'email@test.com',
      favorite_color: 'red',
      observations: 'Lorem ipsum dolor sit amet',
    }
    userRepo = new PrismaUserRepository()
    userCreateSpy = jest.spyOn(userRepo, 'create')

    sut = new CreateUser.UseCase(userRepo)
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should call userRepo correctly', async () => {
    await sut.handle(userMock)

    expect(userCreateSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(String),
        full_name: userMock.full_name,
        cpf: new CpfValueObject(userMock.cpf).value,
        email: userMock.email,
        favorite_color: userMock.favorite_color,
        observations: userMock.observations,
        created_at: expect.any(Date),
      }),
    )
    expect(userCreateSpy).toHaveBeenCalledTimes(1)
  })

  it('should create a user', async () => {
    const user = await sut.handle(userMock)

    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        full_name: userMock.full_name,
        cpf: userMock.cpf,
        email: userMock.email,
        favorite_color: userMock.favorite_color,
        observations: userMock.observations,
        created_at: expect.any(Date),
      }),
    )

    const userFromDb = await prisma.user.findUnique({
      where: { id: user.id },
    })

    expect(userFromDb).toEqual({
      ...user,
      cpf: new CpfValueObject(user.cpf).value,
    })
  })
})
