# EPOS Enterprise Domain Model

## Purpose

This document defines the initial enterprise banking domain model for EPOS.

The purpose of this model is to establish the shared business language, core entities, relationships, ownership rules, and boundaries that will guide future architecture and implementation.

EPOS will treat business architecture as the foundation for system design. Implementation should follow the domain model, not define it.

## Core Entities

The initial EPOS enterprise domain consists of:

- Party
- Customer
- Product
- Agreement
- Account
- Ledger
- Transaction
- Branch
- Employee
- Channel

## Entity Definitions

### Party

Any person or organization known to the enterprise.

### Customer

A Party that has an active or historical banking relationship with the bank.

### Product

A financial product offered by the bank, such as chequing, savings, credit card, mortgage, loan, or line of credit.

### Agreement

The contractual relationship between a Customer and the bank for a Product.

### Account

The operational record created under an Agreement that maintains balances, servicing state, and transactions.

### Ledger

The accounting record representing the financial truth of the platform.

### Transaction

A business event that changes, attempts to change, or records movement against an Account or Ledger.

### Branch

A physical banking location.

### Employee

A Party acting on behalf of the bank.

### Channel

The access path used to initiate or service activity, such as branch, ATM, mobile, web, call centre, batch, or API.

## Relationships

The primary enterprise identity model is:

```text
Party
    ↓ may become
Customer
    ↓ enters into
Agreement
    ↓ for
Product
    ↓ creates / governs
Account
    ↓ records
Transaction
    ↓ posts to
Ledger
```

## Ownership Rules

| Entity | Owns |
|---|---|
| Party | Identity information |
| Customer | Banking relationship |
| Product | Product definition and business rules |
| Agreement | Contractual terms |
| Account | Operational servicing state and balances |
| Ledger | Accounting truth |
| Transaction | Movement and request history |
| Channel | Origin of activity |
| Branch | Physical banking context |
| Employee | Internal actor context |

## Ubiquitous Language

| Use | Instead Of |
|---|---|
| Party | Person |
| Customer | User |
| Agreement | Contract |
| Account | Wallet |
| Transaction | Payment |
| Ledger Entry | Balance Update |
| Channel | Frontend |
| Product | Account Type |

## Domain Boundaries

### Identity Domain

Owns Party identity and enterprise-recognized actors.

### Customer Domain

Owns the banking relationship between a Party and the institution.

### Product Domain

Owns financial product definitions, eligibility, and business rules.

### Agreement Domain

Owns contractual relationships between Customers and Products.

### Account Domain

Owns operational account state, servicing status, and balance-facing behavior.

### Ledger Domain

Owns accounting truth and financial posting records.

### Transaction Domain

Owns movement requests, attempts, outcomes, and transaction history.

### Channel Domain

Owns the origin and access path of banking activity.

### Branch Domain

Owns physical banking location context.

### Employee Domain

Owns internal actor context for employees acting on behalf of the bank.

## Open Questions

- Should Employee be modeled as a role of Party or as a separate domain aggregate?
- Should Branch belong under Channel or remain a separate physical-location domain?
- Should Transaction and Ledger be separated immediately, or should Ledger be introduced after Account modeling?
- Should Product rules be modeled before Agreement creation?
- Should Account balance be stored directly, derived from Ledger, or represented as a read model?

## Decisions

### Decision 1: Party is the root identity concept

EPOS will use Party as the root enterprise identity concept instead of Customer.

Customer represents a banking relationship role. Party represents the broader enterprise identity of a person or organization.

Customer records will reference Party records instead of duplicating identity information throughout the platform.

## Aggregate Design

### Purpose

Aggregate Design defines the transaction boundaries of the enterprise domain.

An aggregate is a cluster of related business entities that are treated as a single unit for consistency. Every aggregate has one **Aggregate Root**, which is the only object that may be referenced directly from outside the aggregate.

The aggregate root is responsible for enforcing all business rules and invariants within its boundary.

---

## Aggregate Principles

EPOS follows these aggregate design principles:

1. Every aggregate has exactly one Aggregate Root.
2. External domains reference only Aggregate Roots.
3. Cross-aggregate references are by identifier rather than object references.
4. Business invariants are enforced within the aggregate boundary.
5. Cross-aggregate workflows are coordinated through domain services or domain events.
6. Aggregates should remain small and focused on a single business responsibility.

---

## Identity Aggregate

### Aggregate Root

**Party**

### Purpose

Represents the enterprise identity of any person or organization known to the bank.

### Contains

- Party
- Customer (business role)
- Employee (business role)

### Responsibilities

- Enterprise identity
- Legal identity
- Contact information
- Identity lifecycle
- Enterprise role assignment

### References

None

---

## Product Aggregate

### Aggregate Root

**Product**

### Purpose

Defines financial products offered by the institution.

### Responsibilities

- Product definitions
- Product configuration
- Eligibility rules
- Interest configuration
- Fees
- Product lifecycle

### References

None

---

## Agreement Aggregate

### Aggregate Root

**Agreement**

### Purpose

Represents the contractual relationship between a Customer and the bank for a Product.

### Responsibilities

- Contractual terms
- Effective dates
- Product association
- Customer association
- Agreement lifecycle

### References

- Party (through Customer)
- Product

---

## Account Aggregate

### Aggregate Root

**Account**

### Purpose

Represents the operational servicing record created under an Agreement.

### Responsibilities

- Account status
- Available balance
- Operational servicing state
- Limits
- Account lifecycle

### References

- Agreement

---

## Transaction Aggregate

### Aggregate Root

**Transaction**

### Purpose

Represents a business event that moves or attempts to move value.

### Responsibilities

- Transaction lifecycle
- Authorization state
- Settlement state
- Processing status
- Channel information

### References

- Account
- Channel

---

## Ledger Aggregate

### Aggregate Root

**Ledger**

### Purpose

Represents the accounting source of truth for the enterprise.

### Responsibilities

- Financial postings
- Accounting integrity
- Double-entry bookkeeping
- Auditability

### References

- Transaction

---

## Aggregate Ownership Matrix

| Aggregate Root | Owns | References |
|----------------|------|------------|
| Party | Enterprise identity | None |
| Product | Product definitions | None |
| Agreement | Contractual relationship | Party (Customer), Product |
| Account | Operational servicing | Agreement |
| Transaction | Transaction lifecycle | Account, Channel |
| Ledger | Financial truth | Transaction |

---

## Transaction Boundaries

Each aggregate defines its own consistency boundary.

Business rules must be enforced within the aggregate before changes are committed.

Cross-aggregate updates should occur through well-defined application services or domain events rather than allowing one aggregate to modify another directly.

Examples:

- A Customer opening a new Account requires coordination between the Agreement and Account aggregates.
- A successful Transaction results in a Ledger posting but does not directly modify the Ledger aggregate.
- Product changes do not directly update existing Accounts; those changes are managed through Agreement rules and servicing processes.

---

## Future Evolution

As EPOS evolves, additional aggregates are expected to be introduced, including:

- Payment
- Card
- Loan
- Mortgage
- Beneficiary
- Standing Instruction
- Limit
- Risk
- Fraud
- Pricing
- Notification
- Document
- Case Management

Each future aggregate will follow the same architectural principles established in this document.