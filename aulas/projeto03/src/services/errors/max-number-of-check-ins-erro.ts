export class MaxNumberOfCheckinsError extends Error {
  constructor() {
    super('Max checkins reached.')
  }
}
