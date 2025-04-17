// Back to Top Button JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Create the back to top button element
    const backToTopButton = document.createElement('button');
    backToTopButton.id = 'back-to-top';
    backToTopButton.title = 'Yukarı Çık';
    backToTopButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 4l-8 8h5v8h6v-8h5z" fill="currentColor"/></svg>';
    
    // Add the button to the document body
    document.body.appendChild(backToTopButton);
    
    // Add button styles
    const style = document.createElement('style');
    style.textContent = `
        #back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #08fcac;
            color: #101414;
            border: none;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
        }
        
        #back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        #back-to-top:hover {
            background-color: #00d9a3;
            transform: translateY(-3px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        
        #back-to-top svg {
            width: 20px;
            height: 20px;
        }
        
        @media (max-width: 768px) {
            #back-to-top {
                bottom: 20px;
                right: 20px;
                width: 40px;
                height: 40px;
            }
            
            #back-to-top svg {
                width: 16px;
                height: 16px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Function to check scroll position and show/hide the button
    function toggleBackToTopButton() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
    
    // Function to scroll to top smoothly
    function scrollToTop(e) {
        e.preventDefault();
        
        // For modern browsers
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // For older browsers fallback
        if (typeof window.scrollTo !== 'function') {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0; // For Safari
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', toggleBackToTopButton);
    
    // Add click event listener to the button
    backToTopButton.addEventListener('click', scrollToTop);
    
    // Initial check to see if button should be displayed
    toggleBackToTopButton();
});