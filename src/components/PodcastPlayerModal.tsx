import React, { useState, useRef, useEffect } from 'react';
import {
  Headphones,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  X,
  Sparkles,
  ArrowRight,
  Radio,
  Download,
  Compass,
} from 'lucide-react';
import { useLanguage } from '../lib/i18n/LanguageContext';

export interface Chapter {
  time: number;
  label: string;
  desc: string;
}

export type PodcastTrackId =
  | 'summary'
  | 'deepdive'
  | 'lounges'
  | 'hotel-blueprint'
  | 'voucher'
  | 'flights'
  | 'delays'
  | 'commissions'
  | 'resorts'
  | 'guarantee'
  | 'launch';

export interface PodcastTrack {
  id: PodcastTrackId;
  badge: string;
  durationLabel: string;
  title: string;
  description: string;
  audioSrc: string;
  downloadFilename: string;
  chapters: Chapter[];
}

export const PODCAST_TRACKS: Record<PodcastTrackId, PodcastTrack> = {
  summary: {
    id: 'summary',
    badge: 'Executive Briefing • 6 Min',
    durationLabel: '6:13 Duration',
    title: 'How Private Memberships Access Wholesale Travel',
    description:
      'An unscripted conversational breakdown of closed-loop club economics, secret hotel bedbanks, Duffel NDC airline net fares, and built-in EU261 travel disruption protection.',
    audioSrc: '/audio/How_to_Bypass_Hidden_Hotel_Markups.m4a?v=20261019',
    downloadFilename: 'How_to_Bypass_Hidden_Hotel_Markups.m4a',
    chapters: [
      { time: 0, label: '00:00 — The Retail Rate Illusion', desc: 'Why public travel platforms artificially inflate room and flight prices' },
      { time: 85, label: '01:25 — The Secret Bedbank Channel', desc: 'How luxury five-star hotels clear unbooked premium inventory at net cost' },
      { time: 185, label: '03:05 — Duffel NDC Airline Net Rates', desc: 'Direct carrier API integration bypassing legacy GDS retail markups' },
      { time: 275, label: '04:35 — EU Travel Protection & EU261', desc: 'Automated disruption compensation up to €600 plus 100% Value Guarantee' },
      { time: 335, label: '05:35 — The Founder Advantage', desc: 'Free 3-day European hotel stay for 2, meal draw entry, and 0 kr markups' },
    ],
  },
  'hotel-blueprint': {
    id: 'hotel-blueprint',
    badge: 'Wholesale Hotels • 6 Min',
    durationLabel: '6:13 Duration',
    title: 'How to Bypass Hidden Hotel Markups',
    description:
      'How rate parity clauses force public OTAs to match prices, and why password-protected closed-loop clubs legally access pure net wholesale bedbank rates.',
    audioSrc: '/audio/How_to_Bypass_Hidden_Hotel_Markups.m4a?v=20261019',
    downloadFilename: 'How_to_Bypass_Hidden_Hotel_Markups.m4a',
    chapters: [
      { time: 0, label: '00:00 — Rate Parity Laws', desc: 'Why Booking.com and Expedia charge identical public rates' },
      { time: 90, label: '01:30 — The Wholesale Channel', desc: 'How hotels liquidate empty rooms to closed-user groups' },
      { time: 210, label: '03:30 — Zero Markup Model', desc: 'How ATLAS passes 100% of wholesale discounts to members' },
    ],
  },
  voucher: {
    id: 'voucher',
    badge: 'European Hotel Break • 6 Min',
    durationLabel: '5:45 Duration',
    title: 'The Math Behind Zero-Euro Hotel Stays',
    description:
      'How curated boutique and wellness retreats across Europe partner with private clubs to allocate exclusive short breaks and weekend escapes.',
    audioSrc: '/audio/The_Math_Behind_Zero_Euro_Hotel_Stays.m4a?v=20261019',
    downloadFilename: 'The_Math_Behind_Zero_Euro_Hotel_Stays.m4a',
    chapters: [
      { time: 0, label: '00:00 — The €0 Room Voucher', desc: 'Why European hoteliers give away surplus midweek capacity' },
      { time: 90, label: '01:30 — Why Hoteliers Partner with Private Clubs', desc: 'Protecting brand equity while filling shoulder capacity' },
      { time: 210, label: '03:30 — The Founding Member Welcome Gift', desc: 'Curated weekend escapes for the first 100 early adopters' },
    ],
  },
  flights: {
    id: 'flights',
    badge: 'Direct Flights • 6 Min',
    durationLabel: '6:10 Duration',
    title: 'How Flight Middlemen Inflate Ticket Prices',
    description:
      'How legacy Global Distribution Systems (GDS) inflate airfares, and how direct Duffel NDC APIs unlock unbundled net fares and ancillaries at pure airline cost.',
    audioSrc: '/audio/How_Flight_Middlemen_Inflate_Ticket_Prices.m4a?v=20261019',
    downloadFilename: 'How_Flight_Middlemen_Inflate_Ticket_Prices.m4a',
    chapters: [
      { time: 0, label: '00:00 — The GDS Tax', desc: 'Why commeResort Allotment Networkal airfares carry hidden distribution markups' },
      { time: 100, label: '01:40 — Duffel NDC Architecture', desc: 'Direct carrier integration for net fares, seats, and bags' },
      { time: 220, label: '03:40 — Realistic Flight Savings', desc: 'Saving 5% to 14% on flights with zero platform markup' },
    ],
  },
  delays: {
    id: 'delays',
    badge: 'Automated EU261 • 5 Min',
    durationLabel: '5:21 Duration',
    title: 'How APIs Force Flight Delay Payouts',
    description:
      'How automated telemetry detects 3-hour flight disruptions, generates legally formatted claims under EC 261/2004, and deposits 100% of compensation with 0% fee cut.',
    audioSrc: '/audio/How_APIs_Force_Flight_Delay_Payouts.m4a?v=20261019',
    downloadFilename: 'How_APIs_Force_Flight_Delay_Payouts.m4a',
    chapters: [
      { time: 0, label: '00:00 — The Unclaimed Compensation Tax', desc: 'Why 85% of passengers never receive statutory payouts' },
      { time: 80, label: '01:20 — Duffel NDC Telemetry', desc: 'Digital tripwire triggering claims the second gates hit 3 hours' },
      { time: 160, label: '02:40 — Zero Contingency Fee', desc: 'Keeping 100% of €250–€600 payouts vs. 35-50% claims fees' },
      { time: 225, label: '03:45 — Legal Reality Check', desc: 'Sober legal boundaries: weather and ATC strikes exempt from cash' },
    ],
  },
  lounges: {
    id: 'lounges',
    badge: 'Airport Logistics • 5 Min',
    durationLabel: '5:19 Duration',
    title: 'Wholesale Airport Lounges Without Credit Cards',
    description:
      'How ATLAS unbundles expensive airport perks: digital lounge passes at pure wholesale cost (€24–€28), family companion rates, Duffel NDC priority boarding, and real-time Transit Copilot layover radar.',
    audioSrc: '/audio/Wholesale_Airport_Lounges_Without_Credit_Cards.m4a?v=20270120',
    downloadFilename: 'Wholesale_Airport_Lounges_Without_Credit_Cards.m4a',
    chapters: [
      { time: 0, label: '00:00 — Unbundling Airport Logistics', desc: 'Why €500–€800 credit card fees are an unnecessary tax on travelers' },
      { time: 70, label: '01:10 — VIP Lounge Pass & Net Wholesale Entry', desc: 'Buying digital QR lounge passes at pure €24–€28 cost vs. €65 walk-up' },
      { time: 130, label: '02:10 — Companion & Family Passes', desc: 'No markup on spouses and kids: identical wholesale pass pricing' },
      { time: 173, label: '02:53 — Duffel NDC Airline Ancillaries', desc: 'Fast-track security and priority boarding at raw airline cost' },
      { time: 220, label: '03:40 — Transit Copilot Layover Intelligence', desc: 'Departure gate radars and walking time calculations between gates' },
      { time: 275, label: '04:35 — The Founder Paul Yur-it-zen Model', desc: 'HARD ROCK CAPITAL LTD and pragmatic travel utility over status symbols' },
    ],
  },
  commissions: {
    id: 'commissions',
    badge: 'Commission Rebates • 5 Min',
    durationLabel: '5:08 Duration',
    title: 'How ATLAS Returns Hidden Travel Commissions',
    description:
      'Why luxury resort collections and hotel partners pay 10%–16% commissions, and how ATLAS passes 100% of these commissions directly to members as Rewards Vault credits.',
    audioSrc: '/audio/How_ATLAS_Returns_Hidden_Travel_Commissions.m4a?v=20261019',
    downloadFilename: 'How_ATLAS_Returns_Hidden_Travel_Commissions.m4a',
    chapters: [
      { time: 0, label: '00:00 — The Hidden Agency Commission', desc: 'How retail agents profit quietly from luxury resort bookings' },
      { time: 90, label: '01:30 — Closed-Loop Loyalty', desc: 'Maintaining 100% rate parity while rebating commissions to members' },
      { time: 210, label: '03:30 — Escrow & Cash Lag', desc: 'Why points clear when commission funds physically settle' },
    ],
  },
  resorts: {
    id: 'resorts',
    badge: 'Condo Clearance • 7 Nights',
    durationLabel: '6:30 Duration',
    title: 'How Luxury Resorts Secretly Liquidate Empty Suites',
    description:
      'How RVC and Panorama liquidate luxury condominium apartments for 2 to 6 guests in Spain, Greece, and Italy from €299 (fra 3 490 kr) for full 7-night stays.',
    audioSrc: '/audio/How_Luxury_Resorts_Secretly_Liquidate_Empty_Suites.m4a?v=20261019',
    downloadFilename: 'How_Luxury_Resorts_Secretly_Liquidate_Empty_Suites.m4a',
    chapters: [
      { time: 0, label: '00:00 — The Condo Clearance Channel', desc: 'Why 1- and 2-bedroom resort suites enter last-minute liquidation' },
      { time: 100, label: '01:40 — Family Math Breakdown', desc: '7 nights from 3 490 kr = only 83 kr per person per night' },
      { time: 230, label: '03:50 — Resort Destinations', desc: 'Marbella, Tenerife, Algarve, and Crete options' },
    ],
  },
  guarantee: {
    id: 'guarantee',
    badge: '100% Value Guarantee • 6 Min',
    durationLabel: '5:32 Duration',
    title: 'How ATLAS Guarantees Wholesale Savings',
    description:
      'The forensic blueprint of our 100% Value Guarantee: save more than your 1 290 NOK (€110) membership fee on your first booking or full refund.',
    audioSrc: '/audio/How_ATLAS_Travel_Club_Guarantees_Wholesale_Savings.m4a?v=20261019',
    downloadFilename: 'How_ATLAS_Travel_Club_Guarantees_Wholesale_Savings.m4a',
    chapters: [
      { time: 0, label: '00:00 — Zero Economic Risk', desc: 'Why subscription clubs must deliver measurable cash savings' },
      { time: 90, label: '01:30 — The Math of Single-Trip Payoff', desc: 'How one weekend hotel break recovers the entire fee' },
      { time: 210, label: '03:30 — Prompt Refund Protocol', desc: 'How our same-day refund policy is backed by Hard Rock Capital Ltd' },
    ],
  },
  launch: {
    id: 'launch',
    badge: 'Launch Playbook • 5 Min',
    durationLabel: '4:45 Duration',
    title: 'ATLAS Travel Club Zero-Markup Membership',
    description:
      'The official tactical walkthrough for Launch Day Wednesday, January 20, 2027 at 10:00 AM CET: Stripe activation, voucher allocation, and the 48-hour deadline.',
    audioSrc: '/audio/ATLAS_Travel_Club_Zero_Markup_Membership.m4a?v=20261019',
    downloadFilename: 'ATLAS_Travel_Club_Zero_Markup_Membership.m4a',
    chapters: [
      { time: 0, label: '00:00 — The Founding 100 Protocol', desc: 'First-come, first-served allocation of the 100 complimentary stays' },
      { time: 80, label: '01:20 — The 48-Hour Claim Window', desc: 'Why unclaimed allocations pass to waitlist candidate #101' },
      { time: 180, label: '03:00 — Activating Wholesale Access', desc: 'Logging in to book 1.2M hotels and direct flights at net cost' },
    ],
  },
  deepdive: {
    id: 'deepdive',
    badge: 'Forensic Investigation • 21 Min',
    durationLabel: '20:53 Duration',
    title: 'How Wholesale Memberships Bypass Travel Markups',
    description:
      'An unscripted forensic breakdown analyzing OTA retail markups, hotel bedbank distribution, Duffel NDC direct airline booking, and why private membership clubs legally access true wholesale rates.',
    audioSrc: '/audio/How_Wholesale_Memberships_Bypass_Travel_Markups.mp3?v=20261009_final',
    downloadFilename: 'How_Wholesale_Memberships_Bypass_Travel_Markups.mp3',
    chapters: [
      { time: 0, label: '00:00 — The Retail Travel Monopoly', desc: 'How public search engines and OTAs artificially inflate travel rates' },
      { time: 240, label: '04:00 — Institutional Bedbank Pipelines', desc: 'Hotelbeds, WebBeds, and the secret wholesale supply chain' },
      { time: 480, label: '08:00 — Price Parity Laws & The Legal Exemption', desc: 'Why password-protected closed-loop clubs bypass retail parity' },
      { time: 720, label: '12:00 — Direct NDC Airline Integration', desc: 'Cutting out legacy GDS fees on commeResort Allotment Networkal flights' },
      { time: 960, label: '16:00 — Built-In Disruption & Protection', desc: 'Automated EU261 flight cash recovery and 100% Value Guarantee' },
      { time: 1140, label: '19:00 — The Founder Membership Advantage', desc: 'Free 3-day European hotel break for 2 and launch privileges' },
    ],
  },
};

export const PODCAST_TRACKS_NO: Record<PodcastTrackId, PodcastTrack> = {
  summary: {
    id: 'summary',
    badge: 'Konsernbriefing • 6 Min',
    durationLabel: '6:13 Varighet',
    title: 'Slik gir lukkede medlemskap tilgang til engrospriser',
    description:
      'En uformell samtale om hvordan private klubber omgår prisparitet, åpner hemmelige hotellgrossister, sikrer direkte flyavtaler via Duffel NDC og inkluderer EU261-passasjertrygghet.',
    audioSrc: '/audio/How_to_Bypass_Hidden_Hotel_Markups.m4a?v=20261019',
    downloadFilename: 'How_to_Bypass_Hidden_Hotel_Markups.m4a',
    chapters: [
      { time: 0, label: '00:00 — Reiseportalenes prisillusjon', desc: 'Hvorfor offentlige portaler kunstig blåser opp hotell- og flypriser' },
      { time: 85, label: '01:25 — Den lukkede grossistkanalen', desc: 'Hvordan 5-stjerners luksushoteller selger overskuddskapasitet til kostpris' },
      { time: 185, label: '03:05 — Duffel NDC direkte flyavtaler', desc: 'Direkte API-integrasjon mot flyselskapene uten fordyrende GDS-gebyrer' },
      { time: 275, label: '04:35 — Europeisk reisetrygghet & EU261', desc: 'Automatisk forsinkelseskompensasjon opptil 600 € pluss 100% verdigaranti' },
      { time: 335, label: '05:35 — Founding Member-fordelen', desc: 'Gratis 3-dagers hotellopphold for 2, mattrekning og 0 kr påslag ved lansering' },
    ],
  },
  'hotel-blueprint': {
    id: 'hotel-blueprint',
    badge: 'Hotellengros • 6 Min',
    durationLabel: '6:13 Varighet',
    title: 'Slik omgår du de skjulte hotellpåslagene',
    description:
      'Hvordan prisparitet tvinger offentlige portaler til å vise identiske priser, og hvorfor lukkede medlemsklubber har lov til å selge til rå engros nettopris.',
    audioSrc: '/audio/How_to_Bypass_Hidden_Hotel_Markups.m4a?v=20261019',
    downloadFilename: 'How_to_Bypass_Hidden_Hotel_Markups.m4a',
    chapters: [
      { time: 0, label: '00:00 — Prisparitetsklausuler', desc: 'Hvorfor Booking.com og Expedia har identiske priser' },
      { time: 90, label: '01:30 — Den hemmelige grossistkanalen', desc: 'Grossist-bedbanks og overskuddskapasitet bak passord' },
      { time: 210, label: '03:30 — 0 kr påslag-modellen', desc: 'Slik viderefører ATLAS 100% av engrosrabatten' },
    ],
  },
  voucher: {
    id: 'voucher',
    badge: 'Hotellpass Velvære • 6 Min',
    durationLabel: '5:45 Varighet',
    title: 'Sannheten om 0 kr rompris: Hotell-Allotment-Modellen',
    description:
      'Hvordan utvalgte boutique- og spahoteller i Europa samarbeider med private klubber for å tilby eksklusive weekend- og korttidsferier.',
    audioSrc: '/audio/The_Math_Behind_Zero_Euro_Hotel_Stays.m4a?v=20261019',
    downloadFilename: 'The_Math_Behind_Zero_Euro_Hotel_Stays.m4a',
    chapters: [
      { time: 0, label: '00:00 — Kupongen som dekker rommet', desc: 'Hvorfor europeiske kvalitetshoteller fyller overskuddskapasitet' },
      { time: 90, label: '01:30 — Hvorfor hoteller samarbeider med lukkede klubber', desc: 'Skjerming av merkevareverdi og utnyttelse av kapasitet' },
      { time: 210, label: '03:30 — Founding Member velkomstoppholdet', desc: 'Eksklusive weekend-opphold for de 100 første medlemmene' },
    ],
  },
  flights: {
    id: 'flights',
    badge: 'Duffel Direktefly • 6 Min',
    durationLabel: '6:10 Varighet',
    title: 'Hvorfor mellomledd blåser opp flybillettpriser',
    description:
      'Hvordan tradisjonelle GDS-systemer legger på skjulte gebyrer, og hvordan Duffel NDC direkte API-integrasjon gir rene nettopriser og tilvalg til kostpris.',
    audioSrc: '/audio/How_Flight_Middlemen_Inflate_Ticket_Prices.m4a?v=20261019',
    downloadFilename: 'How_Flight_Middlemen_Inflate_Ticket_Prices.m4a',
    chapters: [
      { time: 0, label: '00:00 — Den usynlige GDS-skatten', desc: 'Hvorfor flyreiser hos reisebyråer har fordyrende mellomledd' },
      { time: 100, label: '01:40 — Duffel NDC-arkitekturen', desc: 'Direkte integrasjon mot flyselskapene for rå nettopriser' },
      { time: 220, label: '03:40 — Realistiske flybesparelser', desc: 'Spar 5% til 14% på fly uten plattformpåslag' },
    ],
  },
  delays: {
    id: 'delays',
    badge: 'Automatisert EU261 • 5 Min',
    durationLabel: '5:21 Varighet',
    title: 'Slik krever API-er inn EU261-erstatning automatisk',
    description:
      'Hvordan automatisert telemetri fanger opp 3 timers forsinkelser, genererer juridiske kravdokumenter og utbetaler 100% av erstatningen uten 35-50% i gebyr.',
    audioSrc: '/audio/How_APIs_Force_Flight_Delay_Payouts.m4a?v=20261019',
    downloadFilename: 'How_APIs_Force_Flight_Delay_Payouts.m4a',
    chapters: [
      { time: 0, label: '00:00 — De uavhentede millionene', desc: 'Hvorfor 85% av passasjerer aldri krever lovmessig kompensasjon' },
      { time: 80, label: '01:20 — Duffel NDC telemetri', desc: 'Digital snubletråd som sender kravet automatisk til flyselskapet' },
      { time: 160, label: '02:40 — 0% provisjonskutt', desc: 'Behold 100% av 250–600 € kontra 35–50% hos kravselskaper' },
      { time: 225, label: '03:45 — Nøktern realitetsorientering', desc: 'Vær og flygelederstreik er lovmessig unntatt kontanterstatning' },
    ],
  },
  lounges: {
    id: 'lounges',
    badge: 'Flyplasslogistikk • 5 Min',
    durationLabel: '5:19 Varighet',
    title: 'Flyplasslounger til engrospris uten dyre kredittkort',
    description:
      'Hvordan ATLAS kutter fordyrende ledd på flyplassen: digitale loungebekreftelser til rå nettopris (250–320 kr), pass til reisefølge, Duffel NDC fast-track og Transit Copilot sanntids layover-radar.',
    audioSrc: '/audio/Wholesale_Airport_Lounges_Without_Credit_Cards.m4a?v=20270120',
    downloadFilename: 'Wholesale_Airport_Lounges_Without_Credit_Cards.m4a',
    chapters: [
      { time: 0, label: '00:00 — Slutt på tvungne buffetpakker', desc: 'Hvorfor 5 000–8 000 kr i årsgebyr for kredittkort er unødvendig' },
      { time: 70, label: '01:10 — VIP Lounge Pass & rå nettopris', desc: 'Digitale loungebekreftelser til 250–320 kr vs. 650 kr i døren' },
      { time: 130, label: '02:10 — Gjestepass til familie', desc: 'Null påslag på ledsagere: nøyaktig samme engrospris' },
      { time: 173, label: '02:53 — Duffel NDC flytilvalg', desc: 'Fast-track og prioritert ombordstigning til offisiell flypris' },
      { time: 220, label: '03:40 — Transit Copilot layover-radar', desc: 'Sanntids gatevarsler og gangtidsberegninger på store flyplasser' },
      { time: 275, label: '04:35 — Pål Juritzen og nytteverdi', desc: 'Hard Rock Capital Ltd og fokus på praktisk verdi fremfor statussymboler' },
    ],
  },
  commissions: {
    id: 'commissions',
    badge: 'Provisjonsrefusjon • 5 Min',
    durationLabel: '5:08 Varighet',
    title: 'Slik betaler ATLAS 100% av provisjonen tilbake til deg',
    description:
      'Hvorfor luksushoteller og utvalgte resorter betaler 10%–16% i provisjon, og hvordan ATLAS overfører hver eneste krone rett inn i din Rewards Vault.',
    audioSrc: '/audio/How_ATLAS_Returns_Hidden_Travel_Commissions.m4a?v=20261019',
    downloadFilename: 'How_ATLAS_Returns_Hidden_Travel_Commissions.m4a',
    chapters: [
      { time: 0, label: '00:00 — De hemmelige provisjonene', desc: 'Hvordan reisebyråer tjener store penger bak ryggen på kunden' },
      { time: 90, label: '01:30 — Closed-Loop lojalitetskreditter', desc: 'Overholder leverandørenes prisregler og gir kunden verdien' },
      { time: 210, label: '03:30 — Escrow & likviditet', desc: 'Poengene frigis når provisjonen er utbetalt fra leverandøren' },
    ],
  },
  resorts: {
    id: 'resorts',
    badge: 'RVC Leiligheter • 7 Netter',
    durationLabel: '6:30 Varighet',
    title: 'Resort-smutthullet: 7-netters ferieleiligheter fra 3 490 kr',
    description:
      'Hvordan RVC og Panorama fyller luksusleiligheter for 2 til 6 personer i Spania, Hellas og Italia til rydningspriser (fra 83 kr per person per natt).',
    audioSrc: '/audio/How_Luxury_Resorts_Secretly_Liquidate_Empty_Suites.m4a?v=20261019',
    downloadFilename: 'How_Luxury_Resorts_Secretly_Liquidate_Empty_Suites.m4a',
    chapters: [
      { time: 0, label: '00:00 — Restplasskanalen for leiligheter', desc: 'Hvorfor 1- og 2-roms resortsuiter selges til bunnpris' },
      { time: 100, label: '01:40 — Regnestykket for familien', desc: '7 netter fra 3 490 kr = kun 83 kr/natt/person' },
      { time: 230, label: '03:50 — Destinasjonene', desc: 'Marbella, Tenerife, Algarve og Mallorca' },
    ],
  },
  guarantee: {
    id: 'guarantee',
    badge: '100% Verdigaranti • 6 Min',
    durationLabel: '5:32 Varighet',
    title: 'Slik garanterer ATLAS 100% innspart kontingent',
    description:
      'Vår 100% Verdigaranti i detalj: spar mer enn årskontingenten på 1 290 kr på ditt første hotellopphold eller samlede årsreiser, eller få full refusjon.',
    audioSrc: '/audio/How_ATLAS_Travel_Club_Guarantees_Wholesale_Savings.m4a?v=20261019',
    downloadFilename: 'How_ATLAS_Travel_Club_Guarantees_Wholesale_Savings.m4a',
    chapters: [
      { time: 0, label: '00:00 — Null økonomisk risiko', desc: 'Hvorfor et abonnementsmedlemskap må bevise besparelsen' },
      { time: 90, label: '01:30 — Én reise betaler hele året', desc: 'Hvordan en helgetur alene sparer inn de 1 290 kr' },
      { time: 210, label: '03:30 — Rask refusjonsprotokoll', desc: 'Refusjon på dagen garantert av Hard Rock Capital Ltd' },
    ],
  },
  launch: {
    id: 'launch',
    badge: 'Lanseringsmanual • 5 Min',
    durationLabel: '4:45 Varighet',
    title: 'ATLAS Travel Club: Lanseringsmanual for 20. januar',
    description:
      'Den taktiske veiledningen for åpningsdagen onsdag 20. januar 2027 kl. 10:00: Stripe-utsjekk, tildeling av de 100 gratis hotellene og 48-timers fristen.',
    audioSrc: '/audio/ATLAS_Travel_Club_Zero_Markup_Membership.m4a?v=20261019',
    downloadFilename: 'ATLAS_Travel_Club_Zero_Markup_Membership.m4a',
    chapters: [
      { time: 0, label: '00:00 — Founding 100-protokollen', desc: 'Førstemann til mølla for de 100 gratis hotelloppholdene' },
      { time: 80, label: '01:20 — 48-timers tildelingsfristen', desc: 'Uavhentede plasser overføres til kandidat #101 på ventelisten' },
      { time: 180, label: '03:00 — Aktivering av engrosadgang', desc: 'Logg inn og book 1,2 millioner hoteller og fly til rå nettopris' },
    ],
  },
  deepdive: {
    id: 'deepdive',
    badge: 'Dybdeanalyse • 21 Min',
    durationLabel: '20:53 Varighet',
    title: 'Slik kutter grossistmedlemskap reiseduopolenes påslag',
    description:
      'En grundig undersøkelse av Booking.com og Expedias provisjoner, hotellenes hemmelige grossistkjeder (Hotelbeds, WebBeds), direkte flybestillinger, og hvorfor lukkede klubber har lovlig rett til engrospriser.',
    audioSrc: '/audio/How_Wholesale_Memberships_Bypass_Travel_Markups.mp3?v=20261009_final',
    downloadFilename: 'How_Wholesale_Memberships_Bypass_Travel_Markups.mp3',
    chapters: [
      { time: 0, label: '00:00 — Reiseportalenes monopol', desc: 'Hvordan søkemotorer og OTAer kunstig driver opp prisene' },
      { time: 240, label: '04:00 — Institusjonelle grossister', desc: 'Hotelbeds, WebBeds og den lukkede distribusjonskjeden' },
      { time: 480, label: '08:00 — Prisparitet og det lovlige unntaket', desc: 'Hvorfor lukkede klubber bak passord omgår offentlige prisavtaler' },
      { time: 720, label: '12:00 — Direkte NDC-flyintegrasjon', desc: 'Kutter ut fordyrende mellomledd på kommersielle flyreiser' },
      { time: 960, label: '16:00 — Automatisk forsinkelsestrygghet', desc: 'Lovpålagt EU261-utbetaling og 100% verdigaranti' },
      { time: 1140, label: '19:00 — Founding-fordelen', desc: 'Gratis 3-dagers hotellopphold for 2, mattrekning og 0 kr påslag ved lansering' },
    ],
  },
};

const SPEED_OPTIONS = [1.0, 1.25, 1.5, 2.0];

interface PodcastPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWaitlist: () => void;
  onPlaybackStart?: () => void;
  initialTrack?: PodcastTrackId;
}

export const PodcastPlayerModal: React.FC<PodcastPlayerModalProps> = ({
  isOpen,
  onClose,
  onOpenWaitlist,
  onPlaybackStart,
  initialTrack = 'summary',
}) => {
  const { isNorwegian } = useLanguage();
  const [activeTrackId, setActiveTrackId] = useState<PodcastTrackId>(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tracks = isNorwegian ? PODCAST_TRACKS_NO : PODCAST_TRACKS;
  const currentTrack = tracks[activeTrackId];

  // Sync initialTrack when modal opens
  useEffect(() => {
    if (isOpen && initialTrack && initialTrack !== activeTrackId) {
      switchTrack(initialTrack, false);
    }
  }, [isOpen, initialTrack]);

  // Load and setup audio element
  const loadAudio = (src: string, autoPlay = false) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = src;
      audioRef.current.load();
    } else {
      audioRef.current = new Audio(src);
    }

    const audio = audioRef.current;
    audio.preload = 'auto';
    audio.playbackRate = playbackRate;
    audio.muted = isMuted;

    setCurrentTime(0);
    const durationFallbacks: Record<PodcastTrackId, number> = {
      summary: 373,
      deepdive: 1253,
      lounges: 319,
      'hotel-blueprint': 373,
      voucher: 345,
      flights: 370,
      delays: 321,
      commissions: 308,
      resorts: 390,
      guarantee: 332,
      launch: 285,
    };
    const expectedDur = durationFallbacks[activeTrackId] || 320;
    setDuration(expectedDur);

    const handleLoadedMetadata = () => {
      if (audio.duration && isFinite(audio.duration) && !isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && isFinite(audio.duration) && !isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleError = () => {
      console.warn('Primary audio stream failed');
    };

    audio.onloadedmetadata = handleLoadedMetadata;
    audio.oncanplay = handleLoadedMetadata;
    audio.ontimeupdate = handleTimeUpdate;
    audio.onended = handleEnded;
    audio.onerror = handleError;

    if (autoPlay) {
      onPlaybackStart?.();
      audio.play().then(() => setIsPlaying(true)).catch((e) => {
        console.warn('Autoplay blocked:', e);
      });
    }
  };

  // Initial load
  useEffect(() => {
    loadAudio(currentTrack.audioSrc, false);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const switchTrack = (trackId: PodcastTrackId, autoPlay = true) => {
    if (trackId === activeTrackId) {
      togglePlay();
      return;
    }
    const durationFallbacks: Record<PodcastTrackId, number> = {
      summary: 373,
      deepdive: 1253,
      lounges: 319,
      'hotel-blueprint': 373,
      voucher: 345,
      flights: 370,
      delays: 321,
      commissions: 308,
      resorts: 390,
      guarantee: 332,
      launch: 285,
    };
    setActiveTrackId(trackId);
    setDuration(durationFallbacks[trackId] || 320);
    setCurrentTime(0);
    setIsPlaying(autoPlay);
    loadAudio(PODCAST_TRACKS[trackId].audioSrc, autoPlay);
  };

  // When modal is opened, if it was minimized, un-minimize
  useEffect(() => {
    if (isOpen) {
      setIsMinimized(false);
    }
  }, [isOpen]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      onPlaybackStart?.();
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Playback error:', err);
      });
    }
  };

  const seekTo = (seconds: number) => {
    if (!audioRef.current) return;
    const maxDur = duration > 0 ? duration : (activeTrackId === 'summary' ? 310.8 : 1387);
    const target = Math.max(0, Math.min(seconds, maxDur));
    try {
      audioRef.current.currentTime = target;
      setCurrentTime(target);
    } catch (err) {
      console.warn('Seek error:', err);
    }
  };

  const skipSeconds = (delta: number) => {
    if (!audioRef.current) return;
    seekTo(audioRef.current.currentTime + delta);
  };

  const changeSpeed = () => {
    if (!audioRef.current) return;
    const nextIdx = (SPEED_OPTIONS.indexOf(playbackRate) + 1) % SPEED_OPTIONS.length;
    const newSpeed = SPEED_OPTIONS[nextIdx];
    audioRef.current.playbackRate = newSpeed;
    setPlaybackRate(newSpeed);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    audioRef.current.muted = nextMute;
    setIsMuted(nextMute);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Don't render anything if closed and not playing in minimized dock
  if (!isOpen && !isMinimized && !isPlaying) {
    return null;
  }

  // --- MINIMIZED FLOATING DOCK (Visitors can listen while using the calculator) ---
  if (isMinimized || (!isOpen && isPlaying)) {
    return (
      <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-neutral-950/95 border border-amber-400/40 shadow-2xl shadow-black/90 backdrop-blur-xl max-w-sm">
          <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
            <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-neutral-100 truncate">
              {currentTrack.title}
            </p>
            <p className="text-[11px] font-mono text-neutral-400">
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              data-action="toggle-audio"
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 flex items-center justify-center transition cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMinimized(false);
              }}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition cursor-pointer"
              title="Expand Player"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                if (audioRef.current) audioRef.current.pause();
                setIsPlaying(false);
                setIsMinimized(false);
                onClose();
              }}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition cursor-pointer"
              title="Close & Stop"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- FULL MODAL PLAYER ---
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-neutral-900/95 border border-amber-400/30 shadow-2xl shadow-black/95 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs uppercase font-mono tracking-widest text-amber-300 font-semibold">
              {isNorwegian ? 'Atlas Lydguide • Eksklusive Medlemsbriefinger' : 'Atlas Audio Intelligence • Private Member Briefings'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIsMinimized(true);
                onClose();
              }}
              className="p-2 rounded-xl text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              title={isNorwegian ? 'Minimer til bunnlinjen mens du bruker kalkulatoren' : 'Minimize player to bottom bar while browsing'}
            >
              <Minimize2 className="w-4 h-4" />
              <span className="hidden sm:inline">{isNorwegian ? 'Minimer' : 'Minimize Dock'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (audioRef.current) audioRef.current.pause();
                setIsPlaying(false);
                onClose();
              }}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
              title={isNorwegian ? 'Lukk lydspiller' : 'Close player'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Track Switcher Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 rounded-2xl bg-neutral-950 border border-neutral-800">
            <button
              type="button"
              onClick={() => switchTrack('summary')}
              className={`py-2.5 px-3 rounded-xl text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                activeTrackId === 'summary'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{isNorwegian ? '6-Min Oversikt' : '6-Min Briefing'}</span>
            </button>

            <button
              type="button"
              onClick={() => switchTrack('lounges')}
              className={`py-2.5 px-3 rounded-xl text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                activeTrackId === 'lounges'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5 shrink-0" />
              <span>{isNorwegian ? '5-Min Lounger' : '5-Min Lounges'}</span>
              <span className="text-[9px] px-1 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold uppercase">
                {isNorwegian ? 'Ny' : 'New'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => switchTrack('deepdive')}
              className={`py-2.5 px-3 rounded-xl text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                activeTrackId === 'deepdive'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
            >
              <Radio className="w-3.5 h-3.5 shrink-0" />
              <span>{isNorwegian ? '21-Min Dybde' : '21-Min Deep Dive'}</span>
            </button>
          </div>

          {/* Episode Series Selector (Allows listening to all 9 nurture episodes) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-xs font-mono">
            <span className="text-neutral-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              <span>{isNorwegian ? 'Velg episode fra podcast-serien:' : 'Select episode from series:'}</span>
            </span>
            <select
              value={activeTrackId}
              onChange={(e) => switchTrack(e.target.value as PodcastTrackId)}
              className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs focus:border-amber-400 outline-none font-sans cursor-pointer"
            >
              <option value="summary">{isNorwegian ? 'Ep. 1: Hotellengros (6 min)' : 'Ep. 1: Wholesale Hotels (6 min)'}</option>
              <option value="Hotellpass">{isNorwegian ? 'Ep. 2: 0 kr Rompris: Hotell-Allotments (6 min)' : 'Ep. 2: €0 Room Rate: Hotel Allotments (6 min)'}</option>
              <option value="flights">{isNorwegian ? 'Ep. 3: Duffel NDC Direktefly (6 min)' : 'Ep. 3: Duffel NDC Direct Flights (6 min)'}</option>
              <option value="delays">{isNorwegian ? 'Ep. 4: Automatisert EU261 (5 min)' : 'Ep. 4: Automated EU261 Telemetry (5 min)'}</option>
              <option value="lounges">{isNorwegian ? 'Ep. 5: Flyplasslounger (5 min)' : 'Ep. 5: Wholesale Airport Lounges (5 min)'}</option>
              <option value="commissions">{isNorwegian ? 'Ep. 6: Provisjonsrefusjon (5 min)' : 'Ep. 6: 100% Commission Rebates (5 min)'}</option>
              <option value="resorts">{isNorwegian ? 'Ep. 7: RVC 7-netters leiligheter (7 min)' : 'Ep. 7: RVC 7-Night Condominiums (7 min)'}</option>
              <option value="guarantee">{isNorwegian ? 'Ep. 8: 100% Verdigaranti (6 min)' : 'Ep. 8: 100% Value Guarantee (6 min)'}</option>
              <option value="launch">{isNorwegian ? 'Ep. 9: Lanseringsmanual (5 min)' : 'Ep. 9: Launch Day Playbook (5 min)'}</option>
              <option value="deepdive">{isNorwegian ? 'Dybde: Duopol-etterforskning (21 min)' : 'Deep Dive: Travel Duopoly (21 min)'}</option>
            </select>
          </div>

          {/* Hero Audio Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Vinyl / Cover Art */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-amber-400/20 via-neutral-900 to-neutral-950 border border-amber-400/40 p-3 flex flex-col justify-between items-center text-center shadow-xl shadow-black/80 shrink-0">
              <Headphones className="w-10 h-10 text-amber-300 mt-2" />
              <div className="w-full">
                <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold block">
                  NotebookLM
                </span>
                <span className="text-[9px] text-neutral-400 block font-mono">
                  {currentTrack.durationLabel}
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <div className="text-center sm:text-left space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-[11px] font-mono">
                <Sparkles className="w-3 h-3" />
                <span>{currentTrack.badge}</span>
              </div>
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-neutral-100 leading-snug">
                {currentTrack.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {currentTrack.description}
              </p>
            </div>
          </div>

          {/* Interactive Waveform / Scrubber Bar */}
          <div className="space-y-2 bg-neutral-950/70 p-4 rounded-2xl border border-neutral-800">
            {/* Scrubber slider */}
            <div className="relative w-full h-3 flex items-center cursor-pointer group">
              <input
                type="range"
                min={0}
                max={duration || (activeTrackId === 'summary' ? 310.8 : 1387)}
                value={currentTime}
                onChange={(e) => seekTo(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400 group-hover:h-2 transition-all"
              />
            </div>

            {/* Time Indicators */}
            <div className="flex justify-between text-xs font-mono text-neutral-400">
              <span>{formatTime(currentTime)}</span>
              <span className="text-amber-300/80">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Core Transport Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-2">
            {/* Left: Speed Selector */}
            <button
              type="button"
              onClick={changeSpeed}
              className="px-3 py-1.5 rounded-xl border border-neutral-700 bg-neutral-800/80 hover:bg-neutral-800 text-xs font-mono font-semibold text-neutral-200 transition cursor-pointer"
              title="Change Playback Speed"
            >
              {playbackRate}x Speed
            </button>

            {/* Center: Rewind, Play/Pause, Fast Forward */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => skipSeconds(-15)}
                className="p-2.5 rounded-full text-neutral-300 hover:text-amber-300 hover:bg-neutral-800 transition cursor-pointer"
                title="Rewind 15 seconds"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                type="button"
                data-action="toggle-audio"
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold flex items-center justify-center shadow-xl shadow-amber-500/30 transition transform active:scale-95 cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-neutral-950" />
                ) : (
                  <Play className="w-6 h-6 fill-neutral-950 ml-1" />
                )}
              </button>

              <button
                type="button"
                onClick={() => skipSeconds(15)}
                className="p-2.5 rounded-full text-neutral-300 hover:text-amber-300 hover:bg-neutral-800 transition cursor-pointer"
                title="Fast forward 15 seconds"
              >
                <RotateCcw className="w-5 h-5 -scale-x-100" />
              </button>
            </div>

            {/* Right: Volume & Download */}
            <div className="flex items-center gap-2">
              <a
                href={currentTrack.audioSrc}
                download={currentTrack.downloadFilename}
                className="p-2 rounded-xl border border-neutral-700 bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 hover:text-amber-300 transition cursor-pointer flex items-center gap-1.5 text-xs font-mono"
                title="Download MP3 for offline listening"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">MP3</span>
              </a>

              <button
                type="button"
                onClick={toggleMute}
                className="p-2 rounded-xl border border-neutral-700 bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 hover:text-white transition cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Bottom Founder Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-400/15 via-neutral-900 to-neutral-950 border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-xs font-bold text-amber-300">
                {isNorwegian ? 'Klar til å oppleve ekte engrospriser?' : 'Ready to unlock wholesale rates?'}
              </p>
              <p className="text-[11px] text-neutral-400">
                {isNorwegian ? 'Sikre gratis 3-dagers hotellopphold for 2 og 0 kr påslag.' : 'Secure free 3-day European hotel stay for 2 & zero markups.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenWaitlist();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{isNorwegian ? 'Reserver plass gratis' : 'Reserve Spot Free'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
