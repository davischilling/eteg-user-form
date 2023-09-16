import { User } from '#/domain/entities'

describe('User Entity Unit Tests', () => {
  it('should create a user entity', () => {
    const userProps: User.CreateDto = {
      full_name: 'John Doe',
      cpf: '000.000.000-00',
      email: 'email@test.com',
      favorite_color: 'red',
      observations: 'Lorem ipsum dolor sit amet',
    }
    const user = new User.Entity({
      props: userProps,
    })

    expect(user).toBeInstanceOf(User.Entity)
    expect(user.id).toBeDefined()
    expect(user.created_at).toBeDefined()
    expect(user).toEqual(
      expect.objectContaining({
        ...userProps,
      }),
    )
  })
})
