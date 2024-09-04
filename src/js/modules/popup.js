export const popup = () => {
	const popupLinks = document.querySelectorAll('[data-modal]');
	const body = document.querySelector('body');
	const lockPadding = document.querySelectorAll('.lock-padding');


	const timeout = 300;

	popupLinks.forEach(popupLink => {
		popupLink.addEventListener('click', function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const currentPopup = document.getElementById(popupName);
			if (currentPopup) {
				popupOpen(currentPopup);
				e.preventDefault();
			}
		});
	});

	const popupCloseIcons = document.querySelectorAll('.popup__close');
	popupCloseIcons.forEach(icon => {
		icon.addEventListener('click', function (e) {
			popupClose(icon.closest('.popup'));
			e.preventDefault();
		});
	});

	function popupOpen(currentPopup) {
		if (currentPopup) {
			const popupActive = document.querySelector('.popup.open');
			if (popupActive) {
				popupClose(popupActive, false);
			} else {
				bodyLock();
			}
			currentPopup.classList.add('open');

			currentPopup.addEventListener('click', function (e) {
				if (!e.target.closest('.popup__body')) {
					popupClose(e.target.closest('.popup'));
				}
			});
		}
	}

	function popupClose(popupActive) {

		if (popupActive) {
			popupActive.classList.remove('open');
			bodyUnlock();
		}
	}

	function bodyLock() {
		const lockPaddingValue = `${window.innerWidth - document.querySelector('.wrapper').offsetWidth}px`;

		lockPadding.forEach(el => {
			el.style.paddingRight = lockPaddingValue;
		});
		body.style.paddingRight = lockPaddingValue;
		body.classList.add('modal-lock');

	}

	function bodyUnlock() {
		lockPadding.forEach(el => {
			el.style.paddingRight = '0px';
		});
		body.style.paddingRight = '0px';
		body.classList.remove('modal-lock');
	}


	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') {

			const popupActive = document.querySelector('.popup.open');


			if (popupActive) {
				popupClose(popupActive);
			}
		}
	});


}

