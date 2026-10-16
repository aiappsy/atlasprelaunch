# ATLAS Travel Club — Master Project Decisions & Legal Ground Truth

> **PERMANENT DIRECTIVE FOR ALL AI AGENTS & ENGINEERS**:
> These records represent foundational business, legal, and architectural decisions made by Founder & Managing Director Pål Juritzen.
> They are **IMMUTABLE** and must be referenced and obeyed in every conversation, task, email draft, API integration, and code modification.
> Under NO circumstances should generic placeholders or hallucinated company names ever be used.

---

## 1. Operating Legal Entity & Governance

* **Legal Entity**: **HARD ROCK CAPITAL LTD**
* **Company Registration Number**: **16833237** (Registered in England & Wales)
* **Registered Address**: **71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom**
* **Founder & Managing Director**: **Pål Juritzen**
* **Direct Email**: `paljuritzen@gmail.com`
* **Direct Phone**: `+47 40059493`
* **Platform Trading Names**: **ATLAS**, **ATLAS Travel Club**, **ATLAS VIP**
* **Production URLs**:
  - Live Platform: `https://atlasclub.web.app`
  - Prelaunch / Waitlist: `https://atlasprelaunch.web.app`

### 🚫 STRICTLY FORBIDDEN HALLUCINATIONS:
- **NEVER** use "Atlas Global AS" (does not exist).
- **NEVER** use "ATLAS VIP Platform Inc." (do not use boilerplate templates).
- **NEVER** invent fictitious entity names. Any contract, supplier application (RateHawk, WebBeds, Incentivations, Duffel, Stripe), or legal document MUST use **HARD ROCK CAPITAL LTD**.

---

## 2. Core Business Model & Revenue Mechanics

ATLAS is modeled on the **Costco Membership Club** paradigm:
1. **0 kr Markup (Wholesale Net Rates)**:
   - On flights (Duffel NDC) and wholesale hotels (RateHawk / Hotelbeds / WebBeds), members book at true wholesale cost.
   - ATLAS adds 0% markup.
2. **100% Commission Rebate to Members**:
   - On cruise lines (10–16% commission) and luxury hotel programs where contracts enforce public rate parity, retail rates are paid at booking.
   - ATLAS **rebates 100% of the commission back to the member** as Club Credits / Points in their Rewards Vault.
   - ATLAS does NOT take a travel commission cut for itself.
3. **Primary Revenue Source**:
   - Monthly and annual B2C membership subscriptions.
   - B2B corporate SaaS licensing.

---

## 3. Points Liquidity & Escrow Security (The Cash Lag Rule)

This is a critical solvency rule:
* **The Reality of Travel Cash Flow**: Cruise lines and wholesale partners settle commissions 30 to 60 days *after* travel has completed.
* **Escrow Rule**:
  - `🟡 Pending / In Escrow`: Points earned on a booking are visible immediately in the member's Rewards Vault as pending, but **CANNOT BE REDEEMED OR SPENT**.
  - `🟢 Cleared / Spendable`: Points transition to spendable **ONLY AFTER** the commission cash has been physically received and cleared in HARD ROCK CAPITAL LTD's bank account.
* **No Unfunded Liability**: ATLAS will never allow redemption of credits that have not been backed by settled cash in our bank.
* **Wallet & Portal Display**:
  - Apple Wallet Pass and Web Portal must clearly display **Disponibel Saldo (Available)** separately from **Venter på oppgjør (Pending Escrow)**.
  - Checkout and redemption validation must enforce `spend_amount <= available_cleared_balance`.
