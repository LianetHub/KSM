export const formSubmit = () => {
	const forms = document.querySelectorAll('form:not(.search__form):not(.footer__form):not(.header__form):not(.products__filters)');
	forms.forEach((form) => {
		form.addEventListener("submit", formSend);
		form.addEventListener("reset", resetUI);

		if (!form.querySelector('[name="captcha"]')) {
			form.insertAdjacentHTML("beforeend", `<input type="hidden" name="captcha" value="${navigator.userAgent}"/>`);
		}
	});

	document.addEventListener("input", handleFormInput);

	let successModalTimeoutId;

	async function formSend(e) {
		e.preventDefault();

		const form = e.target;
		const currentUrl = form.getAttribute("action");
		const error = formValidate(form);

		if (error === 0) {
			try {
				form.classList.add("_sending");

				const response = await fetch(currentUrl, {
					method: "POST",
					body: new FormData(form),
				});

				if (!response.ok) throw new Error("Укажите URL, куда будет запрос в атрибуте action у формы");

				form.reset();
				closeAndShowSuccessModal();
			} catch (error) {
				console.log(error.message);
			} finally {
				form.classList.remove("_sending");
			}
		}
	}

	function handleFormInput(e) {
		const { target } = e;
		if (target.classList.contains('_error')) {
			formRemoveError(target);
		}
	}

	function formValidate(form) {
		let error = 0;

		const formInputs = form.querySelectorAll("input, textarea, select");

		formInputs.forEach(input => {
			formRemoveError(input);

			const isRequired = input.hasAttribute("data-required");
			const inputValue = input.value.trim();

			if (!isRequired && inputValue === "" && !(input.matches("[type='checkbox']") || input.matches("[type='radio']"))) {
				return;
			}

			if (isRequired && (inputValue === "" || (input.matches("[type='checkbox']") && !input.checked) || (input.matches("[name='message']") && inputValue.length < 1))) {
				formAddError(input);
				error++;
			} else if (input.matches("[type='email']") && inputValue !== "" && !emailTest(inputValue)) {
				formAddError(input);
				error++;
			} else if (input.matches("[type='tel']") && inputValue !== "" && !phoneTest(inputValue)) {
				formAddError(input);
				error++;
			}
		});

		return error;
	}

	function formAddError(input) {
		input.classList.add("_error");
		input.parentElement.classList.add("_error");
	}

	function formRemoveError(input) {
		input.classList.remove("_error");
		input.parentElement.classList.remove("_error");
	}

	function emailTest(email) {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	function phoneTest(phone) {
		const cleaned = phone.replace(/\D/g, '');
		return cleaned.length >= 6 && /^[1-9]\d{5,14}$/.test(cleaned);
	}

	function closeAndShowSuccessModal() {
		const successModal = document.querySelector('.popup-thanks');
		successModal.classList.add('open');
		document.querySelector('body').classList.add('modal-lock');

		if (successModalTimeoutId) {
			clearTimeout(successModalTimeoutId);
		}

		successModalTimeoutId = setTimeout(() => {
			if (successModal.classList.contains('open')) {
				successModal.classList.remove('open');
				document.querySelector('body').classList.remove('modal-lock');
			}
			successModalTimeoutId = null;
		}, 5000);
	}

	function popup() {
		const popupLinks = document.querySelectorAll('[data-modal]');
		const body = document.querySelector('body');
		const lockPadding = document.querySelectorAll('.lock-padding');

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
				if (icon.closest('.popup-thanks')) {

					if (successModalTimeoutId) {
						clearTimeout(successModalTimeoutId);
						successModalTimeoutId = null;
					}
					document.querySelectorAll('.popup').forEach(popup => {
						popupClose(popup);
					});
				} else {
					popupClose(icon.closest('.popup'));
				}
				e.preventDefault();
			});
		});

		function popupOpen(currentPopup) {
			if (currentPopup) {
				const popupActive = document.querySelector('.popup.open');
				if (popupActive) {
					popupClose(popupActive);
				}
				bodyLock();
				currentPopup.classList.add('open');
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

					if (popupActive.classList.contains('popup-thanks') && successModalTimeoutId) {
						clearTimeout(successModalTimeoutId);
						successModalTimeoutId = null;
					}
					popupClose(popupActive);
				}
			}
		});
	}

	function resetUI(e) {
		const form = e.target;
		const inputs = form.querySelectorAll('._input');
		const filesPreviews = form.querySelectorAll('.form__files');
		const submitButton = form.querySelector('button[type="submit"]');
		const ndaInput = form.querySelector('[name="nda"]');

		inputs?.forEach(input => input.classList.remove('_input'));
		filesPreviews?.forEach(filePreview => filePreview.remove());

		if (ndaInput) {
			submitButton.disabled = true;
		}
	}

	popup();
};