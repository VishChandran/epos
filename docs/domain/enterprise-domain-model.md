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