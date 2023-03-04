class mapError extends Error {
  constructor(message: string, stack: string) {
    super(message);
    this.stack = stack;
  }
}

export default mapError;
