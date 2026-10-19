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
    pillar5Title: string;
    pillar5Desc: string;
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
      getEarlyAccess: 'Reserve Spot Free',
      languageToggle: 'Language',
    },
    hero: {
      topBadge: '👑 EXCLUSIVE TO FIRST 100 • PRELAUNCH FOUNDING MEMBERS',
      titleLine1: 'Join as an ATLAS Founding Member.',
      titleLine2: 'Get a Free 3-Day European Hotel Break.',
      description: 'The first 100 Founding Members receive a complimentary 3-day European luxury hotel break for two (worth €480), and 3 members win all gourmet meals covered. Reserve your spot free today – no credit card required.',
      unmutePrompt: 'Click to Unmute Voiceover & Music (1:20)',
      seeSavings: 'See Your Savings (Calculator)',
      claimFounder: 'Reserve Spot Free (No Card Needed)',
      flightTab: 'Flight Savings',
      flightTabSub: 'Direct NDC routes',
      hotelTab: 'Hotel Savings',
      hotelTabSub: 'Wholesale net rates',
      packageTab: 'Flights & Hotels',
      packageTabSub: 'Combined wholesale savings',
      drawNotice: '🎁 100 Free Hotel Breaks Guaranteed • 3 of 100 Win All Meals Fully Included',
      freeTrialPill: 'Only 100 Spots • 100% Value Guarantee',
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
      unlockSavingsBtn: 'Reserve Spot Free & Lock €110/yr',
      guaranteeTitle: '100% Value Guarantee',
      guaranteeDesc: 'If your first hotel stay (2+ nights), vacation condo, or cumulative annual travel does not save you more than your membership fee, we refund 100% of your fee immediately.',
      tripsUnit: 'trips',
      nightsUnit: 'nights',
      peopleUnit: 'guests',
      freeTrialBanner: 'Zero commitment • Test with our free trial before paying anything',
    },
    pillars: {
      sectionTitle: 'Our 5 Institutional Supplier & Partner Pillars',
      sectionSubtitle: 'Direct global bedbank agreements, airline NDC APIs, and 100% commission rebate guarantees.',
      pillar1Title: 'RateHawk & WebBeds (1.2M+ Wholesale Hotels)',
      pillar1Desc: 'Direct wholesale rates from institutional bedbanks (RateHawk, WebBeds, Hotelbeds) eliminating the 20%–45% markups of Booking.com and Expedia.',
      pillar2Title: 'Duffel NDC (300+ Airlines Direct)',
      pillar2Desc: 'Direct airline API connections with carriers like SAS, British Airways, Lufthansa, and Emirates at pure net cost with zero booking fees.',
      pillar3Title: 'Complimentary European Weekend Break for 2',
      pillar3Desc: 'Curated boutique, countryside, and wellness retreats across Europe. Complimentary weekend break for two included as a Founding Member gift.',
      pillar4Title: 'RVC Signature Resorts (7-Night Condos for Families)',
      pillar4Desc: 'Spacious condominium suites (studios, 1- and 2-bedroom units sleeping 2 to 6 guests) in Spain, Greece, and Italy from €299 (fra 3 490 kr) for 7 nights on last-minute clearance bookings.',
      pillar5Title: 'Rewards Vault (100% Commission Rebate)',
      pillar5Desc: 'On cruises (Royal Caribbean, MSC, Celebrity) and luxury hotels, ATLAS passes 100% of supplier commissions (10%–16%) directly back to you.',
    },
    waitlist: {
      modalTitle: 'Reserve Founding Member Spot',
      modalSubtitle: 'Reserve your Founding Member spot today for free, no credit card necessary. At launch on Wednesday, January 20, 2027, you get 48 hours to activate and receive your complimentary European weekend break for 2!',
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
      successDesc: 'Your Founding Member position is locked. Your complimentary 3-day European hotel break for two is reserved, and you are entered into the draw where 3 of 100 members win all meals covered!',
      founderNumberLabel: 'Founding Member Certificate',
      sharePrompt: 'Share your personal invitation code with friends to jump the queue:',
      copyLinkBtn: 'Copy Invitation Link',
      copiedBtn: 'Link Copied to Clipboard!',
      viewCertificateBtn: 'View Official Founding Certificate',
      drawIncludedBadge: 'Free Hotel Break + 3x Meal Draw Included',
      closeBtn: 'Close Window',
    },
    certificate: {
      title: 'Founding Member Certificate',
      subtitle: 'Atlas Sovereign Travel Club • Private User Group',
      issuedTo: 'Issued To',
      serialNumber: 'Certificate Identifier',
      status: 'Membership Status',
      statusActive: 'Verified Founding Member (€110 / 1 290 NOK per year)',
      lifetimeDiscount: 'Free 3-Day European Hotel Break Voucher',
      downloadBtn: 'Download Certificate',
      closeBtn: 'Close',
      perk1: '100% free 3-day European hotel stay for 2 travelers (worth €480 / 5 400 kr)',
      perk2: 'Automatic entry into the draw where 3 of 100 win all gourmet meals fully covered',
      perk3: '0 kr retail markups on flights and 1,200,000+ wholesale hotels (€110 / 1 290 NOK per year)',
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
      getEarlyAccess: 'Reserver plass gratis',
      languageToggle: 'Språk',
    },
    hero: {
      topBadge: '👑 PRELAUNCH KUN FOR DE 100 FØRSTE • FOUNDING MEMBERS',
      titleLine1: 'Bli Founding Member i ATLAS.',
      titleLine2: 'Få 3-dagers luksushotellopphold gratis.',
      description: 'De 100 første Founding-medlemmene mottar et 3-dagers luksushotellopphold for to i Europa helt gratis (verdi 5 400 kr), og 3 vinnere får all mat dekket. Reserver din plass gratis i dag – intet kredittkort nødvendig.',
      unmutePrompt: 'Klikk for musikk og introduksjon (1:20)',
      seeSavings: 'Beregn din besparelse',
      claimFounder: 'Reserver plass gratis • Uten kort',
      flightTab: 'Flybesparelser',
      flightTabSub: 'Direkte NDC-ruter',
      hotelTab: 'Hotellbesparelser',
      hotelTabSub: 'Uavkortede nettopriser',
      packageTab: 'Fly & Hotell',
      packageTabSub: 'Samlet feriebesparelse',
      drawNotice: '🎁 100 gratis hotellopphold garantert • 3 av 100 vinner også all gourmetmat inkludert',
      freeTrialPill: 'Kun 100 plasser totalt • 100% Fornøydgaranti',
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
      unlockSavingsBtn: 'Bli Founding Member & få gratis hotellopphold',
      guaranteeTitle: '100% Fornøyd- & Verdigaranti',
      guaranteeDesc: 'Hvis ditt første hotellopphold (2+ netter), ferieleilighet eller samlede reiser det første året ikke sparer deg for mer enn medlemskontingenten, refunderer vi 100% på dagen.',
      tripsUnit: 'turer',
      nightsUnit: 'netter',
      peopleUnit: 'gjester',
      freeTrialBanner: 'Kun 100 plasser • Inkluderer gratis hotellopphold for to (verdi 5 400 kr)',
    },
    pillars: {
      sectionTitle: 'Våre 5 Institusjonelle Leverandør- og Partnersøyler',
      sectionSubtitle: 'Direkte globale grossistavtaler, flyselskapenes NDC-linjer og 100% provisjonsretur.',
      pillar1Title: 'RateHawk & WebBeds (1,2 mill. engroshoteller)',
      pillar1Desc: 'Direkte nettopriser fra globale hotellgrossister (RateHawk, WebBeds, Hotelbeds). Fjerner de 20%–45% påslagene som legges på hos Booking.com og Expedia.',
      pillar2Title: 'Duffel NDC (300+ flyselskaper direkte)',
      pillar2Desc: 'Direkte API-forbindelse til selskaper som SAS, Lufthansa, British Airways og Emirates til ren kostpris uten fordyrende bookinggebyrer.',
      pillar3Title: 'Europeisk Weekend-opphold for 2',
      pillar3Desc: 'Utvalgte boutique- og velværerhoteller i Europa. Eksklusivt helgeopphold for to inkludert som Founding Member-gave.',
      pillar4Title: 'RVC Signature Resorts (7 netter for familien)',
      pillar4Desc: 'Romslige ferieleiligheter (fra studio til 1- og 2-roms for 2–6 personer) i Spania, Hellas, Italia og Portugal fra kun 3 490 kr (€299) for hele uken ved restplass / clearance.',
      pillar5Title: 'Rewards Vault (100% Provisjonsretur)',
      pillar5Desc: 'På cruise (Royal Caribbean, MSC, Celebrity) og luksusopphold der leverandørene betaler 10%–16% provisjon, overfører ATLAS 100% direkte tilbake til deg.',
    },
    waitlist: {
      modalTitle: 'Reserver Founding Member-plass',
      modalSubtitle: 'Reserver din Founding Member-plass i dag – helt gratis, intet kredittkort nødvendig. Ved lansering onsdag 20. januar 2027 har du 48 timer på å aktivere og motta ditt Europeiske Weekend-opphold for 2!',
      step1Title: 'Trinn 1: Personopplysninger',
      step2Title: 'Trinn 2: Sikker SMS-verifisering',
      step3Title: 'Trinn 3: Medlemskap & Gave Bekreftet',
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
      successDesc: 'Din Founding Member-posisjon og ditt gratis 3-dagers hotellopphold for to er reservert. Du er også automatisk registrert i trekningen der 3 heldige får OGSÅ MATEN 100% dekket!',
      founderNumberLabel: 'Founding Member Sertifikat',
      sharePrompt: 'Del din personlige invitasjonslenke med venner for å rykke frem i køen:',
      copyLinkBtn: 'Kopier invitasjonslenke',
      copiedBtn: 'Lenke kopiert til utklippstavlen!',
      viewCertificateBtn: 'Se offisielt Founding-sertifikat',
      drawIncludedBadge: 'Gratis Hotell + 3x Mattrekning Inkludert',
      closeBtn: 'Lukk vindu',
    },
    certificate: {
      title: 'Founding Member Sertifikat',
      subtitle: 'Atlas Sovereign Travel Club • Lukket Medlemskrets',
      issuedTo: 'Utstedt til',
      serialNumber: 'Sertifikat-ID',
      status: 'Medlemsstatus',
      statusActive: 'Verifisert Founding Member (1 290 kr/år)',
      lifetimeDiscount: 'Europeisk Weekend-opphold for To',
      downloadBtn: 'Last ned sertifikat',
      closeBtn: 'Lukk',
      perk1: 'Europeisk weekend-opphold for 2 personer i Europa (verdi inntil 4 500 kr / ca. €400)',
      perk2: 'Full tilgang til rå engrospriser på 2,5M hoteller og direkte kommisjonskreditter',
      perk3: '0 kr påslag som aktivt medlem på fly og over 1 200 000 hoteller (1 290 kr/år)',
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
