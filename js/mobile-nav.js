// mobile-nav.js
// Handles the hamburger menu toggle for mobile view.
// Works on any page that has <header> with a #hamburgerBtn button.

document.addEventListener('DOMContentLoaded', function () {
    var hamburgerBtn = document.getElementById('hamburgerBtn');
    var header = document.querySelector('header');

    if (!hamburgerBtn || !header) return;

    function closeMenu() {
        header.classList.remove('nav-active');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
    }

    function toggleMenu() {
        var isOpen = header.classList.toggle('nav-active');
        hamburgerBtn.classList.toggle('active', isOpen);
        hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    hamburgerBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close the menu after a nav link is tapped
    var menuLinks = header.querySelectorAll('.menu a');
    menuLinks.forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    // Close the menu if the user taps outside of it
    document.addEventListener('click', function (e) {
        if (header.classList.contains('nav-active') && !header.contains(e.target)) {
            closeMenu();
        }
    });

    // Close the menu automatically if the viewport is resized back to desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
});
