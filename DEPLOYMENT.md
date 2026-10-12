# Atlas Prelaunch — Standard Deployment Protocol

> **CRITICAL STANDARD**: As mandated by the project owner, this is the official, permanent deployment pipeline for Atlas Prelaunch. Do NOT use Google AI Studio's web publisher.

---

## 1. Hosting Architecture
* **Platform**: Firebase Hosting (Google Cloud project `bizmaster-abfed`, Project ID `910579541086`)
* **Primary Site ID**: `atlaslaunch`
* **Live CDN URLs**:
  * `https://atlaslaunch.web.app`
  * `https://atlaslaunch.firebaseapp.com`
* **Main Domain Routing**:
  * `https://atlastravelclub.com` ➔ forwards directly to `https://atlaslaunch.web.app`
  * Handled via Cloud Run `aiappsy-link-engine`.

---

## 2. Standard Deployment Command

From directory `C:\Users\paul\.gemini\antigravity\scratch\atlasprelaunch`:

```bash
# 1. Typecheck and verify 0 errors
npm run lint

# 2. Production build
npm run build

# 3. Deploy to Firebase Hosting CDN
firebase deploy --only hosting
```

* **Deploy Duration**: ~15 seconds.
* **Instant Propagation**: All changes go live immediately on both `https://atlaslaunch.web.app` and `https://atlastravelclub.com`.

---

## 3. Git Synchronization
* **Remote**: `https://github.com/aiappsy/atlasprelaunch.git` (`main` branch)
* Always commit and push working revisions to `main` upon deploying.
