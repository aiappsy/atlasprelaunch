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
  // EMAIL 1: IMMEDIATE CONFIRMATION (DAY 0)
  // =========================================================================
  {
    id: 'email_1_welcome',
    stageName: 'Trinn 1: Velkomst & Reservering',
    scheduledTiming: 'Umiddelbart ved registrering (Dag 0)',
    subjectNo: '👑 Velkommen til ATLAS: Din Founding Member-kvote er reservert',
    subjectEn: '👑 Welcome to ATLAS: Your Founding Member Allocation is Reserved',
    preheaderNo: 'Ditt 3-dagers luksushotellopphold for 2 er registrert. Se din referansekode.',
    preheaderEn: 'Your complimentary 3-day hotel break for two is reserved. View your code.',
    podcastTitleNo: 'Episode 1: «Engros-arbitrasjen: Hvordan lukkede klubber omgår hotellpåslagene»',
    podcastTitleEn: 'Episode 1: "The Closed-Loop Arbitrage: How Wholesale Clubs Bypass Public Markups"',
    podcastDuration: '23:07 min',
    podcastDescriptionNo: 'En uavhengig etterretningsanalyse av Booking Holdings vs. Expedia Group, prisparitetsklausuler og den lukkede medlemskapsmodellen.',
    podcastDescriptionEn: 'An investigative briefing exposing the online travel agency duopoly, rate parity legal clauses, and how private clubs access net bedbank rates.',
    podcastUrl: 'https://atlasprelaunch.web.app?podcast=deepdive',
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
              <div style="margin-bottom: 6px;">🎁 <strong>100% gratis 3-dagers hotellopphold for 2 personer</strong> i Europa (verdi 5 400 kr / €480)</div>
              <div style="margin-bottom: 6px;">🌟 <strong>Lodd i trekningen</strong> der 3 av de 100 får OGSÅ all gourmetmat (halvpensjon) dekket</div>
              <div style="margin-bottom: 6px;">🛡️ <strong>100% Fornøyd- & Verdigaranti</strong> på din aller første reise</div>
              <div>⚡ <strong>0 kr påslag for livstid</strong> på fly, leiebil og over 1 200 000 hoteller globalt</div>
            </div>
          </div>

          <!-- Embedded Podcast Episode 1 Card -->
          <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, #141414 100%); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 12px; padding: 18px 20px; margin: 24px 0;">
            <div style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #fbbf24; font-weight: bold; margin-bottom: 4px;">
              🎧 Lytt til Episode 1 (23:07 min)
            </div>
            <div style="font-size: 14px; font-weight: bold; color: #ffffff; margin-bottom: 6px;">
              «Engros-arbitrasjen: Hvordan lukkede klubber omgår hotellpåslagene»
            </div>
            <p style="font-size: 12px; line-height: 1.5; color: #9ca3af; margin: 0 0 12px 0;">
              Hør hvorfor Booking.com og Expedia tvinger hoteller til å signere prisparitetsklausuler, og hvordan private klubber juridisk kan tilby rå B2B-engrospriser.
            </p>
            <a href="https://atlasprelaunch.web.app?podcast=deepdive" style="display: inline-block; font-size: 11px; font-family: monospace; font-weight: bold; color: #0a0a0a; background: linear-gradient(90deg, #fbbf24, #f59e0b); text-decoration: none; padding: 8px 16px; border-radius: 6px;">
              ▶ Hør 23-Min Analyse i Lydspilleren
            </a>
          </div>

          <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 10px; padding: 14px 18px; margin: 20px 0; font-size: 12px; line-height: 1.5; color: #fde68a;">
            ⏳ <strong>Lanseringstidspunkt:</strong> Dørene åpner <strong>onsdag 20. januar 2027 kl. 10:00 CET</strong> (1 290 kr / €110 per år). Tildelingen av de 100 gratis hotelloppholdene skjer etter førstemann-til-mølla-prinsippet. Du har 48 timer på å fullføre aktiveringen før plassen overføres til neste person på ventelisten.
          </div>

          <p style="font-size: 13px; line-height: 1.6; color: #9ca3af;">
            I ukene frem mot lansering vil vi gi deg et eksklusivt innblikk i den hemmelige reiseøkonomien – og vise deg nøyaktig hvordan vi kan tilby luksusferier til ren kostpris.
          </p>

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
  // EMAIL 2: THE CONNEX SECRET (DAY 4)
  // =========================================================================
  {
    id: 'email_2_connex_secret',
    stageName: 'Trinn 2: Sannheten om 0 kr rompris',
    scheduledTiming: '4 dager etter registrering',
    subjectNo: '🍷 Hvordan kan hotellrommet være 100% gratis? (Sannheten om Connex)',
    subjectEn: '🍷 How can the hotel room be 100% free? (The Connex Secret)',
    preheaderNo: 'Her er den transparente matematikken bak ditt 3-dagers hotellopphold for to.',
    preheaderEn: 'Here is the transparent math behind your complimentary 3-day hotel stay.',
    podcastTitleNo: 'Episode 2: «Overskuddskapasitet: Hvorfor 1 500+ hoteller gir bort rommet til 0 kr»',
    podcastTitleEn: 'Episode 2: "The Surplus Protocol: Why 1,500+ European Hotels Offer 100% Free Rooms"',
    podcastDuration: '15:42 min',
    podcastDescriptionNo: 'Slik utnytter Connex Holiday Plus ledige hotellsenger i Europa, og hvorfor du kun betaler hotellets faste halvpensjon ved utsjekk.',
    podcastDescriptionEn: 'How Connex Holiday Plus fills European boutique retreat capacity at zero room rates, while guests only settle fixed half-board on checkout.',
    podcastUrl: 'https://atlasprelaunch.web.app?podcast=summary',
    getHtmlContent: (ctx) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f5; border: 1px solid #d4af3740; border-radius: 16px; overflow: hidden;">
        <div style="padding: 28px 32px; background: linear-gradient(135deg, #1c1917 0%, #0a0a0a 100%); border-bottom: 1px solid #d4af3730;">
          <div style="font-size: 22px; font-weight: 700; letter-spacing: 4px; color: #ffffff; font-family: 'Cinzel', Georgia, serif;">ATLAS</div>
          <div style="font-size: 11px; font-family: monospace; color: #f59e0b; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px;">Forensic Travel Intelligence • Case Study #01</div>
        </div>
        <div style="padding: 32px;">
          <h2 style="font-size: 20px; color: #f3f4f6; margin-top: 0;">Hei, ${ctx.fullName}.</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;">
            Når folk hører at de første 100 Founding-medlemmene i ATLAS får et <strong>gratis 3-dagers hotellopphold for to personer i Europa</strong>, er det første spørsmålet: <em>«Hva er haken?»</em>
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;">
            Svaret er at det finnes ingen hake – men en genial, transparent forretningsmodell basert på <strong>overskuddskapasitet</strong>.
          </p>

          <div style="background: #171717; border-left: 4px solid #f59e0b; padding: 18px 20px; border-radius: 0 12px 12px 0; margin: 20px 0;">
            <h4 style="margin: 0 0 8px 0; color: #fbbf24; font-size: 14px;">Slik fungerer Connex Holiday Plus-modellen:</h4>
            <p style="font-size: 13px; line-height: 1.6; color: #d1d5db; margin: 0;">
              Over hele Europa (Dolomittene, Schwarzwald, Provence, Salzburg, Gardasjøen) har <strong>over 1 500 boutique- og velværerhoteller</strong> ledige rom i midtuke- og skuldresesonger. Gjennom Connex stiller hotellene selve <strong>rommet til 0 kr disposisjon</strong>. Verditilgodelappen dekker 100% av romprisen for 2 gjester.
            </p>
          </div>

          <h3 style="font-size: 16px; color: #ffffff; margin-top: 24px;">Regnestykket:</h3>
          <table width="100%" border="0" cellspacing="0" cellpadding="8" style="font-size: 13px; color: #d1d5db; background: #141414; border-radius: 10px; margin-bottom: 20px;">
            <tr style="border-bottom: 1px solid #262626;">
              <td>Normalpris på Booking.com for 2 netter m/ middag:</td>
              <td align="right" style="color: #9ca3af; text-decoration: line-through;">5 400 kr (€480)</td>
            </tr>
            <tr style="border-bottom: 1px solid #262626;">
              <td style="color: #10b981; font-weight: bold;">✓ ATLAS Rompris:</td>
              <td align="right" style="color: #10b981; font-weight: bold;">0 NOK / €0 (KUPONG)</td>
            </tr>
            <tr style="border-bottom: 1px solid #262626;">
              <td>Publisert halvpensjon (2 personer, frokost + gourmetmiddag):</td>
              <td align="right" style="color: #fbbf24;">betales direkte ved utsjekk (€35–€60/dag)</td>
            </tr>
            <tr style="background: #1f1f1f; font-weight: bold;">
              <td style="color: #ffffff;">Din Netto Besparelse:</td>
              <td align="right" style="color: #10b981; font-size: 15px;">+3 500 til 5 400 NOK spart!</td>
            </tr>
          </table>

          <!-- Embedded Podcast Episode 2 Card -->
          <div style="background: #171717; border: 1px solid #d4af3740; border-radius: 10px; padding: 16px; margin: 20px 0;">
            <div style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #fbbf24; margin-bottom: 4px;">
              🎧 Podcast Episode 2 Inkludert (15:42 min)
            </div>
            <div style="font-size: 13px; font-weight: bold; color: #ffffff; margin-bottom: 6px;">
              «Overskuddskapasitet: Hvorfor 1 500+ hoteller gir bort rommet til 0 kr»
            </div>
            <div style="font-size: 12px; color: #9ca3af; line-height: 1.4; margin-bottom: 12px;">
              Hør hvorfor europeiske hoteller heller vil gi bort rommet gratis enn å la sengene stå tomme – og hvordan matematikken går opp for både gjest og hotelleier.
            </div>
            <a href="https://atlasprelaunch.web.app?podcast=summary" style="display: inline-block; font-size: 11px; font-family: monospace; font-weight: bold; color: #0a0a0a; background: linear-gradient(90deg, #fbbf24, #f59e0b); text-decoration: none; padding: 7px 14px; border-radius: 6px;">
              ▶ Hør Forklaringen i Lydspilleren
            </a>
          </div>

          <p style="font-size: 13px; line-height: 1.6; color: #d1d5db;">
            Og husk: <strong>3 av de 100 første Founding-medlemmene vinner OGSÅ all gourmetmat dekket av ATLAS!</strong> Da er absolutt hele oppholdet 100% gratis.
          </p>

          <div style="text-align: center; margin: 24px 0;">
            <a href="https://atlasprelaunch.web.app" style="display: inline-block; padding: 12px 28px; background: linear-gradient(90deg, #fbbf24, #f59e0b); color: #0a0a0a; text-decoration: none; font-weight: bold; font-size: 13px; border-radius: 8px;">
              Utforsk 1 500+ Connex-hoteller på nettsiden ↗
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
  // EMAIL 3: THE RVC SECRET (DAY 9)
  // =========================================================================
  {
    id: 'email_3_rvc_condos',
    stageName: 'Trinn 3: 7 netters ferieleiligheter fra 3 490 kr',
    scheduledTiming: '9 dager etter registrering',
    subjectNo: '🏖️ 7 netter i Marbella eller Tenerife fra 3 490 kr? Her er beviset.',
    subjectEn: '🏖️ 7 nights in Marbella or Tenerife from €299 (fra 3 490 kr)? Here is the proof.',
    preheaderNo: 'Slik sparer en familie over 15 000 kr på én eneste ukesferie med ATLAS.',
    preheaderEn: 'How a family saves over €1,300 (15,000 NOK) on a single summer vacation with ATLAS.',
    podcastTitleNo: 'Episode 3: «Resort-smutthullet: 7-netters ferieleiligheter fra kun 3 490 kr»',
    podcastTitleEn: 'Episode 3: "The Private Resort Clearance: 7-Night Condominiums from €299 (fra 3 490 kr)"',
    podcastDuration: '14:18 min',
    podcastDescriptionNo: 'Slik fyller RVC- og Panorama-nettverket ledige studioer, 1- og 2-romssuiter for 2–6 personer i Spania, Hellas og Italia fra 3 490 kr ved restplass/clearance.',
    podcastDescriptionEn: 'Inside the RVC/Panorama network surplus clearance, offering studio, 1- and 2-bedroom condominium suites for 2 to 6 guests starting from €299 on last-minute clearance.',
    podcastUrl: 'https://atlasprelaunch.web.app?podcast=summary',
    getHtmlContent: (ctx) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f5; border: 1px solid #d4af3740; border-radius: 16px; overflow: hidden;">
        <div style="padding: 28px 32px; background: linear-gradient(135deg, #1c1917 0%, #0a0a0a 100%); border-bottom: 1px solid #d4af3730;">
          <div style="font-size: 22px; font-weight: 700; letter-spacing: 4px; color: #ffffff; font-family: 'Cinzel', Georgia, serif;">ATLAS</div>
          <div style="font-size: 11px; font-family: monospace; color: #f59e0b; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px;">Forensic Travel Intelligence • Case Study #02</div>
        </div>
        <div style="padding: 32px;">
          <h2 style="font-size: 20px; color: #f3f4f6; margin-top: 0;">Hei, ${ctx.fullName}.</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;">
            Hva betaler en typisk familie for en ferieleilighet (fra studio til 2-roms) med svømmebasseng og kjøkken i Marbella, Algarve eller Tenerife i ferien?
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;">
            På Booking.com eller Airbnb ligger prisen vanligvis mellom <strong>16 000 kr og 24 000 kr (€1 400–€2 100) for én uke</strong>.
          </p>

          <div style="background: #171717; border: 1px solid #38bdf840; border-radius: 12px; padding: 20px; margin: 24px 0;">
            <div style="font-size: 11px; font-family: monospace; color: #38bdf8; text-transform: uppercase; font-weight: bold;">Atlas Signature Resorts (RVC / Panorama)</div>
            <div style="font-size: 22px; font-weight: bold; color: #ffffff; margin: 6px 0;">Fra kun 3 490 NOK (€299) for alle 7 netter</div>
            <div style="font-size: 13px; color: #9ca3af; margin-bottom: 12px;">Restplass / clearance • Studio, 1- og 2-roms leiligheter for 2–6 personer • Kjøkken og stue</div>
            
            <div style="font-size: 13px; color: #34d399; font-weight: bold; border-top: 1px solid #262626; padding-top: 12px;">
              = Kun 83 kr (€7) per person per natt for hele familien!
            </div>
          </div>

          <!-- Embedded Podcast Episode 3 Card -->
          <div style="background: #171717; border: 1px solid #38bdf840; border-radius: 10px; padding: 16px; margin: 20px 0;">
            <div style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #38bdf8; margin-bottom: 4px;">
              🎧 Podcast Episode 3 Inkludert (14:18 min)
            </div>
            <div style="font-size: 13px; font-weight: bold; color: #ffffff; margin-bottom: 6px;">
              «Resort-smutthullet: 7-netters ferieleiligheter fra kun 3 490 kr»
            </div>
            <div style="font-size: 12px; color: #9ca3af; line-height: 1.4; margin-bottom: 12px;">
              Hør hvordan overskuddskapasitet i tusenvis av private ferieleiligheter og resortanlegg gjøres tilgjengelig til faste rydningspriser uten omveier via pakkereisegiganter.
            </div>
            <a href="https://atlasprelaunch.web.app?podcast=summary" style="display: inline-block; font-size: 11px; font-family: monospace; font-weight: bold; color: #ffffff; background: linear-gradient(90deg, #0284c7, #38bdf8); text-decoration: none; padding: 7px 14px; border-radius: 6px;">
              ▶ Hør Episoden om Leiligheter
            </a>
          </div>

          <p style="font-size: 13px; line-height: 1.6; color: #d1d5db;">
            <strong>Hvorfor er det så rimelig?</strong><br>
            Gjennom Panorama / RVC-nettverket fyller ATLAS overskuddskapasitet i resortanlegg som ellers ville stått tomme. Vi legger på <strong>0 kr i provisjon</strong>, og sender den rå grossistprisen direkte til medlemmene.
          </p>

          <div style="text-align: center; margin: 24px 0;">
            <a href="https://atlasprelaunch.web.app" style="display: inline-block; padding: 12px 28px; background: linear-gradient(90deg, #38bdf8, #0284c7); color: #ffffff; text-decoration: none; font-weight: bold; font-size: 13px; border-radius: 8px;">
              Se resort-kalkulatoren for din familie ↗
            </a>
          </div>

          <div style="border-top: 1px solid #262626; padding-top: 20px; font-size: 12px; font-family: monospace; color: #6b7280;">
            Din reservasjonskode: <strong style="color: #fbbf24;">${ctx.inviteCode}</strong> • Lansering: Onsdag 20. januar 2027 kl. 10:00 CET
          </div>
        </div>
      </div>
    `,
  },

  // =========================================================================
  // EMAIL 4: THE OTA DUOPOLY EXPOSED (DAY 16)
  // =========================================================================
  {
    id: 'email_4_ota_exposed',
    stageName: 'Trinn 4: Slik fungerer 15-30% påslagene',
    scheduledTiming: '16 dager etter registrering',
    subjectNo: '🕵️ Hvorfor koster hoteller det samme på alle nettsider? (Prisparitet)',
    subjectEn: '🕵️ Why do hotels cost the same across all public sites? (Rate Parity)',
    preheaderNo: 'Avsløringen: Hvordan to giganter kontrollerer prisene du ser på nettet.',
    preheaderEn: 'The forensic breakdown: How two duopolies control the travel prices you see.',
    podcastTitleNo: 'Episode 4: «Provisjonsfellen: Hvorfor vi betaler 100% av provisjonen tilbake til deg»',
    podcastTitleEn: 'Episode 4: "The Commission Rebate Revolution: Passing 100% of Cruise & Luxury Rebates to Members"',
    podcastDuration: '18:50 min',
    podcastDescriptionNo: 'Hvorfor cruiselinjer og luksushoteller betaler 10%–16% i provisjon, og hvorfor ATLAS Rewards Vault overfører hver eneste krone rett tilbake til medlemmene.',
    podcastDescriptionEn: 'Inside the massive commissions paid by cruise lines and luxury chains, and how ATLAS rebates 100% of travel commissions directly into your Rewards Vault.',
    podcastUrl: 'https://atlasprelaunch.web.app?podcast=deepdive',
    getHtmlContent: (ctx) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f5; border: 1px solid #d4af3740; border-radius: 16px; overflow: hidden;">
        <div style="padding: 28px 32px; background: linear-gradient(135deg, #1c1917 0%, #0a0a0a 100%); border-bottom: 1px solid #d4af3730;">
          <div style="font-size: 22px; font-weight: 700; letter-spacing: 4px; color: #ffffff; font-family: 'Cinzel', Georgia, serif;">ATLAS</div>
          <div style="font-size: 11px; font-family: monospace; color: #f59e0b; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px;">Forensic Travel Intelligence • Case Study #03</div>
        </div>
        <div style="padding: 32px;">
          <h2 style="font-size: 20px; color: #f3f4f6; margin-top: 0;">Hei, ${ctx.fullName}.</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;">
            Har du noen gang lagt merke til at et 5-stjerners hotell i London eller Roma koster nøyaktig det samme på Booking.com, Hotels.com, Expedia og Finn.no?
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;">
            Det skyldes en juridisk klausul som heter <strong>Rate Parity (Prisparitet)</strong>. Hotellene straffes dersom de selger rommene billigere åpent på nettet.
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;">
            Men klausulen har et enormt juridisk unntak: <strong>Lukkede medlemsklubber</strong> (som Costco eller ATLAS) har lov til å selge de uavkortede engrosprisene (net wholesale rates) bak innlogging!
          </p>

          <div style="background: #171717; border-left: 4px solid #10b981; padding: 18px 20px; border-radius: 0 12px 12px 0; margin: 20px 0;">
            <h4 style="margin: 0 0 6px 0; color: #10b981; font-size: 14px;">ATLAS-forskjellen (Costco-modellen):</h4>
            <p style="font-size: 13px; line-height: 1.6; color: #d1d5db; margin: 0;">
              Vi lever utelukkende av det faste medlemskapet (1 290 kr / €110 per år). Vi tar 0 kr i påslag på fly og over 1,2 millioner hoteller. På cruise og luksusopphold der leverandørene betaler 10%–16% provisjon, overfører ATLAS <strong>100% av provisjonen rett inn i din Rewards Vault</strong>.
            </p>
          </div>

          <!-- Embedded Podcast Episode 4 Card -->
          <div style="background: #171717; border: 1px solid #10b98140; border-radius: 10px; padding: 16px; margin: 20px 0;">
            <div style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #10b981; margin-bottom: 4px;">
              🎧 Podcast Episode 4 Inkludert (18:50 min)
            </div>
            <div style="font-size: 13px; font-weight: bold; color: #ffffff; margin-bottom: 6px;">
              «Provisjonsfellen: Hvorfor vi betaler 100% av provisjonen tilbake til deg»
            </div>
            <div style="font-size: 12px; color: #9ca3af; line-height: 1.4; margin-bottom: 12px;">
              En grundig avsløring av hvordan tradisjonelle reisebyråer tjener tusenvis i skjulte provisjoner, og hvordan ATLAS snur hele modellen på hodet til fordel for medlemmene.
            </div>
            <a href="https://atlasprelaunch.web.app?podcast=deepdive" style="display: inline-block; font-size: 11px; font-family: monospace; font-weight: bold; color: #0a0a0a; background: linear-gradient(90deg, #10b981, #34d399); text-decoration: none; padding: 7px 14px; border-radius: 6px;">
              ▶ Hør Avsløringen om Provisjoner
            </a>
          </div>

          <div style="border-top: 1px solid #262626; padding-top: 20px; margin-top: 28px; font-size: 12px; font-family: monospace; color: #6b7280;">
            Lansering: Onsdag 20. januar 2027 kl. 10:00 CET • Hard Rock Capital Ltd
          </div>
        </div>
      </div>
    `,
  },

  // =========================================================================
  // EMAIL 5: 7 DAYS TO LAUNCH COUNTDOWN (JANUARY 13, 2027)
  // =========================================================================
  {
    id: 'email_5_launch_countdown',
    stageName: 'Trinn 5: 7 Dager til Åpning & Nedtelling',
    scheduledTiming: 'Sendes onsdag 13. januar 2027 (7 dager før lansering)',
    subjectNo: '📅 7 dager igjen: Onsdag 20. januar kl. 10:00 åpner ATLAS',
    subjectEn: '📅 7 Days to Go: Wednesday January 20 at 10:00 AM CET ATLAS Opens',
    preheaderNo: 'Kun 100 plasser med gratis 3-dagers hotellopphold. Gjør deg klar.',
    preheaderEn: 'Only 100 spots with complimentary 3-day hotel break. Get ready.',
    podcastTitleNo: 'Episode 5: «Lanseringsmanualen: Slik sikrer du Founding 100-plassen kl. 10:00»',
    podcastTitleEn: 'Episode 5: "The Founding 100 Playbook: How to Claim Your Free Stay at 10:00 AM"',
    podcastDuration: '11:35 min',
    podcastDescriptionNo: 'Praktisk veiledning for åpningsdagen onsdag 20. januar: 48-timers fristen, betaling via Stripe, og hvordan du aktiverer Connex-hotelloppholdet.',
    podcastDescriptionEn: 'The tactical playbook for Launch Day Wednesday, January 20: the 48-hour claim window, Stripe activation, and locking your free hotel stay.',
    podcastUrl: 'https://atlasprelaunch.web.app?podcast=summary',
    getHtmlContent: (ctx) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f5; border: 1px solid #d4af3740; border-radius: 16px; overflow: hidden;">
        <div style="padding: 28px 32px; background: linear-gradient(135deg, #1c1917 0%, #0a0a0a 100%); border-bottom: 1px solid #d4af3730;">
          <div style="font-size: 22px; font-weight: 700; letter-spacing: 4px; color: #ffffff; font-family: 'Cinzel', Georgia, serif;">ATLAS</div>
          <div style="font-size: 11px; font-family: monospace; color: #f59e0b; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px;">Launch Countdown • 7 Days to Go</div>
        </div>
        <div style="padding: 32px;">
          <h2 style="font-size: 20px; color: #f3f4f6; margin-top: 0;">Hei, ${ctx.fullName}.</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;">
            Om nøyaktig 7 dager åpner vi dørene for den offisielle lanseringen av <strong>ATLAS Travel Club</strong>!
          </p>

          <div style="background: linear-gradient(135deg, #1f1a0e 0%, #141414 100%); border: 2px solid #fbbf24; border-radius: 14px; padding: 24px; text-align: center; margin: 24px 0;">
            <div style="font-size: 11px; font-family: monospace; color: #f59e0b; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">OFFISIELT LANSERINGSTIDSPUNKT</div>
            <div style="font-size: 24px; font-bold; color: #ffffff; margin: 8px 0;">Onsdag 20. januar 2027 kl. 10:00 CET</div>
            <div style="font-size: 13px; color: #d1d5db;">Kontingent: 1 290 kr / år (€110) • 100% Fornøyd- & Verdigaranti</div>
          </div>

          <!-- Embedded Podcast Episode 5 Card -->
          <div style="background: #171717; border: 1px solid #d4af3740; border-radius: 10px; padding: 16px; margin: 20px 0;">
            <div style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #fbbf24; margin-bottom: 4px;">
              🎧 Podcast Episode 5 Inkludert (11:35 min)
            </div>
            <div style="font-size: 13px; font-weight: bold; color: #ffffff; margin-bottom: 6px;">
              «Lanseringsmanualen: Slik sikrer du Founding 100-plassen kl. 10:00»
            </div>
            <div style="font-size: 12px; color: #9ca3af; line-height: 1.4; margin-bottom: 12px;">
              Hør nøyaktig hva som skjer onsdag 20. januar kl. 10:00: Stripe-utsjekk, kupongutstedelse og hvordan du sikrer at plassen din ikke tapes til neste søker.
            </div>
            <a href="https://atlasprelaunch.web.app?podcast=summary" style="display: inline-block; font-size: 11px; font-family: monospace; font-weight: bold; color: #0a0a0a; background: linear-gradient(90deg, #fbbf24, #f59e0b); text-decoration: none; padding: 7px 14px; border-radius: 6px;">
              ▶ Hør Lanseringsmanualen
            </a>
          </div>

          <p style="font-size: 13px; line-height: 1.6; color: #d1d5db;">
            Det er nå <strong>over 400 kandidater på ventelisten</strong>, men kun de <strong>100 FØRSTE</strong> som aktiverer medlemskapet mottar det gratis 3-dagers luksushotelloppholdet for 2 personer (og blir med i trekningen der 3 får all gourmetmat dekket).
          </p>

          <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 8px; padding: 12px 16px; margin: 18px 0; font-size: 12px; color: #fde68a;">
            ⚠️ <strong>Husk 48-timers regelen:</strong> Du har 48 timer på å aktivere plassen din fra onsdag 20. januar kl. 10:00. Uavhentede plasser overføres automatisk til neste person på listen fredag 22. januar kl. 12:00.
          </div>

          <div style="border-top: 1px solid #262626; padding-top: 20px; font-size: 12px; font-family: monospace; color: #6b7280;">
            Sett et kryss i kalenderen for onsdag 20. januar kl. 10:00 presis!
          </div>
        </div>
      </div>
    `,
  },

  // =========================================================================
  // EMAIL 6: LAUNCH DAY LIVE (JANUARY 20, 2027 AT 10:00)
  // =========================================================================
  {
    id: 'email_6_launch_live',
    stageName: 'Trinn 6: Dørene er åpne (Launch Day)',
    scheduledTiming: 'Sendes onsdag 20. januar 2027 kl. 10:00 CET',
    subjectNo: '🚨 DØRENE ER ÅPNE: Sikre ditt Founding Membership & gratis hotellopphold nå',
    subjectEn: '🚨 DOORS ARE OPEN: Claim your Founding Membership & Free Hotel Break Now',
    preheaderNo: 'De 100 plassene tildeles nå. Førstemann til mølla via Stripe.',
    preheaderEn: 'The 100 spots are live now. First-come, first-served via Stripe checkout.',
    podcastTitleNo: 'Lanseringstale: «Velkommen til ATLAS: Dørene er åpne og engrosprisene er live»',
    podcastTitleEn: 'Founder\'s Launch Memo: "The Doors Are Open: Activating Your Zero-Markup Access"',
    podcastDuration: '04:15 min',
    podcastDescriptionNo: 'Personlig lanseringshilsen fra gründer Pål Juritzen idet portalen åpnes for live booking til rå B2B-priser.',
    podcastDescriptionEn: 'Executive opening briefing from founder Pål Juritzen announcing live wholesale inventory and voucher generation.',
    podcastUrl: 'https://atlasprelaunch.web.app?podcast=summary',
    getHtmlContent: (ctx) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f5; border: 2px solid #fbbf24; border-radius: 16px; overflow: hidden; box-shadow: 0 0 40px rgba(251, 191, 36, 0.2);">
        <div style="padding: 28px 32px; background: linear-gradient(135deg, #29200a 0%, #0a0a0a 100%); border-bottom: 1px solid #fbbf2440;">
          <div style="font-size: 22px; font-weight: 700; letter-spacing: 4px; color: #ffffff; font-family: 'Cinzel', Georgia, serif;">ATLAS</div>
          <div style="font-size: 11px; font-family: monospace; color: #fbbf24; text-transform: uppercase; letter-spacing: 1.5px; font-weight: bold; margin-top: 4px;">OFFICIAL LAUNCH • FOUNDING 100 LIVE</div>
        </div>
        <div style="padding: 32px;">
          <h2 style="font-size: 22px; color: #ffffff; margin-top: 0;">Slusene er åpne, ${ctx.fullName}!</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;">
            I dag klokken 10:00 CET åpnet vi offisielt for aktivering av de <strong>100 første Founding-medlemskapene i ATLAS Travel Club</strong>.
          </p>

          <div style="background: #141414; border: 1px solid #262626; border-radius: 12px; padding: 22px; margin: 24px 0; text-align: center;">
            <div style="font-size: 12px; font-family: monospace; color: #9ca3af; text-transform: uppercase;">Din personlige reservasjonskode</div>
            <div style="font-size: 26px; font-family: monospace; font-weight: bold; color: #fbbf24; margin: 6px 0 16px 0;">${ctx.inviteCode}</div>
            
            <a href="https://atlasclub.web.app/membership" style="display: inline-block; width: 85%; padding: 16px 0; background: linear-gradient(90deg, #fbbf24, #f59e0b); color: #0a0a0a; text-decoration: none; font-weight: 900; font-size: 15px; border-radius: 10px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 20px rgba(251, 191, 36, 0.4);">
              Sikre plass & gratis hotell (1 290 kr / €110) ➔
            </a>
            <div style="font-size: 11px; color: #9ca3af; margin-top: 10px;">Sikker betaling via Stripe • 100% Fornøydgaranti</div>
          </div>

          <!-- Embedded Launch Voice Memo Card -->
          <div style="background: #171717; border: 1px solid #fbbf2440; border-radius: 10px; padding: 16px; margin: 20px 0;">
            <div style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #fbbf24; margin-bottom: 4px;">
              🎙️ Gründerens Lanseringstale (04:15 min)
            </div>
            <div style="font-size: 13px; font-weight: bold; color: #ffffff; margin-bottom: 6px;">
              «Velkommen til ATLAS: Dørene er åpne og engrosprisene er live»
            </div>
            <div style="font-size: 12px; color: #9ca3af; line-height: 1.4; margin-bottom: 12px;">
              Hør en kort hilsen fra Pål Juritzen med instruksjoner for hvordan du henter ut din digitale hotellkupong umiddelbart etter innmelding.
            </div>
            <a href="https://atlasprelaunch.web.app" style="display: inline-block; font-size: 11px; font-family: monospace; font-weight: bold; color: #0a0a0a; background: linear-gradient(90deg, #fbbf24, #f59e0b); text-decoration: none; padding: 7px 14px; border-radius: 6px;">
              ▶ Hør Gründerens Lanseringstale
            </a>
          </div>

          <div style="font-size: 13px; color: #e5e7eb; line-height: 1.6;">
            <strong>Hva skjer i det øyeblikket du betaler:</strong><br>
            1. Din plass i Founding 100 er permanent låst.<br>
            2. Du mottar din digitale verdikupong for et 3-dagers gratis hotellopphold for 2 personer i Europa.<br>
            3. Du registreres automatisk i trekningen der 3 heldige får OGSÅ all gourmetmat (halvpensjon) dekket.<br>
            4. Du får umiddelbar tilgang til å booke årets ferier til ren kostpris med 0 kr påslag!
          </div>

          <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 8px; padding: 12px 16px; margin: 22px 0; font-size: 12px; color: #fca5a5;">
            ⏳ <strong>Tidsfrist for reservasjon:</strong> Plassen din holdes i 48 timer. Dersom den ikke aktiveres innen fredag 22. januar 2027 kl. 12:00, frigis det gratis hotelloppholdet automatisk til neste person på ventelisten.
          </div>

          <div style="border-top: 1px solid #262626; padding-top: 20px; font-size: 12px; font-family: monospace; color: #6b7280;">
            Velkommen til en ny æra innen reise.<br>
            Pål Juritzen • Daglig Leder, Hard Rock Capital Ltd
          </div>
        </div>
      </div>
    `,
  },

  // =========================================================================
  // EMAIL 7: FINAL FORFEITURE WARNING (LAUNCH +34H)
  // =========================================================================
  {
    id: 'email_7_final_warning',
    stageName: 'Trinn 7: Siste 16 timer før plass frigis',
    scheduledTiming: 'Sendes torsdag 21. januar 2027 kl. 20:00 CET (16t før frist)',
    subjectNo: '⚠️ Siste sjanse: Plassen din frigis til neste på ventelisten i morgen kl. 12:00',
    subjectEn: '⚠️ Final Notice: Your allocation will be transferred to the waitlist tomorrow at 12:00',
    preheaderNo: 'Kun få plasser igjen av de 100. Sikre ditt gratis hotellopphold nå.',
    preheaderEn: 'Only a few spots left of the 100. Claim your complimentary hotel stay now.',
    podcastTitleNo: 'Siste frist-briefing: «Siste advarsel før uavhentede hotellopphold overføres»',
    podcastTitleEn: 'Final Call Briefing: "Reallocation of Unclaimed Free Hotel Stays to the Priority Waitlist"',
    podcastDuration: '03:20 min',
    podcastDescriptionNo: 'En siste statusrapport før fristen utløper fredag 22. januar kl. 12:00, og uavhentede hotellopphold tildeles neste kandidat i køen.',
    podcastDescriptionEn: 'Final status briefing before Friday 12:00 CET deadline when unclaimed allocations pass to waitlist candidate #101.',
    podcastUrl: 'https://atlasprelaunch.web.app',
    getHtmlContent: (ctx) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f5; border: 2px solid #ef4444; border-radius: 16px; overflow: hidden;">
        <div style="padding: 24px 32px; background: linear-gradient(135deg, #380d0d 0%, #0a0a0a 100%); border-bottom: 1px solid #ef444440;">
          <div style="font-size: 20px; font-weight: 700; letter-spacing: 3px; color: #ffffff; font-family: 'Cinzel', Georgia, serif;">ATLAS</div>
          <div style="font-size: 11px; font-family: monospace; color: #f87171; text-transform: uppercase; font-weight: bold; margin-top: 4px;">URGENT NOTICE • ALLOCATION EXPIRATION</div>
        </div>
        <div style="padding: 32px;">
          <h2 style="font-size: 20px; color: #fca5a5; margin-top: 0;">Siste påminnelse, ${ctx.fullName}.</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;">
            Over 80 av våre 100 Founding Member-plasser er allerede bekreftet etter lanseringen i går.
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;">
            Din reserverte plass og ditt <strong>gratis 3-dagers hotellopphold for to personer i Europa</strong> holdes av frem til <strong>i morgen, fredag 22. januar 2027 kl. 12:00 CET</strong>.
          </p>

          <div style="background: #1c1414; border: 1px solid #ef444460; border-radius: 12px; padding: 20px; margin: 22px 0; text-align: center;">
            <div style="font-size: 12px; color: #fca5a5; margin-bottom: 12px;">Dersom du ikke aktiverer før kl. 12:00 i morgen, blir plassen overført til kandidat #101 på ventelisten.</div>
            <a href="https://atlasclub.web.app/membership" style="display: inline-block; padding: 14px 32px; background: #ef4444; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 14px; border-radius: 8px; text-transform: uppercase;">
              Aktiver før plassen tapes (1 290 kr / €110) ➔
            </a>
          </div>

          <!-- Embedded Final Briefing Card -->
          <div style="background: #171717; border: 1px solid #ef444440; border-radius: 10px; padding: 16px; margin: 20px 0;">
            <div style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #fca5a5; margin-bottom: 4px;">
              ⏱️ Siste Frist-Briefing (03:20 min)
            </div>
            <div style="font-size: 13px; font-weight: bold; color: #ffffff; margin-bottom: 6px;">
              «Siste advarsel før uavhentede hotellopphold overføres til ventelisten»
            </div>
            <div style="font-size: 12px; color: #9ca3af; line-height: 1.4; margin-bottom: 12px;">
              Kort gjennomgang av hva som skjer fredag kl. 12:00 når uavhentede hotellopphold tildeles nestemann i køen.
            </div>
            <a href="https://atlasprelaunch.web.app" style="display: inline-block; font-size: 11px; font-family: monospace; font-weight: bold; color: #ffffff; background: #ef4444; text-decoration: none; padding: 7px 14px; border-radius: 6px;">
              ▶ Hør Siste Frist-Briefing
            </a>
          </div>

          <p style="font-size: 13px; line-height: 1.5; color: #9ca3af;">
            Husk vår <strong>100% verdigaranti</strong>: Hvis du ikke sparer mer enn de 1 290 kr på din første reise, refunderer vi hele kontingenten på dagen. Du tar null økonomisk risiko.
          </p>

          <div style="border-top: 1px solid #262626; padding-top: 20px; font-size: 12px; font-family: monospace; color: #6b7280;">
            ATLAS Medlemskomité • Hard Rock Capital Ltd • London, WC2H 9JQ
          </div>
        </div>
      </div>
    `,
  },
];
