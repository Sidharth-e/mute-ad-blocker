# Mute AdBlocker Chrome Extension

A Chrome Extension that blocks ads using **EasyList** network rules and basic **cosmetic filtering**. It leverages the `chrome.declarativeNetRequest` API (Manifest V3 compliant) and includes dynamic rule updates based on user settings.

---

## ✨ Features

- ✅ Blocks ads using **EasyList** filters (converted to Chrome-compatible JSON)
- 🧹 Hides common ad elements using **DOM selectors**
- 🔄 Automatically loads rules at **startup or install**
- 🔘 Toggle ad blocking using `chrome.storage.sync`
- ⚙️ Manifest V3 & service worker compliant

---

## 📁 Project Structure

```

adblocker-extension/
├── icons/
│ ├── icon16.png           # 16x16 icon (browser toolbar)
│ ├── icon32.png           # 32x32 icon
│ ├── icon48.png           # 48x48 icon (Chrome Web Store)
│ ├── icon128.png          # 128x128 icon (install splash)
├── ads_rules.json         # Auto-generated network rules (from EasyList)
├── background.js          # Service worker for managing dynamic rules
├── content.js             # Cosmetic filtering script (removes ad elements)
├── generate_rules.js      # Node script to convert EasyList to JSON rules
├── manifest.json          # Chrome extension manifest (MV3)
└── README.md              # You're here

````

---

## 🛠 Installation & Setup

### 1. 🔃 Generate Adblock Rules

This extension uses `ads_rules.json` generated from [EasyList](https://easylist.to/).

Install dependencies and run the script:

```bash
npm install node-fetch
node generate_rules.js
````

This will create a fresh `ads_rules.json` with up to 30,000 rules.

---

### 2. 📦 Load the Extension in Chrome

1. Go to `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **"Load unpacked"**
4. Select your extension folder

---

### 3. 🧪 Toggle AdBlocker (Optional)

You can toggle the adblocker on/off using the Chrome DevTools console:

```js
// Enable
chrome.storage.sync.set({ adblockerEnabled: true });

// Disable
chrome.storage.sync.set({ adblockerEnabled: false });
```

---

## 🧩 How It Works

* **EasyList** rules are parsed and converted to Chrome's DNR format
* `background.js` manages enabling/disabling rules dynamically
* `ads_rules.json` is loaded via `fetch()` into `declarativeNetRequest`
* DOM-based ads are removed using `content.js` (basic cosmetic filtering)

---

## 🧷 Known Limitations

* Only supports network request blocking (no advanced cosmetic filtering)
* EasyList rules are **partially parsed** – cosmetic rules (`##`, `#@#`) are ignored
* `chrome.declarativeNetRequest` has a **limit of 30,000 rules**

---

## 📃 License

This project is open source under the [MIT License](LICENSE).

---

## 🙋‍♂️ Credits

* [EasyList](https://easylist.to/)
* [Chrome DNR API Docs](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/)
* [BlockList Project](https://blocklistproject.github.io/Lists/)

---

## 🚀 Want to Improve It?

* Add a settings page to control blocking
* Support more rule types (regex filters, script redirects)
* Integrate cosmetic filtering from uBlock-like rule sets

PRs welcome!
