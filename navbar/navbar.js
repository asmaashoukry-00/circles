
function loadNavbar() {
    fetch('/navbar/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading navbar:', error));
}


window.onload = loadNavbar;



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