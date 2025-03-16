// Script para el menú hamburguesa móvil
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNavigation = document.querySelector('.main-navigation');
    const siteOverlay = document.getElementById('site-overlay');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Función para abrir/cerrar el menú móvil
    function toggleMobileMenu() {
        mobileMenuToggle.classList.toggle('active');
        mainNavigation.classList.toggle('active');
        siteOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Actualizar el atributo aria-expanded para accesibilidad
        const isExpanded = mobileMenuToggle.classList.contains('active');
        mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
    }
    
    // Event Listeners
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    siteOverlay.addEventListener('click', toggleMobileMenu);
    
    // Cerrar el menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 991) {
                toggleMobileMenu();
            }
        });
    });
    
    // Toggle para submenús en móvil
    navItems.forEach(item => {
        if (item.querySelector('.dropdown-menu')) {
            const link = item.querySelector('.nav-link');
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 991) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        }
    });
    
    // Cerrar menú al redimensionar la ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991 && mainNavigation.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Efecto de scroll para el header
    const header = document.querySelector('.site-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Agregar clase 'scrolled' al hacer scroll
        if (scrollTop > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Ocultar/mostrar header al hacer scroll hacia abajo/arriba
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = scrollTop;
    });
});