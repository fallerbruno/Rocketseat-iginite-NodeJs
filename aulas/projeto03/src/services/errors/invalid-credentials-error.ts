export class InvalidCredentialsError extends Error {
  constructor() {
    super('Email or Password invalid try again')
  }
}
