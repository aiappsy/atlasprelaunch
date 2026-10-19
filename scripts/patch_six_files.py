import os

repo = r"C:\Users\paul\.gemini\antigravity\scratch\atlasprelaunch\src"

# 1. DynamicSavingsCalculator.tsx
with open(os.path.join(repo, "components", "DynamicSavingsCalculator.tsx"), "r", encoding="utf-8") as f:
    c = f.read()
c = c.replace(
    "<span>{isNorwegian ? 'Beregn matpris & se hoteller' : 'Calculate meal price & view hotels'}</span>",
    "<span>{isNorwegian ? 'Se detaljer om oppholdet' : 'View stay details'}</span>"
)
with open(os.path.join(repo, "components", "DynamicSavingsCalculator.tsx"), "w", encoding="utf-8") as f:
    f.write(c)

# 2. PrelaunchConcierge.tsx
with open(os.path.join(repo, "components", "PrelaunchConcierge.tsx"), "r", encoding="utf-8") as f:
    c = f.read()
c = c.replace(
    "{isNorwegian ? 'Inkl. Gratis Hotellopphold (5 400 kr)' : 'Incl. Free 3-Day Hotel Break (€480)'}",
    "{isNorwegian ? 'Inkl. Europeisk Weekend-opphold' : 'Incl. European Weekend Break'}"
)
c = c.replace(
    "De 100 første Founding Members mottar et gratis 3-dagers luksushotellopphold for to i Europa (verdi 5 400 kr, 0 kr i rompris via European Allotments), og 3 vinnere får all gourmetmat dekket.",
    "De 100 første Founding Members mottar et utvalgt Europeisk Weekend-opphold for to i Europa (verdi inntil 4 500 kr / ca. €400) som Founding-gave."
)
c = c.replace(
    "The first 100 Founding Members receive a complimentary 3-day European luxury hotel break for two (worth €480 / 5 400 kr, €0 room rate via European Allotments), and 3 winners win all gourmet meals covered.",
    "The first 100 Founding Members receive a complimentary European weekend break for two (worth up to €400 / 4,500 NOK) as a Founding Gift."
)
with open(os.path.join(repo, "components", "PrelaunchConcierge.tsx"), "w", encoding="utf-8") as f:
    f.write(c)

# 3. WaitlistModal.tsx
with open(os.path.join(repo, "components", "WaitlistModal.tsx"), "r", encoding="utf-8") as f:
    c = f.read()
c = c.replace(
    "<div>✓ {isNorwegian ? '100% gratis 3-dagers hotellopphold for to i Europa (verdi 5 400 kr / ca. €480)' : '100% Free 3-Day European Hotel Break for 2 (worth €480 / 5 400 kr)'}</div>",
    "<div>✓ {isNorwegian ? 'Europeisk weekend-opphold for 2 personer (verdi inntil 4 500 kr / ca. €400)' : 'Complimentary European weekend break for 2 (worth up to €400)'}</div>"
)
c = c.replace(
    "<div>✓ {isNorwegian ? 'Lodd i trekningen der 3 av 100 får all gourmetmat 100% dekket' : 'Entered in the draw where 3 of 100 win all gourmet meals fully covered'}</div>",
    "<div>✓ {isNorwegian ? 'Full tilgang til rå engrospriser på fly og 2,5M hoteller for alltid' : 'Full access to wholesale net rates on flights & 2.5M hotels for life'}</div>"
)
with open(os.path.join(repo, "components", "WaitlistModal.tsx"), "w", encoding="utf-8") as f:
    f.write(c)

# 4. translations.ts
with open(os.path.join(repo, "lib", "i18n", "translations.ts"), "r", encoding="utf-8") as f:
    c = f.read()
c = c.replace(
    "perk1: '100% free 3-day European hotel stay for 2 travelers (worth €480 / 5 400 kr)',",
    "perk1: 'Complimentary European weekend break for 2 travelers (worth up to €400 / 4,500 NOK)',"
)
c = c.replace(
    "perk2: 'Automatic entry into the draw where 3 of 100 win all gourmet meals fully covered',",
    "perk2: 'Full access to wholesale net rates across 2.5M hotels and direct commission credits',"
)
c = c.replace(
    "freeTrialBanner: 'Kun 100 plasser • Inkluderer gratis hotellopphold for to (verdi 5 400 kr)',",
    "freeTrialBanner: 'Kun 100 plasser • Inkluderer Europeisk Weekend-opphold for to og 100% verdigaranti',"
)
c = c.replace(
    "successDesc: 'Din Founding Member-posisjon og ditt gratis 3-dagers hotellopphold for to er reservert. Du er også automatisk registrert i trekningen der 3 heldige får OGSÅ MATEN 100% dekket!',",
    "successDesc: 'Din Founding Member-posisjon og ditt Europeiske Weekend-opphold for 2 personer er nå midlertidig reservert.',"
)
with open(os.path.join(repo, "lib", "i18n", "translations.ts"), "w", encoding="utf-8") as f:
    f.write(c)

# 5. emailService.ts
with open(os.path.join(repo, "lib", "emailService.ts"), "r", encoding="utf-8") as f:
    c = f.read()
c = c.replace(
    "100% gratis 3-dagers hotellopphold for 2 personer i Europa (verdi 5 400 kr)",
    "Europeisk weekend-opphold for 2 personer i Europa (verdi inntil 4 500 kr)"
)
c = c.replace(
    "Lodd i trekningen der 3 av 100 får OGSÅ all mat (halvpensjon) dekket",
    "100% Fornøyd- og verdigaranti på ditt første opphold"
)
with open(os.path.join(repo, "lib", "emailService.ts"), "w", encoding="utf-8") as f:
    f.write(c)

# 6. LeadDetailModal.tsx
with open(os.path.join(repo, "components", "crm", "LeadDetailModal.tsx"), "r", encoding="utf-8") as f:
    c = f.read()
c = c.replace("gratis 3-dagers hotellopphold for to i Europa (verdi 5 400 kr)", "Europeisk weekend-opphold for to i Europa (verdi inntil 4 500 kr)")
c = c.replace("complimentary 3-day European hotel break for two (worth €480 / 5,400 kr)", "complimentary European weekend break for two (worth up to €400 / 4,500 kr)")
with open(os.path.join(repo, "components", "crm", "LeadDetailModal.tsx"), "w", encoding="utf-8") as f:
    f.write(c)

print("All 6 files patched successfully!")
