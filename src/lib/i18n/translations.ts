export type Language = 'en' | 'no';

export interface Translations {
  header: {
    brandSubtitle: string;
    prelaunchBadge: string;
    b2bActive: string;
    howItWorks: string;
    podcastBadge: string;
    getEarlyAccess: string;
    languageToggle: string;
  };
  hero: {
    topBadge: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    unmutePrompt: string;
    seeSavings: string;
    claimFounder: string;
    flightTab: string;
    flightTabSub: string;
    hotelTab: string;
    hotelTabSub: string;
    packageTab: string;
    packageTabSub: string;
    drawNotice: string;
    freeTrialPill: string;
  };
  ticker: {
    title: string;
    subtitle: string;
    tabHotels: string;
    tabFlights: string;
    publicOta: string;
    atlasWholesale: string;
    youSave: string;
    verifyOn: string;
    rateParityNotice: string;
    verifiedStamp: string;
    includesNotice: string;
  };
  calculator: {
    badgePackage: string;
    badgeFlights: string;
    badgeHotels: string;
    heading: string;
    subheading: string;
    modePackage: string;
    modeHotels: string;
    modeFlights: string;
    tripsPerYear: string;
    nightsPerTrip: string;
    travelers: string;
    hotelTier: string;
    flightClass: string;
    tierBoutique: string;
    tierBoutiqueSub: string;
    tierLuxury: string;
    tierLuxurySub: string;
    tierUltra: string;
    tierUltraSub: string;
    flightEconomy: string;
    flightEconomySub: string;
    flightPremium: string;
    flightPremiumSub: string;
    flightBusiness: string;
    flightBusinessSub: string;
    annualSavingsLabel: string;
    savingsPerTrip: string;
    hotelSavings: string;
    flightSavings: string;
    unlockSavingsBtn: string;
    guaranteeTitle: string;
    guaranteeDesc: string;
    tripsUnit: string;
    nightsUnit: string;
    peopleUnit: string;
    freeTrialBanner: string;
  };
  pillars: {
    sectionTitle: string;
    sectionSubtitle: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    pillar4Title: string;
    pillar4Desc: string;
  };
  waitlist: {
    modalTitle: string;
    modalSubtitle: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    contactPrefLabel: string;
    whatsappCheckbox: string;
    whatsappPlaceholder: string;
    messengerPlaceholder: string;
    continueBtn: string;
    codePrompt: string;
    codePlaceholder: string;
    verifyBtn: string;
    resendIn: string;
    resendBtn: string;
    successTitle: string;
    successDesc: string;
    founderNumberLabel: string;
    sharePrompt: string;
    copyLinkBtn: string;
    copiedBtn: string;
    viewCertificateBtn: string;
    drawIncludedBadge: string;
    closeBtn: string;
  };
  certificate: {
    title: string;
    subtitle: string;
    issuedTo: string;
    serialNumber: string;
    status: string;
    statusActive: string;
    lifetimeDiscount: string;
    downloadBtn: string;
    closeBtn: string;
    perk1: string;
    perk2: string;
    perk3: string;
  };
  podcast: {
    modalTitle: string;
    modalSubtitle: string;
    trackSummaryTitle: string;
    trackSummaryDesc: string;
    trackDeepdiveTitle: string;
    trackDeepdiveDesc: string;
    playing: string;
    paused: string;
    closeBtn: string;
  };
  footer: {
    brandSubtitle: string;
    tagline1: string;
    tagline2: string;
    tagline3: string;
    copyright: string;
    internalStaff: string;
  };
}

export const translations: Record<Language, Translations> = {
  // =========================================================================
  // ENGLISH (MASTER LUXURY COPY)
  // =========================================================================
  en: {
    header: {
      brandSubtitle: 'Private Closed-Loop Bedbank Wholesale',
      prelaunchBadge: 'Prelaunch',
      b2bActive: 'B2B Net Rates Active',
      howItWorks: 'How It Works',
      podcastBadge: 'Podcast',
      getEarlyAccess: 'Get Early Access',
      languageToggle: 'Language',
    },
    hero: {
      topBadge: 'Bedbank Wholesale Hotels & Duffel NDC Flights • Zero Middleman Fees',
      titleLine1: 'Sovereign Travel.',
      titleLine2: 'Half Price For Life.',
      description: 'Booking.com and Expedia charge massive markups to fund retail ad campaigns. Atlas connects private members directly to wholesale bedbank inventory and Duffel NDC commercial flights at pure cost.',
      unmutePrompt: 'Click to Unmute Voiceover & Music (1:22)',
      seeSavings: 'See Your Savings (Calculator)',
      claimFounder: 'Claim Founder Spot (50% Off)',
      flightTab: 'Flight Savings',
      flightTabSub: 'Direct NDC routes',
      hotelTab: 'Hotel Savings',
      hotelTabSub: 'Wholesale net rates',
      packageTab: 'Flight & Hotel Package',
      packageTabSub: 'Maximum wholesale yield',
      drawNotice: 'Every early registration is automatically entered into our launch draw to win 1 of 5 Free Lifetime Memberships',
      freeTrialPill: 'Free Trial • Zero Commitment',
    },
    ticker: {
      title: 'Live Wholesale vs Public Retail Rates',
      subtitle: 'Audited, live rate comparisons across top global destinations',
      tabHotels: 'Hotels',
      tabFlights: 'Flights',
      publicOta: 'Public OTA Rate',
      atlasWholesale: 'Atlas Wholesale Net',
      youSave: 'You Save',
      verifyOn: 'Verify on',
      rateParityNotice: 'Hotel supplier contracts strictly forbid public advertising of unbundled net rates. Atlas members access rates behind secure member login.',
      verifiedStamp: 'B2B Live Audited',
      includesNotice: 'Includes taxes & zero retail commission',
    },
    calculator: {
      badgePackage: '⚡ Wholesale Travel Savings Calculator',
      badgeFlights: '✈️ Duffel NDC Flight Calculator',
      badgeHotels: '🏨 Bedbank Wholesale Hotel Calculator',
      heading: 'How Much Will You Save With Atlas?',
      subheading: 'Adjust your typical travel habits below to calculate your estimated annual savings compared to public booking portals.',
      modePackage: 'Flights & Hotels',
      modeHotels: 'Hotels Only',
      modeFlights: 'Flights Only',
      tripsPerYear: 'Trips Per Year',
      nightsPerTrip: 'Nights Per Trip',
      travelers: 'Travelers',
      hotelTier: 'Hotel Standard',
      flightClass: 'Flight Cabin Class',
      tierBoutique: '4-Star Superior & Boutique',
      tierBoutiqueSub: 'Upscale city centers & boutique resorts',
      tierLuxury: '5-Star Luxury & Resorts',
      tierLuxurySub: 'Leading hotels of the world, Ritz, Four Seasons',
      tierUltra: 'Ultra-Luxury & Suites',
      tierUltraSub: 'Presidential villas, Aman, Rosewood retreats',
      flightEconomy: 'Economy Class',
      flightEconomySub: 'Unbundled net airfare with zero GDS fees',
      flightPremium: 'Premium Economy',
      flightPremiumSub: 'Extra legroom & priority services at cost',
      flightBusiness: 'Business Class',
      flightBusinessSub: 'Flat-bed luxury with maximum NDC price delta',
      annualSavingsLabel: 'Estimated Annual Savings',
      savingsPerTrip: 'Savings Per Trip',
      hotelSavings: 'Hotel Savings',
      flightSavings: 'Flight Savings',
      unlockSavingsBtn: 'Start Free Trial & Lock 50% Off',
      guaranteeTitle: '100% Value Guarantee',
      guaranteeDesc: 'If your first booking does not save you more than your membership fee, we refund 100% of your fee immediately. You literally cannot lose.',
      tripsUnit: 'trips',
      nightsUnit: 'nights',
      peopleUnit: 'guests',
      freeTrialBanner: 'Zero commitment • Test with our free trial before paying anything',
    },
    pillars: {
      sectionTitle: 'The Atlas Membership Advantage',
      sectionSubtitle: 'Wholesale hotel bedbanks, direct airline flights, and automatic Travel Kickback rewards.',
      pillar1Title: '1M+ Wholesale Hotels',
      pillar1Desc: 'Direct access to institutional hotel bedbanks (Hotelbeds, WebBeds) without the 20%–50% markups charged by Booking.com and Expedia.',
      pillar2Title: '300+ Airlines via Duffel NDC',
      pillar2Desc: 'Direct airline API connections with carriers like SAS, Lufthansa, British Airways, and Emirates at pure net cost with zero booking fees.',
      pillar3Title: '100% Commission Rebate Vault',
      pillar3Desc: 'On cruises and luxury bookings with fixed retail pricing, Atlas passes 100% of supplier commissions (10%–16%) directly back to your Rewards Vault. Atlas retains zero travel commissions.',
      pillar4Title: '4 Family & Companion Passes',
      pillar4Desc: 'Share full wholesale access with your partner, family members, or travel companions at zero extra fee on your annual membership.',
    },
    waitlist: {
      modalTitle: 'Founding Member Application',
      modalSubtitle: 'Lock in 50% off for life with zero commitment on a free trial.',
      step1Title: 'Step 1: Your Details',
      step2Title: 'Step 2: Instant Mobile Verification',
      step3Title: 'Step 3: Membership Confirmed',
      nameLabel: 'Full Legal Name',
      namePlaceholder: 'e.g. Henrik Ibsen',
      emailLabel: 'Email Address',
      emailPlaceholder: 'henrik@example.com',
      phoneLabel: 'Mobile Phone (for SMS access key)',
      phonePlaceholder: '+47 900 00 000',
      contactPrefLabel: 'Preferred Communication Channel',
      whatsappCheckbox: 'Same as mobile number',
      whatsappPlaceholder: 'WhatsApp number with country code',
      messengerPlaceholder: 'Messenger username or profile link',
      continueBtn: 'Send 6-Digit Access Code',
      codePrompt: 'Enter the 6-digit verification code sent to your phone:',
      codePlaceholder: '6-digit code',
      verifyBtn: 'Verify & Activate Membership',
      resendIn: 'Resend code in',
      resendBtn: 'Resend Code',
      successTitle: 'Welcome to Atlas Travel Club',
      successDesc: 'Your Founding Member position is locked at 50% off for life. You are also entered into the launch draw to win 1 of 5 Free Lifetime Memberships.',
      founderNumberLabel: 'Founding Member Certificate',
      sharePrompt: 'Share your personal invitation code with friends to jump the queue:',
      copyLinkBtn: 'Copy Invitation Link',
      copiedBtn: 'Link Copied to Clipboard!',
      viewCertificateBtn: 'View Official Founding Certificate',
      drawIncludedBadge: 'Entered in 5x Lifetime Draw',
      closeBtn: 'Close Window',
    },
    certificate: {
      title: 'Founding Member Certificate',
      subtitle: 'Atlas Sovereign Travel Club • Private User Group',
      issuedTo: 'Issued To',
      serialNumber: 'Certificate Identifier',
      status: 'Membership Status',
      statusActive: 'Verified Founding Member',
      lifetimeDiscount: '50% Lifetime Rate Lock Guarantee',
      downloadBtn: 'Download Certificate',
      closeBtn: 'Close',
      perk1: '50% permanent discount on annual club dues',
      perk2: '100% money-back guarantee on your first booking',
      perk3: 'Automatic entry in 5x free lifetime membership draw',
    },
    podcast: {
      modalTitle: 'Atlas Executive Audio Briefings',
      modalSubtitle: 'Understand how wholesale hotel bedbanks and Duffel NDC flights eliminate public retail markups.',
      trackSummaryTitle: 'Executive Summary (2 Minutes)',
      trackSummaryDesc: 'A concise briefing on rate parity, closed-user groups, and the wholesale travel arbitrage.',
      trackDeepdiveTitle: 'Deep Dive Investigation (23 Minutes)',
      trackDeepdiveDesc: 'A comprehensive journalistic breakdown of the OTA monopoly and the Atlas economic model.',
      playing: 'Now Playing',
      paused: 'Paused',
      closeBtn: 'Close Audio Player',
    },
    footer: {
      brandSubtitle: 'Prelaunch Portal',
      tagline1: 'B2B Bedbank Net Rates',
      tagline2: 'Rate Parity Exempt',
      tagline3: 'Closed-Loop Membership',
      copyright: 'Atlas Travel Club. Operated by HARD ROCK CAPITAL LTD (UK Reg. #16833237). All rights reserved.',
      internalStaff: 'Internal Staff Access',
    },
  },

  // =========================================================================
  // NORWEGIAN (BESPOKE NATIVE REWRITING FOR LUXURY TRAVEL CLUB)
  // =========================================================================
  no: {
    header: {
      brandSubtitle: 'Lukket medlemsklubb • Direkte engrospriser',
      prelaunchBadge: 'Forhåndslansering',
      b2bActive: 'Grossistpriser aktive',
      howItWorks: 'Slik fungerer det',
      podcastBadge: 'Lydguide',
      getEarlyAccess: 'Sikre tidlig tilgang',
      languageToggle: 'Språk',
    },
    hero: {
      topBadge: 'Hoteller til B2B-engrospriser • Direkte flyavtaler • 0% kommersielt påslag',
      titleLine1: 'Reis på første klasse.',
      titleLine2: 'Til rene engrospriser.',
      description: 'Reisegiganter som Booking.com og Expedia legger på 15% til 30% i provisjon for å finansiere milliardkampanjer. Atlas er en lukket medlemsklubb som gir deg direkte tilgang til hotellenes egne grossistpriser og flyselskapenes direktekanaler – til ren kostpris, helt uten fordyrende mellomledd.',
      unmutePrompt: 'Klikk for musikk og introduksjon (1:22)',
      seeSavings: 'Beregn din besparelse',
      claimFounder: 'Bli Founding Member (50% rabatt)',
      flightTab: 'Flybesparelser',
      flightTabSub: 'Direkte NDC-ruter',
      hotelTab: 'Hotellbesparelser',
      hotelTabSub: 'Uavkortede nettopriser',
      packageTab: 'Fly- og hotellpakke',
      packageTabSub: 'Maksimal engrosgevinst',
      drawNotice: 'Alle tidlige registreringer er automatisk med i trekningen av 5 gratis livstidsmedlemskap',
      freeTrialPill: 'Gratis prøveperiode • Ingen forpliktelser',
    },
    ticker: {
      title: 'Nettopriser i sanntid mot åpne reisesider',
      subtitle: 'Verifiserte prissammenligninger på populære destinasjoner verden over',
      tabHotels: 'Hoteller',
      tabFlights: 'Fly',
      publicOta: 'Offentlig pris',
      atlasWholesale: 'Atlas Engrospris',
      youSave: 'Du sparer',
      verifyOn: 'Sammenlign på',
      rateParityNotice: 'Hotellkontrakter forbyr strengt offentlig annonsering av engrospriser (prisparitet). Atlas-medlemmer låser opp prisene bak passordbeskyttet innlogging.',
      verifiedStamp: 'B2B Sanntidsverifisert',
      includesNotice: 'Inkluderer skatter og 0% provisjonspåslag',
    },
    calculator: {
      badgePackage: '⚡ Beregn din årlige reisebesparelse',
      badgeFlights: '✈️ Beregn flybesparelser (NDC)',
      badgeHotels: '🏨 Beregn hotellbesparelser (Engros)',
      heading: 'Hvor mye sparer du som Atlas-medlem?',
      subheading: 'Juster reisevanene dine nedenfor for å se hva du sparer sammenlignet med åpne portaler som Booking.com og Expedia.',
      modePackage: 'Fly & Hotell',
      modeHotels: 'Kun Hotell',
      modeFlights: 'Kun Fly',
      tripsPerYear: 'Reiser per år',
      nightsPerTrip: 'Netter per reise',
      travelers: 'Reisende',
      hotelTier: 'Hotellkategori',
      flightClass: 'Kabin- og seteklasse',
      tierBoutique: '4-stjerners superior & boutique',
      tierBoutiqueSub: 'Sentrumsnære kvalitetshoteller og boutique resorts',
      tierLuxury: '5-stjerners luksus & resorts',
      tierLuxurySub: 'Leading Hotels of the World, Ritz, Four Seasons',
      tierUltra: 'Ultra-luksus & suiter',
      tierUltraSub: 'Presidentvillaer, Aman, Rosewood retreats',
      flightEconomy: 'Økonomiklasse',
      flightEconomySub: 'Direkte nettopriser uten fordyrende GDS-tillegg',
      flightPremium: 'Premium Economy',
      flightPremiumSub: 'Ekstra benplass og prioritert ombordstigning til kostpris',
      flightBusiness: 'Business Class',
      flightBusinessSub: 'Fullverdig liggesete med størst prisforskjell mot markedet',
      annualSavingsLabel: 'Estimert årlig besparelse',
      savingsPerTrip: 'Besparelse per reise',
      hotelSavings: 'Hotellbesparelse',
      flightSavings: 'Flybesparelse',
      unlockSavingsBtn: 'Start gratis prøveperiode & lås 50% rabatt',
      guaranteeTitle: '100% Fornøyd- & Verdigaranti',
      guaranteeDesc: 'Hvis din første reise ikke sparer deg for mer enn det medlemskapet koster, refunderer vi 100% av pengene dine på dagen. Du tar med andre ord null økonomisk risiko.',
      tripsUnit: 'turer',
      nightsUnit: 'netter',
      peopleUnit: 'gjester',
      freeTrialBanner: 'Helt uten forpliktelser • Test og se prisene med en gratis prøveperiode',
    },
    pillars: {
      sectionTitle: 'Dine eksklusive medlemsfordeler',
      sectionSubtitle: 'Institusjonelle hotellgrossister, direkte flyavtaler og automatiske reisebonuser.',
      pillar1Title: 'Over 1 million engroshoteller',
      pillar1Desc: 'Direkte tilgang til institusjonelle grossister (Hotelbeds, WebBeds) uten de 20%–50% påslagene som legges på hos Booking.com og Expedia.',
      pillar2Title: '300+ flyselskaper via Duffel NDC',
      pillar2Desc: 'Direkte flyforbindelser til selskaper som SAS, Lufthansa, British Airways og Emirates til ren kostpris uten fordyrende bookinggebyrer.',
      pillar3Title: '100% Provisjonsretur (Rewards Vault)',
      pillar3Desc: 'På cruise og luksusopphold der leverandørene betaler 10%–16% provisjon, overfører Atlas 100% av provisjonen direkte tilbake til ditt personlige Rewards Vault. Atlas beholder 0 kr i reisekommisjon.',
      pillar4Title: '4 familie- og ledsagerpass',
      pillar4Desc: 'Del fulle engrosfordeler med partner, familiemedlemmer eller reisefølge uten ekstra kostnad på medlemskapet ditt.',
    },
    waitlist: {
      modalTitle: 'Søknad om Founding Membership',
      modalSubtitle: 'Lås inn 50% livstidsrabatt helt uforpliktende med en gratis prøveperiode.',
      step1Title: 'Trinn 1: Personopplysninger',
      step2Title: 'Trinn 2: Sikker SMS-verifisering',
      step3Title: 'Trinn 3: Medlemskap aktivert',
      nameLabel: 'Fullt navn',
      namePlaceholder: 'F.eks. Henrik Ibsen',
      emailLabel: 'E-postadresse',
      emailPlaceholder: 'henrik@eksempel.no',
      phoneLabel: 'Mobilnummer (for engangskode på SMS)',
      phonePlaceholder: '+47 900 00 000',
      contactPrefLabel: 'Foretrukket kontaktkanal',
      whatsappCheckbox: 'Samme som mobilnummer',
      whatsappPlaceholder: 'WhatsApp-nummer med landskode',
      messengerPlaceholder: 'Messenger-brukernavn eller profillenke',
      continueBtn: 'Send 6-sifret sikkerhetskode',
      codePrompt: 'Skriv inn den 6-sifrede koden vi sendte til mobilen din:',
      codePlaceholder: '6-sifret kode',
      verifyBtn: 'Bekreft & aktiver medlemskap',
      resendIn: 'Send ny kode om',
      resendBtn: 'Send ny kode',
      successTitle: 'Velkommen til Atlas Travel Club',
      successDesc: 'Din Founding Member-posisjon er låst til 50% rabatt på livstid. Du er også automatisk med i trekningen av 5 gratis livstidsmedlemskap.',
      founderNumberLabel: 'Founding Member Sertifikat',
      sharePrompt: 'Del din personlige invitasjonslenke med venner for å rykke frem i køen:',
      copyLinkBtn: 'Kopier invitasjonslenke',
      copiedBtn: 'Lenke kopiert til utklippstavlen!',
      viewCertificateBtn: 'Se offisielt Founding-sertifikat',
      drawIncludedBadge: 'Kvalifisert for 5x Livstidstrekning',
      closeBtn: 'Lukk vindu',
    },
    certificate: {
      title: 'Founding Member Sertifikat',
      subtitle: 'Atlas Sovereign Travel Club • Lukket Medlemskrets',
      issuedTo: 'Utstedt til',
      serialNumber: 'Sertifikat-ID',
      status: 'Medlemsstatus',
      statusActive: 'Verifisert Founding Member',
      lifetimeDiscount: '50% Garantert Livstidsrabatt',
      downloadBtn: 'Last ned sertifikat',
      closeBtn: 'Lukk',
      perk1: '50% permanent livstidsrabatt på årskontingenten',
      perk2: '100% verdigaranti på din aller første reise',
      perk3: 'Automatisk lodd i trekningen av 5 gratis livstidsmedlemskap',
    },
    podcast: {
      modalTitle: 'Atlas Lydguide & Briefinger',
      modalSubtitle: 'Hør hvordan lukkede engrosnettverk og direkte flyavtaler eliminerer fordyrende provisjoner.',
      trackSummaryTitle: 'Kortversjon (2 Minutter)',
      trackSummaryDesc: 'En konsis gjennomgang av prisparitet, lukkede medlemsfordeler og engrosmodellen.',
      trackDeepdiveTitle: 'Dybdeanalyse (23 Minutter)',
      trackDeepdiveDesc: 'En grundig podcast-diskusjon om reisegigantenes monopol og hvordan Atlas kutter mellomleddene.',
      playing: 'Spiller av nå',
      paused: 'Pauset',
      closeBtn: 'Lukk lydspiller',
    },
    footer: {
      brandSubtitle: 'Forhåndslansering',
      tagline1: 'B2B Netto engrospriser',
      tagline2: 'Unntatt prisparitet',
      tagline3: 'Lukket medlemskrets',
      copyright: 'Atlas Travel Club. Operert av HARD ROCK CAPITAL LTD (Org.nr. 16833237 England & Wales). Alle rettigheter reservert.',
      internalStaff: 'Intern personalinnlogging',
    },
  },
};
