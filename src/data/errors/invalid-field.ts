import { NotificationErrorProps } from '#/domain/contracts'

export class InvalidFieldError extends Error {
  constructor(public notificationErrors: NotificationErrorProps) {
    super(
      `Invalid field: ${notificationErrors.context} - ${JSON.stringify(
        notificationErrors.messages,
      )}`,
    )
    this.name = 'InvalidFieldError'
  }
}
