# WhatsApp Web Electron Client

⚠️ **DISCLAIMER**  
This is **NOT an official WhatsApp application**.  
This project is an **unofficial Electron wrapper for WhatsApp Web**.  
WhatsApp is a trademark of **Meta Platforms, Inc.**  
This project is not affiliated with, endorsed, or sponsored by Meta.

---

## 📌 About

This project is a **minimal desktop client for WhatsApp Web**, built using **Electron**.

It simply loads the official **https://web.whatsapp.com** website inside an Electron window, providing:

- A native desktop window
- System tray integration
- Persistent session storage
- Window size persistence
- Native Linux packaging support

No WhatsApp code is bundled or modified.

---

## ✨ Features

- 📦 Lightweight Electron wrapper
- 🔒 Uses official WhatsApp Web
- 💾 Persistent login session
- 🪟 Remembers window size
- 📥 System tray support
- 🔁 Single-instance lock
- 🧹 Option to clear cache and log out
- 🐧 Linux support (.AppImage / .deb)

---

## 🚫 What this project does NOT do

- ❌ No JavaScript injection
- ❌ No message automation
- ❌ No scraping or data extraction
- ❌ No WhatsApp API usage
- ❌ No modification of WhatsApp Web

This behaves exactly like opening WhatsApp Web in a browser.

---

## 🛡️ Account Safety

Using this application is equivalent to using WhatsApp Web in Chrome or Firefox.

⚠️ **You will NOT be banned** for:
- Logging in
- Sending messages manually
- Using this app as a normal client

🚫 Bans usually happen due to:
- Bots
- Automation
- Mass messaging
- Unofficial APIs

This project does none of that.

---

## 🧰 Tech Stack

- **Electron**
- **Node.js**
- **electron-builder**
- **electron-store**

---

## 🚀 Development

### Install dependencies
```bash
npm install
```

### Run in development mode
```bash
npm run start
```

## 📦 Build 

### AppImage for Linux
```bash
pnpm run build:appimage
```
### DEB for Linux
```bash
pnpm run build:deb
```
> ℹ️ Note:  
> Precompiled binaries are not provided in this repository.  
> Users are encouraged to build the application locally.

### pacman for Arch
```bash
pnpm run build:pacman
```

## 🐧 Linux Notes
- Tray support depends on the desktop environment.
- Icon sizes should include 512x512 for proper dock integration.
- AppImage icons may not appear in all docks automatically.

## 📄 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

> WhatsApp and the WhatsApp logo are trademarks of Meta Platforms, Inc.
> This project does not grant any rights to use WhatsApp branding.
