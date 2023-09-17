import { Validator } from '#/data/shared'
import { userValidation } from '#/infra/validations/entities'
import { User } from '../user'

export class UserFactory {
  static create(props: User.CreateDto): User.Entity {
    const validator = new Validator(userValidation)
    return new User.Entity(props, validator)
  }
}
