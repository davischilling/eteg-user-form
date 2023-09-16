import { ErrorNotifier } from '#/data/shared'
import { ErrorNotifierInterface } from '#/domain/contracts'

describe('ErrorNotifier Unit Tests', () => {
  let errorNotifier: ErrorNotifierInterface

  beforeEach(() => {
    errorNotifier = new ErrorNotifier()
  })

  it('should create a new notification correctly', () => {
    expect(errorNotifier).toBeTruthy()
    expect(errorNotifier.getErrors()).toEqual({
      context: '',
      messages: [],
    })
  })

  it('should add an error', () => {
    errorNotifier.addError({
      context: 'Test',
      messages: ['Error message'],
    })

    expect(errorNotifier.hasErrors()).toBe(true)
  })

  it('should return true if notification has errors', () => {
    const error = {
      context: 'any_context',
      messages: ['any_message'],
    }

    errorNotifier.addError(error)

    expect(errorNotifier.hasErrors()).toBe(true)
  })

  it('should return false if notification has no errors', () => {
    expect(errorNotifier.hasErrors()).toBe(false)
  })

  it('should return all errors correctly', () => {
    const errors = {
      context: 'any_context',
      messages: ['any_message', 'other_message'],
    }

    errorNotifier.addError(errors)

    expect(errorNotifier.getErrors()).toEqual(errors)
  })
})
