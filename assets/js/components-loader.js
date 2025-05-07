// components-loader.js
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('assets/components/header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                
                // Initialize mobile menu toggle after header is loaded
                initializeMobileMenu();
            })
            .catch(error => console.error('Error loading header:', error));
    }

    // Load footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('assets/components/footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Error loading footer:', error));
    }
});

// Initialize mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const body = document.body;

    // Hamburger menüye tıklandığında
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            body.classList.toggle('mobile-menu-open');
        });
    }

    // Mobil menüdeki bağlantılara tıklandığında menüyü kapat
    const mobileNavLinks = document.querySelectorAll('.main-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            body.classList.remove('mobile-menu-open');
        });
    });

    // Dropdown Toggle functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const parent = this.closest('.has-dropdown');
            
            // Diğer açık menüleri kapat
            if (window.innerWidth <= 768) {
                const allDropdowns = document.querySelectorAll('.has-dropdown');
                allDropdowns.forEach(item => {
                    if (item !== parent && item.classList.contains('dropdown-active')) {
                        item.classList.remove('dropdown-active');
                    }
                });
            }
            
            // Tıklanan menüyü aç/kapat
            parent.classList.toggle('dropdown-active');
        });
    });
    
    // Mobil dışında tıklandığında dropdown'ları kapat
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const isDropdownButton = e.target.closest('.dropdown-toggle');
            if (!isDropdownButton) {
                const openDropdowns = document.querySelectorAll('.dropdown-active');
                openDropdowns.forEach(dropdown => {
                    dropdown.classList.remove('dropdown-active');
                });
            }
        }
    });
} 