export type NotificationErrorProps = {
  context: string
  messages?: any
}

export interface ErrorNotifierInterface {
  addError(error: NotificationErrorProps): void
  hasErrors(): boolean
  getErrors(): NotificationErrorProps
}
