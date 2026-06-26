class ApplicationError extends Error {
  readonly status?: number;
  readonly details?: unknown;

  constructor(message: string, status?: number, details?: unknown) {
    super(message);

    this.status = status;
    this.details = details;

    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}

export default ApplicationError;
