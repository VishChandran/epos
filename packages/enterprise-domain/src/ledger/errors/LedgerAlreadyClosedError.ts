import { DomainError } from "../../shared/errors/DomainError.js";

export class LedgerAlreadyClosedError extends DomainError {
  public constructor() {
    super("Ledger is already closed.");
  }
}
