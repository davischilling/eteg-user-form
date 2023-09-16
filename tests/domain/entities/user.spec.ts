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
    expect(user.full_name).toBe(userProps.full_name)
    expect(user.email).toBe(userProps.email)
    expect(user.cpf).toBe(userProps.cpf)
    expect(user.favorite_color).toBe(userProps.favorite_color)
    expect(user.observations).toBe(userProps.observations)
  })
})
