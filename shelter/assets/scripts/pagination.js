let randomPets = [];
let fullSequence = [];
let countPets = 8;
let currentPage = 1;
let pagesCount = 6;
if (window.innerWidth < 1280) pagesCount = 8;
if (window.innerWidth < 640) pagesCount = 16;
let objectCount = 48;
let itemsCount = 8;
let catalog = document.querySelector('.catalog__items');
let itemLayout = `<div class="catalog__item pets-item">
							<div class="catalog__item-img">
								<img src="" alt="">
							</div>
						<span class="catalog__pet-name"></span>
						<a href="" class="catalog__btn-learn-more pets-item__btn-learn-more">Learn more</a>
						</div>`;
let btnToFirst = document.querySelector('.catalog__button_first');
let btnToPrev = document.querySelector('.catalog__button_prev');
let pageNumber = document.querySelector('.catalog__button_page');
let btnToNext = document.querySelector('.catalog__button_next');
let btnToLast = document.querySelector('.catalog__button_last');
let disableBtn = `catalog__button_disabled`;

function randomNum() {
	return Math.abs(Math.ceil(Math.random() * countPets - 1));
}

function randomArr(countPets) {
	let arr = [];
	while (arr.length != countPets) {
		let found = false;
		random = randomNum();
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] === random) {
				found = true;
				break;
			}
		}
		if (!found) {arr[arr.length] = random};
	}
	return arr;
}

function shuffleArr(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

function makeFullSequence(arr, objectCount) {
	let fullSequence = [];
	let subarr;
	while (fullSequence.length != objectCount / 8) {
		subarr = [shuffleArr(arr.slice(0, 3)), shuffleArr(arr.slice(3, -2)), arr.slice(-2)];
		fullSequence.push(subarr.flat());
	}
	return fullSequence.flat();
}

function addItemsToCatalog(itemsCount, itemLayout) {
	for (let i = 0; i < itemsCount; i++) {
		catalog.innerHTML += itemLayout;
	}
}

function fillCards() {
	let catalogItems = document.querySelectorAll('.catalog__item');
	let i = (currentPage == 1) ? 0 : (currentPage - 1) * (fullSequence.length / pagesCount); 
	let j = 0;
	for (; i < (fullSequence.length / pagesCount) * currentPage; i++) {
		catalogItems[j].setAttribute('id', pets[fullSequence[i]]["id"]);
		catalogItems[j].querySelector('.catalog__item-img img').setAttribute('src', pets[fullSequence[i]]["img"]);
		catalogItems[j].querySelector('.catalog__pet-name').innerHTML = pets[fullSequence[i]]["name"];
		j++;
	}
}

randomPets = randomArr(countPets);
fullSequence = makeFullSequence(randomPets, objectCount);
addItemsToCatalog(itemsCount, itemLayout);
fillCards();


btnToFirst.addEventListener('click', swipeToFirst);
function swipeToFirst() {
	currentPage = 1;
	pageNumber.innerHTML = currentPage;
	changeToBackward();
	fillCards();
}

btnToPrev.addEventListener('click', swipeToPrev);
function swipeToPrev() {
	--currentPage;
	pageNumber.innerHTML = currentPage;
	changeToBackward();
	fillCards();
}

btnToNext.addEventListener('click', swipeToNext);
function swipeToNext() {
	++currentPage;
	pageNumber.innerHTML = currentPage;
	changeToForward();
	fillCards();
} 

btnToLast.addEventListener('click', swipeToLast);
function swipeToLast() {
	currentPage = pagesCount;
	pageNumber.innerHTML = currentPage;
	changeToForward();
	fillCards();
}

function changeToBackward() {
	if (currentPage > 1 && currentPage < pagesCount) {
		btnToNext.classList.remove(disableBtn);
		btnToLast.classList.remove(disableBtn);
	}
	else {
		btnToFirst.classList.add(disableBtn);
		btnToPrev.classList.add(disableBtn);
		btnToNext.classList.remove(disableBtn);
		btnToLast.classList.remove(disableBtn);
	}
}

function changeToForward() {
	if (currentPage > 1 && currentPage < pagesCount) {
		btnToFirst.classList.remove(disableBtn);
		btnToPrev.classList.remove(disableBtn);
	}
	else {
		btnToFirst.classList.remove(disableBtn);
		btnToPrev.classList.remove(disableBtn);
		btnToNext.classList.add(disableBtn);
		btnToLast.classList.add(disableBtn);
	}
}

let mediaSixCards  = window.matchMedia('(max-width: 1279px)');
let mediaThreeCards  = window.matchMedia('(max-width: 639px)');
mediaSixCards.addEventListener('change', function(event) {
	sixCards(event.matches);
});
mediaThreeCards.addEventListener('change', function(event) {
	threeCards(event.matches)
 });

function sixCards(isChange) {
	if (isChange) {
		pagesCount = 8;
		resetPages();
	}
	else {
		pagesCount = 6;
		resetPages();
	}
}

function threeCards(isChange) {
	if (isChange) {
		pagesCount = 16;
		resetPages();
	}
	else {
		pagesCount = 8;
		resetPages();
	}
}

function resetPages() {
	if (currentPage !== 1) {
		currentPage = 1;
		pageNumber.innerHTML = currentPage;
		btnToFirst.classList.add(disableBtn);
		btnToPrev.classList.add(disableBtn);
		btnToNext.classList.remove(disableBtn);
		btnToLast.classList.remove(disableBtn);
	}
	fillCards();
}