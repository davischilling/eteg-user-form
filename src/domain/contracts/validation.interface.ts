export interface ValidationInterface<Entity> {
  validate(entity: Entity, context: string): void
}

export type ValidationCb = (entityPropsToValidate: { [x: string]: any }) => {
  success: boolean
  data?: any
  error?: {
    issues: string[]
  }
}
