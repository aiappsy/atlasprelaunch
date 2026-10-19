import os

path = r"C:\Users\paul\.gemini\antigravity\scratch\atlasprelaunch\src\lib\prelaunchConciergeEngine.ts"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

# 1. First mention around lines 149 & 167
c = c.replace(
    "Når du sikrer deg et av våre 100 første Founding-medlemskap (${p.formattedFounding}), **spanderer ATLAS et 3-dagers hotellopphold for to personer i Europa helt gratis (verdi 5 400 kr)**. Selve rommet er 100% dekket (du betaler kun hotellets lokale gourmet-halvpensjon ved utsjekk).\n\nI tillegg trekker vi 3 heldige vinnere blant de 100 som får **OGSÅ MATEN 100% dekket av ATLAS**!",
    "Når du sikrer deg et av våre 100 første Founding-medlemskap (${p.formattedFounding}), **spanderer ATLAS et utvalgt Europeisk Weekend-opphold for to personer i Europa (verdi inntil 4 500 kr / ca. €400)** som eksklusiv Founding Member-gave."
)

c = c.replace(
    "When you secure one of our first 100 Founding Memberships (${p.formattedFounding}), **ATLAS gifts you a complimentary 3-day European hotel stay for two (worth €480)**. The room is 100% sponsored (you only pay the hotel's local gourmet half-board at checkout).\n\nOn top of this, 3 lucky winners among the 100 will win **ALL MEALS 100% paid by ATLAS**!",
    "When you secure one of our first 100 Founding Memberships (${p.formattedFounding}), **ATLAS gifts you a complimentary European Weekend Break for two (worth up to €400)** as an exclusive Founding Member gift."
)

# 2. Lines 306-307 & 327-328
c = c.replace(
    "• **Gave til de 100 første**: Et **3-dagers gratis luksushotellopphold for 2 personer** i Europa (verdi 5 400 kr, 0 kr i rompris via European Hospitality Allotment).\n• **Golden Ticket Mattrekning**: 3 av de 100 første vinner OGSÅ all gourmetmat (halvpensjon) 100% dekket av ATLAS.",
    "• **Gave til de 100 første**: Et **Europeisk Weekend-opphold for 2 personer** i Europa (verdi inntil 4 500 kr / ca. €400) inkludert som Founding Member-gave."
)

c = c.replace(
    "• **Founder Gift for the First 100**: A complimentary **3-day European luxury hotel break for 2 guests** (worth €480 / 5 400 kr, €0 room rate via European Hospitality Allotment).\n• **Golden Ticket Food Draw**: 3 of the first 100 members will win ALL gourmet meals (half-board) 100% covered by ATLAS.",
    "• **Founder Gift for the First 100**: A complimentary **European Weekend Break for 2 guests** (worth up to €400 / 4,500 NOK) included as an exclusive Founding Member gift."
)

# 3. Followups
c = c.replace("Hva inkluderer det gratis hotelloppholdet?", "Hva inkluderer det europeiske weekend-oppholdet?")
c = c.replace("What is included in the free hotel stay?", "What is included in the European weekend break?")

# 4. Lines 1130-1150 (Spa Escapes intent)
old_no = """          text: `🍷 **Atlas Gourmet & Spa Escapes — 0 kr i Rompris:**\\n\\nGjennom vårt partnerskap med European Hospitality Allotment fyller over **1 500 utvalgte boutique- og velværerhoteller i Europa** ledig kapasitet med en genial modell:\\n\\n• **Rompris**: **0 NOK** (verditilgodelappen dekker 100% av romprisen for 2 personer i 2–4 netter).\\n• **100% Transparent Økonomi**: Du betaler kun hotellets offisielle, faste halvpensjonspris (**€35–€60 per person/dag**) for frokostbuffet og gourmet fleretters middag direkte ved utsjekk på hotellet.\\n• **Dokumentert besparelse**: Sparer typisk **over 6 700 NOK (ca. €550)** per miniferie sammenlignet med Booking.com og Expedia.\\n• **Håndplukkede destinasjoner**: Dolomittene (Sør-Tyrol), Chianti (Toscana), Schwarzwald (Tyskland), Salzburg (Østerrike), Gardasjøen og Provence.\\n• **Umiddelbar kupongutstedelse**: Aktiver din unike verdikupong (ATLAS-HB-xxxx) direkte på medlemsportalen.`,"""

new_no = """          text: `🍷 **Atlas Weekend & Boutique Escapes:**\\n\\nSom Founding Member mottar du et utvalgt **Europeisk Weekend-opphold for to personer** (verdi inntil 4 500 kr / ca. €400):\\n\\n• **Inkludert som velkomstgave**: Rom for 2 personer på utvalgte boutique-, landlige- eller velværehoteller i Europa.\\n• **100% Transparent**: Ingen skjulte påslag eller ubehagelige forpliktelser.\\n• **Attraktive destinasjoner**: Destinasjoner i Italia, Tyskland, Østerrike, Sveits og Frankrike.\\n• **Eksklusiv fordel**: Reservert for de 100 første Founding Members ved lansering.`,"""

old_en = """          text: `🍷 **Atlas Gourmet & Spa Escapes — €0 Room Rates:**\\n\\nThrough our strategic partnership with European Hospitality Allotment, **1,500+ curated boutique & wellness retreats across Europe** fill surplus capacity:\\n\\n• **Room Rate**: **€0** (the voucher covers 100% of the room rate for 2 guests for 2–4 nights).\\n• **100% Transparent Economics**: You pay only the hotel's published fixed half-board rate (**€35–€60 per guest/day**) for breakfast buffet and multi-course dinner directly upon hotel checkout.\\n• **Verified Savings**: Save **€550+ (6,700+ NOK)** per getaway compared to Booking.com.\\n• **Curated Destinations**: Dolomites (South Tyrol), Tuscany (Chianti), Black Forest (Germany), Salzburg (Austria), Lake Garda, and Provence.\\n• **Instant Digital Voucher**: Unique voucher codes (ATLAS-HB-xxxx) generated instantly on the portal.`,"""

new_en = """          text: `🍷 **Atlas Weekend & Boutique Escapes:**\\n\\nAs a Founding Member, you receive a complimentary **European Weekend Break for two travelers** (worth up to €400):\\n\\n• **Included Welcome Gift**: Curated stay for 2 guests across boutique, countryside, and wellness retreats in Europe.\\n• **100% Transparent**: Zero hidden fees or forced obligations.\\n• **Premier Destinations**: Handpicked spots in Italy, Germany, Austria, Switzerland, and France.\\n• **Exclusive Privilege**: Reserved for the first 100 Founding Members at launch.`,"""

c = c.replace(old_no, new_no)
c = c.replace(old_en, new_en)

# 5. Line 582
c = c.replace(
    "Du beholder din utstedte Europeisk 3-dagers hotellkupong",
    "Du beholder din utstedte Europeiske hotellopphold-kupong"
)

with open(path, "w", encoding="utf-8") as f:
    f.write(c)

print("Updated prelaunchConciergeEngine.ts")
