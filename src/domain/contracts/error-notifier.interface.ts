export type NotificationErrorProps = {
  context: string
  messages: string[]
}

export interface ErrorNotifierInterface {
  addError(error: NotificationErrorProps): void
  hasErrors(): boolean
  getErrors(): NotificationErrorProps
}
