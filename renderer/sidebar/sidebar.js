(function (root) {
    "use strict";

    const ICON_SIDEBAR =
        '<svg viewBox="0 0 24 24" height="24" width="24" fill="none">' +
        '<path fill-rule="evenodd" clip-rule="evenodd" ' +
        'd="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm5 2H4v12h5V6zm2 0v12h9V6h-9z" ' +
        'fill="currentColor"/></svg>';

    class Sidebar {
        constructor() {
            this.sidebarPanel = null;
            this.sidebarOverlay = null;
            this.toggleButton = null;
            this.isHidden = typeof root.__WA_SIDEBAR_INITIAL_HIDDEN__ === "boolean"
                ? root.__WA_SIDEBAR_INITIAL_HIDDEN__
                : false;
            this.labels = root.__WA_SIDEBAR_INITIAL_LABELS__ || { show: "Show sidebar", hide: "Hide sidebar" };

            this._initDone = false;
            this._observer = null;
            this._reInitObserver = null;
        }

        init() {
            if (this._initDone) return;
            if (this._tryInit()) return;

            this._observer = new MutationObserver(() => {
                if (this._initDone) return;
                if (!document.querySelector("#side") || !document.querySelector('header[data-tab="2"]')) return;

                setTimeout(() => {
                    if (this._tryInit() && this._observer) this._observer.disconnect();
                }, 300);
            });
            this._observer.observe(document.body, { childList: true, subtree: true });

            setTimeout(() => {
                if (!this._initDone && this._observer) this._observer.disconnect();
            }, 30000);

            setTimeout(() => {
                this._reInitObserver = new MutationObserver(() => {
                    if (!document.querySelector(".wa-toggle-btn") && document.querySelector("#side")) {
                        this._tryInit();
                    }
                });
                this._reInitObserver.observe(document.body, { childList: true, subtree: true });
            }, 5000);
        }

        _tryInit() {
            this.sidebarPanel = this._findSidebarPanel();
            if (!this.sidebarPanel) return false;

            const navHeader = this._findNavHeader();
            if (!navHeader) return false;

            this.sidebarPanel.classList.add("wa-sidebar-panel");
            this.sidebarOverlay = this._findSidebarOverlay(this.sidebarPanel);

            this._createToggleButton(navHeader);
            this._applyState();
            this._initDone = true;
            return true;
        }

        _findSidebarPanel() {
            const side = document.querySelector("#side");
            return side ? side.parentElement : null;
        }

        _findSidebarOverlay(panel) {
            const twoEl = document.querySelector(".two");
            if (!twoEl || !panel) return null;

            const panelClass = panel.className.split(" ")[0];
            const children = twoEl.children;

            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                if (child === panel || child.tagName !== "DIV") continue;
                if (child.querySelector("." + panelClass)) return child;
            }
            return null;
        }

        _findNavHeader() {
            return document.querySelector('header[data-tab="2"]');
        }

        _createToggleButton(navHeader) {
            if (document.querySelector(".wa-toggle-btn")) return;

            const toggleBtn = document.createElement("button");
            toggleBtn.className = "wa-toggle-btn";
            toggleBtn.innerHTML = ICON_SIDEBAR;
            toggleBtn.setAttribute("aria-pressed", "false");
            toggleBtn.setAttribute("tabindex", "-1");
            toggleBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                if (root.waSidebarBridge) {
                    root.waSidebarBridge.requestToggle();
                } else {
                    console.error("[sidebar] waSidebarBridge no está disponible — revisa que el preload esté cargando.");
                }
            });

            const wrapper = document.createElement("div");
            wrapper.className = "wa-toggle-wrapper";
            wrapper.appendChild(toggleBtn);

            this.toggleButton = toggleBtn;

            const mainDiv = navHeader.querySelector(":scope > div");
            if (!mainDiv) {
                navHeader.appendChild(wrapper);
                return;
            }

            let bottomSection = null;
            for (let i = mainDiv.children.length - 1; i >= 0; i--) {
                if (mainDiv.children[i].tagName === "DIV") {
                    bottomSection = mainDiv.children[i];
                    break;
                }
            }

            if (bottomSection) {
                bottomSection.insertBefore(wrapper, bottomSection.firstChild);
            } else {
                mainDiv.appendChild(wrapper);
            }
        }

        // Llamado desde main (executeJavaScript). Nunca se invoca a sí mismo:
        // el store de Electron es la única fuente de verdad.
        setHidden(hidden) {
            this.isHidden = hidden;
            this._applyState();
        }

        setLabels(labels) {
            this.labels = labels;
            this._applyState();
        }

        _applyState() {
            if (!this.sidebarPanel) return;

            this.sidebarPanel.classList.toggle("wa-sidebar-hidden", this.isHidden);

            if (this.sidebarOverlay) {
                this.sidebarOverlay.classList.toggle("wa-sidebar-overlay-hidden", this.isHidden);
            }

            if (this.toggleButton) {
                this.toggleButton.classList.toggle("wa-sidebar-is-hidden", this.isHidden);
                this.toggleButton.setAttribute("aria-pressed", String(this.isHidden));

                const label = this.isHidden ? this.labels.show : this.labels.hide;
                this.toggleButton.title = label;
                this.toggleButton.setAttribute("aria-label", label);
            }
        }
    }

    const instance = new Sidebar();

    if (typeof module !== "undefined" && module.exports) {
        module.exports = instance;
    } else {
        root.WASidebar = instance;
        instance.init();
    }
})(typeof window !== "undefined" ? window : globalThis);