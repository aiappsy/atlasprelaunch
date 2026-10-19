import os
import re

repo = r"C:\Users\paul\.gemini\antigravity\scratch\atlasprelaunch\src"

def update_file(rel_path, replacements):
    abs_path = os.path.join(repo, rel_path)
    if not os.path.exists(abs_path):
        print(f"File not found: {rel_path}")
        return
    with open(abs_path, "r", encoding="utf-8") as f:
        content = f.read()
    orig = content
    for old, new in replacements:
        content = content.replace(old, new)
    if content != orig:
        with open(abs_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated: {rel_path}")
    else:
        print(f"No changes: {rel_path}")

# 1. Hero.tsx
update_file(os.path.join("components", "Hero.tsx"), [
    ("isNorwegian ? 'Gratis 3-dagers hotellopphold for 2' : 'Free 3-Day Hotel Break for 2'",
     "isNorwegian ? 'Europeisk Weekend-opphold for 2 inkludert' : 'Complimentary European Weekend Break for 2'")
])

# 2. DynamicSavingsCalculator.tsx
update_file(os.path.join("components", "DynamicSavingsCalculator.tsx"), [
    ("Founding Member-gave: Gratis 3-dagers luksushotellopphold for 2 (verdi 5 400 kr / ca. €480) inkludert.",
     "Founding Member-gave: Europeisk weekend-opphold for 2 (verdi inntil 4 500 kr / ca. €400) inkludert."),
    ("Founder perk: Complimentary 3-day luxury hotel break for two (worth €480) included.",
     "Founder perk: Complimentary European weekend break for two (worth up to €400) included."),
    ("{isNorwegian ? 'Hotellpass: 3 Dager Gratis for 2' : 'Hotel Pass: 3-Day Free Hotel Break for 2'}",
     "{isNorwegian ? 'Europeisk Weekend-opphold for 2' : 'Complimentary European Weekend Break for 2'}"),
    ("Når du sikrer deg et av de 100 første medlemskapene, spanderer ATLAS et 3-dagers hotellopphold for to i Europa (European Hospitality Allotment). Rommet er 100% gratis (0 kr). Du betaler kun hotellets lokale mat (frokost & middag) ved utsjekk.",
     "Når du sikrer deg et av de 100 første medlemskapene, spanderer ATLAS et utvalgt weekend-opphold for to i Europa (verdi inntil 4 500 kr / ca. €400) som eksklusiv Founding Member-gave."),
    ("When you claim 1 of the first 100 founder spots, ATLAS covers a 3-day European hotel break for two. The room is 100% free (€0)—you only pay the hotel's local gourmet half-board at checkout.",
     "When you claim 1 of the first 100 founder spots, ATLAS covers a curated European weekend escape for two (worth up to €400) as an exclusive Founding Member gift.")
])

# 3. FounderCertificateModal.tsx
update_file(os.path.join("components", "FounderCertificateModal.tsx"), [
    ("<span>{isNorwegian ? 'Gratis 3-Dagers Hotell' : 'Free 3-Day Hotel Break'}</span>",
     "<span>{isNorwegian ? 'Europeisk Weekend-opphold for 2' : 'European Weekend Break for 2'}</span>"),
    ("100% gratis hotellopphold for 2 i Europa (Europeisk Hotellkupong, verdi 5 400 kr / ca. €480).",
     "Europeisk weekend-opphold for 2 i Europa (verdi inntil 4 500 kr / ca. €400) inkludert."),
    ("100% free European hotel break for two travelers (worth €480 / 5 400 kr).",
     "Complimentary European weekend break for two travelers (worth up to €400 / 4 500 kr)."),
    ("3 av de 100 første vinner OGSÅ all gourmetmat (halvpensjon) dekket.",
     "Eksklusiv velkomstgave for våre første 100 Founding Members."),
    ("3 of the 100 early members win ALL gourmet meals (half-board) covered.",
     "Exclusive welcome gift reserved for our first 100 Founding Members."),
    ("Gratis 3-dagers hotellopphold for to (European Hospitality Allotment):",
     "Europeisk weekend-opphold for 2 (Founding Member Allotment):"),
    ("Complimentary 3-Day European Hotel Break for Two (Europeisk Hotellkupong):",
     "Complimentary European Weekend Break for Two:"),
    ("Selve hotellrommet er 100% sponset av ATLAS (verdi 5 400 kr / ca. €480). Du betaler kun hotellets lokale gourmet-halvpensjon ved utsjekk.",
     "Oppholdet sponset av ATLAS (verdi inntil 4 500 kr / ca. €400) som Founding Member velkomstgave."),
    ("The hotel room is 100% sponsored by ATLAS (worth €480 / 5,400 NOK). You only pay the hotel's local gourmet half-board at checkout.",
     "The stay is sponsored by ATLAS (worth up to €400 / 4,500 NOK) as a Founding Member welcome gift."),
    ("Blant de 100 første medlemmene trekker vi 3 vinnere som får OGSÅ ALL MAT (halvpensjon) 100% dekket av ATLAS.",
     "Dette oppholdet gir medlemmene tilgang til håndplukkede hoteller i Europa."),
    ("Among the first 100 members, 3 winners will have ALL MEALS (half-board) 100% covered by ATLAS.",
     "This stay gives members access to handpicked destinations across Europe.")
])

# 4. WaitlistModal.tsx
update_file(os.path.join("components", "WaitlistModal.tsx"), [
    ("Founding Member (Inkl. Gratis 3-dagers Hotellopphold)",
     "Founding Member (Inkl. Europeisk Weekend-opphold)"),
    ("100% gratis 3-dagers hotellopphold for 2",
     "Europeisk weekend-opphold for 2"),
    ("100% free 3-day European hotel break for 2",
     "Complimentary European weekend break for 2"),
    ("Selve rommet er 100% sponset. Du betaler kun hotellets lokale mat (halvpensjon) ved utsjekk.",
     "Europeisk helgeopphold for 2 inkludert som Founding Member-velkomstgave."),
    ("The hotel room is 100% sponsored. Traveler only covers local half-board meals at checkout.",
     "European short break for 2 included as a Founding Member welcome gift.")
])

# 5. translations.ts
update_file(os.path.join("lib", "i18n", "translations.ts"), [
    ("pillar3Title: 'European Hospitality Allotment (3-Day Free Hotel Break)',",
     "pillar3Title: 'Complimentary European Weekend Break for 2',"),
    ("pillar3Title: 'European Hospitality Allotment (3 dager gratis for 2)',",
     "pillar3Title: 'Europeisk Weekend-opphold for 2',"),
    ("pillar3Desc: '1 500+ utvalgte boutique- og velværerhoteller i Europa. Rommet er 100% gratis for to, du betaler kun lokal mat (frokost & middag) ved utsjekk.',",
     "pillar3Desc: 'Utvalgte boutique- og velværerhoteller i Europa. Eksklusivt helgeopphold for to inkludert som Founding Member-gave.',"),
    ("pillar3Desc: '1,500+ handpicked boutique and wellness hotels in Europe. Room is 100% free for two, guests only pay local half-board at checkout.',",
     "pillar3Desc: 'Curated boutique and wellness hotels across Europe. Complimentary weekend escape for two included as a Founding Member gift.',"),
    ("lifetimeDiscount: 'Gratis 3-Dagers Hotellopphold for To',",
     "lifetimeDiscount: 'Europeisk Weekend-opphold for To',"),
    ("lifetimeDiscount: 'Free 3-Day European Hotel Break',",
     "lifetimeDiscount: 'Complimentary European Weekend Break',"),
    ("perk1: '100% gratis 3-dagers hotellopphold for 2 personer i Europa (verdi 5 400 kr / €480)',",
     "perk1: 'Europeisk weekend-opphold for 2 personer i Europa (verdi inntil 4 500 kr / €400)',"),
    ("perk1: '100% free 3-day hotel break for two travelers in Europe (€480 / 5,400 NOK value)',",
     "perk1: 'Complimentary European weekend break for two travelers (worth up to €400 / 4,500 NOK)',"),
    ("perk2: 'Automatisk lodd i trekningen der 3 av 100 får all gourmetmat (halvpensjon) 100% dekket',",
     "perk2: 'Full tilgang til rå engrospriser på 2,5M hoteller og direkte kommisjonskreditter',"),
    ("perk2: 'Automatic entry into draw where 3 of 100 early members win ALL gourmet meals covered',",
     "perk2: 'Full access to wholesale net rates across 2.5M hotels and direct commission credits',"),
    ("successDesc: 'Din Founding Member-posisjon og ditt gratis 3-dagers hotellopphold for 2 er nå midlertidig reservert.',",
     "successDesc: 'Din Founding Member-posisjon og ditt Europeiske Weekend-opphold for 2 er nå midlertidig reservert.',"),
    ("successDesc: 'Your Founding Member spot and free 3-day European hotel break for two are now reserved.',",
     "successDesc: 'Your Founding Member spot and complimentary European weekend break for two are now reserved.'")
])

# 6. ComplianceModal.tsx & RefundClaimModal.tsx
update_file(os.path.join("components", "ComplianceModal.tsx"), [
    ("Europeisk 3-dagers hotellkupong (verdi 5 400 kr)", "Europeisk hotellopphold-kupong (verdi 4 500 kr)"),
    ("European 3-Day Hotel Break voucher (€480 value)", "European Hotel Break voucher (€400 value)")
])
update_file(os.path.join("components", "RefundClaimModal.tsx"), [
    ("Europeisk 3-dagers hotellkupong (verdi 5 400 kr)", "Europeisk hotellopphold-kupong (verdi 4 500 kr)"),
    ("European 3-Day Hotel Break voucher (€480 value)", "European Hotel Break voucher (€400 value)")
])

# 7. PerkExplainerModal.tsx
update_file(os.path.join("components", "PerkExplainerModal.tsx"), [
    ("Gjennom European Hospitality Allotment fyller utvalgte 3-4* boutique- og spahoteller i Europa ledig kapasitet. Selve hotellrommet er 100% gratis for to personer (0 kr i rompris). Som gjest betaler du kun hotellets lokale gourmet-halvpensjon (frokost og middag) direkte til hotellet ved utsjekk.",
     "Som Founding Member mottar du et utvalgt Europeisk Weekend-opphold for to personer på håndplukkede boutique-, landlige- og velværesteder i Europa. Oppholdet er en eksklusiv velkomstgave fra ATLAS med verdi inntil 4 500 kr (€400)."),
    ("Through European Hospitality Allotment, curated 3-4* boutique and wellness hotels across Europe optimize occupancy. The hotel room itself is 100% free for two travelers ($0 room rate). Guests only pay the hotel's local gourmet half-board (breakfast & dinner) directly to the hotel upon checkout.",
     "As a Founding Member, you receive a curated European Weekend Break for two travelers across handpicked boutique, countryside, and wellness retreats in Europe. The stay is an exclusive welcome perk from ATLAS worth up to €400 ($480)."),
    ("Blant de 100 første Founding-medlemmene trekker vi 3 heldige vinnere som OGSÅ får all gourmet-halvpensjon 100% sponset av ATLAS!",
     "Dette oppholdet gir medlemmene en herlig introduksjon til ATLAS' eksklusive reiseverden!"),
    ("Among the first 100 Founding Members, 3 lucky winners will also have all gourmet half-board 100% sponsored by ATLAS!",
     "This getaway provides members with a premier introduction to the ATLAS private travel ecosystem!"),
    ("Obligatorisk Gourmet-halvpensjon (2 pers / dag)",
     "Utvalgt Europeisk Weekend-opphold for 2"),
    ("Mandatory Gourmet Half-Board (2 pax / day)",
     "Curated European Weekend Break for 2"),
    ("Kupongen dekker 100% av romprisen (0 kr). Hotellenes kulinariske opplevelse betales lokalt ved utsjekk.",
     "Oppholdet er en eksklusiv Founding Member-velkomstgave fra ATLAS på utvalgte destinasjoner."),
    ("The voucher covers 100% of the room rate (€0). The property's culinary experience is settled locally at checkout.",
     "The stay is an exclusive Founding Member welcome gift from ATLAS across curated destinations.")
])

print("All updates completed successfully!")
