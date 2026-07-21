import { DomainError } from "../../shared/errors/DomainError.js";

export class InvalidAccountStatusTransitionError extends DomainError {
  public constructor(message: string) {
    super(message);
  }
}
