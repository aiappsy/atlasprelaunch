import os

repo = r"C:\Users\paul\.gemini\antigravity\scratch\atlasprelaunch\src"

# 1. VideoTheaterModal.tsx
v_path = os.path.join(repo, "components", "VideoTheaterModal.tsx")
with open(v_path, "r", encoding="utf-8") as f:
    vc = f.read()

vc = vc.replace(
    "'Join as one of our first 100 Founding Members to receive a complimentary 3-day European hotel stay for two, worth $520.',\n    badge: 'FREE 3-DAY HOTEL STAY',",
    "'Join as one of our first 100 Founding Members to receive a complimentary European weekend break for two, worth up to $480.',\n    badge: 'COMPLIMENTARY WEEKEND BREAK',"
)
vc = vc.replace(
    "label: '05. Golden Ticket Meal Draw',\n    headline: '3 of 100 Members Win All Gourmet Meals Covered',\n    narration:\n      'Plus, three lucky Founding Members will win their entire gourmet dining and half-board 100% paid by ATLAS.',\n    badge: '3X ALL MEALS COVERED',",
    "label: '05. 100% Value Guarantee',\n    headline: '100% Money-Back Satisfaction Guarantee',\n    narration:\n      'If your first stay or annual trips do not save more than your annual dues, ATLAS refunds 100% of your fee immediately.',\n    badge: '100% VALUE GUARANTEE',"
)
with open(v_path, "w", encoding="utf-8") as f:
    f.write(vc)
print("Updated VideoTheaterModal.tsx")

# 2. PodcastPlayerModal.tsx
p_path = os.path.join(repo, "components", "PodcastPlayerModal.tsx")
with open(p_path, "r", encoding="utf-8") as f:
    pc = f.read()

pc = pc.replace(
    "'How 1,500+ boutique and wellness retreats across Europe offer complimentary rooms via European Hospitality Allotment, while guests only settle published gourmet half-board.'",
    "'How curated boutique and wellness retreats across Europe partner with private clubs to allocate exclusive short breaks and weekend escapes.'"
)
pc = pc.replace(
    "{ time: 90, label: '01:30 - Gourmet Half-Board Math', desc: 'Breakfast and multi-course dinner settled directly at checkout' },\n      { time: 210, label: '03:30 - The Golden Ticket Draw', desc: '3 of 100 Founding Members receive all dining 100% covered' },",
    "{ time: 90, label: '01:30 - Why Hoteliers Partner with Private Clubs', desc: 'Protecting brand equity while filling shoulder capacity' },\n      { time: 210, label: '03:30 - The Founding Member Welcome Gift', desc: 'Curated weekend escapes for the first 100 early adopters' },"
)
pc = pc.replace(
    "'Hvordan over 1 500 boutique- og spahoteller i Europa gir bort rommet gratis gjennom European Hospitality Allotment, mens gjestene kun betaler hotellets faste gourmet-halvpensjon.'",
    "'Hvordan utvalgte boutique- og spahoteller i Europa samarbeider med private klubber for å tilby eksklusive weekend- og korttidsferier.'"
)
pc = pc.replace(
    "{ time: 90, label: '01:30 - Halvpensjonsmatematikken', desc: 'Frokostbuffet og fleretters middag gjøres opp direkte ved utsjekk' },\n      { time: 210, label: '03:30 - Golden Ticket-trekningen', desc: '3 av 100 Founding-medlemmer får OGSÅ all mat dekket av ATLAS' },",
    "{ time: 90, label: '01:30 - Hvorfor hoteller samarbeider med lukkede klubber', desc: 'Skjerming av merkevareverdi og utnyttelse av kapasitet' },\n      { time: 210, label: '03:30 - Founding Member velkomstoppholdet', desc: 'Eksklusive weekend-opphold for de 100 første medlemmene' },"
)
pc = pc.replace(
    "{isNorwegian ? 'Sikre gratis 3-dagers hotellopphold for 2 og 0 kr påslag nå' : 'Claim free 3-day European hotel stay for 2 and 0% markups now'}",
    "{isNorwegian ? 'Sikre Europeisk Weekend-opphold for 2 og 0 kr påslag nå' : 'Claim Complimentary European Weekend Break for 2 and 0% markups now'}"
)
with open(p_path, "w", encoding="utf-8") as f:
    f.write(pc)
print("Updated PodcastPlayerModal.tsx")

# 3. nurtureEmailSequence.ts
n_path = os.path.join(repo, "lib", "nurtureEmailSequence.ts")
with open(n_path, "r", encoding="utf-8") as f:
    nc = f.read()

nc = nc.replace(
    '<div style="margin-bottom: 6px;">🎁 <strong>100% gratis 3-dagers hotellopphold for 2 personer</strong> i Europa (verdi 5 400 kr / €480)</div>\n              <div style="margin-bottom: 6px;">🌟 <strong>Lodd i trekningen</strong> der 3 av de 100 får OGSÅ all gourmetmat (halvpensjon) dekket</div>',
    '<div style="margin-bottom: 6px;">🎁 <strong>Europeisk weekend-opphold for 2 personer</strong> i Europa (verdi inntil 4 500 kr / ca. €400)</div>\n              <div style="margin-bottom: 6px;">⚡ <strong>Rå engrospriser for livstid</strong> på fly og over 1 200 000 hoteller globalt</div>'
)
nc = nc.replace(
    "preheaderNo: 'Her er den transparente matematikken bak ditt 3-dagers hotellopphold for to.',",
    "preheaderNo: 'Her er matematikken bak hvordan ATLAS sikrer eksklusive weekend-opphold for to.',"
)
nc = nc.replace(
    "preheaderEn: 'Here is the transparent math behind your complimentary 3-day hotel stay.',",
    "preheaderEn: 'Here is how ATLAS secures curated European weekend escapes for two.',"
)
nc = nc.replace(
    "podcastDescriptionNo: 'Slik utnytter European Hospitality Allotment ledige hotellsenger i Europa, og hvorfor du kun betaler hotellets faste gourmet-halvpensjon ved utsjekk.',",
    "podcastDescriptionNo: 'Slik samarbeider utvalgte boutique- og spahoteller med private klubber for å tilby eksklusive weekend-opphold.',"
)
nc = nc.replace(
    "podcastDescriptionEn: 'How European Hospitality Allotment fills European boutique retreat capacity at zero room rates, while guests only settle fixed half-board on checkout.',",
    "podcastDescriptionEn: 'How European boutique and wellness retreats partner with private clubs to allocate exclusive short breaks.',"
)
nc = nc.replace(
    "Når folk hører at de første 100 Founding-medlemmene i ATLAS får et <strong>gratis 3-dagers hotellopphold for to personer i Europa</strong>, er det første spørsmålet: <em>«Hva er haken?»</em>",
    "Når folk hører at de første 100 Founding-medlemmene i ATLAS mottar et <strong>Europeisk Weekend-opphold for to personer i Europa</strong> som velkomstgave, er det første spørsmålet: <em>«Hvordan er dette mulig?»</em>"
)
nc = nc.replace(
    "Kun 100 plasser med gratis 3-dagers hotellopphold",
    "Kun 100 plasser med Europeisk Weekend-opphold for 2"
)
nc = nc.replace(
    "ditt <strong>gratis 3-dagers hotellopphold for to personer</strong>",
    "ditt <strong>Europeiske Weekend-opphold for to personer</strong>"
)
with open(n_path, "w", encoding="utf-8") as f:
    f.write(nc)
print("Updated nurtureEmailSequence.ts")
