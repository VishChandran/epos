import { DomainId } from "../../shared/domain/DomainId.js";

export class ProductId extends DomainId {
  public constructor(value: string) {
    super(value, "ProductId");
  }
}
