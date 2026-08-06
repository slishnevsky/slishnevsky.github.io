# Privacy Policy for Chrome Translator

**Last updated:** August 6, 2026

Chrome Translator ("the extension") is a browser extension that translates text typed into editable fields, and provides keyboard-based tab navigation shortcuts. This policy explains what data the extension accesses and how it is handled.

## Data Collection

Chrome Translator does **not** collect, transmit, sell, or share any personal data with the developer or any third party. There are no external servers, analytics, or tracking scripts involved.

## What the Extension Accesses, and Why

**1. Text in editable fields (for translation)**
When you press `Alt+C` while focused in a text field, the extension reads the text in that field and passes it to Chrome's built-in, on-device `LanguageDetector` and `Translator` APIs to detect the language and translate it. This processing happens locally in your browser. The text is never sent to the developer or to any external server.

**2. Target language preference**
Your chosen target translation language is saved using `chrome.storage.sync`, Chrome's built-in storage mechanism. This setting may sync across your own Chrome browsers if you are signed into Chrome, via Google's sync infrastructure — it is not accessible to the developer.

**3. Tab activity (for tab-switching shortcuts)**
To support the "switch to last used tab" shortcut (`Alt+Q`), the extension keeps a short list of recently active tab IDs per browser window, using `chrome.storage.session`. This data is stored only on your device, is automatically cleared when the browser closes, and is never transmitted anywhere.

## Permissions Used

| Permission | Purpose |
|---|---|
| `tabs` | Read tab info (URL not required) to switch, close, or duplicate tabs via keyboard shortcuts |
| `activeTab` | Identify the currently focused tab for the tab-management shortcuts |
| `storage` | Save your target language preference and recent-tab history locally/synced via Chrome |

## Third-Party Sharing

None. No data leaves your device except for Chrome's own optional account-sync mechanism for `chrome.storage.sync`, which is controlled entirely by your Google account settings, not by this extension.

## Children's Privacy

The extension does not knowingly collect data from anyone, including children, because it does not collect data at all.

## Changes to This Policy

If this policy changes, the updated version will be posted at this same URL with a revised "Last updated" date.

## Contact

For questions about this policy, contact: **[slishnevsky@gmail.com]**