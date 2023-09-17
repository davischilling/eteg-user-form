import { Validator } from '#/data/shared'
import { ValidationCb } from '#/domain/contracts'
import { User } from '../user'

export type UserFactoryDto = {
  id?: string
  full_name: string
  cpf: string
  email: string
  favorite_color: User.FavoriteColor
  observations: string
  created_at?: Date
}

export class UserFactory {
  static create(props: UserFactoryDto): User.Entity {
    const validationCb: ValidationCb = () => ({
      error: null,
      value: undefined,
    })
    const validator = new Validator(validationCb)
    return new User.Entity(
      {
        ...props,
        id: props.id,
        created_at: props.created_at,
      },
      validator,
    )
  }
}
