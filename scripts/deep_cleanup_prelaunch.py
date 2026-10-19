import os

repo = r"C:\Users\paul\.gemini\antigravity\scratch\atlasprelaunch\src"

def update(path, replacements):
    full_path = os.path.join(repo, path)
    if not os.path.exists(full_path):
        print(f"Not found: {path}")
        return
    with open(full_path, "r", encoding="utf-8") as f:
        c = f.read()
    orig = c
    for old, new in replacements:
        c = c.replace(old, new)
    if c != orig:
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(c)
        print(f"Updated: {path}")
    else:
        print(f"No changes: {path}")

# 1. Hero.tsx
update("components/Hero.tsx", [
    ("{isNorwegian ? '3 vinnere får også maten gratis' : '3 Winners Get All Meals Free'}",
     "{isNorwegian ? '100% Fornøyd- & Verdigaranti' : '100% Value Guarantee'}"),
    ("White Dunes Luxury Suites • Paros",
     "Europeiske Luksusdestinasjoner")
])

# 2. DynamicSavingsCalculator.tsx
update("components/DynamicSavingsCalculator.tsx", [
    ("<span>{isNorwegian ? 'Beregn matpris & se hoteller' : 'Calculate meal cost & preview hotels'}</span>",
     "<span>{isNorwegian ? 'Se detaljer om oppholdet' : 'View stay details'}</span>")
])

# 3. TrustPillars.tsx
update("components/TrustPillars.tsx", [
    ("{isNo ? '0 kr Rompris (Verdi 5 400 kr)' : '€0 Room (Worth €480)'}",
     "{isNo ? 'Verdi inntil 4 500 kr' : 'Worth up to €400'}"),
    ("{isNo ? '3 av 100 vinner OGSÅ maten' : '3 of 100 win all meals'}",
     "{isNo ? 'Eksklusiv Founding-gave' : 'Exclusive Founder Gift'}"),
    ("<span>{isNo ? 'Beregn matpris & se hoteller →' : 'Calculate meals & hotels →'}</span>",
     "<span>{isNo ? 'Se detaljer om oppholdet →' : 'View stay details →'}</span>")
])

# 4. PrelaunchConcierge.tsx
update("components/PrelaunchConcierge.tsx", [
    ("{isNorwegian ? 'Inkl. Gratis Hotellopphold (5 400 kr)' : 'Incl. Free Hotel Break (€480)'}",
     "{isNorwegian ? 'Inkl. Europeisk Weekend-opphold' : 'Incl. European Weekend Break'}"),
    ("gratis 3-dagers luksushotellopphold for to personer i Europa (verdi 5 400 kr)",
     "utvalgt Europeisk Weekend-opphold for to personer i Europa (verdi inntil 4 500 kr / ca. €400)"),
    ("complimentary 3-day European hotel break for two (worth €480)",
     "complimentary European Weekend Break for two (worth up to €400)")
])

# 5. WaitlistModal.tsx
update("components/WaitlistModal.tsx", [
    ("<div>✓ {isNorwegian ? '100% gratis 3-dagers hotellopphold for 2 personer (verdi 5 400 kr)' : '100% free 3-day European hotel break for 2 (worth €480)'}</div>",
     "<div>✓ {isNorwegian ? 'Europeisk weekend-opphold for 2 personer (verdi inntil 4 500 kr / ca. €400)' : 'Complimentary European weekend break for 2 (worth up to €400)'}</div>")
])

# 6. translations.ts
update("lib/i18n/translations.ts", [
    ("perk1: '100% free 3-day European hotel stay for 2 travelers (worth €480 / 5,400 NOK)',",
     "perk1: 'Complimentary European weekend break for 2 travelers (worth up to €400 / 4,500 NOK)',"),
    ("description: 'De 100 første Founding-medlemmene mottar et 3-dagers luksushotellopphold for 2 personer i Europa (0 kr rompris, verdi 5 400 kr / ca. €480).',",
     "description: 'De 100 første Founding-medlemmene mottar et utvalgt Europeisk Weekend-opphold for 2 personer i Europa (verdi inntil 4 500 kr / ca. €400).',"),
    ("freeTrialBanner: 'Kun 100 plasser • Inkluderer gratis hotellopphold for 2 (5 400 kr) og 100% verdigaranti',",
     "freeTrialBanner: 'Kun 100 plasser • Inkluderer Europeisk Weekend-opphold for 2 og 100% verdigaranti',"),
    ("successDesc: 'Din Founding Member-posisjon og ditt gratis 3-dagers hotellopphold for 2 er nå midlertidig reservert.',",
     "successDesc: 'Din Founding Member-posisjon og ditt Europeiske Weekend-opphold for 2 er nå midlertidig reservert.',")
])

# 7. emailService.ts
update("lib/emailService.ts", [
    ("100% gratis 3-dagers hotellopphold for 2 personer i Europa (verdi 5 400 kr)",
     "Europeisk weekend-opphold for 2 personer i Europa (verdi inntil 4 500 kr / ca. €400)")
])

# 8. LeadDetailModal.tsx
update("components/crm/LeadDetailModal.tsx", [
    ("complimentary 3-day European hotel break for two (worth €480 / 5,400 kr)",
     "complimentary European weekend break for two (worth up to €400 / 4,500 kr)"),
    ("gratis 3-dagers hotellopphold for to i Europa (verdi 5 400 kr)",
     "Europeisk weekend-opphold for to i Europa (verdi inntil 4 500 kr)")
])

# 9. prelaunchConciergeEngine.ts
update("lib/prelaunchConciergeEngine.ts", [
    ("verdi 5 400 kr", "verdi inntil 4 500 kr"),
    ("5 400 kr", "4 500 kr")
])

print("Comprehensive cleanup complete!")
