// Script for smooth scrolling and mobile navigation
document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('nav.mobile-nav');
    const body = document.body;

    // Burger menu toggle
    if (burgerMenu) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            nav.classList.toggle('expanded');
            navLinks.classList.toggle('active'); // Add this line to toggle visibility of links

            body.classList.toggle('no-scroll', nav.classList.contains('expanded'));

            if (nav.classList.contains('expanded')) {
                // Menu is being opened. navLinks.active is now true.
                // Use requestAnimationFrame to ensure DOM updates (like display:flex) are applied
                // before reading scrollHeight.
                requestAnimationFrame(() => {
                    const linksHeight = navLinks.scrollHeight;
                    
                    // Corrected calculation: The ::before pseudo-element for the background
                    // is already positioned at top: 100% (below the nav-header).
                    // So, its height should just be the height of the links area plus any desired padding.
                    const menuBackgroundHeight = linksHeight + 20; // 20px for some vertical padding around links
                    nav.style.setProperty('--mobile-menu-height', `${menuBackgroundHeight}px`);
                });
            } else {
                // Menu is being closed.
                nav.style.setProperty('--mobile-menu-height', `0px`); // Or initial height of header
            }
        });
    }

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (burgerMenu.classList.contains('active')) { // Only if menu is open
                burgerMenu.classList.remove('active');
                nav.classList.remove('expanded');
                navLinks.classList.remove('active'); // Also hide links
                body.classList.remove('no-scroll');
                nav.style.setProperty('--mobile-menu-height', `0px`);
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Language detection for support link
    function setupSupportLink() {
        const supportLink = document.getElementById('support-link');
        if (supportLink) {
            // Detect user's language preference
            const userLanguage = navigator.language || navigator.userLanguage;
            const isGerman = userLanguage.startsWith('de');
            
            console.log('Setting up support link. Language:', userLanguage, 'Is German:', isGerman);
            
            if (isGerman) {
                supportLink.href = 'support-de.html';
                supportLink.textContent = 'Support';
            } else {
                supportLink.href = 'support-en.html';
                supportLink.textContent = 'Support';
            }
            
            console.log('Support link set to:', supportLink.href);
        } else {
            console.log('Support link element not found');
        }
    }

    // Initialize support link
    setupSupportLink();
});
