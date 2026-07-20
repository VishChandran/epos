import { DomainId } from "../../shared/domain/DomainId.js";

export class CustomerId extends DomainId {
  public constructor(value: string) {
    super(value, "CustomerId");
  }
}
