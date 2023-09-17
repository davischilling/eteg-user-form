import { RepositoryInterface } from '#/domain/contracts'
import { User } from '#/domain/entities'
import { CreateUser } from '#/domain/use-cases/users'

describe('CreateUserUseCase Unit Tests', () => {
  let userRepo: RepositoryInterface<User.Entity, User.Model>
  let sut: CreateUser.UseCase
  let userMock: CreateUser.InputDto

  beforeEach(() => {
    userMock = {
      full_name: 'John Doe',
      cpf: '000.000.000-00',
      email: 'email@test.com',
      favorite_color: 'red',
      observations: '',
    }
    userRepo = {
      create: jest.fn().mockResolvedValue({
        ...userMock,
        id: 'any_id',
        created_at: new Date(),
      }),
    }
    sut = new CreateUser.UseCase(userRepo)
  })

  it('should call userRepo correctly', async () => {
    await sut.handle(userMock)

    expect(userRepo.create).toHaveBeenCalledWith(
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
    expect(userRepo.create).toHaveBeenCalledTimes(1)
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
  })
})
