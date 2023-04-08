let body = document.querySelector('body');
let burgerMenu = document.querySelector('.burger-menu');
let burgerIcon = document.querySelector('.burger-icon');

burgerIcon.onclick = function() {
	burgerIcon.classList.contains('burger-icon_active') ? body.style.overflow = "overlay" : body.style.overflow = "hidden";
	burgerIcon.classList.toggle('burger-icon_active');
}
burgerMenu.addEventListener('click', closeBurgerMenu);
window.addEventListener('resize', closeBurgerMenuOnResize);

function closeBurgerMenu(e) {
	if (e.target.classList.contains('burger-menu') || e.target.classList.contains('nav-menu__link')) {
		burgerIcon.classList.remove('burger-icon_active');
		body.style.overflow = "overlay";
	}
}

function closeBurgerMenuOnResize() {
	if (window.innerWidth > 767) {
		burgerIcon.classList.remove('burger-icon_active');
		body.style.overflow = "overlay";
	}
} 