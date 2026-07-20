const fs = require("fs");
const path = require("path");
const { app } = require("electron");
const store = require("./store");

const SUPPORTED_LOCALES = ["es", "en"];
const FALLBACK_LOCALE = "en";

const dictionaries = {};
for (const locale of SUPPORTED_LOCALES) {
    const filePath = path.join(__dirname, "i18n", `${locale}.json`);
    dictionaries[locale] = JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function resolveSystemLocale() {
    const systemLocale = app.getLocale(); // ej. "es-MX", "en-US"
    const base = systemLocale.split("-")[0].toLowerCase();
    return SUPPORTED_LOCALES.includes(base) ? base : FALLBACK_LOCALE;
}

// El idioma efectivo que se está usando ahora mismo
function getLocale() {
    const pref = store.get("locale", "system");
    if (pref === "system") return resolveSystemLocale();
    return SUPPORTED_LOCALES.includes(pref) ? pref : FALLBACK_LOCALE;
}

// La preferencia cruda que eligió el usuario ("system" | "es" | "en"),
// para saber qué radio marcar en el menú
function getLocalePreference() {
    return store.get("locale", "system");
}

function setLocalePreference(pref) {
    store.set("locale", pref);
}

function t(key, params) {
    const dict = dictionaries[getLocale()] || dictionaries[FALLBACK_LOCALE];
    let str = dict[key] || dictionaries[FALLBACK_LOCALE][key] || key;

    if (params) {
        for (const [name, value] of Object.entries(params)) {
            str = str.replace(`{${name}}`, value);
        }
    }

    return str;
}

module.exports = { t, getLocale, getLocalePreference, setLocalePreference, SUPPORTED_LOCALES };