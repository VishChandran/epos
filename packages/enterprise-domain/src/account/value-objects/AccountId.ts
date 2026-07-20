import { DomainId } from "../../shared/domain/DomainId.js";

export class AccountId extends DomainId {
  public constructor(value: string) {
    super(value, "AccountId");
  }
}
