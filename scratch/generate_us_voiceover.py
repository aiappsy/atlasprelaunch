import asyncio
import edge_tts
import os
import shutil

ENGLISH_TEXT = """Welcome to ATLAS. For decades, major online booking portals have marked up hotels and flights by 20 to 45 percent, keeping true wholesale rates hidden behind inflated retail prices.

ATLAS changes the rules with a private annual membership — just 110 euros per year.

As a member, you bypass the middlemen entirely. You book over 1.2 million luxury hotels and direct flights at raw institutional net rates with zero markups added. And whenever luxury resorts or cruises pay booking commissions, ATLAS refunds 100 percent of that cash directly back to you.

To celebrate our launch, every single Founding Member receives a complimentary European weekend break for two, worth up to 400 euros. That welcome stay alone covers your annual membership nearly four times over before you even take your first trip.

Backed by our 100 percent money-back guarantee: if our wholesale rates don't save you more than your membership fee in your first year, you get every cent back.

Reserve your Founding Member spot today. Zero upfront cost, zero risk."""

NORWEGIAN_TEXT = """Velkommen til ATLAS. I tiår har de store bestillingsportalene lagt på 20 til 45 prosent i skjulte gebyrer og provisjoner på hotell og fly.

ATLAS endrer spillereglene med et privat årsmedlemskap til 1 290 kroner i året.

Som medlem handler du direkte mot de institusjonelle grossistene med null påslag på over 1,2 millioner hoteller og flybilletter. Og når luksushoteller og cruiserederier betaler provisjoner, refunderer ATLAS 100 prosent av pengene rett tilbake til deg.

For å ønske våre Founding Members velkommen, inkluderer medlemskapet et utvalgt europeisk weekend-opphold for to, med en verdi på inntil 4 500 kroner. Dette alene dekker årskontingenten mer enn tre ganger før du i det hele tatt har bestilt din første reise.

Støttet av vår 100 prosent verdigaranti: Sparer du ikke inn medlemskontingenten i løpet av ditt første år, får du alle pengene tilbake.

Sikre din plass på ventelisten i dag. Ingen binding, null risiko."""

async def generate():
    output_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'audio')
    os.makedirs(output_dir, exist_ok=True)

    # 1. US Master Voiceover (en-US-ChristopherNeural) - Authoritative, calm, measured executive pace
    en_voice = "en-US-ChristopherNeural"
    en_file = os.path.join(output_dir, "founder-voiceover-new.mp3")
    print(f"Generating US English voiceover using {en_voice} at measured pace (-10%)...")
    communicate = edge_tts.Communicate(ENGLISH_TEXT, en_voice, rate="-10%")
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
    print(f"Generating Norwegian voiceover using {no_voice} at measured pace (-10%)...")
    communicate_no = edge_tts.Communicate(NORWEGIAN_TEXT, no_voice, rate="-10%")
    await communicate_no.save(no_file)
    print(f"Generated: {no_file} ({os.path.getsize(no_file)} bytes)")

if __name__ == '__main__':
    asyncio.run(generate())
