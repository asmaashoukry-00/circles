window.applyLanguage = function(lang) {
    document.querySelectorAll(".lang-key").forEach((el) => {
        if (!el.getAttribute("data-ar")) el.setAttribute("data-ar", el.innerHTML.trim());
        const text = (lang === "en") ? el.getAttribute("data-en") : el.getAttribute("data-ar");
        if (text) el.innerHTML = text;
    });

    document.querySelectorAll('.lang-image').forEach(img => {
        const arSrc = img.getAttribute('data-ar-src');
        const enSrc = img.getAttribute('data-en-src');
        if (arSrc && enSrc) {
            img.src = (lang === 'en') ? enSrc : arSrc;
        }
    });

    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === "en") ? "ltr" : "rtl";
    document.body.setAttribute("dir", (lang === "en") ? "ltr" : "rtl");
    localStorage.setItem("selectedLang", lang);

    const event = new CustomEvent('languageChanged', { detail: { lang: lang } });
    window.dispatchEvent(event);
};

window.addEventListener('languageChanged', (e) => {
    const lang = e.detail.lang;
    document.querySelectorAll('.lang-image').forEach(img => {
        const arSrc = img.getAttribute('data-ar-src');
        const enSrc = img.getAttribute('data-en-src');
        if (arSrc && enSrc) {
            img.src = (lang === 'en') ? enSrc : arSrc;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem("selectedLang") || "ar";
    window.applyLanguage(savedLang);
});