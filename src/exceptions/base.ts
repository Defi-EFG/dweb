class BaseError extends Error {
  constructor(public message: string, public code: number) {
    super(message)

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, BaseError.prototype)
  }

  inspect() {
    return 'Error: ' + this.message + ' Code: ' + this.code
  }
}

export default BaseError
