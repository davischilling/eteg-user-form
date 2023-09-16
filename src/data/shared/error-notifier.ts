import {
  ErrorNotifierInterface,
  NotificationErrorProps,
} from '#/domain/contracts'

export class ErrorNotifier implements ErrorNotifierInterface {
  private errors: NotificationErrorProps = {
    context: '',
    messages: [],
  }

  addError(error: NotificationErrorProps): void {
    this.errors = error
  }

  hasErrors(): boolean {
    return this.errors.messages.length > 0
  }

  getErrors(): NotificationErrorProps {
    return this.errors
  }
}
