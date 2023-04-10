let animTime = 1250 - 125;
let slider = document.querySelector('.pets-slider__body');
let sliderItems = document.getElementsByClassName('pets-slider__slide');
let prevItems = sliderItems[0].getElementsByClassName('pets-slider__item');
let currItems = sliderItems[1].getElementsByClassName('pets-slider__item');
let nextItems = sliderItems[2].getElementsByClassName('pets-slider__item');
let buttonPrev = document.querySelector('.pets-slider__button_prev');
let buttonNext = document.querySelector('.pets-slider__button_next');
let prevSlides = [];
let currSlides = [];
let nextSlides = [];
let changeDirection;

slider.addEventListener('animationend', sliderEndAnimation);
function sliderEndAnimation() {
	buttonPrev.addEventListener('click', prevSlide);
	buttonNext.addEventListener('click', nextSlide);
	slider.classList.remove('pets-slider__body_prev') || slider.classList.remove('pets-slider__body_next');
}

buttonPrev.addEventListener('click', prevSlide);
function prevSlide() {
	buttonPrev.removeEventListener('click', prevSlide);
	buttonNext.removeEventListener('click', nextSlide);
	if (changeDirection === 'right') {
		init({prev: true, direction: changeDirection});
		return;
	}
	changeDirection = 'left';
	let countActive = countOfActiveSlides();
	randomSlides(countActive, true);
	init({prev: true});
}

buttonNext.addEventListener('click', nextSlide);
function nextSlide() {
	buttonPrev.removeEventListener('click', prevSlide);
	buttonNext.removeEventListener('click', nextSlide);
	if (changeDirection === 'left') {
		init({next: true, direction: changeDirection});
		return;
	}
	changeDirection = 'right';
	let countActive = countOfActiveSlides();
	randomSlides(countActive, true);
	init({next: true});
}

function countOfActiveSlides() {
	let count = currItems.length;
	for (let item of currItems) {
		if (getComputedStyle(item).display === "none") count--;
	}
	return count;
}

function randomSlides(count, newSlides = false) {
	let random = 0;
	if (!newSlides) {
		for (let i = 0; i < count; i++) {
			do {
				random = Math.round(1 - 0.5 + (Math.random() * pets.length)) - 1;
			} while (currSlides.includes(pets[random]['id']));
			currSlides.push(pets[random]['id']); 
		}
		return currSlides;
	}
	else {
		currSlides.length = count;
		prevSlides = currSlides.slice(0, currSlides.length);
		nextSlides.length = 0;
		for (let i = 0; i < count; i++) {
			do {
				random = Math.round(1 - 0.5 + (Math.random() * pets.length)) - 1;
			} while (currSlides.includes(pets[random]['id']) || nextSlides.includes(pets[random]['id']));
			nextSlides.push(pets[random]['id']); 
		}
		currSlides = nextSlides.slice(0, nextSlides.length);
	}
}

function init({prev = false, next = false, direction = undefined} = {}) {
	let indexForChange;
	let countActive = countOfActiveSlides();
	currSlides = (currSlides.length) ? currSlides : randomSlides(countActive);

	if (direction) {
		changeDirection = undefined
		currSlides = prevSlides.slice(0, prevSlides.length);
		indexForChange = currSlides;
		prevSlides = [];
	}
	else if (nextSlides.length) {
		indexForChange = nextSlides;
	}

	if (prev) {
		for (let i = 0; i < countActive; i++) {
			prevItems[i].setAttribute('id', indexForChange[i]);
			prevItems[i].querySelector('.pets-slider__pet-img img').setAttribute('src', `${pets[indexForChange[i] - 1]["img"]}`);
			prevItems[i].querySelector('.pets-slider__pet-name').innerHTML = pets[indexForChange[i] - 1]["name"];
		}
		setTimeout( () => {
			sliderItems[1].innerHTML = sliderItems[0].innerHTML;
		}, animTime);
		slider.classList.add('pets-slider__body_prev');
	}
	else if (next) {
		for (let i = 0; i < countActive; i++) {
			nextItems[i].setAttribute('id', indexForChange[i]);
			nextItems[i].querySelector('.pets-slider__pet-img img').setAttribute('src', `${pets[indexForChange[i] - 1]["img"]}`);
			nextItems[i].querySelector('.pets-slider__pet-name').innerHTML = pets[indexForChange[i] - 1]["name"];
		}
		setTimeout( () => {
			sliderItems[1].innerHTML = sliderItems[2].innerHTML;
		}, animTime);
		slider.classList.add('pets-slider__body_next');
	}
}
function initDefault(count) {
	let countActive = (count) ? count : countOfActiveSlides();
	currSlides = (currSlides.length) ? currSlides : randomSlides(countActive);
	indexForChange = currSlides;
	for (let i = 0; i < countActive; i++) {
		currItems[i].setAttribute('id', indexForChange[i]);
		currItems[i].querySelector('.pets-slider__pet-img img').setAttribute('src', `${pets[indexForChange[i] - 1]["img"]}`);
		currItems[i].querySelector('.pets-slider__pet-name').innerHTML = pets[indexForChange[i] - 1]["name"];
	}
}
initDefault();

window.addEventListener('resize', cardsOnResize); 
function cardsOnResize() {
	let countActive = countOfActiveSlides();
	if (currSlides.length < countActive) {
		if (prevSlides.length == 0) {
			for (let i = currSlides.length; i < countActive; i++) {
				do {
					random = Math.round(1 - 0.5 + (Math.random() * pets.length)) - 1;
				} while (currSlides.includes(pets[random]['id']));
				currSlides.push(pets[random]['id']);
			}
		}
		else {
			for (let i = currSlides.length; i < countActive; i++) {
				do {
					random = Math.round(1 - 0.5 + (Math.random() * pets.length)) - 1;
				} while (prevSlides.includes(pets[random]['id']) || currSlides.includes(pets[random]['id']));
				prevSlides.push(pets[random]['id']);
				do {
					random = Math.round(1 - 0.5 + (Math.random() * pets.length)) - 1;
				} while (prevSlides.includes(pets[random]['id']) || currSlides.includes(pets[random]['id']));
				currSlides.push(pets[random]['id']);
			}
		}
		initDefault(countActive);
	}
}