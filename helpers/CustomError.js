class CustomError extends Error {
  constructor(code, msg, statusCode) {
    super(code, msg, statusCode);
    this.code = code;
    this.message = msg;
    this.statusCode = statusCode;
  }
}

module.exports = CustomError;