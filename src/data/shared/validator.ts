import { ValidationCb, ValidationInterface } from '#/domain/contracts'
import { AbstractEntity } from '#/domain/entities'

export class Validator<Entity extends AbstractEntity>
  implements ValidationInterface<Entity>
{
  constructor(private readonly validationCb: ValidationCb) {}

  validate(entity: Entity, context: string): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, created_at, ...entityPropsToValidate } = entity
    const validationResult = this.validationCb(entityPropsToValidate)
    if (validationResult?.error) {
      const validationErrors = validationResult.error.details.map(
        (err: { message: unknown }) => err.message,
      )
      entity.errorNotifier.addError({
        context,
        messages: validationErrors,
      })
    }
  }
}
