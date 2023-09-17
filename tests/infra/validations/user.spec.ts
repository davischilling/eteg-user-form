import { Validator } from '#/data/shared'
import { InvalidFieldError } from '#/data/errors'
import { User } from '#/domain/entities'
import { userValidation } from '#/infra/validations/entities'

describe('UserValidator Integration Tests', () => {
  let validator: Validator<User.Entity>
  const mockedProps: User.CreateDto = {
    full_name: 'John Doe',
    cpf: '000.000.000-00',
    email: 'email@test.com',
    favorite_color: 'red',
    observations: 'Lorem ipsum dolor sit amet',
  }

  beforeEach(async () => {
    validator = new Validator(userValidation)
  })

  it('should validate a valid User instance without errors', () => {
    const validEntity = new User.Entity(mockedProps, validator)
    validator.validate(validEntity, 'User')
    const addErrorSpy = jest.spyOn(validEntity.errorNotifier, 'addError')
    const hasErrorsSpy = jest.spyOn(validEntity.errorNotifier, 'hasErrors')

    expect(addErrorSpy).not.toHaveBeenCalled()
    expect(hasErrorsSpy).not.toHaveBeenCalled()
  })

  it('should throw if passed props are invalid', () => {
    expect(() => {
      new User.Entity({} as any, validator)
    }).toThrow(
      new InvalidFieldError({
        context: 'User',
        messages: {
          full_name: { _errors: ['Required'] },
          cpf: { _errors: ['Invalid CPF'] },
          email: { _errors: ['Required'] },
          favorite_color: { _errors: ['Required'] },
          observations: { _errors: ['Required'] },
        },
      }),
    )
  })

  it('should throw is favorite_color is not a valid color type', () => {
    expect(() => {
      new User.Entity(
        {
          ...mockedProps,
          favorite_color: 'any_color',
        } as any,
        validator,
      )
    }).toThrow(
      new InvalidFieldError({
        context: 'User',
        messages: {
          favorite_color: {
            _errors: [
              "Invalid enum value. Expected 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet', received 'any_color'",
            ],
          },
        },
      }),
    )
  })
})
