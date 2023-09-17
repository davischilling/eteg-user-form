import { ValidationCb, ValidationInterface } from '#/domain/contracts'
import { AbstractEntity } from '#/domain/entities'

export class Validator<Entity extends AbstractEntity>
  implements ValidationInterface<Entity>
{
  constructor(private readonly validationCb: ValidationCb) {}

  validate(entity: Entity, context: string): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, created_at, ...rest } = entity.toJSON()
    const validationResult = this.validationCb(rest)
    if (!validationResult.success) {
      entity.errorNotifier.addError({
        context,
        messages: validationResult.error?.issues,
      })
    }
  }
}
