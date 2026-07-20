# Unofficial WhatsApp Web Electron Client

⚠️ **DISCLAIMER**  
This is **NOT an official WhatsApp application**.  
This project is an **unofficial Electron wrapper for WhatsApp Web**.  
WhatsApp is a trademark of **Meta Platforms, Inc.**  
This project is not affiliated with, endorsed, or sponsored by Meta.

---

## 📌 About

This project is a **minimal desktop client for WhatsApp Web**, built using **Electron**.

It loads the official **https://web.whatsapp.com** website inside an Electron window, providing:

- A native desktop window
- System tray integration
- Persistent session storage
- Window size persistence
- A collapsible sidebar for smaller/narrower screens
- Native Linux packaging support

No WhatsApp source code is bundled, reverse-engineered, or reused. The WhatsApp Web protocol itself is never touched — only the rendered page's presentation layer (see [What this project does NOT do](#-what-this-project-does-not-do)).

---

## ✨ Features

- 📦 Lightweight Electron wrapper
- 🔒 Uses official WhatsApp Web
- 💾 Persistent login session
- 🪟 Remembers window size
- 📥 System tray support
- 🔁 Single-instance lock
- 🧹 Option to clear cache and log out
- 🧩 Collapsible sidebar (toggle button + keyboard shortcut)
- 🐧 Linux support (.AppImage / .deb / pacman)

---

## 🚫 What this project does NOT do

- ❌ No message automation
- ❌ No scraping or data extraction
- ❌ No use of unofficial/reverse-engineered WhatsApp APIs
- ❌ No modification of WhatsApp Web's underlying protocol or behavior

**Note:** this app *does* inject a small amount of CSS/JS to add a collapsible sidebar for better usability on different screen sizes. This is purely cosmetic — it only changes how the page is displayed locally in your window, the same way a browser extension or userscript would. It does not touch how messages are sent, how the app authenticates, or how it talks to WhatsApp's servers.

---

## 🛡️ Account Safety

Using this application is functionally equivalent to using WhatsApp Web in Chrome or Firefox: same login flow, same protocol, same servers.

Bans are generally associated with:
- Bots and message automation
- Mass messaging
- Unofficial/reverse-engineered APIs (e.g. modified clients that reimplement WhatsApp's protocol)

This project does none of that — it's a cosmetic wrapper around the official web client, not a reimplementation of it. That said, this is provided for transparency, not as a guarantee: no third-party client can make absolute promises about how a platform will enforce its own terms of service.

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
pnpm install
```

### Run in development mode
```bash
pnpm run start
```

## 📦 Build
> ℹ️ Note:  
> Precompiled binaries are not provided in this repository.  
> Users are encouraged to build the application locally.

### AppImage for Linux
```bash
pnpm run build:appimage
```
### DEB for Linux
```bash
pnpm run build:deb
```

### pacman for Arch
```bash
pnpm run build:pacman
```

## 🐧 Linux Notes

### Hyprland / Tiling-WM integration
- **Configurable Close Behavior**: in the **WhatsApp** menu → **Comportamiento al cerrar**, you can choose between *Ocultar en bandeja* (hide to tray, default) or *Salir completamente* (exit completely).
- **Sidebar toggle**: use the embedded button or `Ctrl+Shift+T` to collapse/expand the sidebar — useful on narrow tiled windows.
- **App ID**: the application registers as `com.nintech.wa-web-electron-client`, which helps Hyprland group it under a single name.

- Tray support depends on the desktop environment.
- Icon sizes should include 512x512 for proper dock integration.
- AppImage icons may not appear in all docks automatically.

## 📄 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

> WhatsApp and the WhatsApp logo are trademarks of Meta Platforms, Inc.
> This project does not grant any rights to use WhatsApp branding.