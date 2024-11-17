function toggleMenu() {
    const menu = document.querySelector('.header_right');
    menu.classList.toggle('active');
}

document.querySelector('.hamburger-menu').addEventListener('click', toggleMenu);



