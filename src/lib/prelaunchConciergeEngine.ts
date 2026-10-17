// Conversational Prelaunch AI Concierge Knowledge Base & Engine for Atlas Travel Club
// Base currency: USD. Standard membership: 1 290 NOK/yr ($120/yr). Founding Members get a 100% Free 3-Day European Hotel Break for 2 (worth 5 400 kr) + 3 of 100 win all meals covered!
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
  action?: 'open_waitlist' | 'open_podcast' | 'open_calculator' | 'open_audio_deepdive';
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
      const p = MEMBERSHIP_PRICING[currency] || MEMBERSHIP_PRICING.USD;
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

When you secure one of our first 100 Founding Memberships (${p.formattedFounding}), **ATLAS gifts you a complimentary 3-day European hotel stay for two (worth $520)**. The room is 100% sponsored (you only pay the hotel's local gourmet half-board at checkout).

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
      const p = MEMBERSHIP_PRICING[currency] || MEMBERSHIP_PRICING.USD;
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
            'Hva koster medlemskap og 50% rabatt?',
            'Hvorfor er cruisepriser like overalt?',
          ],
        };
      }

      return {
        text: `Think of public travel sites like Booking.com and Expedia as retail storefronts. They add a 15% to 30% commission on every room and spend billions on advertising, passing those markups on to you.

Hotels hate having empty rooms, so they quietly sell room blocks to B2B wholesale suppliers (bedbanks like WebBeds and Hotelbeds) at deep 20% to 40% discounts. But hotel contracts legally forbid anyone from advertising those wholesale rates publicly—that is called **Rate Parity**.

That is where Atlas comes in. Because we are a private, password-protected membership club, Rate Parity rules don't apply. We don't take a commission on the room—we pass 100% of the wholesale net rate directly to you at **0% commercial markup**.

On a typical 4-night stay at a 4- or 5-star hotel, that usually puts **$300 to $800 straight back in your pocket**—far exceeding our **${p.formattedFounding}** founding membership fee on your very first trip.`,
        action: 'open_podcast',
        actionLabel: '🎧 Listen to 23-Min Audio Deep Dive',
        followUps: [
          'Why do I have to become a member and can\'t test first?',
          'What is the membership price and founding discount?',
          'Why are cruise prices identical publicly?',
        ],
      };
    },
  },

  // =========================================================================
  // 3. MEMBERSHIP PRICING & 50% FOUNDING DISCOUNT (BILINGUAL)
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
      'founding discount',
      'what is 990 kr',
      'hva koster medlemskap',
      'medlemskontingent',
      'hva koster det å bli medlem',
      'hva er prisen',
      'hva koster det',
      'årspris',
      '50% rabatt',
    ],
    patterns: [
      /how much (is|does|costs?) (the )?(membership|club|to join|annual)/i,
      /membership (price|cost|fee|dues)/i,
      /(annual|monthly) (fee|dues|cost|price)/i,
      /hva koster (et )?(medlemskap|det å være medlem|det)/i,
      /medlems(pris|kontingent|avgift)/i,
      /founding member (discount|rate|price)/i,
      /50% (discount|off|rabatt)/i,
      /(1290|1 290|990) (kr|nok)/i,
      /(645|495) (kr|nok)/i,
    ],
    strongKeywords: ['membership', 'dues', 'kontingent', 'medlemskap', 'medlemspris', 'årsavgift', 'subscription', 'join fee'],
    negativeKeywords: ['test first', 'teste først', 'why become a member', 'hvorfor bli medlem'],
    weight: 120,
    getAnswer: (currency: CurrencyCode) => {
      const p = MEMBERSHIP_PRICING[currency] || MEMBERSHIP_PRICING.USD;
      const isNorwegian = currency === 'NOK';

      if (isNorwegian) {
        return {
          text: `Vårt standardmedlemskap er **${p.formattedRegular}** (kun ${p.monthlyEquivalent}).
Til gjengjeld har Atlas **0 kr i bookinggebyr og 0% kommersielt påslag på alt** av hotell, fly, leiebiler og VIP-lounger.

Nå under forhåndslanseringen får Founding Members **50% livstidsrabatt**, som låser prisen din til kun **${p.formattedFounding}** permanent så lenge medlemskapet holdes aktivt.

På toppen av dette har vi **Atlas Travel Kickback**: På vertikaler som cruise og leiebil deler vi 50% av partnerprovisjonen rett tilbake til deg. Disse poengene trekkes automatisk fra din neste årskontingent i Stripe – slik at medlemskapet kan fornye seg helt gratis!

Hver tidlige registrering er også automatisk med i trekningen av **5 gratis livstidsmedlemskap**.`,
          action: 'open_waitlist',
          actionLabel: `Sikre 50% livstidsrabatt (${p.formattedFounding})`,
          followUps: [
            'Hvordan fungerer Atlas Travel Kickback på cruise og leiebil?',
            'Hvordan fungerer engrospriser på hotell?',
            'Hva er 100% verdigarantien?',
          ],
        };
      }

      return {
        text: `Our standard membership is **${p.formattedRegular}** (just ${p.monthlyEquivalent} billed annually).
In return, Atlas gives you **0 kr booking fees and 0% markup** on hotels, NDC flights, car rentals, and VIP airport services.

Right now during prelaunch, Founding Members receive a **50% lifetime discount**, locking in your annual fee at **${p.formattedFounding}** permanently for as long as your membership stays active.

Even better, with **Atlas Travel Kickback**: on categories like cruises and car rentals, we share 50% of the supplier agent commission directly back to your Rewards Vault. This credit automatically offsets your next annual renewal in Stripe!

Every early applicant is also entered into our launch draw to win one of **5 free lifetime memberships**.`,
          action: 'open_waitlist',
          actionLabel: `Claim 50% Off Lifetime Spot (${p.formattedFounding})`,
          followUps: [
            'How does Atlas Travel Kickback work on cruises and car rentals?',
            'How does wholesale hotel pricing work?',
            'What is the 100% money-back guarantee?',
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

I stedet betaler de en agentprovisjon (typisk 8% til 14%) i etterkant av reisen.

**Hva gjør Atlas annerledes?**
Vanlige reisebyråer stikker hele denne provisjonen i egen lomme. Siden Atlas er en ren medlemsklubb med 0 kr i påslag, **deler vi denne provisjonen rett tilbake til deg som Atlas Travel Kickback!**

* Din andel (50% av provisjonen) overføres til din Rewards Vault 30–45 dager etter reisen.
* Beløpet motregnes automatisk mot din neste årskontingent (1 290 kr) i Stripe – slik at medlemskapet ofte fornyer seg helt gratis.
* På toppen av dette sikrer vi deg eksklusive oppgraderinger og gratis ombordkreditt ($200–$600 per lugar).`,
          action: 'open_waitlist',
          actionLabel: 'Bli med på ventelisten for cruise',
          followUps: [
            'Hva koster medlemskap og 50% rabatt?',
            'Hvordan fungerer engrospriser på hotell?',
            'Hva er 100% verdigarantien?',
          ],
        };
      }

      return {
        text: `It's frustrating when every travel website shows the exact same price for a cruise or rental car, but there's a strict industry reason for it: luxury cruise lines and rental firms enforce Minimum Advertised Price (MAP) rules. No agency is permitted to undercut public retail prices in the shopping cart.

Instead, suppliers pay an agency commission (typically 8% to 14%) after the journey is completed.

**What does Atlas do differently?**
Traditional agencies pocket this entire commission. Because Atlas is a pure membership club with 0 kr markups, **we share this supplier commission directly back to you as Atlas Travel Kickback!**

* Your 50% share lands directly in your Rewards Vault 30–45 days after your trip.
* The balance automatically offsets your next annual renewal in Stripe (1 290 NOK) – often making your membership completely free!
* On top of that, we secure exclusive stateroom upgrades and onboard spending credits ($200–$600 per cabin).`,
        action: 'open_waitlist',
        actionLabel: 'Join Waitlist for Cruise Allocations',
        followUps: [
          'What is the membership fee and founding discount?',
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
      'reisegarantifondet',
      'rgf protection',
      'hva er garantien',
      'penger tilbake garanti',
      'er pengene mine trygge',
      'verdigaranti',
    ],
    patterns: [
      /guarantee/i,
      /money back/i,
      /refund/i,
      /reisegarantifondet/i,
      /trygghet/i,
      /sikkerhet/i,
      /verdigaranti/i,
      /is it safe/i,
    ],
    strongKeywords: ['guarantee', 'refund', 'rgf', 'reisegarantifondet', 'protection', 'safe', 'garanti', 'refusjon', 'verdigaranti'],
    weight: 105,
    getAnswer: (currency: CurrencyCode) => {
      const p = MEMBERSHIP_PRICING[currency] || MEMBERSHIP_PRICING.USD;
      const isNorwegian = currency === 'NOK';

      if (isNorwegian) {
        return {
          text: `Vi holder det helt risikofritt: Hvis Atlas ikke sparer deg for mer enn årskontingenten din (${p.formattedFounding} for Founding Members) på din aller første reise, gir du oss bare beskjed, og **vi refunderer 100% av medlemskontingenten**.

Bestillingene dine er forhåndsbetalte engrosallokeringer med offisielle innsjekkingskuponger, og vi opererer i full overensstemmelse med det norske **Reisegarantifondet (RGF)** og EUs pakkereisedirektiv.`,
          action: 'open_waitlist',
          actionLabel: 'Bli med på risikofri venteliste',
          followUps: [
            'Hvorfor må jeg bli medlem og ikke teste først?',
            'Hva koster medlemskap og 50% rabatt?',
            'Hvordan fungerer engrospriser på hotell?',
          ],
        };
      }

      return {
        text: `We keep it simple and completely risk-free: if Atlas doesn't save you more than your annual membership fee (${p.formattedFounding} for Founding Members) on your very first booking, simply let us know and **we will refund 100% of your membership fee**.

Your bookings are pre-paid corporate allotments with official check-in vouchers, and our platform is instituted in full alignment with the Norwegian Travel Guarantee Fund (Reisegarantifondet - RGF) and European consumer directives.`,
        action: 'open_waitlist',
        actionLabel: 'Join Risk-Free Early Access',
        followUps: [
          'Why do I have to become a member and can\'t test first?',
          'What is the membership fee and founding discount?',
          'How does wholesale hotel pricing work?',
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
      const isNorwegian = currency === 'NOK';

      if (isNorwegian) {
        return {
          text: `🏖️ **Atlas Signature Resorts — 7 Netters Ferieleiligheter:**\n\nGjennom lukkede avtaler om overskuddskapasitet (RCI/Panorama-nettverket) får medlemmer tilgang til romslige ferieleiligheter til fast lavpris:\n\n• **Fast totalpris**: Kun **3 490 NOK** for **7 sammenhengende netter** (ingen per-person eller per-døgn gebyrer!).\n• **Plass til familien**: 1–2 soveromssuiter med fullt kjøkken og stue – plass til **opptil 4–6 personer**.\n• **Førsteklasses destinasjoner**: Marbella (Spania), Tenerife (Kanariøyene), Algarve (Portugal), Kreta (Hellas), Toscana (Italia) og Mallorca.\n• **100% Trygghet**: 14 dagers ubetinget angrefrist med full refusjon om du ikke finner ønsket uke.\n• **Ingen pakkereiselås**: Du bestiller kun oppholdet, og finner egne flybilletter til nettopris.`,
          action: 'open_waitlist',
          actionLabel: 'Sikre Founding Member-plass (50% rabatt)',
          followUps: [
            'Hva er Gourmet & Spa med 0 kr i rompris?',
            'Kan jeg teste gratis uten forpliktelser?',
            'Hvordan fungerer engrospriser på hotell?',
          ],
        };
      }

      return {
        text: `🏖️ **Atlas Signature Resorts — 7-Night Whole Condo Stays:**\n\nThrough private liquidation agreements with the RCI/Panorama network, Atlas members access spacious vacation condos at a flat clearance rate:\n\n• **Flat Weekly Rate**: Just **3,490 NOK** (~$320 USD) for **7 consecutive nights** (zero per-person fees, zero daily rates!).\n• **Sleeps Up to 4–6**: 1–2 bedroom suites with full kitchens, dining and living areas.\n• **Top Tier Destinations**: Marbella (Costa del Sol), Tenerife (Canary Islands), Algarve (Portugal), Crete (Greece), Tuscany (Italy), and Mallorca.\n• **100% Peace of Mind**: 14-day money-back guarantee if you don't find a matching week.\n• **Pure Freedom**: Self-directed accommodation—book flights separately at net wholesale rates with zero markup.`,
        action: 'open_waitlist',
        actionLabel: 'Lock In 50% Lifetime Spot',
        followUps: [
          'What is Gourmet & Spa Escapes ($0 room rate)?',
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
      const isNorwegian = currency === 'NOK';

      if (isNorwegian) {
        return {
          text: `🍷 **Atlas Gourmet & Spa Escapes — 0 kr i Rompris:**\n\nGjennom vårt partnerskap med Connex (Holiday Plus) fyller utvalgte 3–4* superior velværerhoteller i Europa ledig kapasitet med en genial modell:\n\n• **Rompris**: **0 NOK** (gratis opphold for 2 personer i 2–4 netter).\n• **100% Transparent Økonomi**: Du betaler kun hotellets offisielle, faste halvpensjonspris (**€35–€60 per person/dag**) for frokost og gourmet fleretters middag direkte ved utsjekk på hotellet.\n• **Dokumentert besparelse**: Sparer typisk **over 6 700 NOK** per miniferie sammenlignet med Booking.com og Expedia.\n• **Håndplukkede destinasjoner**: Dolomittene (Sør-Tyrol), Chianti (Toscana), Schwarzwald (Tyskland), Salzburg (Østerrike), Gardasjøen og Provence.\n• **Umiddelbar kupongutstedelse**: Aktiver din unike verdikupong (HP-xxxx-ATLAS) direkte på medlemsportalen.`,
          action: 'open_waitlist',
          actionLabel: 'Sikre Founding Member-plass (50% rabatt)',
          followUps: [
            'Hva er 7-netters feriesuiter til 3 490 kr?',
            'Kan jeg teste gratis uten forpliktelser?',
            'Hvordan fungerer engrospriser på hotell?',
          ],
        };
      }

      return {
        text: `🍷 **Atlas Gourmet & Spa Escapes — $0 Room Rates:**\n\nThrough our strategic partnership with Connex (Holiday Plus), curated 3-4* superior wellness & boutique retreats across Europe fill surplus capacity:\n\n• **Room Rate**: **$0 NOK** (complimentary 2-4 night lodging for 2 guests).\n• **100% Transparent Economics**: You pay only the hotel's published fixed half-board rate (**€35–€60 per guest/day**) for breakfast and multi-course dinner directly at hotel checkout.\n• **Verified Savings**: Save **$650+ (6,700+ NOK)** per getaway compared to Booking.com.\n• **Curated Destinations**: Dolomites (South Tyrol), Tuscany (Chianti), Black Forest (Germany), Salzburg (Austria), Lake Garda, and Provence.\n• **Instant Digital Voucher**: Unique voucher codes (HP-xxxx-ATLAS) generated instantly on the portal.`,
        action: 'open_waitlist',
        actionLabel: 'Lock In 50% Lifetime Spot',
        followUps: [
          'What are 7-night condo stays for 3,490 NOK?',
          'Can I test for free with zero commitment?',
          'How does wholesale hotel pricing work?',
        ],
      };
    },
  },
];

// Conversational Welcome message generator
export function getWelcomeMessageData(currency: CurrencyCode) {
  const p = MEMBERSHIP_PRICING[currency] || MEMBERSHIP_PRICING.USD;
  const isNorwegian = currency === 'NOK';

  if (isNorwegian) {
    return {
      text: `Hei! Jeg er **Aura**, din personlige AI-concierge for ATLAS Travel Club.

Den offisielle lanseringen åpner **mandag 4. januar 2027 kl. 10:00**! 

Jeg kan forklare hvordan våre lukkede engrospriser på hotell fungerer, våre **7-netters ferieleiligheter til 3 490 kr**, **Gourmet & Spa med 0 kr i rompris**, eller hvordan du sikrer deg 1 av våre **100 første Founding-medlemskap (${p.formattedFounding})** som inkluderer et **gratis 3-dagers luksushotellopphold for to** (og sjansen til å vinne all mat dekket!).

Hva kan jeg hjelpe deg med i dag?`,
      action: 'open_waitlist' as const,
      actionLabel: `Sikre Founding-plass (${p.formattedFounding})`,
      followUps: [
        'Hva inkluderer det gratis hotelloppholdet?',
        'Hva er ferieleiligheter til 3 490 kr?',
        'Hva skjer når dørene åpner 4. januar?',
        'Hvordan fungerer engrospriser på hotell?',
        'Hva er 100% verdigarantien?',
      ],
    };
  }

  return {
    text: `Hi! I'm **Aura**, your VIP AI concierge for ATLAS Travel Club.

Our official launch opens on **Monday, January 4, 2027 at 10:00 AM CET**!

I can explain how our private wholesale hotel rates work, our **7-night vacation condos for 3,490 NOK ($320 USD)**, **Gourmet & Spa Escapes with $0 room rates**, or how to secure 1 of our **first 100 Founding Memberships (${p.formattedFounding})** which includes a **complimentary 3-day European hotel stay for two** (and entry to win all meals covered!).

What can I help you with today?`,
    action: 'open_waitlist' as const,
    actionLabel: `Claim Founding Spot (${p.formattedFounding})`,
    followUps: [
      'What is included in the free hotel stay?',
      'What are 7-night condo stays for 3,490 NOK?',
      'What happens on Launch Day January 4?',
      'How does wholesale hotel pricing work?',
      'What is the 100% money-back guarantee?',
    ],
  };
}

// Conversational Fallback response
export function getFallbackAnswer(currency: CurrencyCode): ConciergeAnswer {
  const p = MEMBERSHIP_PRICING[currency] || MEMBERSHIP_PRICING.USD;
  const isNorwegian = currency === 'NOK';

  if (isNorwegian) {
    return {
      text: `ATLAS Travel Club er en lukket medlemsklubb (etter Costco-modellen) som gir deg direkte tilgang til engrospriser på reiser med 0% kommersielt påslag – vanligvis 20% til 45% lavere enn Booking.com eller Expedia.

Lanseringen skjer **mandag 4. januar 2027 kl. 10:00**. Medlemskapet koster **${p.formattedRegular}**, og de 100 første mottar et **100% gratis 3-dagers luksushotellopphold for to i Europa (verdi 5 400 kr)**.

Hva er du mest nysgjerrig på? Jeg forklarer gjerne 0 kr i rompris (Connex), 7-netters leiligheter (RVC), 100% provisjonsrefusjon eller 100% verdigarantien.`,
      action: 'open_waitlist',
      actionLabel: `Sikre Founding-plass (${p.formattedFounding})`,
      followUps: [
        'Hva inkluderer det gratis hotelloppholdet?',
        'Hvordan fungerer engrospriser på hotell?',
        'Hva skjer når dørene åpner 4. januar?',
        'Hva er 100% verdigarantien?',
      ],
    };
  }

  return {
    text: `ATLAS Travel Club is a private membership club (built on the Costco model) giving members direct access to wholesale travel rates with 0% retail markup—typically 20% to 45% lower than Booking.com or Expedia.

Our official launch opens **Monday, January 4, 2027 at 10:00 AM CET**. Membership is **${p.formattedRegular}**, and the first 100 Founding Members receive a **complimentary 3-day European hotel break for two (worth $520)**.

What would you like to know more about? I can explain $0 room rates (Connex), 7-night condo escapes (RVC), 100% commission rebates, or our 100% money-back guarantee.`,
    action: 'open_waitlist',
    actionLabel: `Claim Founding Spot (${p.formattedFounding})`,
    followUps: [
      'What is included in the free hotel stay?',
      'How does wholesale hotel pricing work?',
      'What happens on Launch Day January 4?',
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
