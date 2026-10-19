import os

repo = r"C:\Users\paul\.gemini\antigravity\scratch\atlasprelaunch\src"

# 1. translations.ts
t_path = os.path.join(repo, "lib", "i18n", "translations.ts")
with open(t_path, "r", encoding="utf-8") as f:
    tc = f.read()

tc = tc.replace(
    "perk1: '100% gratis 3-dagers hotellopphold for 2 personer i Europa (verdi 5 400 kr)',\n      perk2: 'Automatisk lodd i trekningen der 3 av 100 får all gourmetmat (halvpensjon) dekket',",
    "perk1: 'Europeisk weekend-opphold for 2 personer i Europa (verdi inntil 4 500 kr / ca. €400)',\n      perk2: 'Full tilgang til rå engrospriser på 2,5M hoteller og direkte kommisjonskreditter',"
)
with open(t_path, "w", encoding="utf-8") as f:
    f.write(tc)
print("Updated translations.ts")

# 2. DynamicSavingsCalculator.tsx
c_path = os.path.join(repo, "components", "DynamicSavingsCalculator.tsx")
with open(c_path, "r", encoding="utf-8") as f:
    cc = f.read()

cc = cc.replace(
    "When you claim 1 of the first 100 founder spots, ATLAS covers a 3-day European hotel break for two. The room is 100% free (€0)—you only pay the hotel’s local gourmet half-board at checkout.",
    "When you claim 1 of the first 100 founder spots, ATLAS covers a curated European weekend escape for two (worth up to €400) as an exclusive Founding Member gift."
)
cc = cc.replace(
    "isNorwegian ? '~5 400 kr' : '~€480'",
    "isNorwegian ? '~4 500 kr' : '~€400'"
)
with open(c_path, "w", encoding="utf-8") as f:
    f.write(cc)
print("Updated DynamicSavingsCalculator.tsx")

# 3. FounderCertificateModal.tsx
fc_path = os.path.join(repo, "components", "FounderCertificateModal.tsx")
with open(fc_path, "r", encoding="utf-8") as f:
    fcc = f.read()

fcc = fcc.replace(
    "The hotel room is 100% sponsored by ATLAS (worth €480 / 5 400 kr). Traveler only covers local gourmet half-board at check-out.",
    "The stay is sponsored by ATLAS (worth up to €400 / 4,500 NOK) as an exclusive Founding Member welcome gift."
)
fcc = fcc.replace(
    "2. {isNorwegian ? 'Gullbillett-trekning (3 vinnere får all mat dekket):' : 'Golden Ticket Draw (3 Winners Win All Meals Covered):'}",
    "2. {isNorwegian ? 'Eksklusive medlemsfordeler:' : 'Exclusive Member Benefits:'}"
)
with open(fc_path, "w", encoding="utf-8") as f:
    fcc = fcc.replace(
        "Dette oppholdet gir medlemmene tilgang til håndplukkede hoteller i Europa.",
        "Dette oppholdet gir medlemmene en uforglemmelig opplevelse på håndplukkede hoteller i Europa."
    )
    f.write(fcc)
print("Updated FounderCertificateModal.tsx")

# 4. PodcastPlayerModal.tsx
pp_path = os.path.join(repo, "components", "PodcastPlayerModal.tsx")
with open(pp_path, "r", encoding="utf-8") as f:
    ppc = f.read()

ppc = ppc.replace(
    "{ time: 90, label: '01:30 - Gourmet Half-Board Math', desc: 'Breakfast and multi-course dinner settled directly at checkout' },",
    "{ time: 90, label: '01:30 - Why Hoteliers Partner with Private Clubs', desc: 'Protecting brand equity while filling shoulder capacity' },"
)
ppc = ppc.replace(
    "{ time: 90, label: '01:30 - Halvpensjonsmatematikken', desc: 'Frokostbuffet og fleretters middag gjøres opp direkte ved utsjekk' },",
    "{ time: 90, label: '01:30 - Hvorfor hoteller samarbeider med lukkede klubber', desc: 'Skjerming av merkevareverdi og utnyttelse av kapasitet' },"
)
with open(pp_path, "w", encoding="utf-8") as f:
    f.write(ppc)
print("Updated PodcastPlayerModal.tsx")

# 5. prelaunchConciergeEngine.ts (keywords & text)
pce_path = os.path.join(repo, "lib", "prelaunchConciergeEngine.ts")
with open(pce_path, "r", encoding="utf-8") as f:
    pcec = f.read()

pcec = pcec.replace(
    "• **100% Transparent Economics**: You pay only the hotel's published fixed half-board rate (**€35–€60 per guest/day**) for breakfast buffet and multi-course dinner directly upon hotel checkout.\\n• **Verified Savings**: Save **€550+ (6,700+ NOK)** per getaway compared to Booking.com.",
    "• **100% Transparent Economics**: Curated boutique getaway without hidden booking markups.\\n• **Verified Savings**: Exceptional value on unique European short breaks."
)
pcec = pcec.replace(
    "strongKeywords: ['spa', 'gourmet', 'voucher', 'halvpensjon', 'velvære', 'dolomittene', 'European Hospitality Allotment'],",
    "strongKeywords: ['spa', 'gourmet', 'voucher', 'weekend', 'velvære', 'dolomittene', 'European Hospitality Allotment'],"
)
pcec = pcec.replace("'halvpensjon',", "'weekend',")
pcec = pcec.replace("/halvpensjon/i,", "/weekend/i,")
pcec = pcec.replace("/half-board/i,", "/short-break/i,")

with open(pce_path, "w", encoding="utf-8") as f:
    f.write(pcec)
print("Updated prelaunchConciergeEngine.ts")

# 6. PerkExplainerModal.tsx (remove unused comment)
pem_path = os.path.join(repo, "components", "PerkExplainerModal.tsx")
with open(pem_path, "r", encoding="utf-8") as f:
    pemc = f.read()

pemc = pemc.replace(
    "// Hotellpass destinations & half-board daily rates per guest",
    "// Curated destinations & standard rates per guest"
)
with open(pem_path, "w", encoding="utf-8") as f:
    f.write(pemc)
print("Updated PerkExplainerModal.tsx")
