// Custom error class for better error handling
export class AirtableError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message);
    this.name = "AirtableError";
  }
}
