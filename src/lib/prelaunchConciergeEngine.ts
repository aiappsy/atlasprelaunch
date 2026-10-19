// Conversational Prelaunch AI Concierge Knowledge Base & Engine for Atlas Travel Club
// Base currency: EUR (€110/yr) / NOK (1 290 kr/år). Founding Members get a 100% Free 3-Day European Hotel Break for 2 (worth €480 / 5 400 kr) + 3 of 100 win all meals covered!
// Dynamic language support: When NOK is chosen, responses and UI seamlessly switch to Norwegian!

export type CurrencyCode = 'USD' | 'NOK' | 'EUR' | 'GBP';

export interface PriceQuote {
  currency: CurrencyCode;
  symbol: string;
  regularPrice: number;
  foundingPrice: number;
  formattedRegular: string;
  formattedFounding: string;
  monthlyEquivalent: string;
}

export const MEMBERSHIP_PRICING: Record<CurrencyCode, PriceQuote> = {
  USD: {
    currency: 'USD',
    symbol: '$',
    regularPrice: 120,
    foundingPrice: 120,
    formattedRegular: '$120 / year',
    formattedFounding: '$120 / year',
    monthlyEquivalent: '$10.00 / mo',
  },
  NOK: {
    currency: 'NOK',
    symbol: 'kr ',
    regularPrice: 1290,
    foundingPrice: 1290,
    formattedRegular: '1 290 kr / år',
    formattedFounding: '1 290 kr / år',
    monthlyEquivalent: '107,50 kr / mnd',
  },
  EUR: {
    currency: 'EUR',
    symbol: '€',
    regularPrice: 110,
    foundingPrice: 110,
    formattedRegular: '€110 / year',
    formattedFounding: '€110 / year',
    monthlyEquivalent: '€9.17 / mo',
  },
  GBP: {
    currency: 'GBP',
    symbol: '£',
    regularPrice: 95,
    foundingPrice: 95,
    formattedRegular: '£95 / year',
    formattedFounding: '£95 / year',
    monthlyEquivalent: '£7.92 / mo',
  },
};

export interface ConciergeAnswer {
  text: string;
  action?: 'open_waitlist' | 'open_podcast' | 'open_calculator' | 'open_audio_deepdive' | 'open_refund_modal' | 'open_compliance_modal';
  actionLabel?: string;
  followUps?: string[];
}

export interface QAEntry {
  id: string;
  category: 'why_membership' | 'wholesale_hotels' | 'membership_pricing' | 'cruises' | 'flights' | 'visa_card' | 'guarantee' | 'nomads' | 'b2b' | 'founding_perks' | 'checkin_vouchers' | 'launch_date' | 'signature_resorts' | 'gourmet_spa';
  exactPhrases: string[];
  patterns: RegExp[];
  strongKeywords: string[];
  negativeKeywords?: string[];
  weight: number;
  getAnswer: (currency: CurrencyCode) => ConciergeAnswer;
}

export const PRELAUNCH_QA_DATABASE: QAEntry[] = [
  // =========================================================================
  // 1. WHY DO I HAVE TO BECOME A MEMBER / CAN I TEST FIRST / FREE TRIAL
  // =========================================================================
  {
    id: 'why_membership_test_first',
    category: 'why_membership',
    exactPhrases: [
      'why do i have to become a member and why cant i test it before i become a member',
      'why do i have to become a member',
      'why cant i test it before i become a member',
      'why cant i test it first',
      'can i test it before i join',
      'can i test it first',
      'can i become a member without committing',
      'become a member without committing',
      'without committing',
      'no commitment',
      'free trial',
      'is there a free trial',
      'do you offer a free trial',
      'can i test for free',
      'why do i have to pay first',
      'why a membership',
      'why membership',
      'why cant i just search',
      'why cant i book without membership',
      'hvorfor må jeg bli medlem og hvorfor kan jeg ikke teste det først',
      'hvorfor må jeg bli medlem',
      'hvorfor kan jeg ikke teste det først',
      'hvorfor kan jeg ikke teste først',
      'kan jeg teste før jeg blir medlem',
      'kan jeg teste først',
      'kan jeg bli medlem uten forpliktelser',
      'bli medlem uten forpliktelser',
      'uten forpliktelser',
      'ingen forpliktelser',
      'gratis prøveperiode',
      'har dere gratis prøveperiode',
      'kan jeg teste gratis',
      'er det gratis prøveperiode',
      'hvorfor må jeg betale først',
      'hvorfor medlemskap',
      'hvorfor ikke gratis',
    ],
    patterns: [
      /why (do I have to|must I) become a member/i,
      /why can('?t| not) I test (it )?(first|before)/i,
      /can I test (it )?(first|before|for free)/i,
      /free trial/i,
      /without commit(ting|ment)?/i,
      /no commit(ment)?/i,
      /why (a )?membership/i,
      /why do I have to pay/i,
      /hvorfor må jeg bli medlem/i,
      /hvorfor kan jeg ikke teste/i,
      /kan jeg teste (først|før|gratis)/i,
      /gratis prøve(periode|tid)?/i,
      /uten forpliktelse(r)?/i,
      /ingen forpliktelse(r)?/i,
      /hvorfor medlemskap/i,
      /hvorfor ikke gratis/i,
    ],
    strongKeywords: ['trial', 'free trial', 'commitment', 'commit', 'forpliktelse', 'prøveperiode', 'test', 'first', 'before', 'teste', 'prøve', 'medlem', 'why', 'hvorfor'],
    weight: 160,
    getAnswer: (currency: CurrencyCode) => {
      const p = MEMBERSHIP_PRICING[currency] || MEMBERSHIP_PRICING.EUR;
      const isNorwegian = currency === 'NOK';

      if (isNorwegian) {
        return {
          text: `Det fantastiske er: **du kan sikre deg plass helt trygt, med 100% fornøyd- og verdigaranti!**

Grunnen til at du må opprette et medlemskap først, er utelukkende juridisk. Hotellkontraktene våre forbyr oss strengt å vise uannonserte engrospriser åpent på nettet (dette kalles **prisparitet / Rate Parity**). De hemmelige nettoprisene kan kun gjøres tilgjengelige bak en passordbeskyttet innlogging for en lukket medlemsgruppe.

Når du sikrer deg et av våre 100 første Founding-medlemskap (${p.formattedFounding}), **spanderer ATLAS et 3-dagers hotellopphold for to personer i Europa helt gratis (verdi 5 400 kr)**. Selve rommet er 100% dekket (du betaler kun hotellets lokale gourmet-halvpensjon ved utsjekk).

I tillegg trekker vi 3 heldige vinnere blant de 100 som får **OGSÅ MATEN 100% dekket av ATLAS**! Og din første reise er sikret av vår **100% verdigaranti**. Du tar med andre ord absolutt null økonomisk risiko!`,
          action: 'open_waitlist',
          actionLabel: `Sikre Founding Member-plass (${p.formattedFounding})`,
          followUps: [
            'Hvordan fungerer engrospriser på hotell?',
            'Hva inkluderer det gratis hotelloppholdet?',
            'Hva er 100% verdigarantien?',
          ],
        };
      }

      return {
        text: `The best part is: **you can secure your spot with complete confidence, backed by our 100% money-back guarantee!**

The reason you have to set up a membership first is purely legal. Hotel supplier contracts strictly prohibit showing wholesale rates openly to the public (this is called **Rate Parity**). Those confidential net rates can legally only be unlocked behind a private, password-protected member login.

When you secure one of our first 100 Founding Memberships (${p.formattedFounding}), **ATLAS gifts you a complimentary 3-day European hotel stay for two (worth €480)**. The room is 100% sponsored (you only pay the hotel's local gourmet half-board at checkout).

On top of this, 3 lucky winners among the 100 will win **ALL MEALS 100% paid by ATLAS**! Plus, your membership is backed by our **100% money-back guarantee**. You literally have zero financial risk!`,
        action: 'open_waitlist',
        actionLabel: `Claim Founding Spot (${p.formattedFounding})`,
        followUps: [
          'How does wholesale hotel pricing work?',
          'What is included in the free hotel stay?',
          'What is the 100% money-back guarantee?',
        ],
      };
    },
  },

  // =========================================================================
  // 2. HOW WHOLESALE HOTEL PRICING WORKS (BILINGUAL)
  // =========================================================================
  {
    id: 'wholesale_hotel_mechanics',
    category: 'wholesale_hotels',
    exactPhrases: [
      'how does wholesale hotel pricing work',
      'how does wholesale hotel work',
      'how does wholesale pricing work',
      'how does wholesale work',
      'how does hotel wholesale work',
      'why are you cheaper than booking',
      'why are hotels cheaper',
      'explain wholesale hotel pricing',
      'what is wholesale hotel pricing',
      'hvordan fungerer engrospriser',
      'hvordan fungerer hotell engros',
      'hvordan fungerer engros',
      'hvorfor er hotellene billigere',
      'hvorfor er dere billigere',
    ],
    patterns: [
      /how (does|do) (wholesale|bedbank|hotel wholesale)/i,
      /wholesale (hotel|room|pricing|rates?)/i,
      /why (are you|is it|are hotels) cheaper/i,
      /beat (booking|expedia|agoda)/i,
      /hvordan (fungerer|virker) (engros|wholesale|bedbank)/i,
      /hvorfor er (dere|det|hotell) billigere/i,
      /prisparitet|rate parity/i,
      /b2b (rates?|inventory|bedbank|priser)/i,
    ],
    strongKeywords: ['wholesale', 'bedbank', 'bedbanks', 'markup', 'paritet', 'engros', 'webbeds', 'hotelbeds', 'ratehawk'],
    negativeKeywords: ['membership fee', 'kontingent', 'bli medlem pris', 'how much to join', 'test first', 'teste først'],
    weight: 130,
    getAnswer: (currency: CurrencyCode) => {
      const p = MEMBERSHIP_PRICING[currency] || MEMBERSHIP_PRICING.EUR;
      const isNorwegian = currency === 'NOK';

      if (isNorwegian) {
        return {
          text: `Tenk på åpne reisesider som Booking.com og Expedia som vanlige butikker. De legger på 15% til 30% i provisjon på hvert eneste rom og bruker milliarder på markedsføring – kostnader som lempes over på deg.

Hotellene hater tomme rom, så de selger store romblokker i hemmelighet til B2B-grossister (bedbanks som WebBeds og Hotelbeds) med 20% til 40% rabatt. Men hotellkontraktene forbyr enhver å annonsere disse engrosprisene offentlig – dette kalles **prisparitet (Rate Parity)**.

Det er her Atlas kommer inn. Fordi vi er en lukket, passordbeskyttet medlemsklubb (Closed-User Group), gjelder ikke prisparitetsreglene for oss. Vi tar 0% kommersielt påslag på rommet – vi sender 100% av engrosprisen direkte videre til deg.

På et typisk 4-netters opphold på et 4- eller 5-stjerners hotell sparer du vanligvis mellom **3 000 kr og 8 000 kr rett i lommen** – noe som gjør at årskontingenten på **${p.formattedFounding}** betaler seg selv mange ganger allerede på første reise.`,
          action: 'open_podcast',
          actionLabel: '🎧 Lytt til 23-minutters lydforklaring',
          followUps: [
            'Hvorfor må jeg bli medlem og ikke teste først?',
            'Hva koster medlemskapet ved lansering?',
            'Hvorfor er cruisepriser like overalt?',
          ],
        };
      }

      return {
        text: `Think of public travel sites like Booking.com and Expedia as retail storefronts. They add a 15% to 30% commission on every room and spend billions on advertising, passing those markups on to you.

Hotels hate having empty rooms, so they quietly sell room blocks to B2B wholesale suppliers (bedbanks like WebBeds and Hotelbeds) at deep 20% to 40% discounts. But hotel contracts legally forbid anyone from advertising those wholesale rates publicly—that is called **Rate Parity**.

That is where Atlas comes in. Because we are a private, password-protected membership club, Rate Parity rules don't apply. We don't take a commission on the room—we pass 100% of the wholesale net rate directly to you at **0% commercial markup**.

On a typical 4-night stay at a 4- or 5-star hotel, that usually puts **€250 to €700 straight back in your pocket**—far exceeding our **${p.formattedFounding}** annual membership fee on your very first trip.`,
        action: 'open_podcast',
        actionLabel: '🎧 Listen to 23-Min Audio Deep Dive',
        followUps: [
          'Why do I have to become a member and can\'t test first?',
          'What is the annual membership fee?',
          'Why are cruise prices identical publicly?',
        ],
      };
    },
  },

  // =========================================================================
  // 3. ANNUAL MEMBERSHIP PRICING & FOUNDING PRIVILEGES (BILINGUAL)
  // =========================================================================
  {
    id: 'membership_pricing',
    category: 'membership_pricing',
    exactPhrases: [
      'how much does membership cost',
      'how much is membership',
      'what is the membership price',
      'membership fee',
      'what is the cost',
      'how much to join',
      'annual fee',
      'founding privileges',
      'hva koster medlemskap',
      'medlemskontingent',
      'hva koster det å bli medlem',
      'hva er prisen',
      'hva koster det',
      'årspris',
      'årskontingent',
    ],
    patterns: [
      /how much (is|does|costs?) (the )?(membership|club|to join|annual)/i,
      /membership (price|cost|fee|dues)/i,
      /(annual|yearly) (fee|dues|cost|price|subscription)/i,
      /hva koster (et )?(medlemskap|det å være medlem|det)/i,
      /medlems(pris|kontingent|avgift)/i,
      /founding member (perks|rate|price|benefits)/i,
      /(1290|1 290) (kr|nok)/i,
      /(110|€110) (eur|euro|euros)/i,
    ],
    strongKeywords: ['membership', 'dues', 'kontingent', 'medlemskap', 'medlemspris', 'årsavgift', 'subscription', 'join fee'],
    negativeKeywords: ['test first', 'teste først', 'why become a member', 'hvorfor bli medlem'],
    weight: 120,
    getAnswer: (currency: CurrencyCode) => {
      const p = MEMBERSHIP_PRICING[currency] || MEMBERSHIP_PRICING.EUR;
      const isNorwegian = currency === 'NOK';

      if (isNorwegian) {
        return {
          text: `👑 **ATLAS Medlemskontingent & Founding Privilegier:**

ATLAS er en privat medlemsklubb etter Costco-modellen. Vi tar **0 kr i påslag på fly og over 1 200 000 hoteller**, og gir **100% provisjonsretur** på cruise og luksusopphold.

• **Årskontingent ved lansering**: **${p.formattedFounding} per år** (${p.monthlyEquivalent}) ved åpning onsdag 20. januar 2027.
• **100% Gratis Reservasjon**: Du reserverer plass i dag helt gratis – intet kredittkort nødvendig.
• **Gave til de 100 første**: Et **3-dagers gratis luksushotellopphold for 2 personer** i Europa (verdi 5 400 kr, 0 kr i rompris via Connex Holiday Plus).
• **Golden Ticket Mattrekning**: 3 av de 100 første vinner OGSÅ all gourmetmat (halvpensjon) 100% dekket av ATLAS.
• **100% Fornøyd- & Verdigaranti**: Sparer du ikke inn kontingenten på ditt første hotellopphold (2+ netter), ferieleilighet eller samlede årsreiser, refunderer vi 100% av beløpet umiddelbart.`,
          action: 'open_waitlist',
          actionLabel: `Reserver Founding-plass gratis (${p.formattedFounding})`,
          followUps: [
            'Hva inkluderer det gratis hotelloppholdet?',
            'Hvordan fungerer engrospriser på hotell?',
            'Hva er ferieleiligheter fra 3 490 kr?',
            'Hva er 100% verdigarantien?',
          ],
        };
      }

      return {
        text: `👑 **ATLAS Annual Membership & Founding Member Privileges:**

ATLAS operates on a strict subscription model (like Costco). We charge **0 retail markups on direct NDC flights and 1.2M+ wholesale hotels**, and pass **100% commission rebates** directly to members.

• **Annual Dues at Launch**: **${p.formattedFounding} per year** (${p.monthlyEquivalent}) upon official launch on Wednesday, January 20, 2027.
• **100% Free Reservation**: You can reserve your priority spot today for free – no credit card required.
• **Founder Gift for the First 100**: A complimentary **3-day European luxury hotel break for 2 guests** (worth €480 / 5 400 kr, €0 room rate via Connex Holiday Plus).
• **Golden Ticket Food Draw**: 3 of the first 100 members will win ALL gourmet meals (half-board) 100% covered by ATLAS.
• **100% Value Guarantee**: If your first hotel stay (2+ nights), vacation condo, or cumulative annual travel doesn't save you more than your membership fee, we refund 100% of your fee immediately.`,
        action: 'open_waitlist',
        actionLabel: `Reserve Founding Spot Free (${p.formattedFounding})`,
        followUps: [
          'What is included in the free hotel stay?',
          'How does wholesale hotel pricing work?',
          'What are 7-night condo stays for €299 (3 490 kr)?',
          'What is the 100% value guarantee?',
        ],
      };
    },
  },

  // =========================================================================
  // 4. WHY LUXURY CRUISE PRICES ARE IDENTICAL PUBLICLY (BILINGUAL)
  // =========================================================================
  {
    id: 'cruise_fact_check',
    category: 'cruises',
    exactPhrases: [
      'why are cruise prices identical',
      'why are luxury cruise prices identical',
      'cruise price parity',
      'how do cruise discounts work',
      'cruise fact check',
      'hvorfor er cruisepriser like',
      'hvorfor er cruise like',
      'cruise priser',
    ],
    patterns: [
      /cruise (prices?|rates?|pricing|priser)/i,
      /why are cruise (prices?|rates?) identical/i,
      /cruise fact check/i,
      /hvorfor er cruise/i,
      /minimum advertised price/i,
      /map (rules|policy|pricing)/i,
    ],
    strongKeywords: ['cruise', 'cruises', 'stateroom', 'royal caribbean', 'norwegian cruise', 'celebrity', 'msc', 'seaborne', 'silversea'],
    weight: 110,
    getAnswer: (currency: CurrencyCode) => {
      const isNorwegian = currency === 'NOK';

      if (isNorwegian) {
        return {
          text: `Det kan virke merkelig at alle reisesider viser nøyaktig samme pris på et cruise eller leiebil, men det er en streng bransjeregel: Cruiserederiene og leiebilselskapene håndhever regler for laveste annonserte pris (MAP). Ingen reisebyråer får lov til å underby de offisielle prisene i handlekurven.

I stedet betaler de en agentprovisjon (typisk 10% til 16%) i etterkant av reisen.

**Hva gjør Atlas annerledes?**
Vanlige reisebyråer stikker hele denne provisjonen i egen lomme. Siden Atlas er en ren medlemsklubb med 0 kr i påslag, **overfører vi 100% av denne provisjonen rett tilbake til deg som Rewards Vault-kreditt!**

• **100% Provisjonsretur**: Hele provisjonen tilfaller deg som medlem.
• **Trygg Likviditet & Escrow**: Provisjonen godskrives som disponible poeng så snart rederiet utbetaler oppgjøret (30–60 dager etter reisen).
• **Selvfinansierende**: Disponible poeng kan brukes til reiser eller trekkes fra din neste årskontingent (1 290 kr / €110).
• **Ekstra fordeler**: Eksklusive lugar-oppgraderinger og gratis ombordkreditt (€180–€550 per lugar).`,
          action: 'open_waitlist',
          actionLabel: 'Bli med på ventelisten for cruise',
          followUps: [
            'Hva koster medlemskapet ved lansering?',
            'Hvordan fungerer engrospriser på hotell?',
            'Hva er 100% verdigarantien?',
          ],
        };
      }

      return {
        text: `It's frustrating when every travel website shows the exact same price for a cruise or rental car, but there's a strict industry reason for it: luxury cruise lines and rental firms enforce Minimum Advertised Price (MAP) rules. No agency is permitted to undercut public retail prices in the shopping cart.

Instead, suppliers pay an agency commission (typically 10% to 16%) after the journey is completed.

**What does Atlas do differently?**
Traditional agencies pocket this entire commission. Because Atlas is a pure membership club with 0 kr markups, **we pass 100% of this supplier commission directly back to you as Rewards Vault points and credits!**

• **100% Commission Rebate**: We retain 0% of travel commissions.
• **Escrow Liquidity**: Commission credits clear into spendable points once funds settle from the supplier (30–60 days post-travel).
• **Self-Funding**: Spendable points can be redeemed for future travel or offset your next annual renewal in Stripe (€110 / 1 290 NOK) – making your membership completely self-funding!
• **Exclusive VIP Perks**: Stateroom upgrades and onboard spending credits (€180–€550 per cabin).`,
        action: 'open_waitlist',
        actionLabel: 'Join Waitlist for Cruise Allocations',
        followUps: [
          'What is the annual membership fee?',
          'How does wholesale hotel pricing work?',
          'What is the 100% money-back guarantee?',
        ],
      };
    },
  },

  // =========================================================================
  // 5. THE 16-GRAM SOVEREIGN METAL VISA CARD (BILINGUAL)
  // =========================================================================
  {
    id: 'sovereign_visa',
    category: 'visa_card',
    exactPhrases: [
      'how does the metal card work',
      'what is the atlas visa card',
      'sovereign metal visa card',
      'metal card benefits',
      'tell me about the card',
      'metallkort',
      'atlas visa kort',
      'hvordan fungerer kortet',
      'hva er metallkortet',
    ],
    patterns: [
      /metal (card|visa)/i,
      /sovereign (card|visa)/i,
      /atlas (card|visa)/i,
      /metall(kort|visa)/i,
      /fx (fees?|markup)/i,
      /valutapåslag/i,
    ],
    strongKeywords: ['card', 'visa', 'metal', 'brass', 'laser', 'metallkort', 'sepa', 'iban', 'fx'],
    weight: 100,
    getAnswer: (currency: CurrencyCode) => {
      const isNorwegian = currency === 'NOK';

      if (isNorwegian) {
        return {
          text: `Dette er vårt 16-grams solide messingkort med gullgravering, koblet direkte til din private Atlas reiselommebok.

Den største fordelen når du reiser er **0% valutapåslag (0% FX)**. Vanlige banker legger i stillhet på 2% til 3,5% i gebyrer hver gang du drar kortet i utlandet. Atlas-kortet veksler til ren interbank-spotkurs uten bankpåslag.

Du fyller enkelt på via vanlig bankoverføring eller kort, og du kan legge det til i **Apple Pay** eller **Google Wallet** med en gang medlemskapet ditt er bekreftet.`,
          action: 'open_waitlist',
          actionLabel: 'Reserver metallkort med tidlig tilgang',
          followUps: [
            'Hvorfor må jeg bli medlem og ikke teste først?',
            'Hva koster medlemskap?',
            'Hvordan fungerer engrospriser på hotell?',
          ],
        };
      }

      return {
        text: `It is our bespoke 16-gram solid brass card with gold laser etching, linked straight to your Atlas wholesale travel wallet.

The biggest perk when traveling abroad is **0% foreign exchange markup**. Traditional retail banks quietly charge 2% to 3.5% hidden conversion fees whenever you spend overseas. The Atlas card clears at pure interbank spot rates with zero bank gouging.

You can top it up instantly via SEPA or local bank transfer, and you can add it to **Apple Pay** or **Google Wallet** the moment your membership is confirmed.`,
        action: 'open_waitlist',
        actionLabel: 'Reserve Metal Card Early Access',
        followUps: [
          'Why do I have to become a member and can\'t test first?',
          'What are the membership prices?',
          'How does wholesale hotel pricing work?',
        ],
      };
    },
  },

  // =========================================================================
  // 6. 100% MONEY-BACK VALUE GUARANTEE (BILINGUAL)
  // =========================================================================
  {
    id: 'guarantee_safety',
    category: 'guarantee',
    exactPhrases: [
      'what is the guarantee',
      'is there a money back guarantee',
      'is my money safe',
      'what if i do not save money',
      'hva er garantien',
      'penger tilbake garanti',
      'er pengene mine trygge',
      'verdigaranti',
    ],
    patterns: [
      /guarantee/i,
      /money back/i,
      /refund/i,
      /trygghet/i,
      /sikkerhet/i,
      /verdigaranti/i,
      /is it safe/i,
    ],
    strongKeywords: ['guarantee', 'refund', 'protection', 'safe', 'garanti', 'refusjon', 'verdigaranti'],
    weight: 105,
    getAnswer: (currency: CurrencyCode) => {
      const p = MEMBERSHIP_PRICING[currency] || MEMBERSHIP_PRICING.EUR;
      const isNorwegian = currency === 'NOK';

      if (isNorwegian) {
        return {
          text: `Vi holder det helt risikofritt: Hvis Atlas ikke sparer deg for mer enn årskontingenten din (${p.formattedFounding} for Founding Members) på ditt aller første hotellopphold (min. 2–3 netter på engrospriser), ferieleilighet eller samlede årsreiser, gir du oss bare beskjed, og **vi refunderer 100% av medlemskontingenten**.

På flybilletter gir vi ærlige engrospriser (du sparer IATA- og bagasjepåslag på 8%–14%), mens på hoteller og ferieleiligheter (med 20%–45% marginer) sparer en gjennomsnittlig tur 1 500 – 15 000 kr. Medlemskapet betaler seg dermed inn allerede på første ferietur.

Bestillingene dine er forhåndsbetalte engrosallokeringer med offisielle digitale innsjekkingskuponger direkte fra globale hotellgrossister. Du handler trygt med 14 dagers ubetinget angrefrist og vår 100% verdigaranti.`,
          action: 'open_refund_modal',
          actionLabel: 'Åpne Verdigaranti Refusjonsportal',
          followUps: [
            'Hvordan fungerer refusjonsprosessen?',
            'Hva er flyplasslounge-fordelen?',
            'Hva er EU261 flyforsinkelse-erstatning?',
          ],
        };
      }

      return {
        text: `We keep it simple and completely risk-free: if Atlas doesn't save you more than your annual membership fee (${p.formattedFounding} for Founding Members) on your very first completed hotel stay (min. 2–3 nights at wholesale bedbank rates), vacation resort condo, or cumulative annual travel, simply let us know and **we will refund 100% of your membership fee**.

Under The Atlas Value Guarantee Blueprint, Track A protects your first qualifying lodging stay, while Track B covers cumulative annual travel (including flights). You can submit a claim in 60 seconds directly in our automated refund portal.

Your bookings are pre-paid corporate allotments with official digital check-in vouchers issued directly by global bedbanks and hotel partners. You are protected by our 100% Value Guarantee and consumer peace of mind.`,
        action: 'open_refund_modal',
        actionLabel: 'Open Value Guarantee Portal',
        followUps: [
          'How does the refund process work?',
          'How does airport lounge access work?',
          'What is EU261 flight delay cash recovery?',
        ],
      };
    },
  },

  // =========================================================================
  // 6B. HOW AUTOMATED REFUNDS WORK (BILINGUAL)
  // =========================================================================
  {
    id: 'refund_claim_process',
    category: 'guarantee',
    exactPhrases: [
      'how do i get a refund',
      'how to claim guarantee',
      'how does the refund work',
      'refund process',
      'hvordan krever jeg refusjon',
      'hvordan fungerer refusjon',
      'krev refusjon',
      'be om penger tilbake',
    ],
    patterns: [
      /how (do I|to) (claim|get|request) (a )?refund/i,
      /refund (process|steps|portal)/i,
      /kreve refusjon/i,
      /be om refusjon/i,
      /refusjonsprosess/i,
    ],
    strongKeywords: ['refund', 'claim', 'portal', 'refusjon', 'krav', 'penger tilbake'],
    weight: 108,
    getAnswer: (currency: CurrencyCode) => {
      const isNorwegian = currency === 'NOK';
      const fee = isNorwegian ? '1 290 kr' : '€110';

      if (isNorwegian) {
        return {
          text: `Atlas har et helautomatisert refusjonssystem under **The Atlas Value Guarantee Blueprint**:

1. **Send inn krav på 60 sekunder**: Åpne refusjonsportalen, oppgi bookingreferanse og en enkel skjermdump/lenke til offentlig pris på Booking.com eller Expedia.
2. **Automatisk forhåndsvalidering**: Systemet beregner umiddelbart besparelsesdifferansen mot din årskontingent (${fee}).
3. **48-timers saksbehandlingsfrist**: Hard Rock Capital Ltd verifiserer kravet innen 2 virkedager, og 100% av kontingenten utbetales direkte til ditt betalingskort via Stripe.
4. **Du beholder fordelene**: Du beholder din utstedte Connex 3-dagers luksushotellkupong (verdi 5 400 kr) og alle opptjente Rewards Vault-poeng.`,
          action: 'open_refund_modal',
          actionLabel: 'Krev 100% Verdigaranti Nå',
          followUps: [
            'Hva er forskjellen på Track A og Track B?',
            'Hvorfor kan ikke en billig flybillett utløse full refusjon?',
            'Hva er flyplasslounge-fordelen?',
          ],
        };
      }

      return {
        text: `Atlas operates an automated claim system under **The Atlas Value Guarantee Blueprint**:

1. **Submit in 60 seconds**: Open our digital claim portal, provide your booking reference and a link or screenshot of the public retail rate on Booking.com or Expedia.
2. **Automated Pre-Validation**: The engine instantly calculates your savings delta against the annual fee (${fee}).
3. **48-Hour SLA**: Hard Rock Capital Ltd verifies the claim within 2 business days, and a 100% refund is wired directly to your payment card via Stripe.
4. **Keep Your Day-One Perks**: You retain your issued Connex 3-Day European Hotel Break voucher (€480 value) and any earned Rewards Vault points. Zero exit penalties apply.`,
        action: 'open_refund_modal',
        actionLabel: 'Submit Value Guarantee Claim Now',
        followUps: [
          'What is the difference between Track A and Track B?',
          'Why do flights accumulate under Track B instead of Track A?',
          'How does airport lounge access work?',
        ],
      };
    },
  },

  // =========================================================================
  // 6C. AIRPORT LOUNGES & TRANSIT COPILOT (BILINGUAL)
  // =========================================================================
  {
    id: 'airport_lounges',
    category: 'founding_perks',
    exactPhrases: [
      'airport lounges',
      'lounge access',
      'how do lounges work',
      'flyplasslounge',
      'loungetilgang',
      'transit copilot',
      'dragonpass',
      'priority pass',
    ],
    patterns: [
      /airport lounge/i,
      /lounge access/i,
      /flyplasslounge/i,
      /loungetilgang/i,
      /transit copilot/i,
    ],
    strongKeywords: ['lounge', 'lounges', 'transit', 'copilot', 'flyplasslounge'],
    weight: 98,
    getAnswer: (currency: CurrencyCode) => {
      const isNorwegian = currency === 'NOK';

      if (isNorwegian) {
        return {
          text: `Atlas-medlemmer har tilgang til over **1 300 VIP-flyplasslounger i 140 land** (det globale DragonPass- og Priority Pass-nettverket):

* **Engrospris per inngang**: Mens drop-in i døren koster 450–650 kr, eller krever dyre kredittkort med 5 000–8 000 kr i årsgebyr, kjøper Atlas-medlemmer digitale adgangspass til **rå nettopris (ca. 250–320 kr / €22–€28)**.
* **Alt inkludert**: Gratis varme buffeter, baristakaffe, premium vin og brennevin, rolige arbeidssoner, dusjer og lynraskt privat Wi-Fi.
* **Gjestepass til samme pris**: Du kan generere engrospass til familie eller reisefølge direkte i appen.
* **Transit Copilot**: Vår sanntids reiseassistent gir gateoppdateringer og leder deg direkte til nærmeste ledige lounge ved mellomlandinger.`,
          action: 'open_waitlist',
          actionLabel: 'Sikre Loungetilgang som Founding Member',
          followUps: [
            'Hva er EU261 flyforsinkelse-erstatning?',
            'Hva er Fast Track i sikkerhetskontrollen?',
            'Hva koster årsmedlemskapet ved lansering?',
          ],
        };
      }

      return {
        text: `Atlas members enjoy direct digital access to **1,300+ VIP airport lounges across 140 countries** (via the global DragonPass / Priority Pass network):

* **Net Wholesale Entry**: While walk-up day passes cost €45 to €65 (or require credit cards charging €500–€800/yr), Atlas members purchase digital lounge passes at **pure B2B net cost (€22–€28 / ca. 250–320 kr)**.
* **All-Inclusive Amenities**: Complimentary chef buffets, barista coffee, open bars with wines and spirits, quiet work suites, showers, and high-speed Wi-Fi.
* **Companion Guest Passes**: Issue digital lounge passes for family and traveling companions at the exact same net rate.
* **Real-Time Transit Copilot**: Live terminal guidance, boarding gate radars, and connection alerts pointing you to the nearest open lounge during layovers.`,
        action: 'open_waitlist',
        actionLabel: 'Lock In Lounge Access as Founding Member',
        followUps: [
          'What is EU261 flight disruption compensation?',
          'How does Priority Fast Track security work?',
          'What are the annual membership fees?',
        ],
      };
    },
  },

  // =========================================================================
  // 6D. AUTOMATED EU261 FLIGHT DISRUPTION CASH RECOVERY (BILINGUAL)
  // =========================================================================
  {
    id: 'eu261_cash_recovery',
    category: 'flights',
    exactPhrases: [
      'eu261',
      'flight delay compensation',
      'delayed flight cash',
      'flight cancellation refund',
      'flyforsinkelse',
      'erstatning forsinket fly',
      'kansellert fly',
      'passasjerrettigheter',
    ],
    patterns: [
      /eu261/i,
      /flight delay/i,
      /flight cancellation/i,
      /flyforsinkelse/i,
      /kansellering/i,
      /passasjerrettigheter/i,
    ],
    strongKeywords: ['eu261', 'delay', 'forsinkelse', 'compensation', 'erstatning', 'kansellering'],
    weight: 100,
    getAnswer: (currency: CurrencyCode) => {
      const isNorwegian = currency === 'NOK';

      if (isNorwegian) {
        return {
          text: `I henhold til europeisk forordning **EC 261/2004** har du lovfestet krav på skattefri kontanterstatning hvis flyet ditt forsinkes med 3+ timer eller kanselleres:

* **Lovfestede satser**: **250 € (ca. 2 900 kr)** for korte ruter, **400 € (ca. 4 700 kr)** for mellomdistanse (f.eks. Oslo–Spania), og **600 € (ca. 7 000 kr)** for langdistanse per passasjer.
* **Atlas 0% Gebyrløfte**: Kommersielle klagetjenester (som AirHelp) tar 35%–50% av passasjerens penger i provisjon. **Atlas beholder 0%** – 100% av erstatningen utbetales direkte til din bankkonto.
* **Automatisk radarmonitorering**: Vår flymotor overvåker flyvningene dine kontinuerlig. Ved forsinkelse forbereder systemet automatisk den juridiske kravsmeldingen direkte til flyselskapet med full dokumentasjon.`,
          action: 'open_waitlist',
          actionLabel: 'Sikre Automatisk EU261-Beskyttelse',
          followUps: [
            'Hva er Fast Track i sikkerhetskontrollen?',
            'Hva er flyplasslounge-fordelen?',
            'Hvordan fungerer 100% verdigarantien?',
          ],
        };
      }

      return {
        text: `Under European Regulation **EC 261/2004** and UK261, air passengers have statutory rights to non-taxable cash compensation for flight delays of 3+ hours, cancellations, or denied boarding:

* **Mandatory Statutory Rates**: **€250** (< 1,500 km), **€400** (1,500–3,500 km), and **€600** (> 3,500 km) in pure cash per passenger.
* **Atlas 0% Commission Promise**: While retail claims companies take 35% to 50% in fees, **Atlas retains 0%**. 100% of the compensation goes straight to your account.
* **Automated Radar Tracking**: Our system continuously tracks your booked flights. When a disruption occurs, the platform automatically logs the meteorological/radar evidence and files the official claim directly with the carrier.`,
        action: 'open_waitlist',
        actionLabel: 'Lock In Automated EU261 Protection',
        followUps: [
          'How does Priority Fast Track security work?',
          'How does airport lounge access work?',
          'What is the 100% Value Guarantee?',
        ],
      };
    },
  },

  // =========================================================================
  // 6E. PRIORITY FAST TRACK & 24/7 DEDICATED CONCIERGE (BILINGUAL)
  // =========================================================================
  {
    id: 'fast_track_concierge',
    category: 'founding_perks',
    exactPhrases: [
      'fast track',
      'priority security',
      'vip concierge',
      'travel desk',
      'hurtigkø',
      'sikkerhetskontroll',
      'personlig reiseassistent',
    ],
    patterns: [
      /fast track/i,
      /priority security/i,
      /hurtigkø/i,
      /travel desk/i,
      /concierge/i,
    ],
    strongKeywords: ['fast track', 'security', 'concierge', 'travel desk', 'hurtigkø'],
    weight: 96,
    getAnswer: (currency: CurrencyCode) => {
      const isNorwegian = currency === 'NOK';

      if (isNorwegian) {
        return {
          text: `Atlas kombinerer umaskert B2B-teknologi med førsteklasses personlig service:

* **Fast Track Sikkerhetskontroll**: Unngå 45 minutters kø i morgenrushet. Kjøp Fast Track-adgang på store europeiske flyplasser (inkl. Oslo Gardermoen, London, Stockholm, København) til rå engrospris (**ca. 70–110 kr / €6–€10 per passering**).
* **24/7 Dedikert Concierge**: Mens Booking.com og Expedia har erstattet kundeservice med frustrerende AI-roboter, har Atlas menneskelige reisespesialister tilgjengelig døgnet rundt på WhatsApp, telefon og app.
* **Skreddersøm & Krisehjelp**: Vi håndterer komplekse rutevalg, private pristester og ordner ombooking umiddelbart ved flykanselleringer, slik at du aldri må stå i timevis i flyplasskøer.`,
          action: 'open_waitlist',
          actionLabel: 'Bli Founding Member med 24/7 Concierge',
          followUps: [
            'Hva er flyplasslounge-fordelen?',
            'Hva er 100% verdigarantien?',
            'Hva koster årsmedlemskapet ved lansering?',
          ],
        };
      }

      return {
        text: `Atlas combines raw B2B technology with white-glove human hospitality:

* **Airport Fast Track Security**: Bypass 45-minute security screening queues. Purchase Fast Track passes across major European hubs (Oslo, London, Copenhagen, Stockholm, Barcelona) at raw wholesale cost (**€6–€10 per pass**).
* **24/7 Dedicated Concierge Desk**: Unlike retail OTAs that leave travelers stranded with unresponsive chatbots, Atlas provides human travel specialists available 24/7 via WhatsApp, phone, and app chat.
* **Custom Curation & Crisis Assistance**: We assist with complex multi-city flights, private rate audits, and immediate rebooking during weather or strike disruptions, so you never wait in airport service lines.`,
        action: 'open_waitlist',
        actionLabel: 'Join as Founding Member with 24/7 Concierge',
        followUps: [
          'How does airport lounge access work?',
          'What is the 100% Value Guarantee?',
          'What are the annual membership fees?',
        ],
      };
    },
  },

  // =========================================================================
  // 7. HOW HOTEL CHECK-IN WORKS (BILINGUAL)
  // =========================================================================
  {
    id: 'hotel_checkin',
    category: 'checkin_vouchers',
    exactPhrases: [
      'how do i check in',
      'how does hotel check in work',
      'what voucher do i show',
      'will the hotel know my price',
      'rate parity voucher',
      'hvordan sjekker jeg inn',
      'hvordan fungerer kupong',
      'innsjekk på hotell',
    ],
    patterns: [
      /how (do I|does) check[- ]in/i,
      /check[- ]in voucher/i,
      /front desk/i,
      /innsjekk/i,
      /kupong/i,
    ],
    strongKeywords: ['checkin', 'check-in', 'voucher', 'kupong', 'innsjekking', 'reception', 'front desk'],
    weight: 95,
    getAnswer: (currency: CurrencyCode) => {
      const isNorwegian = currency === 'NOK';

      if (isNorwegian) {
        return {
          text: `Innsjekking fungerer akkurat som på ethvert luksushotell.

Så snart du bestiller, blir reservasjonen din bekreftet direkte i hotellets datasystem via vårt grossistnettverk. Du mottar en offisiell digital innsjekkingskupong.

Ved ankomst viser du bare passet ditt og kupongen i resepsjonen. Hotellet ser en forhåndsbetalt bedriftsbestilling. Du leverer bare et kort for eventuelle ekstrautgifter som minibar eller roomservice, akkurat som vanlig.`,
          action: 'open_waitlist',
          actionLabel: 'Sikre tidlig tilgang',
          followUps: [
            'Hvorfor må jeg bli medlem og ikke teste først?',
            'Hvordan fungerer engrospriser på hotell?',
            'Hva koster medlemskap?',
          ],
        };
      }

      return {
        text: `Checking in is smooth and seamless.

The moment you book, your reservation is confirmed directly in the hotel's reservation system via our wholesale network. You receive an official digital check-in voucher.

When you arrive at the hotel reception, simply present your passport and your voucher. The front desk sees a pre-paid, confirmed corporate reservation. You just hand over your card for incidentals like room service or the minibar, exactly as you normally would.`,
        action: 'open_waitlist',
        actionLabel: 'Join Early Access Waitlist',
        followUps: [
          'Why do I have to become a member and can\'t test first?',
          'How does wholesale hotel pricing work?',
          'What are the membership fees?',
        ],
      };
    },
  },

  // =========================================================================
  // 8. DIGITAL NOMAD VISAS & EXTENDED COLIVING (BILINGUAL)
  // =========================================================================
  {
    id: 'nomad_coliving',
    category: 'nomads',
    exactPhrases: [
      'digital nomad visas',
      'how do nomad visas work',
      'coliving deals',
      'schengen tracker',
      'digital nomade',
      'langtidsleie hotell',
    ],
    patterns: [
      /digital nomad/i,
      /nomad visa/i,
      /coliving/i,
      /schengen 90/i,
      /long stay/i,
      /langtids/i,
    ],
    strongKeywords: ['nomad', 'coliving', 'visa', 'schengen', 'spain', 'portugal', 'dubai', 'thailand', 'remote work'],
    weight: 95,
    getAnswer: (currency: CurrencyCode) => {
      const isNorwegian = currency === 'NOK';

      if (isNorwegian) {
        return {
          text: `For deg som jobber eksternt, kombinerer vi engrospriser med smarte nomadeverktøy.

Du får oppdatert innsikt i populære nomadevisum (Spania, Portugal, Dubai 0% skatt og Thailand), en automatisk 90-dagers Schengen-teller så du aldri bryter EU-oppholdsgrensen, og månedlige engrosavtaler på 3- og 4-stjerners leilighetshoteller med garantert superraskt Wi-Fi.`,
          action: 'open_waitlist',
          actionLabel: 'Bli med i Nomad Hub',
          followUps: [
            'Hvorfor må jeg bli medlem og ikke teste først?',
            'Hvordan fungerer engrospriser på hotell?',
            'Hva koster medlemskap?',
          ],
        };
      }

      return {
        text: `For remote professionals, we pair wholesale rates with practical nomad tools.

We provide up-to-date guidance on popular nomad visas (like Spain, Portugal, Dubai's 0% tax visa, and Thailand), an automatic 90-day Schengen tracking tool so you never accidentally overstay EU limits, and monthly wholesale rates on 3- and 4-star aparthotels with verified high-speed Wi-Fi.`,
        action: 'open_waitlist',
        actionLabel: 'Join Nomad Hub Early Access',
        followUps: [
          'Why do I have to become a member and can\'t test first?',
          'How does wholesale hotel pricing work?',
          'What is the membership price?',
        ],
      };
    },
  },

  // =========================================================================
  // 9. B2B ENTERPRISE & CORPORATE (BILINGUAL)
  // =========================================================================
  {
    id: 'b2b_enterprise',
    category: 'b2b',
    exactPhrases: [
      'b2b corporate rates',
      'corporate travel accounts',
      'can my company join',
      'institutional sales',
      'bedriftsavtale',
      'firmareise',
    ],
    patterns: [
      /b2b/i,
      /corporate/i,
      /company/i,
      /enterprise/i,
      /bedrift/i,
      /institutional/i,
    ],
    strongKeywords: ['corporate', 'b2b', 'enterprise', 'bedrift', 'firmareise', 'syndicate'],
    weight: 90,
    getAnswer: (currency: CurrencyCode) => {
      const isNorwegian = currency === 'NOK';

      if (isNorwegian) {
        return {
          text: `Ja! Vi tilbyr bedriftsavtaler som lar bedrifter gi ledelse og ansatte direkte tilgang til engrospriser uten dyre programvarelisenser.

Dette gjelder både forretningsreiser og som et attraktivt ansattgode, med samlet fakturering og spesifiserte MVA-kvitteringer.`,
          action: 'open_waitlist',
          actionLabel: 'Forespør bedriftsavtale',
          followUps: [
            'Hvorfor må jeg bli medlem og ikke teste først?',
            'Hva koster medlemskap?',
            'Hvordan fungerer engrospriser på hotell?',
          ],
        };
      }

      return {
        text: `Yes! We provide corporate syndicates that let companies give leadership and team members wholesale travel rates without paying \$10k/yr enterprise software retainer fees.

It serves both business travel and as a high-perceived-value employee perk, complete with centralized billing and verified VAT receipts.`,
        action: 'open_waitlist',
        actionLabel: 'Request Corporate Account Allocation',
        followUps: [
          'Why do I have to become a member and can\'t test first?',
          'What is the membership pricing?',
          'How does wholesale hotel pricing work?',
        ],
      };
    },
  },

  // =========================================================================
  // 10. FLIGHT PRICING (BILINGUAL)
  // =========================================================================
  {
    id: 'flight_pricing',
    category: 'flights',
    exactPhrases: [
      'how do flight savings work',
      'how do flights work',
      'airline tickets',
      'duffel ndc flights',
      'flyreiser engros',
      'hvordan fungerer flybilletter',
    ],
    patterns: [
      /flight (pricing|rates?|savings)/i,
      /how (do|does) flight/i,
      /duffel/i,
      /ndc/i,
      /flybillett/i,
      /airline tickets?/i,
    ],
    strongKeywords: ['flight', 'flights', 'duffel', 'ndc', 'airline', 'airlines', 'flybilletter', 'flyreise'],
    weight: 100,
    getAnswer: (currency: CurrencyCode) => {
      const isNorwegian = currency === 'NOK';

      if (isNorwegian) {
        return {
          text: `Åpne flysøkemotorer legger ofte på formidlingsgebyrer og skjulte korttillegg på hver eneste billett.

Atlas kobler seg direkte til flyselskapene (bl.a. SAS, Norwegian, British Airways, Lufthansa og Emirates) via moderne Duffel NDC-linjer med **0% kommersielt påslag**. De største besparelsene (ofte 10% til 22%) finner du på Business og Premium Economy på langdistanseruter.`,
          action: 'open_calculator',
          actionLabel: '📊 Beregn årlig flybesparelse',
          followUps: [
            'Hvorfor må jeg bli medlem og ikke teste først?',
            'Hvordan fungerer engrospriser på hotell?',
            'Hva koster medlemskap?',
          ],
        };
      }

      return {
        text: `Traditional booking portals often add distribution surcharges and credit card processing padding to every airfare.

Atlas connects directly to major commercial airlines (including British Airways, SAS, Lufthansa, and Emirates) through modern Duffel NDC channels at **0% markup**. The biggest savings (usually 10% to 22%) are found on Business and Premium Economy long-haul flights.`,
        action: 'open_calculator',
        actionLabel: '📊 Calculate Annual Flight Savings',
        followUps: [
          'Why do I have to become a member and can\'t test first?',
          'How does wholesale hotel pricing work?',
          'What are the membership fees?',
        ],
      };
    },
  },

  // =========================================================================
  // 11. ATLAS SIGNATURE RESORTS (7-NIGHT CONDOS FOR 3 490 NOK)
  // =========================================================================
  {
    id: 'resorts_vacation_certificates',
    category: 'signature_resorts',
    exactPhrases: [
      'ferieleilighet',
      'feriesuiter',
      '7 netter',
      'resort',
      'signature resorts',
      'ukesopphold',
      'rci',
      'marbella leilighet',
      'tenerife leilighet',
      'condo',
      'vacation certificates',
    ],
    patterns: [
      /ferieleilighet/i,
      /feriesuit/i,
      /7 nett/i,
      /ukesopphold/i,
      /signature resort/i,
      /3 490|3490/i,
      /rci/i,
      /condo/i,
    ],
    strongKeywords: ['resort', 'resorts', 'ferieleilighet', 'leilighet', 'condo', 'ukesopphold', 'rci', 'tenerife', 'marbella'],
    weight: 120,
    getAnswer: (currency: CurrencyCode) => {
      const p = MEMBERSHIP_PRICING[currency];
      const isNorwegian = currency === 'NOK';

      if (isNorwegian) {
        return {
          text: `🏖️ **Atlas Signature Resorts — 7 Netters Ferieleiligheter:**\n\nGjennom lukkede avtaler om overskuddskapasitet (RCI/Panorama-nettverket) får medlemmer tilgang til romslige ferieleiligheter til restplasspriser:\n\n• **Restplasspriser**: Fra kun **3 490 NOK (€299)** for **7 sammenhengende netter** ved clearance (ingen per-person eller per-døgn gebyrer!).\n• **Varierte enheter**: Fra studioleiligheter til 1- og 2-roms suiter med kjøkken og stue – plass til **2 til 6 personer** (avhengig av leilighetsstørrelse og sesong).\n• **Førsteklasses destinasjoner**: Marbella (Spania), Tenerife (Kanariøyene), Algarve (Portugal), Kreta (Hellas), Toscana (Italia) og Mallorca.\n• **100% Trygghet**: 14 dagers ubetinget angrefrist med full refusjon om du ikke finner ønsket uke.\n• **Ren frihet**: Du bestiller oppholdet separat og kombinerer med egne flybilletter til nettopris (0 kr påslag).`,
          action: 'open_waitlist',
          actionLabel: `Reserver Founding Member-plass (${p.formattedFounding})`,
          followUps: [
            'Hva er Gourmet & Spa med 0 kr i rompris?',
            'Kan jeg teste gratis uten forpliktelser?',
            'Hvordan fungerer engrospriser på hotell?',
          ],
        };
      }

      return {
        text: `🏖️ **Atlas Signature Resorts — 7-Night Condominium Stays:**\n\nThrough private liquidation agreements with the RCI/Panorama network, Atlas members access spacious vacation condominiums at clearance rates:\n\n• **Clearance Pricing**: From just **€299** (3 490 kr) for **7 consecutive nights** on last-minute clearance weeks (zero per-person surcharges!).\n• **Diverse Accommodations**: Ranging from studio suites to 1- and 2-bedroom condominium apartments with full kitchens and living areas—sleeping **2 to 6 guests** (pricing and availability vary by unit size and season).\n• **Top Tier Destinations**: Marbella (Costa del Sol), Tenerife (Canary Islands), Algarve (Portugal), Crete (Greece), Tuscany (Italy), and Mallorca.\n• **100% Peace of Mind**: 14-day money-back guarantee if you do not find a matching week.\n• **Pure Freedom**: Self-directed accommodation—book flights separately at net wholesale rates with zero markup.`,
          action: 'open_waitlist',
          actionLabel: `Reserve Founding Spot (${p.formattedFounding})`,
          followUps: [
            'What is Gourmet & Spa Escapes (€0 room rate)?',
            'Can I test for free with zero commitment?',
            'How does wholesale hotel pricing work?',
          ],
      };
    },
  },

  // =========================================================================
  // 12. ATLAS GOURMET & SPA ESCAPES (0 KR ROOM / COMPLIMENTARY STAYS)
  // =========================================================================
  {
    id: 'connex_spa_gourmet',
    category: 'gourmet_spa',
    exactPhrases: [
      'gourmet og spa',
      'spa breaks',
      '0 kr rom',
      'gratis rom',
      'connex',
      'holiday plus',
      'halvpensjon',
      'velvære',
      'alpeferie',
      'dolomittene',
      'free room',
      'spa escapes',
    ],
    patterns: [
      /gourmet/i,
      /spa/i,
      /0 kr|0kr/i,
      /connex/i,
      /holiday plus/i,
      /halvpensjon/i,
      /half-board/i,
      /velvære/i,
    ],
    strongKeywords: ['spa', 'gourmet', 'connex', 'halvpensjon', 'velvære', 'dolomittene', 'holiday plus'],
    weight: 120,
    getAnswer: (currency: CurrencyCode) => {
      const p = MEMBERSHIP_PRICING[currency];
      const isNorwegian = currency === 'NOK';

      if (isNorwegian) {
        return {
          text: `🍷 **Atlas Gourmet & Spa Escapes — 0 kr i Rompris:**\n\nGjennom vårt partnerskap med Connex (Holiday Plus) fyller over **1 500 utvalgte boutique- og velværerhoteller i Europa** ledig kapasitet med en genial modell:\n\n• **Rompris**: **0 NOK** (verditilgodelappen dekker 100% av romprisen for 2 personer i 2–4 netter).\n• **100% Transparent Økonomi**: Du betaler kun hotellets offisielle, faste halvpensjonspris (**€35–€60 per person/dag**) for frokostbuffet og gourmet fleretters middag direkte ved utsjekk på hotellet.\n• **Dokumentert besparelse**: Sparer typisk **over 6 700 NOK (ca. €550)** per miniferie sammenlignet med Booking.com og Expedia.\n• **Håndplukkede destinasjoner**: Dolomittene (Sør-Tyrol), Chianti (Toscana), Schwarzwald (Tyskland), Salzburg (Østerrike), Gardasjøen og Provence.\n• **Umiddelbar kupongutstedelse**: Aktiver din unike verdikupong (HP-xxxx-ATLAS) direkte på medlemsportalen.`,
          action: 'open_waitlist',
          actionLabel: 'Reserver Founding Member-plass (1 290 kr)',
          followUps: [
            'Hva er 7-netters feriesuiter til 3 490 kr?',
            'Kan jeg teste gratis uten forpliktelser?',
            'Hvordan fungerer engrospriser på hotell?',
          ],
        };
      }

      return {
        text: `🍷 **Atlas Gourmet & Spa Escapes — €0 Room Rates:**\n\nThrough our strategic partnership with Connex (Holiday Plus), **1,500+ curated boutique & wellness retreats across Europe** fill surplus capacity:\n\n• **Room Rate**: **€0** (the voucher covers 100% of the room rate for 2 guests for 2–4 nights).\n• **100% Transparent Economics**: You pay only the hotel's published fixed half-board rate (**€35–€60 per guest/day**) for breakfast buffet and multi-course dinner directly upon hotel checkout.\n• **Verified Savings**: Save **€550+ (6,700+ NOK)** per getaway compared to Booking.com.\n• **Curated Destinations**: Dolomites (South Tyrol), Tuscany (Chianti), Black Forest (Germany), Salzburg (Austria), Lake Garda, and Provence.\n• **Instant Digital Voucher**: Unique voucher codes (HP-xxxx-ATLAS) generated instantly on the portal.`,
        action: 'open_waitlist',
        actionLabel: `Reserve Founding Spot (${p.formattedFounding})`,
        followUps: [
          'What are 7-night condo stays for €299 (3 490 kr)?',
          'Can I test for free with zero commitment?',
          'How does wholesale hotel pricing work?',
        ],
      };
    },
  },
];

// Conversational Welcome message generator
export function getWelcomeMessageData(currency: CurrencyCode) {
  const p = MEMBERSHIP_PRICING[currency] || MEMBERSHIP_PRICING.EUR;
  const isNorwegian = currency === 'NOK';

  if (isNorwegian) {
    return {
      text: `Hei! Jeg er **Aura**, din personlige AI-concierge for ATLAS Travel Club.

Den offisielle lanseringen åpner **onsdag 20. januar 2027 kl. 10:00**! 

Du kan **reservere din Founding Member-plass i dag – helt gratis, intet kredittkort nødvendig**. De første 100 medlemmene mottar et **gratis 3-dagers luksushotellopphold for to (verdi 5 400 kr / ca. €480)** og sjansen til å vinne all mat dekket!

Jeg kan også forklare lukkede engrospriser på hotell, våre **7-netters ferieleiligheter fra 3 490 kr (€299)**, eller **0 kr i rompris (Connex)**. Hva vil du vite mer om?`,
      action: 'open_waitlist' as const,
      actionLabel: 'Reserver plass gratis (Uten kort)',
      followUps: [
        'Hva inkluderer det gratis hotelloppholdet?',
        'Hva er ferieleiligheter fra 3 490 kr?',
        'Hva skjer når dørene åpner 20. januar?',
        'Hvordan fungerer engrospriser på hotell?',
        'Hva er 100% verdigarantien?',
      ],
    };
  }

  return {
    text: `Hi! I'm **Aura**, your VIP AI concierge for ATLAS Travel Club.

Our official launch opens on **Wednesday, January 20, 2027 at 10:00 AM CET**!

You can **reserve your Founding Member spot today for free, no credit card necessary**. The first 100 Founding Members receive a **complimentary 3-day European hotel stay for two (worth €480)** and entry into the draw where 3 of 100 win all meals covered!

I can also explain how wholesale bedbank pricing works, our **7-night vacation condos from €299 (fra 3 490 kr)**, or **€0 room rates (Connex)**. What can I help you with today?`,
    action: 'open_waitlist' as const,
    actionLabel: 'Reserve Free Spot (No Card Needed)',
    followUps: [
      'What is included in the free hotel stay?',
      'What are 7-night condo stays from €299 (3 490 kr)?',
      'What happens on Launch Day January 20?',
      'How does wholesale hotel pricing work?',
      'What is the 100% money-back guarantee?',
    ],
  };
}

// Conversational Fallback response
export function getFallbackAnswer(currency: CurrencyCode): ConciergeAnswer {
  const p = MEMBERSHIP_PRICING[currency] || MEMBERSHIP_PRICING.EUR;
  const isNorwegian = currency === 'NOK';

  if (isNorwegian) {
    return {
      text: `ATLAS Travel Club er en lukket medlemsklubb (etter Costco-modellen) som gir deg direkte tilgang til engrospriser på reiser med 0% kommersielt påslag – vanligvis 20% til 45% lavere enn Booking.com eller Expedia.

Lanseringen skjer **onsdag 20. januar 2027 kl. 10:00**. **Reserver din Founding Member-plass i dag – helt gratis, intet kredittkort nødvendig.** Samtlige 100 første medlemmer mottar et **100% gratis 3-dagers luksushotellopphold for to i Europa (verdi 5 400 kr)**.

Hva er du mest nysgjerrig på? Jeg forklarer gjerne 0 kr i rompris (Connex), 7-netters leiligheter (RVC), 100% provisjonsrefusjon eller 100% verdigarantien.`,
      action: 'open_waitlist',
      actionLabel: 'Reserver plass gratis (Uten kort)',
      followUps: [
        'Hva inkluderer det gratis hotelloppholdet?',
        'Hvordan fungerer engrospriser på hotell?',
        'Hva skjer når dørene åpner 20. januar?',
        'Hva er 100% verdigarantien?',
      ],
    };
  }

  return {
    text: `ATLAS Travel Club is a private membership club (built on the Costco model) giving members direct access to wholesale travel rates with 0% retail markup—typically 20% to 45% lower than Booking.com or Expedia.

Our official launch opens **Wednesday, January 20, 2027 at 10:00 AM CET**. **Reserve your Founding Member spot today for free, no credit card necessary.** The first 100 Founding Members receive a **complimentary 3-day European hotel break for two (worth €480)**.

What would you like to know more about? I can explain €0 room rates (Connex), 7-night condo escapes (RVC), 100% commission rebates, or our 100% money-back guarantee.`,
      action: 'open_waitlist',
      actionLabel: 'Reserve Free Spot (No Card Needed)',
      followUps: [
        'What is included in the free hotel stay?',
        'How does wholesale hotel pricing work?',
        'What happens on Launch Day January 20?',
        'What is the 100% money-back guarantee?',
      ],
    };
  }

// Sophisticated Semantic & Multi-Factor Scoring Resolver
export function matchConciergeQuery(query: string, currency: CurrencyCode): ConciergeAnswer {
  const normalized = query.toLowerCase().trim().replace(/[?.,!]/g, '');

  let bestEntry: QAEntry | null = null;
  let highestScore = 0;

  for (const entry of PRELAUNCH_QA_DATABASE) {
    let currentScore = 0;

    // 1. Exact phrase match: Highest priority (Score 200)
    if (entry.exactPhrases.some((phrase) => normalized.includes(phrase))) {
      currentScore += 200;
    }

    // 2. Regex pattern match (Score 100)
    for (const pattern of entry.patterns) {
      if (pattern.test(normalized)) {
        currentScore += 100;
        break;
      }
    }

    // 3. Strong keywords match (Score 25 per keyword)
    for (const kw of entry.strongKeywords) {
      if (normalized.includes(kw)) {
        currentScore += 25;
      }
    }

    // 4. Negative keywords penalty (Deducts 80 points if present)
    if (entry.negativeKeywords) {
      for (const neg of entry.negativeKeywords) {
        if (normalized.includes(neg)) {
          currentScore -= 80;
        }
      }
    }

    // Apply baseline weight
    currentScore += entry.weight;

    if (currentScore > highestScore && currentScore >= 120) {
      highestScore = currentScore;
      bestEntry = entry;
    }
  }

  if (bestEntry) {
    return bestEntry.getAnswer(currency);
  }

  return getFallbackAnswer(currency);
}
