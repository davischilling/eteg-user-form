import { ErrorNotifierInterface, ValidationInterface } from '#/domain/contracts'
import { v4 as uuidv4 } from 'uuid'
import { ErrorNotifier } from '#/data/shared'
import { InvalidFieldError } from '#/data/errors'

export type EntityProps<Props> = {
  id?: string
  created_at?: Date
  props: Props
}

export abstract class AbstractEntity<Props = any, Model = any> {
  readonly id: string
  readonly created_at: Date
  protected readonly props: Props
  errorNotifier: ErrorNotifierInterface = new ErrorNotifier()

  constructor({ id, created_at, props }: EntityProps<Props>) {
    this.id = id ?? uuidv4()
    this.created_at = created_at ?? new Date()
    this.props = props
  }

  protected validate(validator: ValidationInterface<this>, context: string) {
    validator.validate(this, context)
    if (this.errorNotifier.hasErrors()) {
      throw new InvalidFieldError(this.errorNotifier.getErrors())
    }
  }

  toJSON(): Model {
    return {
      id: this.id,
      created_at: this.created_at,
      ...this.props,
    } as unknown as Model
  }
}
