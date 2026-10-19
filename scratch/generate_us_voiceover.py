import asyncio
import edge_tts
import os
import shutil

ENGLISH_TEXT = """Welcome to ATLAS. For decades, the global travel duopoly has kept institutional wholesale hotel bedbanks and direct airline net fares hidden behind 20 to 45 percent retail markups.

ATLAS operates on a pure membership model. Zero markups. Direct wholesale bedbank inventory across 1.2 million hotels, and unbundled direct airline tickets.

On Wednesday, January 20th, 2027, ATLAS officially opens. We are releasing exactly 100 Founding Memberships at 110 euros. Every single Founding Member receives a complimentary European weekend break for two, worth up to 400 euros.

Plus, lifetime access to wholesale net rates on flights, luxury resorts, and 100 percent commission rebates. On launch day, invited candidates have a strict 48-hour claim window before their allocation forfeits to the next in queue.

Backed by our 100 percent money-back value guarantee on your very first trip. Reserve your Founding Member spot today for free, no credit card necessary."""

NORWEGIAN_TEXT = """Velkommen til ATLAS. I tiår har reiselivsbransjens største portaler holdt ekte engrospriser på hotell og fly skjult bak påslag på 20 til 45 prosent.

ATLAS endrer spillereglene med en ren medlemsmodell. Null provisjoner. Rå grossistpriser på over 1,2 millioner hoteller og direkte flybilletter.

Onsdag 20. januar 2027 åpner vi dørene for nøyaktig 100 Founding Members til 1 290 kroner. Samtlige 100 får et utvalgt Europeisk Weekend-opphold for to i Europa inkludert som velkomstgave – en verdi på inntil 4 500 kroner.

I tillegg får du livslang tilgang til rå nettopriser og 100 prosent provisjonsretur. På lanseringsdagen gjelder et 48-timers betalingsvindu før plassen går videre til neste på ventelisten.

Støttet av vår 100 prosent fornøyd- og verdigaranti på din aller første reise. Reserver din Founding Member-plass i dag – helt gratis, intet kredittkort nødvendig."""

async def generate():
    output_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'audio')
    os.makedirs(output_dir, exist_ok=True)

    # 1. US Master Voiceover (en-US-ChristopherNeural) - Authoritative, cinematic American executive
    en_voice = "en-US-ChristopherNeural"
    en_file = os.path.join(output_dir, "founder-voiceover-new.mp3")
    print(f"Generating US English voiceover using {en_voice}...")
    communicate = edge_tts.Communicate(ENGLISH_TEXT, en_voice, rate="-2%")
    await communicate.save(en_file)
    print(f"Generated: {en_file} ({os.path.getsize(en_file)} bytes)")

    # Copy to founder-voiceover.mp3 and hero-voiceover-mastered.mp3
    master_file = os.path.join(output_dir, "founder-voiceover.mp3")
    hero_master = os.path.join(output_dir, "hero-voiceover-mastered.mp3")
    
    shutil.copyfile(en_file, master_file)
    shutil.copyfile(en_file, hero_master)
    print(f"Updated {master_file} and {hero_master}")

    # 2. Norwegian Voiceover (nb-NO-FinnNeural)
    no_voice = "nb-NO-FinnNeural"
    no_file = os.path.join(output_dir, "founder-voiceover-no.mp3")
    print(f"Generating Norwegian voiceover using {no_voice}...")
    communicate_no = edge_tts.Communicate(NORWEGIAN_TEXT, no_voice, rate="-2%")
    await communicate_no.save(no_file)
    print(f"Generated: {no_file} ({os.path.getsize(no_file)} bytes)")

if __name__ == '__main__':
    asyncio.run(generate())
