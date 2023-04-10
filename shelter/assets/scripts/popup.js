let insert = document.querySelector('.main');
let popup = document.createElement('div');
let popupParent = document.querySelector('.pets-items');
let popupItem = '.pets-item';
popup.classList.add('card-popup','popup');
let layout =`<div class="popup__wrapper">
					<div class="popup__window">
						<div class="popup__image">
							<img src="" alt="Pet">
						</div>
						<div class="popup__text">
							<div class="popup__title">
								<h3 class="popup__name">
								</h3>
								<h4 class="popup__pet">
								</h4>
						</div>
						<h5 class="popup__info">
						</h5>
						<ul class="popup__extra-info">
							<li class="popup__extra-item popup__extra-item_age">
								<b class="popup__extra-title">Age: </b>
								<span></span>
							</li>
							<li class="popup__extra-item popup__extra-item_inoculations">
								<b class="popup__extra-title">Inoculations: </b>
								<span></span>
							</li>
							<li class="popup__extra-item popup__extra-item_diseases">
								<b class="popup__extra-title">Diseases:</b>
								<span></span>
							</li>
							<li class="popup__extra-item popup__extra-item_parasites">
								<b class="popup__extra-title">Parasites:</b>
								<span></span>
							</li>
						</ul>
						</div>
						</div>
						<div class="popup__button">
							&#10006;
						</div>
					</div>`;
popup.innerHTML = layout;
insert.append(popup);

let popupImg = document.querySelector('.popup__image img');
let popupName = document.querySelector('.popup__name');
let popupPet = document.querySelector('.popup__pet');
let popupInfo = document.querySelector('.popup__info');
let popupAge = document.querySelector('.popup__extra-item_age > span');
let popupInoculations = document.querySelector('.popup__extra-item_inoculations > span');
let popupDiseases = document.querySelector('.popup__extra-item_diseases > span');
let popupParasites = document.querySelector('.popup__extra-item_parasites  > span');

popupParent.addEventListener('click', (e) => {
	if (e.target.classList.contains('pets-item__btn-learn-more')) e.preventDefault();
	if (e.target.closest(popupItem)) {
		fillPopup(e.target.closest(popupItem).getAttribute("id"));
		popup.classList.add('popup_active');
		body.style.overflow = 'hidden';
	}
})

function fillPopup(id) {
	popupImg.setAttribute('src', pets[id-1]["img"]);
	popupName.innerText = pets[id-1]["name"];
	popupPet.innerText = `${pets[id-1]["type"]} - ${pets[id-1]["breed"]}`;
	popupInfo.innerText = pets[id-1]["description"];
	popupAge.innerText = pets[id-1]["age"];
	popupInoculations.innerText = pets[id-1]["inoculations"];
	popupDiseases.innerText = pets[id-1]["diseases"];
	popupParasites.innerText = pets[id-1]["parasites"];
}

popup.addEventListener('click', closePopup);
function closePopup(e) {
	if (e.target.classList.contains('popup') || e.target.classList.contains('popup__button')) {
		popup.classList.remove('popup_active');
		body.style.overflow = "overlay";
	}
}