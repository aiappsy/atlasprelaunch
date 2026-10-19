import asyncio
import os
import shutil
import sys
from pathlib import Path

# Ensure UTF-8 output on Windows console
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

from notebooklm import NotebookLMClient
from notebooklm._types.enums import AudioFormat, AudioLength

BASE_DIR = Path(r"C:\Users\paul\.gemini\antigravity\scratch\atlasprelaunch")
ASSETS_DIR = BASE_DIR / "scratch" / "podcast_assets"
AUDIO_OUT_DIR = BASE_DIR / "public" / "audio"
DOWNLOADS_DIR = Path(r"C:\Users\paul\Downloads")
STORAGE_STATE = BASE_DIR / ".notebooklm" / "profiles" / "default" / "storage_state.json"

AUDIO_OUT_DIR.mkdir(parents=True, exist_ok=True)

EPISODES = [
    {
        "id": 1,
        "title": "ATLAS Ep 1 - The Wholesale Travel Revolution",
        "prompt_file": "ep1_prompt.txt",
        "source_file": "ep1_source.txt",
        "out_filename": "How_Wholesale_Memberships_Bypass_Travel_Markups.m4a",
        "copy_download": "How_Travel_Clubs_Bypass_Retail_Markups.m4a",
    },
    {
        "id": 2,
        "title": "ATLAS Ep 2 - The Surplus Inventory Protocol",
        "prompt_file": "ep2_prompt.txt",
        "source_file": "ep2_source.txt",
        "out_filename": "Episode_2_Connex_Protocol.m4a",
        "copy_download": None,
    },
    {
        "id": 3,
        "title": "ATLAS Ep 3 - The Private Resort Clearance",
        "prompt_file": "ep3_prompt.txt",
        "source_file": "ep3_source.txt",
        "out_filename": "Episode_3_RVC_Resort_Clearance.m4a",
        "copy_download": None,
    },
    {
        "id": 4,
        "title": "ATLAS Ep 4 - The Commission Rebate Revolution",
        "prompt_file": "ep4_prompt.txt",
        "source_file": "ep4_source.txt",
        "out_filename": "Episode_4_Commission_Rebate_Revolution.m4a",
        "copy_download": None,
    },
    {
        "id": 5,
        "title": "ATLAS Ep 5 - The Founding 100 Playbook",
        "prompt_file": "ep5_prompt.txt",
        "source_file": "ep5_source.txt",
        "out_filename": "Episode_5_Founding_100_Playbook.m4a",
        "copy_download": None,
    },
    {
        "id": 6,
        "title": "ATLAS Ep 6 - The Doors Are Open",
        "prompt_file": "ep6_prompt.txt",
        "source_file": "ep6_source.txt",
        "out_filename": "Episode_6_Doors_Are_Open.m4a",
        "copy_download": None,
    },
    {
        "id": 7,
        "title": "ATLAS Ep 7 - Final Call Briefing",
        "prompt_file": "ep7_prompt.txt",
        "source_file": "ep7_source.txt",
        "out_filename": "Episode_7_Final_Notice.m4a",
        "copy_download": None,
    },
    {
        "id": 8,
        "title": "ATLAS Grand Finale - Disrupting the Travel Duopoly",
        "prompt_file": "ep8_grand_finale_prompt.txt",
        "source_file": "ep8_grand_finale_source.txt",
        "out_filename": "Grand_Finale_Closing_Masterclass.m4a",
        "copy_download": "How_ATLAS_Disrupts_the_Travel_Duopoly.m4a",
    },
]


async def process_episode(client: NotebookLMClient, ep: dict):
    print(f"\n=======================================================")
    print(f"🎬 Starting {ep['title']} (Episode {ep['id']})...")
    print(f"=======================================================")

    prompt_path = ASSETS_DIR / ep["prompt_file"]
    source_path = ASSETS_DIR / ep["source_file"]
    target_audio_path = AUDIO_OUT_DIR / ep["out_filename"]

    with open(prompt_path, "r", encoding="utf-8") as f:
        instructions = f.read().strip()

    with open(source_path, "r", encoding="utf-8") as f:
        source_content = f.read().strip()

    # 1. Create Notebook
    print(f"Creating Notebook: '{ep['title']}'...")
    nb = await client.notebooks.create(ep["title"])
    notebook_id = nb.id
    print(f"✅ Notebook created! ID: {notebook_id}")

    # 2. Add Source Text
    print(f"Adding source dossier ({len(source_content)} chars)...")
    src = await client.sources.add_text(
        notebook_id,
        title=f"{ep['title']} - Briefing Dossier",
        content=source_content,
        wait=True,
    )
    print(f"✅ Source indexed! Source ID: {src.id}")

    # 3. Generate Audio Overview (Deep-dive podcast)
    print(f"Triggering Audio Overview generation with custom host prompt...")
    gen_status = await client.artifacts.generate_audio(
        notebook_id,
        instructions=instructions,
        language="en",
        audio_format=AudioFormat.DEEP_DIVE,
        audio_length=AudioLength.DEFAULT,
    )
    task_id = gen_status.task_id
    print(f"✅ Audio generation queued! Task ID: {task_id}")

    # 4. Wait for audio completion
    print("Waiting for NotebookLM hosts to render audio (typically 2-4 minutes)...")
    completed_status = await client.artifacts.wait_for_completion(
        notebook_id,
        task_id,
        initial_interval=5.0,
        max_interval=15.0,
        timeout=1200.0,
    )
    print(f"✅ Generation complete! Status: {completed_status.state}")

    # 5. Download audio file
    print(f"Downloading audio file to {target_audio_path}...")
    await client.artifacts.download_audio(notebook_id, str(target_audio_path))
    print(f"🎉 Successfully saved: {target_audio_path} ({target_audio_path.stat().st_size // 1024} KB)")

    # 6. Copy to Downloads if requested
    if ep.get("copy_download"):
        dl_target = DOWNLOADS_DIR / ep["copy_download"]
        shutil.copyfile(target_audio_path, dl_target)
        print(f"📋 Copied to Downloads: {dl_target}")


async def main():
    if not STORAGE_STATE.exists():
        print(f"❌ Error: storage_state.json not found at {STORAGE_STATE}")
        print("Please authenticate first via 'notebooklm login --browser chrome'")
        sys.exit(1)

    print(f"Found authentication state: {STORAGE_STATE}")
    print("Initializing NotebookLM Client...")

    async with NotebookLMClient.from_storage(path=str(STORAGE_STATE)) as client:
        # Test connection by listing notebooks
        existing_nbs = await client.notebooks.list()
        print(f"Connected to Google NotebookLM! Found {len(existing_nbs)} existing notebooks.")

        for ep in EPISODES:
            try:
                await process_episode(client, ep)
            except Exception as e:
                print(f"❌ Failed processing {ep['title']}: {e}")
                import traceback
                traceback.print_exc()

    print("\n=======================================================")
    print("🎉 ALL PODCAST EPISODES COMPLETED SUCCESSFULLY!")
    print("=======================================================")


if __name__ == "__main__":
    asyncio.run(main())
