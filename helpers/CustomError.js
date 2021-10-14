class CustomError extends Error {
  constructor(msg, statusCode) {
    super(msg, statusCode);
    this.message = msg;
    this.statusCode = statusCode;
  }
}

module.exports = CustomError;