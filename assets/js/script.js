// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(15, 17, 19, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(15, 17, 19, 0)'; // Tamamen transparan
            header.style.boxShadow = 'none';
        }
    });
  
    // Mobile Menu Functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;
    // Hamburger menüye tıklandığında
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            body.classList.toggle('mobile-menu-open');
        });
    }
    // Overlay'e tıklandığında menüyü kapat
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function() {
            body.classList.remove('mobile-menu-open');
        });
    }
    // Mobil menüdeki bağlantılara tıklandığında menüyü kapat
    const mobileNavLinks = document.querySelectorAll('.main-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            body.classList.remove('mobile-menu-open');
        });
    });
    // Ekran genişliği değiştiğinde mobil menüyü kapat
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && body.classList.contains('mobile-menu-open')) {
            body.classList.remove('mobile-menu-open');
        }
    });
    
    // Mobil dropdown menü işlevselliği
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
    
    // Ekran boyutu değiştiğinde dropdown'ları sıfırla
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const openDropdowns = document.querySelectorAll('.dropdown-active');
            openDropdowns.forEach(dropdown => {
                dropdown.classList.remove('dropdown-active');
            });
        }
    });
});

// Logo slider için fare üzerine gelindiğinde durdurma ekleyin
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.logos-slider');
    const logoItems = document.querySelectorAll('.logo-item');
    if (slider) {
        // Tüm slider'ın üzerinde fare varsa animasyonu durdur
        slider.addEventListener('mouseenter', () => {
            slider.style.animationPlayState = 'paused';
        });
        slider.addEventListener('mouseleave', () => {
            slider.style.animationPlayState = 'running';
        });
        // Logoların üzerine gelindiğinde hafif titreşim efekti ekleyin (opsiyonel)
        logoItems.forEach(logo => {
            logo.addEventListener('mouseenter', () => {
                logo.style.animationPlayState = 'paused';
                // Hafif titreşim efekti (opsiyonel)
                if (!logo.classList.contains('pulsing')) {
                    logo.classList.add('pulsing');
                    setTimeout(() => {
                        logo.classList.remove('pulsing');
                    }, 300);
                }
            });
        });
    }
});

// Testimonial 3D Slider için JavaScript kodu
document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const cards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    
    // İlk kartın aktif olmasını sağla
    cards[currentIndex].classList.add('active');
    
    function updateCardsLayout() {
        if (window.innerWidth <= 1200) {
            // Tablet ve mobil görünümü
            cards.forEach((card, index) => {
                if (index === currentIndex) {
                    card.style.opacity = "1";
                    card.style.zIndex = "3";
                    card.classList.add('active');
                } else {
                    card.style.opacity = "0";
                    card.style.zIndex = "1";
                    card.classList.remove('active');
                }
            });
        } else {
            // Desktop görünümü
            cards.forEach((card, index) => {
                let position = (index - currentIndex + cards.length) % cards.length;
                
                if (position === 0) {
                    card.classList.add('active');
                    card.style.opacity = "1";
                    card.style.transform = "translateX(0) translateZ(0) rotateY(0)";
                    card.style.zIndex = "3";
                } else if (position === 1) {
                    card.classList.remove('active');
                    card.style.opacity = "0.7";
                    card.style.transform = "translateX(-200px) translateZ(-150px) rotateY(-15deg)";
                    card.style.zIndex = "2";
                } else if (position === 2) {
                    card.classList.remove('active');
                    card.style.opacity = "0.4";
                    card.style.transform = "translateX(-400px) translateZ(-300px) rotateY(-15deg)";
                    card.style.zIndex = "1";
                } else {
                    card.classList.remove('active');
                    card.style.opacity = "0";
                    card.style.transform = "translateX(400px) translateZ(-200px) rotateY(15deg)";
                    card.style.zIndex = "0";
                }
            });
        }
    }
    
    // Sayfa yüklendiğinde ve boyutu değiştiğinde düzeni güncelle
    updateCardsLayout();
    window.addEventListener('resize', updateCardsLayout);
    
    // Sonraki carta geç
    function showNextCard() {
        cards[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % cards.length;
        updateCardsLayout();
    }
    
    // Önceki carta dön
    function showPrevCard() {
        cards[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCardsLayout();
    }
    
    // Butonlara tıklama olayları ekle
    nextBtn.addEventListener('click', showNextCard);
    prevBtn.addEventListener('click', showPrevCard);
    
    // Otomatik geçiş
    let autoSlide = setInterval(showNextCard, 8000); // 8 saniye
    
    // Kullanıcı butona tıkladığında otomatik geçişi sıfırla
    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(showNextCard, 8000);
    }
    
    nextBtn.addEventListener('click', resetAutoSlide);
    prevBtn.addEventListener('click', resetAutoSlide);
});

// Blog scroll indicator için JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const blogPosts = document.querySelector('.blog-posts');
    const scrollDots = document.querySelectorAll('.scroll-dot');
    
    if (blogPosts && window.innerWidth <= 768) {
        // Scroll event listener ekle
        blogPosts.addEventListener('scroll', function() {
            updateScrollIndicator();
        });
        
        // Noktalar için tıklama olayları
        scrollDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                scrollToCard(index);
            });
        });
        
        // Scroll pozisyonuna göre aktif noktayı güncelle
        function updateScrollIndicator() {
            const scrollPosition = blogPosts.scrollLeft;
            const maxScroll = blogPosts.scrollWidth - blogPosts.clientWidth;
            const scrollPercentage = scrollPosition / maxScroll;
            
            // 3 adımda scrolla göre hangi noktanın aktif olacağını belirle
            let activeIndex = 0;
            if (scrollPercentage > 0.3 && scrollPercentage <= 0.7) {
                activeIndex = 1;
            } else if (scrollPercentage > 0.7) {
                activeIndex = 2;
            }
            
            scrollDots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Belirli bir karta scroll
        function scrollToCard(index) {
            const cards = document.querySelectorAll('.blog-card');
            if (cards[index]) {
                blogPosts.scrollTo({
                    left: cards[index].offsetLeft - 15,
                    behavior: 'smooth'
                });
            }
        }
    }
});