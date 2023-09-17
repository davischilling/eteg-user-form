import { CpfValueObject } from '#/data/value-objects'
import { ValidationCb } from '#/domain/contracts'
import { z } from 'zod'

export const userValidation: ValidationCb = (entityPropsToValidate) => {
  const schema = z.object({
    full_name: z.string(),
    cpf: z.string().refine(CpfValueObject.isValidNumericCPF, {
      message: 'Invalid CPF',
    }),
    email: z.string().email(),
    favorite_color: z.enum([
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'indigo',
      'violet',
    ]),
    observations: z.string(),
  })
  const zodValidationResult = schema.safeParse(entityPropsToValidate)
  if (zodValidationResult.success) {
    return {
      success: true,
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _errors, ...rest } = (zodValidationResult as any).error.format()
  return {
    success: zodValidationResult.success,
    error: {
      issues: rest,
    },
  }
}
