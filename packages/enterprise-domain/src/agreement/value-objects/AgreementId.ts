import { DomainId } from "../../shared/domain/DomainId.js";

export class AgreementId extends DomainId {
  public constructor(value: string) {
    super(value, "AgreementId");
  }
}
