// Language switching - delegates to navbar.js applyLanguage()
function updateLanguage(lang) {
    if (typeof window.applyLanguage === "function") {
        window.applyLanguage(lang);
    }
}

function changeLanguage(lang) {
    updateLanguage(lang);
}

// Restore saved language, default to English
document.addEventListener('DOMContentLoaded', () => {
    if (window.navbarReady) {
        const savedLang = localStorage.getItem("selectedLang");
        if (savedLang) {
            updateLanguage(savedLang);
        } else {
            updateLanguage("en");
        }
    }
});
