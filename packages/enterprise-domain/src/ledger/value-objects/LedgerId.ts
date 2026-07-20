import { DomainId } from "../../shared/domain/DomainId.js";

export class LedgerId extends DomainId {
  public constructor(value: string) {
    super(value, "LedgerId");
  }
}
