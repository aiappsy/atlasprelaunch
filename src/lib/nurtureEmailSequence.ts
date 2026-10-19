/**
 * ATLAS Prelaunch 2026/2027 - Automated Email Nurture & Conversion Sequence
 * Legal Entity: HARD ROCK CAPITAL LTD (UK Reg. #16833237)
 * Founder: Pål Juritzen | Target: 100 Founding Members @ 1 290 NOK (€110) on January 20, 2027
 */

export interface EmailSubscriberContext {
  fullName: string;
  email: string;
  inviteCode: string;
  registeredDate?: string;
  phone?: string;
}

export interface NurtureEmailTemplate {
  id: string;
  stageNumber: number;
  stageName: string;
  scheduledTiming: string;
  subjectNo: string;
  subjectEn: string;
  preheaderNo: string;
  preheaderEn: string;
  podcastTitleNo?: string;
  podcastTitleEn?: string;
  podcastDuration?: string;
  podcastDescriptionNo?: string;
  podcastDescriptionEn?: string;
  podcastUrl?: string;
  getHtmlContent: (ctx: EmailSubscriberContext) => string;
}

export const NURTURE_EMAIL_SEQUENCE: NurtureEmailTemplate[] = [
  // =========================================================================
  // STAGE 1: IMMEDIATE CONFIRMATION (DAY 0)
  // =========================================================================
  {
    id: 'email_1_welcome',
    stageNumber: 1,
    stageName: 'Trinn 1: Velkomst & Reservering',
    scheduledTiming: 'Umiddelbart ved registrering (Dag 0)',
    subjectNo: '👑 Velkommen til ATLAS: Din Founding Member-kvote er reservert',
    subjectEn: '👑 Welcome to ATLAS: Your Founding Member Allocation is Reserved',
    preheaderNo: 'Ditt 3-dagers luksushotellopphold for 2 er registrert. Se din referansekode.',
    preheaderEn: 'Your complimentary 3-day hotel break for two is reserved. View your code.',
    podcastTitleNo: 'Episode 1: «Slik omgår du de skjulte hotellpåslagene»',
    podcastTitleEn: 'Episode 1: "How to Bypass Hidden Hotel Markups"',
    podcastDuration: '06:13 min',
    podcastDescriptionNo: 'En uformell samtale om hvordan private klubber omgår prisparitet og åpner hemmelige hotellgrossister bak passord.',
    podcastDescriptionEn: 'An investigative briefing exposing rate parity legal clauses and how private clubs access net wholesale bedbank rates.',
    podcastUrl: 'https://atlasprelaunch.web.app?podcast=hotel-blueprint',
    getHtmlContent: (ctx) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f5; border: 1px solid #d4af3740; border-radius: 16px; overflow: hidden;">
        <div style="padding: 28px 32px; background: linear-gradient(135deg, #1c1917 0%, #0a0a0a 100%); border-bottom: 1px solid #d4af3730;">
          <div style="font-size: 22px; font-weight: 700; letter-spacing: 4px; color: #ffffff; font-family: 'Cinzel', Georgia, serif;">ATLAS</div>
          <div style="font-size: 11px; font-family: monospace; color: #f59e0b; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px;">Founding Member Registry • 2027 Launch</div>
        </div>
        <div style="padding: 32px;">
          <h2 style="font-size: 20px; color: #f3f4f6; margin-top: 0;">Hei, ${ctx.fullName}.</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;">
            Din plass på ventelisten for <strong>ATLAS Travel Club</strong> er herved offisielt registrert. Du er blant de utvalgte kandidatene som har reservert 1 av våre <strong>100 første Founding-medlemskap</strong>.
          </p>
          
          <div style="background: #171717; border: 1px solid #d4af3750; border-radius: 12px; padding: 20px; margin: 24px 0;">
            <div style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #9ca3af;">Din personlige reservasjonskode</div>
            <div style="font-size: 26px; font-family: monospace; font-weight: 700; letter-spacing: 3px; color: #fbbf24; margin: 6px 0 16px 0;">${ctx.inviteCode}</div>
            
            <div style="border-top: 1px solid #262626; padding-top: 14px; font-size: 13px; color: #e5e7eb; line-height: 1.6;">
              <div style="margin-bottom: 6px;">🎁 <strong>Europeisk weekend-opphold for 2 personer</strong> i Europa (verdi inntil 4 500 kr / ca. €400)</div>
              <div style="margin-bottom: 6px;">⚡ <strong>Rå engrospriser for livstid</strong> på fly og over 1 200 000 hoteller globalt</div>
              <div style="margin-bottom: 6px;">🛡️ <strong>100% Fornøyd- & Verdigaranti</strong> på ditt første hotellopphold (2+ netter), ferieleilighet eller samlede årsreiser</div>
              <div>⚡ <strong>0 kr påslag for livstid</strong> på fly, leiebil og over 1 200 000 hoteller globalt</div>
            </div>
          </div>

          <!-- Embedded Podcast Episode 1 Card -->
          <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, #141414 100%); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 12px; padding: 18px 20px; margin: 24px 0;">
            <div style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #fbbf24; font-weight: bold; margin-bottom: 4px;">
              🎧 Lytt til Episode 1 (06:13 min)
            </div>
            <div style="font-size: 14px; font-weight: bold; color: #ffffff; margin-bottom: 6px;">
              «Slik omgår du de skjulte hotellpåslagene»
            </div>
            <p style="font-size: 12px; line-height: 1.5; color: #9ca3af; margin: 0 0 12px 0;">
              Hør hvorfor Booking.com og Expedia tvinger hoteller til å signere prisparitetsklausuler, og hvordan private klubber juridisk kan tilby rå B2B-engrospriser.
            </p>
            <a href="https://atlasprelaunch.web.app?podcast=hotel-blueprint" style="display: inline-block; font-size: 11px; font-family: monospace; font-weight: bold; color: #0a0a0a; background: linear-gradient(90deg, #fbbf24, #f59e0b); text-decoration: none; padding: 8px 16px; border-radius: 6px;">
              ▶ Hør Episoden i Lydspilleren
            </a>
          </div>

          <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 10px; padding: 14px 18px; margin: 20px 0; font-size: 12px; line-height: 1.5; color: #fde68a;">
            ⏳ <strong>Lanseringstidspunkt:</strong> Dørene åpner <strong>onsdag 20. januar 2027 kl. 10:00 CET</strong> (1 290 kr / €110 per år). Tildelingen av de 100 gratis hotelloppholdene skjer etter førstemann-til-mølla-prinsippet. Du har 48 timer på å fullføre aktiveringen før plassen overføres til neste person på ventelisten.
          </div>

          <div style="border-top: 1px solid #262626; padding-top: 20px; margin-top: 28px; font-size: 12px; font-family: monospace; color: #6b7280;">
            Vennlig hilsen,<br>
            <strong style="color: #d1d5db;">Pål Juritzen & ATLAS Medlemskomité</strong><br>
            Hard Rock Capital Ltd • 71-75 Shelton Street, London, WC2H 9JQ • https://atlasclub.web.app
          </div>
        </div>
      </div>
    `,
  },

  // =========================================================================
  // STAGE 2: the Allotment Protocol (DAY 4)
  // =========================================================================
  {
    id: 'email_2_hotel_allotment_secret',
    stageNumber: 2,
    stageName: 'Trinn 2: Sannheten om 0 kr rompris',
    scheduledTiming: '4 dager etter registrering',
    subjectNo: '🍷 Hvordan kan hotellrommet være 100% gratis? (Sannheten om hotell-allotments)',
    subjectEn: '🍷 How can the hotel room be 100% free? (the Allotment Protocol)',
    preheaderNo: 'Her er matematikken bak hvordan ATLAS sikrer eksklusive weekend-opphold for to.',
    preheaderEn: 'Here is how ATLAS secures curated European weekend escapes for two.',
    podcastTitleNo: 'Episode 2: «Sannheten om 0 kr rompris: Hotell-Allotment-Modellen»',
    podcastTitleEn: 'Episode 2: "The Math Behind Zero-Euro Hotel Stays"',
    podcastDuration: '05:45 min',
    podcastDescriptionNo: 'Slik samarbeider utvalgte boutique- og spahoteller med private klubber for å tilby eksklusive weekend-opphold.',
    podcastDescriptionEn: 'How European boutique and wellness retreats partner with private clubs to allocate exclusive short breaks.',
    podcastUrl: 'https://atlasprelaunch.web.app?perk=voucher&podcast=voucher',
    getHtmlContent: (ctx) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f5; border: 1px solid #d4af3740; border-radius: 16px; overflow: hidden;">
        <div style="padding: 28px 32px; background: linear-gradient(135deg, #1c1917 0%, #0a0a0a 100%); border-bottom: 1px solid #d4af3730;">
          <div style="font-size: 22px; font-weight: 700; letter-spacing: 4px; color: #ffffff; font-family: 'Cinzel', Georgia, serif;">ATLAS</div>
          <div style="font-size: 11px; font-family: monospace; color: #f59e0b; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px;">Forensic Travel Intelligence • Case Study #01</div>
        </div>
        <div style="padding: 32px;">
          <h2 style="font-size: 20px; color: #f3f4f6; margin-top: 0;">Hei, ${ctx.fullName}.</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;">
            Når folk hører at de første 100 Founding-medlemmene i ATLAS mottar et <strong>Europeisk Weekend-opphold for to personer i Europa</strong> som velkomstgave, er det første spørsmålet: <em>«Hvordan er dette mulig?»</em>
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;">
            Svaret er at det finnes ingen hake – men en genial, transparent forretningsmodell basert på <strong>overskuddskapasitet</strong>.
          </p>

          <div style="background: #171717; border-left: 4px solid #f59e0b; padding: 18px 20px; border-radius: 0 12px 12px 0; margin: 20px 0;">
            <h4 style="margin: 0 0 8px 0; color: #fbbf24; font-size: 14px;">Slik fungerer European Hospitality Allotment-modellen:</h4>
            <p style="font-size: 13px; line-height: 1.6; color: #d1d5db; margin: 0;">
              Over hele Europa (Dolomittene, Schwarzwald, Provence, Salzburg, Gardasjøen) har <strong>over 1 500 boutique- og velværerhoteller</strong> ledige rom i midtuke- og skuldresesonger. Gjennom europeiske hotell-allotments stiller hotellene selve <strong>rommet til 0 kr disposisjon</strong>. Verditilgodelappen dekker 100% av romprisen for 2 gjester.
            </p>
          </div>

          <!-- Embedded Podcast Episode 2 Card -->
          <div style="background: #171717; border: 1px solid #d4af3740; border-radius: 10px; padding: 16px; margin: 20px 0;">
            <div style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #fbbf24; margin-bottom: 4px;">
              🎧 Podcast Episode 2 Inkludert (05:45 min)
            </div>
            <div style="font-size: 13px; font-weight: bold; color: #ffffff; margin-bottom: 6px;">
              «Sannheten om 0 kr rompris: Hotell-Allotment-Modellen»
            </div>
            <p style="font-size: 12px; color: #9ca3af; line-height: 1.4; margin-bottom: 12px;">
              Hør hvorfor europeiske hoteller heller vil gi bort rommet gratis enn å la sengene stå tomme – og hvordan matematikken går opp for både gjest og hotelleier.
            </p>
            <a href="https://atlasprelaunch.web.app?perk=voucher&podcast=voucher" style="display: inline-block; font-size: 11px; font-family: monospace; font-weight: bold; color: #0a0a0a; background: linear-gradient(90deg, #fbbf24, #f59e0b); text-decoration: none; padding: 7px 14px; border-radius: 6px;">
              ▶ Hør Forklaringen i Lydspilleren
            </a>
          </div>

          <div style="border-top: 1px solid #262626; padding-top: 20px; font-size: 12px; font-family: monospace; color: #6b7280;">
            Lansering: Onsdag 20. januar 2027 kl. 10:00 CET • Hard Rock Capital Ltd
          </div>
        </div>
      </div>
    `,
  },

  // =========================================================================
  // STAGE 3: DIRECT FLIGHTS & DUFFEL NDC (DAY 8)
  // =========================================================================
  {
    id: 'email_3_direct_flights',
    stageNumber: 3,
    stageName: 'Trinn 3: Direkte flybilletter via Duffel NDC',
    scheduledTiming: '8 dager etter registrering',
    subjectNo: '✈️ Hvorfor koster flybilletter mer hos reisebyråer? (Duffel NDC-avsløringen)',
    subjectEn: '✈️ Why do flights cost more through agencies? (The Duffel NDC reveal)',
    preheaderNo: 'Slik kutter vi ut fordyrende GDS-mellomledd og selger fly til ren nettopris.',
    preheaderEn: 'How we bypass legacy GDS markups to deliver commeResort Allotment Networkal flights at pure net cost.',
    podcastTitleNo: 'Episode 3: «Hvorfor mellomledd blåser opp flybillettpriser»',
    podcastTitleEn: 'Episode 3: "How Flight Middlemen Inflate Ticket Prices"',
    podcastDuration: '06:10 min',
    podcastDescriptionNo: 'Hvordan tradisjonelle GDS-systemer legger på skjulte gebyrer, og hvordan Duffel NDC direkte API gir rå nettopriser og tilvalg til kostpris.',
    podcastDescriptionEn: 'How legacy GDS distribution inflates airfares and how Duffel NDC direct APIs unlock unbundled net fares and ancillaries at pure airline cost.',
    podcastUrl: 'https://atlasprelaunch.web.app?podcast=flights',
    getHtmlContent: (ctx) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f5; border: 1px solid #38bdf840; border-radius: 16px; overflow: hidden;">
        <div style="padding: 28px 32px; background: linear-gradient(135deg, #082f49 0%, #0a0a0a 100%); border-bottom: 1px solid #38bdf830;\">
          <div style="font-size: 22px; font-weight: 700; letter-spacing: 4px; color: #ffffff; font-family: 'Cinzel', Georgia, serif;\">ATLAS</div>
          <div style="font-size: 11px; font-family: monospace; color: #38bdf8; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px;\">Aviation Architecture • Case Study #02</div>
        </div>
        <div style="padding: 32px;\">
          <h2 style="font-size: 20px; color: #f3f4f6; margin-top: 0;\">Hei, ${ctx.fullName}.</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;\">
            Visste du at flyselskaper i gjennomsnitt kun har 2–6% margin, mens reisesøkemotorer og tradisjonelle GDS-mellomledd legger på hundrevis av kroner per billett?
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;\">
            Gjennom vår direkte API-integrasjon med <strong>Duffel NDC (New Distribution Capability)</strong> kobler ATLAS seg direkte til flyselskapenes sentrale inventar. Vi fjerner fordyrende mellomledd og selger både flybilletter, setevalg og ekstra bagasje til <strong>0 kr i påslag</strong>.
          </p>

          <!-- Embedded Podcast Episode 3 Card -->
          <div style="background: #171717; border: 1px solid #38bdf840; border-radius: 10px; padding: 16px; margin: 20px 0;\">
            <div style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #38bdf8; margin-bottom: 4px;\">
              🎧 Podcast Episode 3 Inkludert (06:10 min)
            </div>
            <div style="font-size: 13px; font-weight: bold; color: #ffffff; margin-bottom: 6px;\">
              «Hvorfor mellomledd blåser opp flybillettpriser»
            </div>
            <p style="font-size: 12px; color: #9ca3af; line-height: 1.4; margin-bottom: 12px;\">
              Hør hvordan NDC-teknologien revolusjonerer flybooking, og hvorfor uavhengige reisende sparer 5% til 14% på hver eneste flytur.
            </p>
            <a href="https://atlasprelaunch.web.app?podcast=flights" style="display: inline-block; font-size: 11px; font-family: monospace; font-weight: bold; color: #ffffff; background: linear-gradient(90deg, #0284c7, #38bdf8); text-decoration: none; padding: 7px 14px; border-radius: 6px;\">
              ▶ Hør Flyepisoden i Lydspilleren
            </a>
          </div>

          <div style="border-top: 1px solid #262626; padding-top: 20px; font-size: 12px; font-family: monospace; color: #6b7280;\">
            Lansering: Onsdag 20. januar 2027 kl. 10:00 CET • Hard Rock Capital Ltd
          </div>
        </div>
      </div>
    `,
  },

  // =========================================================================
  // STAGE 4: AUTOMATED EU261 & TELEMETRY (DAY 12)
  // =========================================================================
  {
    id: 'email_4_eu261_delays',
    stageNumber: 4,
    stageName: 'Trinn 4: Automatisert EU261 flyforsinkelse',
    scheduledTiming: '12 dager etter registrering',
    subjectNo: '⚖️ Forsinket fly? Slik krever API-er inn opptil 600 € uten provisjonskutt',
    subjectEn: '⚖️ Flight delayed? How APIs recover up to €600 with zero fee deduction',
    preheaderNo: '85% av passasjerer krever aldri erstatning. ATLAS automatiserer hele prosessen.',
    preheaderEn: '85% of passengers leave statutory cash behind. ATLAS automates legal claims.',
    podcastTitleNo: 'Episode 4: «Slik krever API-er inn EU261-erstatning automatisk»',
    podcastTitleEn: 'Episode 4: "How APIs Force Flight Delay Payouts"',
    podcastDuration: '05:21 min',
    podcastDescriptionNo: 'Hvordan automatisert telemetri fanger opp 3 timers forsinkelser, genererer juridiske kravdokumenter og utbetaler 100% av erstatningen uten 35-50% i gebyr.',
    podcastDescriptionEn: 'How automated telemetry detects 3-hour disruptions, generates formatted claims under EC 261/2004, and deposits 100% of compensation with 0% fee cut.',
    podcastUrl: 'https://atlasprelaunch.web.app?podcast=delays',
    getHtmlContent: (ctx) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f5; border: 1px solid #10b98140; border-radius: 16px; overflow: hidden;\">
        <div style="padding: 28px 32px; background: linear-gradient(135deg, #064e3b 0%, #0a0a0a 100%); border-bottom: 1px solid #10b98130;\">
          <div style="font-size: 22px; font-weight: 700; letter-spacing: 4px; color: #ffffff; font-family: 'Cinzel', Georgia, serif;\">ATLAS</div>
          <div style="font-size: 11px; font-family: monospace; color: #10b981; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px;\">Passenger Rights Telemetry • Case Study #03</div>
        </div>
        <div style="padding: 32px;\">
          <h2 style="font-size: 20px; color: #f3f4f6; margin-top: 0;\">Hei, ${ctx.fullName}.</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;\">
            Under europeisk lovgivning (EU-forordning 261/2004 og UK261) har passasjerer lovmessig krav på <strong>250 €, 400 € eller 600 € i kontanterstatning</strong> ved over 3 timers forsinkelse. Likevel krever 85% aldri pengene.
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;\">
            Tradisjonelle kravselskaper (AirHelp m.fl.) tar ofte <strong>35% til 50% i provisjon</strong> av erstatningen din. Fordi ATLAS ikke er et kravselskap, men en medlemsklubb, <strong>beholder du 100% av pengene</strong> rett inn på egen bankkonto.
          </p>

          <!-- Embedded Podcast Episode 4 Card -->
          <div style="background: #171717; border: 1px solid #10b98140; border-radius: 10px; padding: 16px; margin: 20px 0;\">
            <div style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #10b981; margin-bottom: 4px;\">
              🎧 Podcast Episode 4 Inkludert (05:21 min)
            </div>
            <div style="font-size: 13px; font-weight: bold; color: #ffffff; margin-bottom: 6px;\">
              «Slik krever API-er inn EU261-erstatning automatisk»
            </div>
            <p style="font-size: 12px; color: #9ca3af; line-height: 1.4; margin-bottom: 12px;\">
              Hør hvordan telemetri overvåker flytider i sanntid og genererer vanntette juridiske kravdokumenter så snart flyselskapets klokke passerer 3 timer.
            </p>
            <a href="https://atlasprelaunch.web.app?podcast=delays" style="display: inline-block; font-size: 11px; font-family: monospace; font-weight: bold; color: #0a0a0a; background: linear-gradient(90deg, #10b981, #34d399); text-decoration: none; padding: 7px 14px; border-radius: 6px;\">
              ▶ Hør EU261-Episoden i Lydspilleren
            </a>
          </div>

          <div style="border-top: 1px solid #262626; padding-top: 20px; font-size: 12px; font-family: monospace; color: #6b7280;\">
            Lansering: Onsdag 20. januar 2027 kl. 10:00 CET • Hard Rock Capital Ltd
          </div>
        </div>
      </div>
    `,
  },

  // =========================================================================
  // STAGE 5: AIRPORT LOUNGES & TRANSIT COPILOT (DAY 16)
  // =========================================================================
  {
    id: 'email_5_airport_lounges',
    stageNumber: 5,
    stageName: 'Trinn 5: Flyplasslounger uten kredittkortgebyrer',
    scheduledTiming: '16 dager etter registrering',
    subjectNo: '🛋️ Flyplasslounger til 270 kr – kutt ut 6 000 kr i kredittkortavgifter',
    subjectEn: '🛋️ Airport lounges at €24 (270 kr) – skip €500+ credit card fees',
    preheaderNo: 'Kjøp digitale QR-pass til rå engrospris over hele verden. Null påslag.',
    preheaderEn: 'Buy digital QR lounge passes at pure wholesale cost worldwide. Zero markup.',
    podcastTitleNo: 'Episode 5: «Flyplasslounger til engrospris uten dyre kredittkort»',
    podcastTitleEn: 'Episode 5: "Wholesale Airport Lounges Without Credit Cards"',
    podcastDuration: '05:19 min',
    podcastDescriptionNo: 'Kutt fordyrende ledd: digitale loungebekreftelser til 270–310 kr (via global B2B lounge access), pass til familie uten påslag, og Transit Copilot sanntidsradar.',
    podcastDescriptionEn: 'How ATLAS unbundles airport perks: digital lounge passes at pure wholesale cost (€24–€28), family companion rates, and real-time Transit Copilot layover radar.',
    podcastUrl: 'https://atlasprelaunch.web.app?perk=lounges&podcast=lounges',
    getHtmlContent: (ctx) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f5; border: 1px solid #38bdf840; border-radius: 16px; overflow: hidden;\">
        <div style="padding: 28px 32px; background: linear-gradient(135deg, #0c4a6e 0%, #0a0a0a 100%); border-bottom: 1px solid #38bdf830;\">
          <div style="font-size: 22px; font-weight: 700; letter-spacing: 4px; color: #ffffff; font-family: 'Cinzel', Georgia, serif;\">ATLAS</div>
          <div style="font-size: 11px; font-family: monospace; color: #38bdf8; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px;\">Airport Logistics • Case Study #04</div>
        </div>
        <div style="padding: 32px;\">
          <h2 style="font-size: 20px; color: #f3f4f6; margin-top: 0;\">Hei, ${ctx.fullName}.</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;\">
            Visste du at premium kredittkort (som SAS Amex Elite eller DNB Saga) koster <strong>5 000 til 8 000 kr i faste årsavgifter</strong> – hovedsakelig for å gi deg adgang til flyplasslounger?
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;\">
            ATLAS unbundler flyplasslogistikken: Som medlem kjøper du digitale QR-loungepass etter behov til <strong>ren engros nettopris (270–310 kr / €23–€26)</strong> for over 1 300 flyplasslounger globalt. Reisefølget og familien din betaler nøyaktig samme engrospris uten påslag!
          </p>

          <!-- Embedded Podcast Episode 5 Card -->
          <div style="background: #171717; border: 1px solid #38bdf840; border-radius: 10px; padding: 16px; margin: 20px 0;\">
            <div style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #38bdf8; margin-bottom: 4px;\">
              🎧 Podcast Episode 5 Inkludert (05:19 min)
            </div>
            <div style="font-size: 13px; font-weight: bold; color: #ffffff; margin-bottom: 6px;\">
              «Flyplasslounger til engrospris uten dyre kredittkort»
            </div>
            <p style="font-size: 12px; color: #9ca3af; line-height: 1.4; margin-bottom: 12px;\">
              Hør hvordan ATLAS kobler seg direkte på det globale loungenettverket, og hvordan Transit Copilot regner ut gangtider til avgangsgaten din på travle knutepunkt.
            </p>
            <a href="https://atlasprelaunch.web.app?perk=lounges&podcast=lounges" style="display: inline-block; font-size: 11px; font-family: monospace; font-weight: bold; color: #ffffff; background: linear-gradient(90deg, #0284c7, #38bdf8); text-decoration: none; padding: 7px 14px; border-radius: 6px;\">
              ▶ Hør Lounge-Episoden i Lydspilleren
            </a>
          </div>

          <div style="border-top: 1px solid #262626; padding-top: 20px; font-size: 12px; font-family: monospace; color: #6b7280;\">
            Lansering: Onsdag 20. januar 2027 kl. 10:00 CET • Hard Rock Capital Ltd
          </div>
        </div>
      </div>
    `,
  },

  // =========================================================================
  // STAGE 6: COMMISSION REBATES ON CRUISES & LUXURY (DAY 20)
  // =========================================================================
  {
    id: 'email_6_commission_rebates',
    stageNumber: 6,
    stageName: 'Trinn 6: Provisjonsrevolusjonen på Cruise & Luksus',
    scheduledTiming: '20 dager etter registrering',
    subjectNo: '💳 Hvor blir de 10-16% provisjonene av? Slik fungerer Rewards Vault',
    subjectEn: '💳 Where do the 10-16% commissions go? Inside Rewards Vault',
    preheaderNo: 'ATLAS beholder null reisebyråprovisjoner. Alt tilbakeføres til medlemmet.',
    preheaderEn: 'ATLAS retains zero travel commissions. Everything rebates to the member.',
    podcastTitleNo: 'Episode 6: «Slik betaler ATLAS 100% av provisjonen tilbake til deg»',
    podcastTitleEn: 'Episode 6: "How ATLAS Returns Hidden Travel Commissions"',
    podcastDuration: '05:08 min',
    podcastDescriptionNo: 'Hvorfor rederier og luksushoteller betaler 10%–16% i provisjon, og hvordan ATLAS overfører hver eneste krone rett inn i din Rewards Vault.',
    podcastDescriptionEn: 'Why cruise lines and luxury hotel chains pay 10%–16% commissions, and how ATLAS passes 100% of these commissions directly to members as Rewards Vault credits.',
    podcastUrl: 'https://atlasprelaunch.web.app?podcast=commissions',
    getHtmlContent: (ctx) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f5; border: 1px solid #d4af3740; border-radius: 16px; overflow: hidden;\">
        <div style="padding: 28px 32px; background: linear-gradient(135deg, #1c1917 0%, #0a0a0a 100%); border-bottom: 1px solid #d4af3730;\">
          <div style="font-size: 22px; font-weight: 700; letter-spacing: 4px; color: #ffffff; font-family: 'Cinzel', Georgia, serif;\">ATLAS</div>
          <div style="font-size: 11px; font-family: monospace; color: #f59e0b; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px;\">The Rebate Revolution • Case Study #05</div>
        </div>
        <div style="padding: 32px;\">
          <h2 style="font-size: 20px; color: #f3f4f6; margin-top: 0;\">Hei, ${ctx.fullName}.</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;\">
            Når du bestiller et cruise til 30 000 kr eller et 5-stjerners luksushotell via et tradisjonelt reisebyrå, betaler leverandøren <strong>10% til 16% i ren provisjon</strong> (3 000–4 800 kr) direkte til byrået.
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;\">
            ATLAS er bygget på <strong>Costco-modellen</strong>: Vi lever utelukkende av vår faste medlemskontingent (1 290 kr/år). Vi beholder 0 kr i reisebyråprovisjoner. Hver eneste krone fra cruiserederier og luksuskjeder overføres 100% rett tilbake til din <strong>Rewards Vault</strong> som reisekreditter for fremtidige ferier!
          </p>

          <!-- Embedded Podcast Episode 6 Card -->
          <div style="background: #171717; border: 1px solid #d4af3740; border-radius: 10px; padding: 16px; margin: 20px 0;\">
            <div style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #fbbf24; margin-bottom: 4px;\">
              🎧 Podcast Episode 6 Inkludert (05:08 min)
            </div>
            <div style="font-size: 13px; font-weight: bold; color: #ffffff; margin-bottom: 6px;\">
              «Slik betaler ATLAS 100% av provisjonen tilbake til deg»
            </div>
            <p style="font-size: 12px; color: #9ca3af; line-height: 1.4; margin-bottom: 12px;\">
              Hør hvordan vi overholder cruiserederienes strenge prisregler (100% rate parity i kassen), samtidig som medlemmene høster all fortjeneste gjennom lukkede lojalitetskreditter.
            </p>
            <a href="https://atlasprelaunch.web.app?podcast=commissions" style="display: inline-block; font-size: 11px; font-family: monospace; font-weight: bold; color: #0a0a0a; background: linear-gradient(90deg, #fbbf24, #f59e0b); text-decoration: none; padding: 7px 14px; border-radius: 6px;\">
              ▶ Hør Provisjonsavsløringen i Lydspilleren
            </a>
          </div>

          <div style="border-top: 1px solid #262626; padding-top: 20px; font-size: 12px; font-family: monospace; color: #6b7280;\">
            Lansering: Onsdag 20. januar 2027 kl. 10:00 CET • Hard Rock Capital Ltd
          </div>
        </div>
      </div>
    `,
  },

  // =========================================================================
  // STAGE 7: RESORT CONDOS 7 NIGHTS (DAY 24)
  // =========================================================================
  {
    id: 'email_7_rvc_condos',
    stageNumber: 7,
    stageName: 'Trinn 7: 7-netters ferieleiligheter fra 3 490 kr',
    scheduledTiming: '24 dager etter registrering',
    subjectNo: '🏖️ 7 netter i Marbella eller Tenerife fra 3 490 kr? Her er beviset',
    subjectEn: '🏖️ 7 nights in Marbella or Tenerife from €299 (fra 3 490 kr)? Here is the proof',
    preheaderNo: 'Slik sparer en barnefamilie over 15 000 kr på én eneste ukesferie.',
    preheaderEn: 'How a family saves over €1,300 (15,000 NOK) on a single vacation.',
    podcastTitleNo: 'Episode 7: «Resort-smutthullet: 7-netters ferieleiligheter fra 3 490 kr»',
    podcastTitleEn: 'Episode 7: "How Luxury Resorts Secretly Liquidate Empty Suites"',
    podcastDuration: '06:30 min',
    podcastDescriptionNo: 'Slik fyller RVC og Panorama luksusleiligheter for 2 til 6 personer i Spania, Hellas og Italia til rydningspriser (fra 83 kr per person per natt).',
    podcastDescriptionEn: 'How RVC and Panorama liquidate luxury condominium apartments for 2 to 6 guests from €299 for full 7-night stays.',
    podcastUrl: 'https://atlasprelaunch.web.app?perk=rvc&podcast=resorts',
    getHtmlContent: (ctx) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f5; border: 1px solid #38bdf840; border-radius: 16px; overflow: hidden;\">
        <div style="padding: 28px 32px; background: linear-gradient(135deg, #1e1b4b 0%, #0a0a0a 100%); border-bottom: 1px solid #38bdf830;\">
          <div style="font-size: 22px; font-weight: 700; letter-spacing: 4px; color: #ffffff; font-family: 'Cinzel', Georgia, serif;\">ATLAS</div>
          <div style="font-size: 11px; font-family: monospace; color: #38bdf8; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px;\">Condominium Liquidation • Case Study #06</div>
        </div>
        <div style="padding: 32px;\">
          <h2 style="font-size: 20px; color: #f3f4f6; margin-top: 0;\">Hei, ${ctx.fullName}.</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;\">
            Hva betaler en typisk familie for en 2-roms ferieleilighet med kjøkken og svømmebasseng i Marbella, Tenerife eller på Mallorca i ferien? På Booking.com og Airbnb ligger prisen vanligvis på <strong>16 000 til 25 000 kr for 7 netter</strong>.
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;\">
            Gjennom RVC- og Panorama-nettverket fyller ATLAS restplasser i ferieleiligheter fra <strong>kun 3 490 NOK (€299) for hele uken</strong>. For en familie på 4 til 6 personer tilsvarer det kun <strong>83 kr per person per natt</strong>!
          </p>

          <!-- Embedded Podcast Episode 7 Card -->
          <div style="background: #171717; border: 1px solid #38bdf840; border-radius: 10px; padding: 16px; margin: 20px 0;\">
            <div style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #38bdf8; margin-bottom: 4px;\">
              🎧 Podcast Episode 7 Inkludert (06:30 min)
            </div>
            <div style="font-size: 13px; font-weight: bold; color: #ffffff; margin-bottom: 6px;\">
              «Resort-smutthullet: 7-netters ferieleiligheter fra 3 490 kr»
            </div>
            <p style="font-size: 12px; color: #9ca3af; line-height: 1.4; margin-bottom: 12px;\">
              Hør hvordan resortanlegg fyller ledige leiligheter til rydningspriser utenom pakkereisegigantene.
            </p>
            <a href="https://atlasprelaunch.web.app?perk=rvc&podcast=resorts" style="display: inline-block; font-size: 11px; font-family: monospace; font-weight: bold; color: #ffffff; background: linear-gradient(90deg, #0284c7, #38bdf8); text-decoration: none; padding: 7px 14px; border-radius: 6px;\">
              ▶ Hør Leilighetsepisoden i Lydspilleren
            </a>
          </div>

          <div style="border-top: 1px solid #262626; padding-top: 20px; font-size: 12px; font-family: monospace; color: #6b7280;\">
            Lansering: Onsdag 20. januar 2027 kl. 10:00 CET • Hard Rock Capital Ltd
          </div>
        </div>
      </div>
    `,
  },

  // =========================================================================
  // STAGE 8: 7 DAYS TO LAUNCH COUNTDOWN (JANUARY 13, 2027)
  // =========================================================================
  {
    id: 'email_8_launch_countdown',
    stageNumber: 8,
    stageName: 'Trinn 8: 7 Dager til Åpning & Lanseringsmanual',
    scheduledTiming: 'Onsdag 13. januar 2027 kl. 10:00 CET (T-7 dager)',
    subjectNo: '📅 7 dager igjen: Onsdag 20. januar kl. 10:00 åpner ATLAS',
    subjectEn: '📅 7 Days to Go: Wednesday January 20 at 10:00 AM CET ATLAS Opens',
    preheaderNo: 'Kun 100 plasser med Europeisk Weekend-opphold for 2. Gjør deg klar.',
    preheaderEn: 'Only 100 spots with complimentary 3-day hotel break. Get ready.',
    podcastTitleNo: 'Episode 8: «Lanseringsmanualen: 20. januar kl. 10:00»',
    podcastTitleEn: 'Episode 8: "ATLAS Travel Club Zero-Markup Membership"',
    podcastDuration: '04:45 min',
    podcastDescriptionNo: 'Den taktiske veiledningen for åpningsdagen onsdag 20. januar 2027 kl. 10:00: Stripe-utsjekk, tildeling av de 100 gratis hotellene og 48-timers fristen.',
    podcastDescriptionEn: 'The official tactical walkthrough for Launch Day Wednesday, January 20, 2027: Stripe activation, voucher allocation, and the 48-hour deadline.',
    podcastUrl: 'https://atlasprelaunch.web.app?podcast=launch',
    getHtmlContent: (ctx) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f5; border: 2px solid #fbbf24; border-radius: 16px; overflow: hidden;\">
        <div style="padding: 28px 32px; background: linear-gradient(135deg, #29200a 0%, #0a0a0a 100%); border-bottom: 1px solid #fbbf2440;\">
          <div style="font-size: 22px; font-weight: 700; letter-spacing: 4px; color: #ffffff; font-family: 'Cinzel', Georgia, serif;\">ATLAS</div>
          <div style="font-size: 11px; font-family: monospace; color: #fbbf24; text-transform: uppercase; letter-spacing: 1.5px; font-weight: bold; margin-top: 4px;\">LAUNCH COUNTDOWN • 7 DAYS TO GO</div>
        </div>
        <div style="padding: 32px;\">
          <h2 style="font-size: 20px; color: #f3f4f6; margin-top: 0;\">Hei, ${ctx.fullName}.</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;\">
            Om nøyaktig 7 dager åpner vi dørene for den offisielle lanseringen av <strong>ATLAS Travel Club</strong>!
          </p>

          <div style="background: linear-gradient(135deg, #1f1a0e 0%, #141414 100%); border: 2px solid #fbbf24; border-radius: 14px; padding: 24px; text-align: center; margin: 24px 0;\">
            <div style="font-size: 11px; font-family: monospace; color: #f59e0b; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;\">OFFISIELT LANSERINGSTIDSPUNKT</div>
            <div style="font-size: 24px; font-bold; color: #ffffff; margin: 8px 0;\">Onsdag 20. januar 2027 kl. 10:00 CET</div>
            <div style="font-size: 13px; color: #d1d5db;\">Kontingent: 1 290 kr / år (€110) • 100% Fornøyd- & Verdigaranti</div>
          </div>

          <!-- Embedded Podcast Episode 8 Card -->
          <div style="background: #171717; border: 1px solid #d4af3740; border-radius: 10px; padding: 16px; margin: 20px 0;\">
            <div style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #fbbf24; margin-bottom: 4px;\">
              🎧 Podcast Episode 8 Inkludert (04:45 min)
            </div>
            <div style="font-size: 13px; font-weight: bold; color: #ffffff; margin-bottom: 6px;\">
              «Lanseringsmanualen: 20. januar kl. 10:00»
            </div>
            <p style="font-size: 12px; color: #9ca3af; line-height: 1.4; margin-bottom: 12px;\">
              Hør nøyaktig hva som skjer onsdag 20. januar kl. 10:00: Stripe-utsjekk, kupongutstedelse og 48-timers fristen.
            </p>
            <a href="https://atlasprelaunch.web.app?podcast=launch" style="display: inline-block; font-size: 11px; font-family: monospace; font-weight: bold; color: #0a0a0a; background: linear-gradient(90deg, #fbbf24, #f59e0b); text-decoration: none; padding: 7px 14px; border-radius: 6px;\">
              ▶ Hør Lanseringsmanualen i Lydspilleren
            </a>
          </div>

          <p style="font-size: 13px; line-height: 1.6; color: #d1d5db;\">
            Kun de <strong>100 FØRSTE</strong> som aktiverer medlemskapet mottar det gratis 3-dagers luksushotelloppholdet for 2 personer (og deltar i trekningen der 3 får all gourmetmat dekket).
          </p>

          <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 8px; padding: 12px 16px; margin: 18px 0; font-size: 12px; color: #fde68a;\">
            ⚠️ <strong>48-timers regelen:</strong> Du har 48 timer på å aktivere plassen din fra onsdag 20. januar kl. 10:00. Uavhentede plasser overføres automatisk til neste person på listen fredag 22. januar kl. 12:00.
          </div>

          <div style="border-top: 1px solid #262626; padding-top: 20px; font-size: 12px; font-family: monospace; color: #6b7280;\">
            Sett kryss i kalenderen for onsdag 20. januar kl. 10:00 presis!
          </div>
        </div>
      </div>
    `,
  },

  // =========================================================================
  // STAGE 9: 72 HOURS TO LAUNCH & VALUE GUARANTEE (JANUARY 17, 2027)
  // =========================================================================
  {
    id: 'email_9_value_guarantee',
    stageNumber: 9,
    stageName: 'Trinn 9: 72 Timer Igjen & 100% Verdigaranti',
    scheduledTiming: 'Søndag 17. januar 2027 kl. 10:00 CET (T-72 timer)',
    subjectNo: '🛡️ 72 timer igjen: Vår 100% Fornøyd- & Verdigaranti på bordet',
    subjectEn: '🛡️ 72 Hours to Go: Our 100% Value Guarantee explained',
    preheaderNo: 'Spar inn mer enn medlemskontingenten på 1 290 kr, eller få full refusjon.',
    preheaderEn: 'Save more than your €110 (1 290 NOK) fee on your first trip or full refund.',
    podcastTitleNo: 'Episode 9: «Slik garanterer ATLAS 100% innspart kontingent»',
    podcastTitleEn: 'Episode 9: "How ATLAS Guarantees Wholesale Savings"',
    podcastDuration: '05:32 min',
    podcastDescriptionNo: 'Vår 100% Verdigaranti i detalj: spar mer enn årskontingenten på 1 290 kr på ditt første hotellopphold eller samlede årsreiser, eller få full refusjon.',
    podcastDescriptionEn: 'The forensic blueprint of our 100% Value Guarantee: save more than your 1 290 NOK (€110) membership fee or receive a prompt, same-day refund.',
    podcastUrl: 'https://atlasprelaunch.web.app?podcast=guarantee',
    getHtmlContent: (ctx) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f5; border: 2px solid #10b981; border-radius: 16px; overflow: hidden;\">
        <div style="padding: 28px 32px; background: linear-gradient(135deg, #064e3b 0%, #0a0a0a 100%); border-bottom: 1px solid #10b98140;\">
          <div style="font-size: 22px; font-weight: 700; letter-spacing: 4px; color: #ffffff; font-family: 'Cinzel', Georgia, serif;\">ATLAS</div>
          <div style="font-size: 11px; font-family: monospace; color: #34d399; text-transform: uppercase; letter-spacing: 1.5px; font-weight: bold; margin-top: 4px;\">72 HOURS TO LAUNCH • VALUE GUARANTEE</div>
        </div>
        <div style="padding: 32px;\">
          <h2 style="font-size: 20px; color: #f3f4f6; margin-top: 0;\">Hei, ${ctx.fullName}.</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;\">
            Vi ønsker at du skal være 100% trygg når dørene åpner på onsdag. Derfor stiller Hard Rock Capital Ltd en uforbeholden garanti:
          </p>

          <div style="background: #171717; border-left: 4px solid #10b981; padding: 18px 20px; border-radius: 0 12px 12px 0; margin: 20px 0;\">
            <h4 style="margin: 0 0 6px 0; color: #34d399; font-size: 14px;\">ATLAS 100% Verdigaranti:</h4>
            <p style="font-size: 13px; line-height: 1.6; color: #d1d5db; margin: 0;\">
              Hvis du ikke sparer mer enn årskontingenten på 1 290 kr (€110) på ditt aller første hotellopphold (2+ netter), ferieleilighet eller samlede årsreiser sammenlignet med Booking.com/Expedia, <strong>refunderer vi 100% av kontingenten på dagen</strong>. Du beholder uansett ditt gratis 3-dagers hotellopphold for 2 personer.
            </p>
          </div>

          <!-- Embedded Podcast Episode 9 Card -->
          <div style="background: #171717; border: 1px solid #10b98140; border-radius: 10px; padding: 16px; margin: 20px 0;\">
            <div style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #34d399; margin-bottom: 4px;\">
              🎧 Podcast Episode 9 Inkludert (05:32 min)
            </div>
            <div style="font-size: 13px; font-weight: bold; color: #ffffff; margin-bottom: 6px;\">
              «Slik garanterer ATLAS 100% innspart kontingent»
            </div>
            <p style="font-size: 12px; color: #9ca3af; line-height: 1.4; margin-bottom: 12px;\">
              Hør hvorfor vi tar all økonomisk risiko på våre skuldre, og hvordan én enkelt helgetur dekker inn hele medlemskapet.
            </p>
            <a href="https://atlasprelaunch.web.app?podcast=guarantee" style="display: inline-block; font-size: 11px; font-family: monospace; font-weight: bold; color: #0a0a0a; background: linear-gradient(90deg, #10b981, #34d399); text-decoration: none; padding: 7px 14px; border-radius: 6px;\">
              ▶ Hør Garantiforklaringen i Lydspilleren
            </a>
          </div>

          <div style="border-top: 1px solid #262626; padding-top: 20px; font-size: 12px; font-family: monospace; color: #6b7280;\">
            Dørene åpner onsdag 20. januar kl. 10:00 CET • Hard Rock Capital Ltd
          </div>
        </div>
      </div>
    `,
  },

  // =========================================================================
  // STAGE 10: 24 HOURS TO LAUNCH CHECKLIST (JANUARY 19, 2027)
  // =========================================================================
  {
    id: 'email_10_24h_checklist',
    stageNumber: 10,
    stageName: 'Trinn 10: 24 Timer Igjen – Siste Sjekkliste',
    scheduledTiming: 'Tirsdag 19. januar 2027 kl. 18:00 CET (T-24 timer)',
    subjectNo: '⏰ I morgen kl. 10:00 åpner slusene: Sjekkliste for de 100 Founding-plassene',
    subjectEn: '⏰ Tomorrow at 10:00 AM CET: Checklist for the 100 Founder Allocations',
    preheaderNo: 'Her er din direkte reservasjonslenke og sjekkliste før dørene åpner.',
    preheaderEn: 'Here is your direct activation link and checklist before doors open.',
    podcastTitleNo: 'Gründerens 60-sekunders påminnelse',
    podcastTitleEn: 'Founder\'s 60-second audio reminder',
    podcastDuration: '01:15 min',
    podcastUrl: 'https://atlasprelaunch.web.app',
    getHtmlContent: (ctx) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f5; border: 2px solid #fbbf24; border-radius: 16px; overflow: hidden;\">
        <div style="padding: 28px 32px; background: linear-gradient(135deg, #29200a 0%, #0a0a0a 100%); border-bottom: 1px solid #fbbf2440;\">
          <div style="font-size: 22px; font-weight: 700; letter-spacing: 4px; color: #ffffff; font-family: 'Cinzel', Georgia, serif;\">ATLAS</div>
          <div style="font-size: 11px; font-family: monospace; color: #fbbf24; text-transform: uppercase; letter-spacing: 1.5px; font-weight: bold; margin-top: 4px;\">T-24 HOURS • FINAL LAUNCH CHECKLIST</div>
        </div>
        <div style="padding: 32px;\">
          <h2 style="font-size: 20px; color: #f3f4f6; margin-top: 0;\">Klar til i morgen, ${ctx.fullName}?</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;\">
            I morgen, <strong>onsdag 20. januar 2027 kl. 10:00 CET presis</strong>, åpner vi slusene for aktivering av de 100 første Founding-medlemskapene.
          </p>

          <div style="background: #141414; border: 1px solid #fbbf2450; border-radius: 12px; padding: 20px; margin: 20px 0;\">
            <h4 style="margin: 0 0 10px 0; color: #fbbf24; font-size: 14px;\">Din Sjekkliste for i morgen kl. 10:00:</h4>
            <div style="font-size: 13px; line-height: 1.6; color: #d1d5db;\">
              <div style="margin-bottom: 6px;\">1. Ha din reservasjonskode klar: <strong style="color: #fbbf24;\">${ctx.inviteCode}</strong></div>
              <div style="margin-bottom: 6px;\">2. Åpne aktiveringslenken kl. 10:00: <a href="https://atlasclub.web.app/membership" style="color: #38bdf8;\">atlasclub.web.app/membership</a></div>
              <div style="margin-bottom: 6px;\">3. Betal årskontingenten (1 290 kr / €110) sikkert via Stripe (Kort, Vipps, Apple Pay).</div>
              <div>4. Din digitale kupong for et 3-dagers gratis luksushotellopphold for 2 personer i Europa sendes på sekundet!</div>
            </div>
          </div>

          <div style="border-top: 1px solid #262626; padding-top: 20px; font-size: 12px; font-family: monospace; color: #6b7280;\">
            Vi sees kl. 10:00 i morgen presis! • Pål Juritzen, Hard Rock Capital Ltd
          </div>
        </div>
      </div>
    `,
  },

  // =========================================================================
  // STAGE 11: LAUNCH DAY LIVE (JANUARY 20, 2027 AT 10:00)
  // =========================================================================
  {
    id: 'email_11_launch_live',
    stageNumber: 11,
    stageName: 'Trinn 11: Dørene er åpne (Launch Day)',
    scheduledTiming: 'Onsdag 20. januar 2027 kl. 10:00 CET PRESIS',
    subjectNo: '🚨 DØRENE ER ÅPNE: Sikre ditt Founding Membership & gratis hotellopphold nå',
    subjectEn: '🚨 DOORS ARE OPEN: Claim your Founding Membership & Free Hotel Break Now',
    preheaderNo: 'De 100 plassene tildeles nå. Førstemann til mølla via Stripe.',
    preheaderEn: 'The 100 spots are live now. First-come, first-served via Stripe checkout.',
    podcastTitleNo: 'Lanseringstale: «Velkommen til ATLAS: Dørene er åpne og engrosprisene er live»',
    podcastTitleEn: 'Founder\'s Launch Memo: "The Doors Are Open: Activating Your Zero-Markup Access"',
    podcastDuration: '04:15 min',
    podcastUrl: 'https://atlasprelaunch.web.app?podcast=launch',
    getHtmlContent: (ctx) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f5; border: 2px solid #fbbf24; border-radius: 16px; overflow: hidden; box-shadow: 0 0 40px rgba(251, 191, 36, 0.2);">
        <div style="padding: 28px 32px; background: linear-gradient(135deg, #29200a 0%, #0a0a0a 100%); border-bottom: 1px solid #fbbf2440;\">
          <div style="font-size: 22px; font-weight: 700; letter-spacing: 4px; color: #ffffff; font-family: 'Cinzel', Georgia, serif;\">ATLAS</div>
          <div style="font-size: 11px; font-family: monospace; color: #fbbf24; text-transform: uppercase; letter-spacing: 1.5px; font-weight: bold; margin-top: 4px;\">OFFICIAL LAUNCH • FOUNDING 100 LIVE</div>
        </div>
        <div style="padding: 32px;\">
          <h2 style="font-size: 22px; color: #ffffff; margin-top: 0;\">Slusene er åpne, ${ctx.fullName}!</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;\">
            I dag klokken 10:00 CET åpnet vi offisielt for aktivering av de <strong>100 første Founding-medlemskapene i ATLAS Travel Club</strong>.
          </p>

          <div style="background: #141414; border: 1px solid #262626; border-radius: 12px; padding: 22px; margin: 24px 0; text-align: center;\">
            <div style="font-size: 12px; font-family: monospace; color: #9ca3af; text-transform: uppercase;\">Din personlige reservasjonskode</div>
            <div style="font-size: 26px; font-family: monospace; font-weight: bold; color: #fbbf24; margin: 6px 0 16px 0;\">${ctx.inviteCode}</div>
            
            <a href="https://atlasclub.web.app/membership" style="display: inline-block; width: 85%; padding: 16px 0; background: linear-gradient(90deg, #fbbf24, #f59e0b); color: #0a0a0a; text-decoration: none; font-weight: 900; font-size: 15px; border-radius: 10px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 20px rgba(251, 191, 36, 0.4);">
              Sikre plass & gratis hotell (1 290 kr / €110) ➔
            </a>
            <div style="font-size: 11px; color: #9ca3af; margin-top: 10px;\">Sikker betaling via Stripe • 100% Fornøydgaranti</div>
          </div>

          <div style="font-size: 13px; color: #e5e7eb; line-height: 1.6;\">
            <strong>Hva skjer i det øyeblikket du betaler:</strong><br>
            1. Din plass i Founding 100 er permanent låst.<br>
            2. Du mottar din digitale verdikupong for et 3-dagers gratis hotellopphold for 2 personer i Europa.<br>
            3. Du registreres automatisk i trekningen der 3 heldige får OGSÅ all gourmetmat dekket.<br>
            4. Du får umiddelbar tilgang til å booke ferier til ren kostpris med 0 kr påslag!
          </div>

          <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 8px; padding: 12px 16px; margin: 22px 0; font-size: 12px; color: #fca5a5;\">
            ⏳ <strong>48-timers frist:</strong> Plassen din holdes i 48 timer frem til fredag 22. januar kl. 12:00, før den frigis til neste søker på ventelisten.
          </div>

          <div style="border-top: 1px solid #262626; padding-top: 20px; font-size: 12px; font-family: monospace; color: #6b7280;\">
            Velkommen til en ny æra innen reise.<br>
            Pål Juritzen • Daglig Leder, Hard Rock Capital Ltd
          </div>
        </div>
      </div>
    `,
  },

  // =========================================================================
  // STAGE 12: FINAL FORFEITURE WARNING (LAUNCH +34H)
  // =========================================================================
  {
    id: 'email_12_final_warning',
    stageNumber: 12,
    stageName: 'Trinn 12: Siste 16 timer før plass frigis',
    scheduledTiming: 'Torsdag 21. januar 2027 kl. 20:00 CET (16t før frist)',
    subjectNo: '⚠️ Siste sjanse: Plassen din frigis til neste på ventelisten i morgen kl. 12:00',
    subjectEn: '⚠️ Final Notice: Your allocation will be transferred to the waitlist tomorrow at 12:00',
    preheaderNo: 'Kun få plasser igjen av de 100. Sikre ditt gratis hotellopphold nå.',
    preheaderEn: 'Only a few spots left of the 100. Claim your complimentary hotel stay now.',
    podcastTitleNo: 'Siste frist-briefing: «Siste advarsel før uavhentede hotellopphold overføres»',
    podcastTitleEn: 'Final Call Briefing: "Reallocation of Unclaimed Free Hotel Stays to the Priority Waitlist"',
    podcastDuration: '03:20 min',
    podcastUrl: 'https://atlasprelaunch.web.app',
    getHtmlContent: (ctx) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f5; border: 2px solid #ef4444; border-radius: 16px; overflow: hidden;\">
        <div style="padding: 24px 32px; background: linear-gradient(135deg, #380d0d 0%, #0a0a0a 100%); border-bottom: 1px solid #ef444440;\">
          <div style="font-size: 20px; font-weight: 700; letter-spacing: 3px; color: #ffffff; font-family: 'Cinzel', Georgia, serif;\">ATLAS</div>
          <div style="font-size: 11px; font-family: monospace; color: #f87171; text-transform: uppercase; font-weight: bold; margin-top: 4px;\">URGENT NOTICE • ALLOCATION EXPIRATION</div>
        </div>
        <div style="padding: 32px;\">
          <h2 style="font-size: 20px; color: #fca5a5; margin-top: 0;\">Siste påminnelse, ${ctx.fullName}.</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;\">
            Over 80 av våre 100 Founding Member-plasser er allerede bekreftet etter lanseringen i går.
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;\">
            Din reserverte plass og ditt <strong>gratis 3-dagers hotellopphold for to personer i Europa</strong> holdes av frem til <strong>i morgen, fredag 22. januar 2027 kl. 12:00 CET</strong>.
          </p>

          <div style="background: #1c1414; border: 1px solid #ef444460; border-radius: 12px; padding: 20px; margin: 22px 0; text-align: center;\">
            <div style="font-size: 12px; color: #fca5a5; margin-bottom: 12px;\">Dersom du ikke aktiverer før kl. 12:00 i morgen, blir plassen overført til kandidat #101 på ventelisten.</div>
            <a href="https://atlasclub.web.app/membership" style="display: inline-block; padding: 14px 32px; background: #ef4444; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 14px; border-radius: 8px; text-transform: uppercase;\">
              Aktiver før plassen tapes (1 290 kr / €110) ➔
            </a>
          </div>

          <p style="font-size: 13px; line-height: 1.5; color: #9ca3af;\">
            Husk vår <strong>100% verdigaranti</strong>: Hvis du ikke sparer mer enn de 1 290 kr på ditt første hotellopphold (2+ netter), ferieleilighet eller samlede årsreiser, refunderer vi hele kontingenten på dagen. Du tar null økonomisk risiko.
          </p>

          <div style="border-top: 1px solid #262626; padding-top: 20px; font-size: 12px; font-family: monospace; color: #6b7280;\">
            ATLAS Medlemskomité • Hard Rock Capital Ltd • London, WC2H 9JQ
          </div>
        </div>
      </div>
    `,
  },
];

/**
 * Calculates delivery schedule dates for a subscriber
 */
export function calculateSubscriberSchedule(registeredDateStr: string): { emailId: string; stageNumber: number; scheduledDate: string; subject: string }[] {
  const regDate = new Date(registeredDateStr);
  const launchDate = new Date('2027-01-20T10:00:00+01:00');
  
  const daysUntilLaunch = Math.floor((launchDate.getTime() - regDate.getTime()) / (1000 * 60 * 60 * 24));
  const cadenceDays = daysUntilLaunch > 35 ? 4 : daysUntilLaunch > 15 ? 2 : 1;

  return NURTURE_EMAIL_SEQUENCE.map((template) => {
    let deliverDate = new Date(regDate);

    if (template.stageNumber === 1) {
      deliverDate = new Date(regDate);
    } else if (template.stageNumber <= 7) {
      const delayDays = (template.stageNumber - 1) * cadenceDays;
      deliverDate.setDate(regDate.getDate() + delayDays);
    } else if (template.stageNumber === 8) {
      deliverDate = new Date('2027-01-13T10:00:00+01:00');
    } else if (template.stageNumber === 9) {
      deliverDate = new Date('2027-01-17T10:00:00+01:00');
    } else if (template.stageNumber === 10) {
      deliverDate = new Date('2027-01-19T18:00:00+01:00');
    } else if (template.stageNumber === 11) {
      deliverDate = new Date('2027-01-20T10:00:00+01:00');
    } else {
      deliverDate = new Date('2027-01-21T20:00:00+01:00');
    }

    return {
      emailId: template.id,
      stageNumber: template.stageNumber,
      scheduledDate: deliverDate.toISOString().split('T')[0],
      subject: template.subjectNo,
    };
  });
}
