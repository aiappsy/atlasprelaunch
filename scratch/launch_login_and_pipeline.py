import os
import subprocess
import sys
import time
from pathlib import Path

# Ensure UTF-8 output on Windows console
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

BASE_DIR = Path(r"C:\Users\paul\.gemini\antigravity\scratch\atlasprelaunch")
STORAGE_STATE = BASE_DIR / ".notebooklm" / "profiles" / "default" / "storage_state.json"
NOTEBOOKLM_EXE = r"C:\Users\paul\AppData\Roaming\Python\Python312\Scripts\notebooklm.exe"
PYTHON_EXE = r"C:\Program Files\Python312\python.exe"
PIPELINE_SCRIPT = BASE_DIR / "scratch" / "run_full_podcast_pipeline.py"

env = os.environ.copy()
env["NOTEBOOKLM_HOME"] = str(BASE_DIR / ".notebooklm")
env["PYTHONIOENCODING"] = "utf-8"

print("=======================================================")
print("[START] LAUNCHING NOTEBOOKLM AUTHENTICATION & AUTOMATION")
print("=======================================================")
print(f"Target storage: {STORAGE_STATE}")

# Check if storage state already exists and is non-empty
if not STORAGE_STATE.exists() or STORAGE_STATE.stat().st_size == 0:
    print("\n--> Opening Google Chrome login window...")
    print("--> Please select or log into your Google account in the Chrome window.")
    print("--> Once logged in, this script will automatically detect it and generate all 8 episodes!\n")

    # Run notebooklm login
    cmd = [
        NOTEBOOKLM_EXE,
        "login",
        "--browser", "chrome",
        "--browser-timeout", "600",
    ]
    login_proc = subprocess.run(cmd, env=env)
    if login_proc.returncode != 0:
        print(f"\n[ERROR] Login process exited with code {login_proc.returncode}.")
        sys.exit(login_proc.returncode)

if not STORAGE_STATE.exists():
    print(f"\n[ERROR] storage_state.json was not created at {STORAGE_STATE}.")
    sys.exit(1)

print("\n=======================================================")
print("[SUCCESS] LOGIN DETECTED SUCCESSFULLY!")
print("[START] Starting automated generation of all 8 podcast episodes...")
print("=======================================================\n")

# Run the pipeline script
pipeline_proc = subprocess.run([PYTHON_EXE, str(PIPELINE_SCRIPT)], env=env)
sys.exit(pipeline_proc.returncode)
