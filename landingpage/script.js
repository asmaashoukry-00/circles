gsap.registerPlugin(ScrollTrigger);

// 1. Counter Animation
const animate = (obj, start, end, duration) => {
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
};
animate(document.getElementById("profit-counter"), 0, 15400, 2500);

// 2. Sales Chart
const chartElement = document.getElementById('salesChart');
if (chartElement) {
    const ctx = chartElement.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
            datasets: [{
                label: 'المبيعات',
                data: [12000, 19000, 15000, 25000, 32000],
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: { y: { display: false }, x: { grid: { display: false } } },
            maintainAspectRatio: false
        }
    });
}

// 3. Stacking Panels Logic (GSAP)
const panels = gsap.utils.toArray(".panel");

panels.forEach((panel, i) => {
    // Pinning Logic
    ScrollTrigger.create({
        trigger: panel,
        start: "top top",
        pin: true,
        // pinSpacing true only for the last panel to avoid footer overlapping
        pinSpacing: i === panels.length - 1 ? true : false,
        zIndex: i
    });

    // Exit Animation for current panel card when next one comes
    if (i < panels.length - 1) {
        const card = panel.querySelector(".panel-card");
        if (card) {
            gsap.to(card, {
                scale: 0.9,
                opacity: 0.4,
                y: -50,
                scrollTrigger: {
                    trigger: panels[i + 1],
                    start: "top bottom",
                    end: "top top",
                    scrub: true
                }
            });
        }
    }
});

// 4. Inner Content Fade-in
gsap.utils.toArray(".content").forEach(content => {
    gsap.from(content, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: content,
            start: "top 85%",
        }
    });
});

// Refresh ScrollTrigger to recalculate heights
ScrollTrigger.refresh();

// تأكد من استدعاء مكتبة GSAP و ScrollTrigger في ملف الـ HTML
gsap.registerPlugin(ScrollTrigger);

const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-target'));
    
    gsap.to(counter, {
        innerText: target,
        duration: 2.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: counter,
            start: "top 90%",
        },
        onUpdate: function() {
            // تحديث النص مع الحفاظ على الكسور إذا كان الرقم عشرياً (مثل 99.9)
            if (target % 1 !== 0) {
                counter.innerText = parseFloat(counter.innerText).toFixed(1);
            } else {
                counter.innerText = Math.ceil(counter.innerText).toLocaleString();
            }
        }
    });
});

