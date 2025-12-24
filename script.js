// Handle navigation clicks
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-container');
    const underline = document.querySelector('.nav-underline');

    // Function to update underline position
    function updateUnderline(activeItem) {
        const { offsetLeft, offsetWidth } = activeItem;
        underline.style.left = `${offsetLeft}px`;
        underline.style.width = `${offsetWidth}px`;
    }

    // Initialize underline position on page load
    const activeNav = document.querySelector('.nav-item.active');
    if (activeNav) {
        updateUnderline(activeNav);
    }

    // Navigation click handler
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionName = item.dataset.section;
            switchSection(sectionName);
            updateUnderline(item); // Update underline position
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.section) {
            switchSection(event.state.section, false);
            const activeItem = document.querySelector(`.nav-item[data-section="${event.state.section}"]`);
            if (activeItem) updateUnderline(activeItem);
        }
    });

    // Listen for hash changes
    window.addEventListener('hashchange', () => {
        const currentHash = window.location.hash.slice(1);
        const section = currentHash || 'portfolio';
        switchSection(section, false);
        const activeItem = document.querySelector(`.nav-item[data-section="${section}"]`);
        if (activeItem) updateUnderline(activeItem);
    });

    // Switch section function
    function switchSection(sectionName, pushState = true) {
        // Update nav items
        navItems.forEach(item => {
            if (item.dataset.section === sectionName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update sections
        sections.forEach(section => {
            if (section.id === `${sectionName}-section`) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        // Update URL with hash
        if (pushState) {
            const hash = sectionName === 'portfolio' ? '' : `#${sectionName}`;
            window.location.hash = hash;
        }
    }

    // Handle initial load (check hash)
    const hash = window.location.hash.slice(1);
    if (hash === 'writings') {
        switchSection('writings', false);
        const writingsNav = document.querySelector('.nav-item[data-section="writings"]');
        if (writingsNav) updateUnderline(writingsNav);
    }
});