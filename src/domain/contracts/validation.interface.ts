export interface ValidationInterface<Entity> {
  validate(entity: Entity, context: string): void
}

export type ValidationCb = (entityPropsToValidate: { [x: string]: any }) => {
  error: any
  warning?: any
  value: undefined
}
