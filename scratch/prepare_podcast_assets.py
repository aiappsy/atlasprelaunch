import os
import re

ASSETS_DIR = r"C:\Users\paul\.gemini\antigravity\scratch\atlasprelaunch\scratch\podcast_assets"
os.makedirs(ASSETS_DIR, exist_ok=True)

# 1. Episode 1: Master Overview
ep1_prompt = """Adopt the tone of two charismatic, investigative financial journalists and consumer champions.
CRITICAL PRONUNCIATION & FACTUAL GUARDRAILS:
1. PRONUNCIATION: The founder is Pål Juritzen. Strictly pronounce his name as "Paul Yur-it-zen" (Pawl Yoo-rit-sen). NEVER pronounce as "Pal" and NEVER use a hard English "J" for Juritzen. Refer to him as "Founder Paul Yur-it-zen (spelled Pål Juritzen)".
2. ACCOMMODATION TYPES: Accommodations range from studio suites to 1-bedroom and 2-bedroom vacation condominium apartments, sleeping 2 to 6 guests depending on unit size and resort availability. It is NOT always a 2-bedroom unit!
3. CLEARANCE PRICING: Weekly stays start FROM €299 / 3 490 kr (fra 3 490 kr) for a full 7 nights when booking last-minute clearance / distressed inventory weeks (pricing varies by season, advance notice, and unit size). It is NOT a flat €299 for everything!
4. TERMINOLOGY: Strictly NEVER use the word "timeshare". Refer exclusively to serviced resort condominiums and vacation residences.
5. NO RGF: ATLAS does not sell package tours; ATLAS provides raw wholesale net technology access with a 100% Value Guarantee. Never mention RGF or Reisegarantifondet.
6. THE 100% VALUE GUARANTEE: Clarify that the €110 (1 290 NOK) annual dues guarantee applies to the member's first hotel stay (minimum 2-3 nights at wholesale bedbank rates), vacation resort condominium booking, or cumulative annual travel savings. Do NOT claim someone saves €110 on a single cheap €50 flight (flights offer unbundled net carrier savings of 8%–14%, while high-margin hotels and resort condos easily save €150–€1,500+).

Synthesize the Costco membership model in travel, comparing raw wholesale net bedbanks (0 kr markup) and direct NDC flights to the retail duopoly markups of 20%-45%."""

with open(r"C:\Users\paul\.gemini\antigravity\scratch\atlasprelaunch\public\docs\Atlas_Wholesale_Travel_NotebookLM_Briefing.txt", "r", encoding="utf-8") as f:
    ep1_source = f.read()

with open(os.path.join(ASSETS_DIR, "ep1_source.txt"), "w", encoding="utf-8") as f:
    f.write(ep1_source)

with open(os.path.join(ASSETS_DIR, "ep1_prompt.txt"), "w", encoding="utf-8") as f:
    f.write(ep1_prompt)

# Grand Finale (Episode 8)
with open(r"C:\Users\paul\.gemini\antigravity\scratch\atlasprelaunch\docs\NotebookLM_Grand_Finale_Closing_Podcast_Script.md", "r", encoding="utf-8") as f:
    gf_content = f.read()

# Extract prompt and source from Grand Finale
gf_prompt_match = re.search(r"```text\s*([\s\S]*?)```", gf_content)
gf_prompt = gf_prompt_match.group(1).strip() if gf_prompt_match else ""

gf_source_match = re.search(r"(# THE GRAND FINALE[\s\S]*)", gf_content)
gf_source = gf_source_match.group(1).strip() if gf_source_match else gf_content

with open(os.path.join(ASSETS_DIR, "ep8_grand_finale_prompt.txt"), "w", encoding="utf-8") as f:
    f.write(gf_prompt)

with open(os.path.join(ASSETS_DIR, "ep8_grand_finale_source.txt"), "w", encoding="utf-8") as f:
    f.write(gf_source)

# Parse Episodes 2 through 7 from NotebookLM_Podcast_Source_Briefings_Episodes_2_to_7.md
with open(r"C:\Users\paul\.gemini\antigravity\scratch\atlasprelaunch\docs\NotebookLM_Podcast_Source_Briefings_Episodes_2_to_7.md", "r", encoding="utf-8") as f:
    ep2_to_7_content = f.read()

# Pattern for episodes
episodes = [
    (2, "EPISODE 2: THE CONNEX / HOLIDAY PLUS PROTOCOL", "EPISODE 3: THE RVC VACATION CERTIFICATE SECRET"),
    (3, "EPISODE 3: THE RVC VACATION CERTIFICATE SECRET", "EPISODE 4: THE TRAVEL DUOPOLY & THE 100% COMMISSION REBATE"),
    (4, "EPISODE 4: THE TRAVEL DUOPOLY & THE 100% COMMISSION REBATE", "EPISODE 5: THE LAUNCH COUNTDOWN & FOUNDING 100 PLAYBOOK"),
    (5, "EPISODE 5: THE LAUNCH COUNTDOWN & FOUNDING 100 PLAYBOOK", "EPISODE 6: THE LIVE PLATFORM REVEAL — INSIDE THE WHOLESALE ENGINE"),
    (6, "EPISODE 6: THE LIVE PLATFORM REVEAL — INSIDE THE WHOLESALE ENGINE", "EPISODE 7: THE STRATEGIC ANNUAL AUDIT — THE FINAL CALL"),
    (7, "EPISODE 7: THE STRATEGIC ANNUAL AUDIT — THE FINAL CALL", None),
]

for num, start_marker, end_marker in episodes:
    start_pos = ep2_to_7_content.find(start_marker)
    if start_pos == -1:
        print(f"Marker not found: {start_marker}")
        continue
    
    if end_marker:
        end_pos = ep2_to_7_content.find(end_marker, start_pos)
        block = ep2_to_7_content[start_pos:end_pos].strip()
    else:
        block = ep2_to_7_content[start_pos:].strip()
    
    # Extract prompt
    prompt_match = re.search(r"```text\s*([\s\S]*?)```", block)
    if not prompt_match:
        prompt_match = re.search(r"### 🎙️ NotebookLM Host Direction Prompt:\s*> \s*\"([\s\S]*?)\"", block)
    if not prompt_match:
        prompt_match = re.search(r"### 🎙️ NotebookLM Host Direction Prompt:\s*> ([\s\S]*?)(?=\n###|\n---|$)", block)
    
    prompt = prompt_match.group(1).strip() if prompt_match else ""
    
    # Extract source briefing
    source_match = re.search(r"### 📄 Source Briefing Document for NotebookLM:\s*([\s\S]*)", block)
    source = source_match.group(1).strip() if source_match else block
    
    # Prepend universal guardrails to the source
    guardrails_header = """# ATLAS TRAVEL CLUB BRIEFING
Entity: HARD ROCK CAPITAL LTD (UK Company #16833237)
Founder: Pål Juritzen (phonetic: "Paul Yur-it-zen")
Launch: Wednesday, January 20, 2027 at 10:00 AM CET
Annual Membership: €110 / year (1 290 NOK / år) • 0 kr Retail Markup • 100% Value Guarantee

CRITICAL GUARDRAILS:
- Founder Pål Juritzen is strictly pronounced "Paul Yur-it-zen" (never Pal, never hard J).
- Condominiums are studio suites, 1-bed, and 2-bed units sleeping 2 to 6 guests (NOT always 2-bedroom).
- 7-night condo clearance pricing is FROM €299 / 3 490 kr (fra 3 490 kr) for distressed inventory weeks (NOT flat €299).
- Strictly NEVER use the word timeshare.
- Zero mentions of RGF or Reisegarantifondet.
- 100% Value Guarantee applies to hotel stays (2+ nights), vacation condos, or cumulative annual travel (never promises saving €110 on a single €50 flight).

"""
    full_source = guardrails_header + source
    
    with open(os.path.join(ASSETS_DIR, f"ep{num}_prompt.txt"), "w", encoding="utf-8") as f:
        f.write(prompt)
    with open(os.path.join(ASSETS_DIR, f"ep{num}_source.txt"), "w", encoding="utf-8") as f:
        f.write(full_source)
    print(f"Extracted Episode {num}: prompt len={len(prompt)}, source len={len(full_source)}")

print("All episode assets successfully extracted!")
