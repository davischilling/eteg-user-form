import { CpfValueObject } from '#/data/value-objects'
import { ValidationInterface } from '#/domain/contracts'
import { AbstractEntity } from './abstract-entity'

export namespace User {
  export type FavoriteColor =
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'indigo'
    | 'violet'

  export type Props = {
    full_name: string
    cpf: string
    email: string
    favorite_color: FavoriteColor
    observations: string
  }

  export type Model = {
    id: string
    created_at: Date
  } & Props

  export type CreateDto = {
    id?: string
    created_at?: Date
  } & Props

  export class Entity extends AbstractEntity<CreateDto, Model> {
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
