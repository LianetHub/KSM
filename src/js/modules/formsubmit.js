export const formSubmit = () => {
	const forms = document.querySelectorAll('form:not(.search__form):not(.footer__form):not(.header__form):not(.products__filters)');
	forms.forEach((form) => {

		form.addEventListener("submit", formSend);
		form.addEventListener("reset", resetUI);

	});

	document.addEventListener("input", handleFormInput);

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
		const formReq = form.querySelectorAll("[data-required]");

		formReq.forEach(input => {
			formRemoveError(input);

			if (input.matches("[type='email']") && !emailTest(input.value)) {
				formAddError(input);
				error++;
			} else if (input.matches("[type='checkbox']") && !input.checked) {
				formAddError(input);
				error++;
			} else if (input.value.trim() === "" || (input.matches("[name='message']") && input.value.trim().length < 1)) {
				formAddError(input);
				error++;
			} else if (input.matches("[type='tel']") && !phoneTest(input.value)) {
				formAddError(input);
				error++;
			}
		});

		return error;
	}

	function formAddError(input) {
		input.classList.add("_error");
		input.parentElement.classList.add("_error");
		// input.closest('.form')?.querySelector('.form__error-message')?.classList.add('visible');
	}

	function formRemoveError(input) {
		input.classList.remove("_error");
		input.parentElement.classList.remove("_error");
		// const form = input.closest('.form');
		// if (form && !form.querySelector('._error')) {
		// 	form.querySelector('.form__error-message')?.classList.remove('visible');
		// }
	}

	function emailTest(email) {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	function phoneTest(phone) {
		const cleaned = phone.replace(/\D/g, '');
		return cleaned.length >= 10 && /^[1-9]\d{9,14}$/.test(cleaned);
	}

	function closeAndShowSuccessModal() {
		document.querySelector('.popup-thanks').classList.add('open');
		document.querySelector('body').classList.add('modal-lock');
		setTimeout(() => {
			document.querySelectorAll('.popup').forEach(popup => popup.classList.remove('open'));
			document.querySelector('body').classList.remove('modal-lock');
		}, 5000)
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

};