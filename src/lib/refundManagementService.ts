/**
 * ATLAS Value Guarantee & Automated Refund Management Engine
 * Governed by HARD ROCK CAPITAL LTD (UK Reg. #16833237)
 * Implements the Two-Track Value Guarantee Blueprint and automated Stripe refund workflows.
 */

export type RefundTrack = 'track_a_lodging' | 'track_b_annual' | 'cooling_off_14d';

export type RefundCategory = 
  | 'wholesale_hotel' 
  | 'resort_condo' 
  | 'annual_travel_audit' 
  | 'flight_only' 
  | 'unused_membership';

export type RefundStatus = 
  | 'submitted' 
  | 'pre_validated' 
  | 'approved' 
  | 'processed' 
  | 'rejected';

export interface RefundClaimSubmission {
  track: RefundTrack;
  category: RefundCategory;
  memberEmail: string;
  memberName: string;
  bookingRef: string;
  destination: string;
  nights: number;
  atlasPricePaid: number;
  publicRetailPrice: number;
  currency: 'EUR' | 'NOK';
  retailSource: string;
  retailEvidenceUrl?: string;
  comments?: string;
}

export interface RefundClaimRecord extends RefundClaimSubmission {
  id: string;
  calculatedSavings: number;
  annualFeePaid: number;
  isEligible: boolean;
  status: RefundStatus;
  statusReason?: string;
  submittedAt: string;
  reviewedAt?: string;
  processedAt?: string;
  stripeRefundId?: string;
  adminNotes?: string;
}

const STORAGE_KEY = 'atlas_refund_claims_v1';

export const ANNUAL_FEE_EUR = 110;
export const ANNUAL_FEE_NOK = 1290;

/**
 * Pre-validates a claim against the ATLAS Value Guarantee Blueprint rules
 */
export function preValidateClaim(data: RefundClaimSubmission): {
  isEligible: boolean;
  calculatedSavings: number;
  annualFee: number;
  statusReason: string;
  suggestedStatus: RefundStatus;
} {
  const annualFee = data.currency === 'NOK' ? ANNUAL_FEE_NOK : ANNUAL_FEE_EUR;
  const savings = Math.max(0, data.publicRetailPrice - data.atlasPricePaid);

  // 1. Statutory 14-day cooling off
  if (data.track === 'cooling_off_14d') {
    return {
      isEligible: true,
      calculatedSavings: 0,
      annualFee,
      statusReason: 'Eligible under statutory 14-day cancellation cooling-off rights.',
      suggestedStatus: 'pre_validated',
    };
  }

  // 2. Track A Guardrail: Flights cannot trigger an immediate single-trip €110 refund
  if (data.track === 'track_a_lodging' && data.category === 'flight_only') {
    return {
      isEligible: false,
      calculatedSavings: savings,
      annualFee,
      statusReason:
        'Anti-Exploitation Rule: Economy flights operate on 8%–14% margins (saving GDS & baggage fees). Flight savings accumulate under Track B (Cumulative Annual Guarantee), but cannot trigger an immediate single-booking €110 refund.',
      suggestedStatus: 'rejected',
    };
  }

  // 3. Track A Guardrail: Minimum 2 consecutive nights for hotels
  if (data.track === 'track_a_lodging' && data.category === 'wholesale_hotel' && data.nights < 2) {
    return {
      isEligible: false,
      calculatedSavings: savings,
      annualFee,
      statusReason:
        'Track A Qualification Rule: Wholesale hotel stays require a minimum of 2 consecutive nights (baseline booking value ≥ €150). Single 1-night budget stays accumulate under Track B.',
      suggestedStatus: 'rejected',
    };
  }

  // 4. Savings comparison test
  if (savings < annualFee) {
    const deficit = annualFee - savings;
    return {
      isEligible: true,
      calculatedSavings: savings,
      annualFee,
      statusReason: `Automated Price Verification Passed: Realized savings of ${savings} ${data.currency} are less than the annual fee of ${annualFee} ${data.currency} (Deficit: ${deficit} ${data.currency}). 100% Value Guarantee refund qualified!`,
      suggestedStatus: 'pre_validated',
    };
  }

  // 5. If savings already exceed membership fee
  return {
    isEligible: false,
    calculatedSavings: savings,
    annualFee,
    statusReason: `Member realized ${savings} ${data.currency} in verified wholesale savings, which already exceeds the ${annualFee} ${data.currency} membership fee.`,
    suggestedStatus: 'rejected',
  };
}

/**
 * Retrieve all claims from localStorage with initial seeds
 */
export function getStoredRefundClaims(): RefundClaimRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = generateSeedClaims();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading refund claims from storage:', err);
    return [];
  }
}

/**
 * Submit a new refund claim
 */
export function submitRefundClaim(submission: RefundClaimSubmission): RefundClaimRecord {
  const claims = getStoredRefundClaims();
  const validation = preValidateClaim(submission);

  const newId = `VGB-CLAIM-2027-${String(claims.length + 101).padStart(4, '0')}`;
  const now = new Date().toISOString();

  const record: RefundClaimRecord = {
    ...submission,
    id: newId,
    calculatedSavings: validation.calculatedSavings,
    annualFeePaid: validation.annualFee,
    isEligible: validation.isEligible,
    status: validation.suggestedStatus,
    statusReason: validation.statusReason,
    submittedAt: now,
  };

  claims.unshift(record);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(claims));
  } catch (err) {
    console.error('Failed storing refund claim:', err);
  }

  return record;
}

/**
 * Approve a refund claim (Admin action)
 */
export function approveRefundClaim(claimId: string, adminNotes?: string): RefundClaimRecord | null {
  const claims = getStoredRefundClaims();
  const idx = claims.findIndex((c) => c.id === claimId);
  if (idx === -1) return null;

  claims[idx].status = 'approved';
  claims[idx].reviewedAt = new Date().toISOString();
  if (adminNotes) claims[idx].adminNotes = adminNotes;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(claims));
  return claims[idx];
}

/**
 * Execute simulated Stripe refund payout
 */
export function processStripeRefund(claimId: string): RefundClaimRecord | null {
  const claims = getStoredRefundClaims();
  const idx = claims.findIndex((c) => c.id === claimId);
  if (idx === -1) return null;

  const timestamp = Date.now();
  claims[idx].status = 'processed';
  claims[idx].processedAt = new Date().toISOString();
  claims[idx].stripeRefundId = `re_1Q${timestamp.toString(36)}xHARDROCK`;
  claims[idx].statusReason = `Refund of ${claims[idx].annualFeePaid} ${claims[idx].currency} successfully wired via Stripe to member's original payment card.`;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(claims));
  return claims[idx];
}

/**
 * Reject a claim with constructive compliance note
 */
export function rejectRefundClaim(claimId: string, reason: string): RefundClaimRecord | null {
  const claims = getStoredRefundClaims();
  const idx = claims.findIndex((c) => c.id === claimId);
  if (idx === -1) return null;

  claims[idx].status = 'rejected';
  claims[idx].reviewedAt = new Date().toISOString();
  claims[idx].statusReason = reason;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(claims));
  return claims[idx];
}

/**
 * Realistic seed claims for the audit queue
 */
function generateSeedClaims(): RefundClaimRecord[] {
  return [
    {
      id: 'VGB-CLAIM-2027-0098',
      track: 'track_a_lodging',
      category: 'wholesale_hotel',
      memberEmail: 'lars.johansen@oslo-corp.no',
      memberName: 'Lars Johansen',
      bookingRef: 'ATLAS-BK-9182',
      destination: 'London (The Clermont Charing Cross)',
      nights: 2,
      atlasPricePaid: 420,
      publicRetailPrice: 485,
      calculatedSavings: 65,
      annualFeePaid: 1290,
      currency: 'NOK',
      retailSource: 'Booking.com',
      retailEvidenceUrl: 'https://booking.com/hotel/gb/the-clermont.html',
      isEligible: true,
      status: 'approved',
      statusReason: 'Price delta verified: Member saved 65 kr, which is less than 1 290 kr annual fee. Qualified for 100% Value Guarantee refund.',
      submittedAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
      reviewedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    },
    {
      id: 'VGB-CLAIM-2027-0099',
      track: 'track_a_lodging',
      category: 'flight_only',
      memberEmail: 'erik.nielsen@nordictech.se',
      memberName: 'Erik Nielsen',
      bookingRef: 'ATLAS-BK-8821',
      destination: 'Oslo to London (SAS Net NDC)',
      nights: 0,
      atlasPricePaid: 110,
      publicRetailPrice: 135,
      calculatedSavings: 25,
      annualFeePaid: 110,
      currency: 'EUR',
      retailSource: 'Google Flights / OTA',
      isEligible: false,
      status: 'rejected',
      statusReason: 'Flight Carve-Out Rule: Single economy flights save GDS and baggage markups (€25 saved), which count toward Track B annual accumulation. Cannot trigger an immediate €110 refund.',
      submittedAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
      reviewedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    },
    {
      id: 'VGB-CLAIM-2027-0100',
      track: 'cooling_off_14d',
      category: 'unused_membership',
      memberEmail: 'sarah.smith@london-law.co.uk',
      memberName: 'Sarah Smith',
      bookingRef: 'ATLAS-FND-1004',
      destination: 'N/A (Statutory Cancellation)',
      nights: 0,
      atlasPricePaid: 0,
      publicRetailPrice: 0,
      calculatedSavings: 0,
      annualFeePaid: 110,
      currency: 'EUR',
      retailSource: 'Direct Activation',
      isEligible: true,
      status: 'processed',
      statusReason: '14-Day Statutory cooling-off period requested within 3 days of activation. €110 refunded to Mastercard.',
      submittedAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
      reviewedAt: new Date(Date.now() - 60 * 3600 * 1000).toISOString(),
      processedAt: new Date(Date.now() - 50 * 3600 * 1000).toISOString(),
      stripeRefundId: 're_1Q98f2hardrockcapital',
    },
  ];
}
