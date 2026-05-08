
function loadSolutions() {
    fetch('/global/circles-solutions/circles-solutions.html')
        .then(res => res.text())
        .then(html => {
            const placeholder = document.getElementById('solutions-placeholder');
            placeholder.innerHTML = html;

            // 👇 مهم جدًا: تشغيل الأنيميشن بعد إدخال المحتوى
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    startSVGAnimation();
                });
            });
        })
        .catch(err => console.log(err));
}



function startSVGAnimation() {
    document.querySelectorAll('.hand-drawn-circle path')
        .forEach(path => {
            path.style.animation = "none";
            path.getBoundingClientRect(); // force reflow
            path.style.animation = "drawCircle 5s ease-out infinite";
        });
}
document.addEventListener('DOMContentLoaded', loadSolutions);



