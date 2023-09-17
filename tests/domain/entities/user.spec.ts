import { Validator } from '#/data/shared'
import { ValidationInterface, ValidationCb } from '#/domain/contracts'
import { User } from '#/domain/entities'

describe('User Entity Unit Tests', () => {
  let validator: ValidationInterface<User.Entity>
  let validationCb: ValidationCb
  let validateSpy: jest.SpyInstance
  let userMock: User.CreateDto

  beforeEach(() => {
    validationCb = jest.fn().mockReturnValue({ error: null })
    validator = new Validator(validationCb)
    validateSpy = jest.spyOn(validator, 'validate')
    userMock = {
      full_name: 'John Doe',
      cpf: '000.000.000-00',
      email: 'email@test.com',
      favorite_color: 'red',
      observations: 'Lorem ipsum dolor sit amet',
    }
  })

  it('should create a user entity', () => {
    const user = new User.Entity(userMock, validator)

    expect(user).toBeInstanceOf(User.Entity)
    expect(user.id).toBeDefined()
    expect(user.created_at).toBeDefined()
    expect(user.full_name).toBe(userMock.full_name)
    expect(user.email).toBe(userMock.email)
    expect(user.cpf).toBe(userMock.cpf)
    expect(user.favorite_color).toBe(userMock.favorite_color)
    expect(user.observations).toBe(userMock.observations)
  })

  it('should call validator correctly', () => {
    const user = new User.Entity(userMock, validator)
    expect(validateSpy).toHaveBeenCalledWith(user, 'User')
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  it('should throw InvalidFieldError if ValidationCb return errors', () => {
    const error = new Error('Validation error')
    validationCb = jest.fn().mockReturnValue({
      error: {
        details: [{ message: error.message }],
      },
    })
    validator = new Validator(validationCb)

    expect(() => {
      new User.Entity(userMock, validator)
    }).toThrow('Validation error')
  })
})
