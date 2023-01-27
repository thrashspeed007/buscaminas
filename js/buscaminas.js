const hamburgerMenu = document.getElementById('hamburger-menu');

// Menú responsive de hamburguesa
hamburgerMenu.addEventListener("click", menuResponsive);

function menuResponsive() {
    nav.classList.toggle("active");
}