// tum-urunler.js - Product filtering functionality

document.addEventListener('DOMContentLoaded', function() {
    // Filter buttons functionality
    const filterButtons = document.querySelectorAll('.tumu-filter-btn');
    const productCards = document.querySelectorAll('.tumu-product-card');
    const searchInput = document.getElementById('tumuSearchInput');

    // Set "All Categories" as active by default
    document.querySelector('.tumu-filter-btn[data-filter="all"]').classList.add('active');

    // Filter button click event
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter products based on category
            filterProducts(filterValue, searchInput.value);
        });
    });

    // Search input functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const activeFilter = document.querySelector('.tumu-filter-btn.active').getAttribute('data-filter');
            filterProducts(activeFilter, this.value);
        });
    }

    // Function to filter products based on category and search term
    function filterProducts(category, searchTerm) {
        searchTerm = searchTerm ? searchTerm.toLowerCase() : '';
        
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardDescription = card.querySelector('p').textContent.toLowerCase();
            
            // Check if card matches both category and search term
            const matchesCategory = (category === 'all' || category === cardCategory);
            const matchesSearch = (!searchTerm || 
                                  cardTitle.includes(searchTerm) || 
                                  cardDescription.includes(searchTerm));
            
            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });

        // Check if there are any visible products
        const visibleProducts = document.querySelectorAll('.tumu-product-card[style="display: flex;"]');
        const noResultsMessage = document.getElementById('noResultsMessage');
        
        // If no results message element exists, create it, otherwise show/hide it
        if (visibleProducts.length === 0) {
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.id = 'noResultsMessage';
                message.className = 'no-results-message';
                message.innerHTML = '<p>Aramanızla eşleşen ürün bulunamadı.</p>';
                document.querySelector('.tumu-all-products-grid').appendChild(message);
            } else {
                noResultsMessage.style.display = 'block';
            }
        } else if (noResultsMessage) {
            noResultsMessage.style.display = 'none';
        }
    }

    // Initialize with "all" category
    filterProducts('all', '');
}); 