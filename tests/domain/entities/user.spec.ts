import { InvalidFieldError } from '#/data/errors'
import { Validator } from '#/data/shared'
import { CpfValueObject } from '#/data/value-objects'
import { ValidationInterface, ValidationCb } from '#/domain/contracts'
import { User } from '#/domain/entities'

describe('User Entity Unit Tests', () => {
  let validator: ValidationInterface<User.Entity>
  let validationCb: ValidationCb
  let validateSpy: jest.SpyInstance
  let userMock: User.CreateDto

  beforeEach(() => {
    validationCb = jest.fn().mockReturnValue({ success: true })
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
    expect(user.cpf).toBe(new CpfValueObject(userMock.cpf).value)
    expect(user.favorite_color).toBe(userMock.favorite_color)
    expect(user.observations).toBe(userMock.observations)
  })

  it('should return entity model correctly', () => {
    const user = new User.Entity(userMock, validator)
    const model = user.toJSON()

    expect(model).toEqual(
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
  })

  it('should call validator correctly', () => {
    const user = new User.Entity(userMock, validator)
    expect(validateSpy).toHaveBeenCalledWith(user, 'User')
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  it('should throw InvalidFieldError if ValidationCb return errors', () => {
    const error = new Error('Validation error')
    validationCb = jest.fn().mockReturnValue({
      success: false,
      error: {
        issues: [error.message],
      },
    })
    validator = new Validator(validationCb)

    expect(() => {
      new User.Entity(userMock, validator)
    }).toThrow(
      new InvalidFieldError({
        context: 'User',
        messages: [error.message],
      }),
    )
  })
})
