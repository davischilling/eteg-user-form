import { ValidationInterface } from '#/domain/contracts'
import { AbstractEntity } from './abstract-entity'

export namespace User {
  type FavoriteColor =
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'indigo'
    | 'violet'

  export type Model = {
    id: string
    full_name: string
    cpf: string
    email: string
    favorite_color: FavoriteColor
    observations: string
    created_at: Date
  }

  export type CreateDto = Omit<Model, 'id' | 'created_at'>

  export class Entity extends AbstractEntity<CreateDto> {
    constructor(
      props: CreateDto,
      private readonly validator: ValidationInterface<Entity>,
    ) {
      super({ props })
      this.validate(this.validator, 'User')
    }

    get full_name() {
      return this.props.full_name
    }

    get cpf() {
      return this.props.cpf
    }

    get email() {
      return this.props.email
    }

    get favorite_color() {
      return this.props.favorite_color
    }

    get observations() {
      return this.props.observations
    }
  }
}
