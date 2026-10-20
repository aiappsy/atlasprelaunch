import wave
import os
import shutil
from google import genai
from google.genai import types

# Clean, punchy, exclusive private club script without any confusing guarantee terms
ENGLISH_SCRIPT = """Welcome to ATLAS. An exclusive private travel club created for travelers who value discretion, transparency, and true wholesale access.

ATLAS operates on a transparent annual membership of just 110 euros per year.

As a member, you bypass the middlemen entirely. You book over 1.2 million luxury hotels and direct flights at raw institutional net rates with zero markups added. And whenever luxury resorts or cruises pay booking commissions, ATLAS refunds 100 percent of that cash directly back to you.

To celebrate our official launch, the first one hundred Founding Members receive a complimentary European weekend break for two, worth up to 400 euros. Flexible boutique accommodation with zero meal obligations.

That welcome break alone covers your annual membership nearly four times over on day one.

Reserve your Founding Member spot today for free. No credit card required. Welcome to ATLAS."""

NORWEGIAN_SCRIPT = """Velkommen til ATLAS. En eksklusiv, privat reiseklubb skapt for reisende som verdsetter diskresjon, åpenhet og ekte engrospriser.

ATLAS opererer med et transparent årsmedlemskap til 1 290 kroner i året.

Som medlem handler du direkte mot de institusjonelle grossistene med null påslag på over 1,2 millioner hoteller og flybilletter. Og når luksushoteller og cruiserederier betaler provisjoner, refunderer ATLAS 100 prosent av pengene rett tilbake til deg.

For å feire lanseringen mottar de første 100 Founding-medlemmene et utvalgt europeisk weekend-opphold for to personer, med en verdi på inntil 4 500 kroner. Fleksibelt hotellopphold helt uten matforpliktelser.

Velkomstgaven alene overstiger årsavgiften mer enn tre ganger på dag én.

Sikre din plass på ventelisten i dag helt gratis. Intet kredittkort nødvendig. Velkommen til ATLAS."""

API_KEY = os.getenv("GEMINI_API_KEY", "")

def generate():
    client = genai.Client(api_key=API_KEY)
    output_dir = os.path.join(os.path.dirname(__file__), "..", "public", "audio")
    os.makedirs(output_dir, exist_ok=True)

    print("Generating Google Gemini 2.5 Flash TTS (English - Charon voice)...")
    
    # Charon: Deep, calm, prestigious executive voice
    voice_config = types.SpeechConfig(
        voice_config=types.VoiceConfig(
            prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name="Charon")
        )
    )

    response = client.models.generate_content(
        model="gemini-2.5-flash-preview-tts",
        contents=f"Read this text slowly, with calm authority, natural human breathing, and warmth. Do not rush:\n\n{ENGLISH_SCRIPT}",
        config=types.GenerateContentConfig(
            response_modalities=["AUDIO"],
            speech_config=voice_config
        )
    )

    pcm_data = response.candidates[0].content.parts[0].inline_data.data
    en_wav_path = os.path.join(output_dir, "founder-voiceover-gemini.wav")

    with wave.open(en_wav_path, "wb") as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(24000)
        f.writeframes(pcm_data)

    print(f"Generated English Google Voice: {en_wav_path} ({len(pcm_data)} bytes PCM)")

    # Also copy to founder-voiceover-new.wav and hero-voiceover-mastered.wav
    shutil.copyfile(en_wav_path, os.path.join(output_dir, "founder-voiceover-new.wav"))
    shutil.copyfile(en_wav_path, os.path.join(output_dir, "hero-voiceover-mastered.wav"))
    print("Copied to master WAV files.")

if __name__ == "__main__":
    generate()
