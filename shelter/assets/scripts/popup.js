let insert = document.querySelector('.main');
let popup = document.createElement('div');
popup.classList.add('card-popup','popup');
let layout =`<div class="popup__wrapper">
					<div class="popup__window">
						<div class="popup__image">
							<img src="../assets/images/pets-jennifer.png" alt="">
						</div>
						<div class="popup__text">
							<div class="popup__title">
								<h3 class="popup__name">
									Jennifer
								</h3>
								<h4 class="popup__pet">
									Dog - Labrador
								</h4>
						</div>
						<h5 class="popup__info">
							Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.
						</h5>
						<ul class="popup__extra-info">
							<li class="popup__extra-item">
								<b class="popup__extra-title">Age: </b>
								<span>2 months</span>
							</li>
							<li class="popup__extra-item">
								<b class="popup__extra-title">Inoculations: </b>
								<span>none</span>
							</li>
							<li class="popup__extra-item">
								<b class="popup__extra-title">Diseases:</b>
								<span>none</span>
							</li>
							<li class="popup__extra-item">
								<b class="popup__extra-title">Parasites:</b>
								<span>none</span>
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