export class InvalidRequestError extends Error {
  constructor() {
    super('Invalid request params');
  }
}
