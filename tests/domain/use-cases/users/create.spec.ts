import { UserAlreadyExistsError } from '#/data/errors'
import { CpfValueObject } from '#/data/value-objects'
import { User } from '#/domain/entities'
import { CreateUser, UserRepositoryInterface } from '#/domain/use-cases/users'
import * as prismaModule from '#/infra/db/prisma'
import { PrismaUserRepository } from '#/infra/db/repositories'

describe('CreateUserUseCase Integration Tests', () => {
  let userRepo: UserRepositoryInterface<User.Entity, User.Model>
  let userCreateSpy: jest.SpyInstance
  let sut: CreateUser.UseCase
  let userMock: CreateUser.InputDto

  beforeEach(async () => {
    const deleteUser = prismaModule.prisma.user.deleteMany()
    await prismaModule.prisma.$transaction([deleteUser])

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
    await prismaModule.prisma.$disconnect()
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

    const userFromDb = await prismaModule.prisma.user.findUnique({
      where: { id: user.id },
    })

    expect(userFromDb).toEqual({
      ...user,
      cpf: new CpfValueObject(user.cpf).value,
    })
  })

  it('should throw if tries to create a user with an already used email', async () => {
    await sut.handle(userMock)

    await expect(
      sut.handle({
        ...userMock,
        cpf: '111.111.111-11',
      }),
    ).rejects.toThrow(new UserAlreadyExistsError())
  })

  it('should throw if tries to create a user with an already cpf email', async () => {
    await sut.handle(userMock)

    await expect(
      sut.handle({
        ...userMock,
        email: 'email@test.com',
      }),
    ).rejects.toThrow(new UserAlreadyExistsError())
  })

  it('should rethrow if userRepo throw something different from PrismaClientKnownRequestError', async () => {
    const otherError = new Error('Some other error')
    const prismaMock = jest.spyOn(prismaModule.prisma.user, 'create')
    prismaMock.mockRejectedValueOnce(otherError)

    await expect(sut.handle(userMock)).rejects.toThrow(otherError)
  })
})
