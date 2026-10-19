import os

t_path = r"C:\Users\paul\.gemini\antigravity\scratch\atlasprelaunch\src\lib\i18n\translations.ts"
with open(t_path, "r", encoding="utf-8") as f:
    c = f.read()

# English Hero
c = c.replace(
    "titleLine2: 'Get a Free 3-Day European Hotel Break.',",
    "titleLine2: 'Complimentary European Weekend Break.',"
)
c = c.replace(
    "description: 'The first 100 Founding Members receive a complimentary 3-day European luxury hotel break for two (worth €480), and 3 members win all gourmet meals covered. Reserve your spot free today – no credit card required.',",
    "description: 'The first 100 Founding Members receive a complimentary European weekend escape for two (worth up to €400) and lifetime access to wholesale net rates. Reserve your spot free today – no credit card required.',"
)
c = c.replace(
    "drawNotice: '🎁 100 Free Hotel Breaks Guaranteed • 3 of 100 Win All Meals Fully Included',",
    "drawNotice: '🎁 Complimentary European Weekend Break for Two • 100% Value Guarantee',"
)

# Norwegian Hero
c = c.replace(
    "titleLine2: 'Få 3-dagers luksushotellopphold gratis.',",
    "titleLine2: 'Europeisk Weekend-opphold for to inkludert.',"
)
c = c.replace(
    "description: 'De 100 første Founding-medlemmene mottar et 3-dagers luksushotellopphold for to i Europa helt gratis (verdi 5 400 kr), og 3 vinnere får all mat dekket. Reserver din plass gratis i dag – intet kredittkort nødvendig.',",
    "description: 'De 100 første Founding-medlemmene mottar et utvalgt Europeisk Weekend-opphold for to personer i Europa (verdi inntil 4 500 kr / ca. €400) som velkomstgave. Reserver din plass gratis i dag – intet kredittkort nødvendig.',"
)
c = c.replace(
    "drawNotice: '🎁 100 gratis hotellopphold garantert • 3 av 100 vinner også all gourmetmat inkludert',",
    "drawNotice: '🎁 Europeisk Weekend-opphold for to inkludert • 100% Fornøyd- & Verdigaranti',"
)

with open(t_path, "w", encoding="utf-8") as f:
    f.write(c)

print("Updated Hero titles in translations.ts successfully!")
