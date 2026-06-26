class ApplicationError extends Error {
  readonly status?: number;
  readonly detail?: unknown;

  constructor(message: string, status?: number, detail?: unknown) {
    super(message);

    this.status = status;
    this.detail = detail;

    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}

export default ApplicationError;
