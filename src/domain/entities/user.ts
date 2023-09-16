import { v4 as uuidv4 } from 'uuid'

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

  export type EntityProps<Props> = {
    id?: string
    created_at?: Date
    props: Props
  }

  export class Entity {
    readonly id: string
    readonly created_at: Date
    private readonly props: CreateDto

    constructor({ id, created_at, props }: EntityProps<CreateDto>) {
      this.id = id ?? uuidv4()
      this.created_at = created_at ?? new Date()
      this.props = props
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
