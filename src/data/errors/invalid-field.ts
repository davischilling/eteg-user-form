import { NotificationErrorProps } from '#/domain/contracts'

export class InvalidFieldError extends Error {
  constructor(public notificationErrors: NotificationErrorProps) {
    const messages = notificationErrors.messages
      .map((error) => `${error}`)
      .join(', ')
    super(`Invalid field: ${notificationErrors.context} - ${messages}`)
    this.name = 'InvalidFieldError'
  }
}
