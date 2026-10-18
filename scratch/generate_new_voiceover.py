import asyncio
import edge_tts
import os

ENGLISH_TEXT = """Welcome to ATLAS. For decades, the global travel duopoly has kept institutional wholesale hotel bedbanks and direct airline net fares hidden behind 20 to 45 percent retail markups.

ATLAS operates on a pure membership model. Zero markups. Direct wholesale bedbank inventory across 1.2 million hotels, and unbundled direct airline tickets.

On Wednesday, January 20th, 2027, ATLAS officially opens. We are releasing exactly 100 Founding Memberships at 110 euros. Every single Founding Member receives a complimentary 3-day European luxury hotel break for two, worth over 450 euros.

Plus, three of the first one hundred will win all gourmet meals fully covered. On launch day, invited candidates have a strict 48-hour claim window before their allocation forfeits to the next in queue.

Backed by our 100% money-back value guarantee on your very first trip. Reserve your Founding Member spot today for free, no credit card necessary."""

NORWEGIAN_TEXT = """Velkommen til ATLAS. I tiår har reiselivsbransjens største portaler holdt ekte engrospriser på hotell og fly skjult bak påslag på 20 til 45 prosent.

ATLAS endrer spillereglene med en ren medlemsmodell. Null provisjoner. Rå grossistpriser på over 1,2 millioner hoteller og direkte flybilletter.

Onsdag 20. januar 2027 åpner vi dørene for nøyaktig 100 Founding Members til 1 290 kroner. Samtlige 100 får et 3-dagers luksushotellopphold for to i Europa helt gratis – en verdi på 5 400 kroner.

I tillegg trekker vi tre vinnere blant de 100 som får også all gourmetmat inkludert. På lanseringsdagen gjelder et 48-timers betalingsvindu før plassen går videre til neste på ventelisten.

Støttet av vår 100% fornøyd- og verdigaranti på din aller første reise. Reserver din Founding Member-plass i dag – helt gratis, intet kredittkort nødvendig."""

async def generate():
    output_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'audio')
    os.makedirs(output_dir, exist_ok=True)

    # 1. English Master Voiceover (en-GB-RyanNeural or en-US-ChristopherNeural / en-GB-ThomasNeural)
    en_voice = "en-GB-RyanNeural"
    en_file = os.path.join(output_dir, "founder-voiceover-new.mp3")
    print(f"Generating English voiceover using {en_voice}...")
    communicate = edge_tts.Communicate(ENGLISH_TEXT, en_voice, rate="-2%")
    await communicate.save(en_file)
    print(f"Generated: {en_file} (size: {os.path.getsize(en_file)} bytes)")

    # Copy to founder-voiceover.mp3 as well
    master_file = os.path.join(output_dir, "founder-voiceover.mp3")
    with open(en_file, 'rb') as f_in, open(master_file, 'wb') as f_out:
        f_out.write(f_in.read())
    print(f"Updated master: {master_file}")

    # 2. Norwegian Voiceover (nb-NO-FinnNeural)
    no_voice = "nb-NO-FinnNeural"
    no_file = os.path.join(output_dir, "founder-voiceover-no.mp3")
    print(f"Generating Norwegian voiceover using {no_voice}...")
    communicate_no = edge_tts.Communicate(NORWEGIAN_TEXT, no_voice, rate="-2%")
    await communicate_no.save(no_file)
    print(f"Generated: {no_file} (size: {os.path.getsize(no_file)} bytes)")

if __name__ == '__main__':
    asyncio.run(generate())
