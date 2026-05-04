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

// ============================================
// Navbar Mobile Menu Functionality
// ============================================

let currentLevel = 0;
let selectedService = null;

const servicesItems = {
    hr: {
        title: 'إدارة الموارد البشرية والرواتب',
        subItems: [
            { title: 'إدارة ملفات الموظفين', link: '/hr' },
            { title: 'مسير الرواتب والتعويضات', link: '/hr' },
            { title: 'الحضور والانصراف', link: '/hr' },
            { title: 'الامتثال والتقارير الحكومية', link: '/hr' }
        ]
    },
    finance: {
        title: 'المنظومة المالية والمبيعات',
        subItems: [
            { title: 'إدارة المبيعات والفواتير', link: '/finance' },
            { title: 'المحاسبة العامة', link: '/finance' },
            { title: 'إدارة المخزون والمستودعات', link: '/finance' },
            { title: 'إدارة المشتريات', link: '/finance' },
            { title: 'التقارير المالية والتحليلات', link: '/finance' }
        ]
    },
    talent: {
        title: 'إدارة المواهب والتطوير',
        subItems: [
            { title: 'إدارة ملفات الموظفين', link: '/hr' },
            { title: 'مسير الرواتب والتعويضات', link: '/hr' },
            { title: 'الحضور والانصراف', link: '/hr' },
            { title: 'الامتثال والتقارير الحكومية', link: '/hr' },
            { title: 'سيركلز ون', link: '/hr/one-circles' },
            { title: 'تطبيق الهاتف المحمول', link: '/operations/mobile-app' }
        ]
    }
};

const mobileMenu = document.getElementById('mobileMenu');
const level0 = document.getElementById('level0');
const level1 = document.getElementById('level1');
const level2 = document.getElementById('level2');

function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.toggle('mobile-open');
    const hamburger = document.querySelector('.mobile-toggle .hamburger');
    const xmark = document.querySelector('.mobile-toggle i');
    if (isOpen) {
        hamburger.classList.add('active');
        xmark.style.display = 'block';
    } else {
        closeMobileMenu();
    }
}

function closeMobileMenu() {
    mobileMenu.classList.remove('mobile-open');
    const hamburger = document.querySelector('.mobile-toggle .hamburger');
    const xmark = document.querySelector('.mobile-toggle i');
    hamburger.classList.remove('active');
    xmark.style.display = 'none';
    goToLevel(0);
}

function goToLevel(level) {
    currentLevel = level;
    
    // Reset all levels
    level0.style.transform = 'translateX(0)';
    level1.style.transform = 'translateX(100%)';
    level2.style.transform = 'translateX(100%)';
    
    mobileMenu.classList.remove('menu-level-1', 'menu-level-2');
    
    if (level === 1) {
        mobileMenu.classList.add('menu-level-1');
        level0.style.transform = 'translateX(-100%)';
        level1.style.transform = 'translateX(0)';
    } else if (level === 2) {
        mobileMenu.classList.add('menu-level-2');
        level0.style.transform = 'translateX(-200%)';
        level1.style.transform = 'translateX(-100%)';
        level2.style.transform = 'translateX(0)';
    }
}

function goToServices() {
    goToLevel(1);
}

function goToSubMenu(serviceKey) {
    selectedService = servicesItems[serviceKey];
    
    // Build level 2 content
    let html = `
        <li class="menu-header">
            <button class="back-btn" onclick="goBack()">
                <i class="fa-solid fa-arrow-right"></i>
            </button>
            <span>${selectedService.title}</span>
        </li>
    `;
    
    selectedService.subItems.forEach((subItem, index) => {
        html += `
            <li class="mobile-nav-item sub-item">
                <a href="${subItem.link}" onclick="closeMobileMenu()">
                    ${subItem.title}
                </a>
            </li>
        `;
    });
    
    level2.innerHTML = html;
    goToLevel(2);
}

function goBack() {
    if (currentLevel === 2) {
        goToLevel(1);
    } else if (currentLevel === 1) {
        goToLevel(0);
    }
}

// Close mobile menu when clicking on overlay
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.querySelector('.mobile-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
});