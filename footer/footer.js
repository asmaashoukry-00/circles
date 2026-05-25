function loadFooter() {
    fetch('/footer/footer.html') 
        .then(response => {
            if (!response.ok) throw new Error('Footer file not found');
            return response.text();
        })
        .then(data => {
            const placeholder = document.getElementById('footer-placeholder');
            if (placeholder) {
                placeholder.innerHTML = data;
                
                // التأكد من لغة الصفحة الحالية
                const currentLang = document.documentElement.getAttribute('lang');
                
                // إذا كانت لغة الموقع الحالية إنجليزية، نترجم عناصر الفوتر فوراً
                if (currentLang === 'en') {
                    const footerElements = placeholder.querySelectorAll('.lang-key');
                    footerElements.forEach(el => {
                        const enText = el.getAttribute('data-en');
                        if (enText) {
                            if (el.tagName === 'A' || el.tagName === 'P' || el.tagName === 'H3' || el.tagName === 'SPAN') {
                                el.textContent = enText;
                            }
                        }
                    });
                }
            }
        })
        .catch(error => console.error('Error loading footer:', error));
}

document.addEventListener('DOMContentLoaded', loadFooter);