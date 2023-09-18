import {
  ErrorNotifierInterface,
  NotificationErrorProps,
} from '#/domain/contracts'

export class ErrorNotifier implements ErrorNotifierInterface {
  private errors: NotificationErrorProps = {
    context: '',
  }

  addError(error: NotificationErrorProps): void {
    this.errors = error
  }

  hasErrors(): boolean {
    return !!this.errors.messages
  }

  getErrors(): NotificationErrorProps {
    return this.errors
  }
}
