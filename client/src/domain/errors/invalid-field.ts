export class InvalidFieldError extends Error {
  constructor() {
    super('User with same email or cpf already exists');
  }
}
