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
            { title: 'الامتثال والتقارير الحكومية', link: '/hr' },
            { title: 'سيركلز ون', link: '/hr/one-circles' },
            { title: 'تطبيق الهاتف المحمول', link: '/operations/mobile-app' }
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
    },
    solutions: {
        title: 'حلول إضافية',
        subItems: [
            { title: 'الحل الشامل - One Circles', link: '/solutions' },
            { title: 'تطبيق الهاتف المحمول', link: '/solutions' },
            { title: 'تحليل البيانات المتقدم', link: '/solutions' }
        ]
    }
};

const mobileMenu = document.getElementById('mobileMenu');

function toggleMobileMenu() {
    if (!mobileMenu) return;
    const isOpen = mobileMenu.classList.toggle('mobile-open');
    const hamburger = document.querySelector('.mobile-toggle .hamburger');
    const xmark = document.querySelector('.mobile-toggle i');
    if (isOpen) {
        hamburger?.classList.add('active');
        if(xmark) xmark.style.display = 'block';
    } else {
        closeMobileMenu();
    }
}

function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('mobile-open');
    const hamburger = document.querySelector('.mobile-toggle .hamburger');
    const xmark = document.querySelector('.mobile-toggle i');
    hamburger?.classList.remove('active');
    if(xmark) xmark.style.display = 'none';
    goToLevel(0);
}

function goToLevel(level) {
    currentLevel = level;
    
    // Reset all levels
    const level0 = document.getElementById('level0');
    const level1 = document.getElementById('level1');
    const level2 = document.getElementById('level2');
    
    if(level0) level0.style.transform = 'translateX(0)';
    if(level1) level1.style.transform = 'translateX(100%)';
    if(level2) level2.style.transform = 'translateX(100%)';
    
    if (mobileMenu) {
        mobileMenu.classList.remove('menu-level-1', 'menu-level-2');
    
        if (level === 1) {
            mobileMenu.classList.add('menu-level-1');
            if(level0) level0.style.transform = 'translateX(-100%)';
            if(level1) level1.style.transform = 'translateX(0)';
        } else if (level === 2) {
            mobileMenu.classList.add('menu-level-2');
            if(level0) level0.style.transform = 'translateX(-200%)';
            if(level1) level1.style.transform = 'translateX(-100%)';
            if(level2) level2.style.transform = 'translateX(0)';
        }
    }
}

function goToServices() {
    goToLevel(1);
}

function goToSubMenu(serviceKey) {
    selectedService = servicesItems[serviceKey];
    const level2 = document.getElementById('level2');
    
    if(!level2 || !selectedService) return;
    
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
document.addEventListener('click', function(e) {
    const overlay = document.querySelector('.mobile-overlay');
    if (overlay && e.target === overlay) {
        closeMobileMenu();
    }
});

// Close menu on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});
// ------
function startSVGAnimation() {
    document.querySelectorAll('.hand-drawn-circle path')
        .forEach(path => {
            path.style.animation = "none";
            path.getBoundingClientRect(); // force reflow
            path.style.animation = "drawCircle 5s ease-out infinite";
        });
}