export const checkEmptyInputs = () => {
    const inputs = document.querySelectorAll('.form__field > .form__input, .form__field > .form__textarea');

    inputs.forEach(input => {
        const handleEvent = e => checkEmpty(e.target);

        ['input', 'blur', 'focus', 'change', 'keyup', 'mouseup'].forEach(event => {
            input.addEventListener(event, handleEvent);
        });

        // Initial check
        checkEmpty(input);
    });

    function checkEmpty(input) {
        if (input.value.length > 0) {
            input.classList.add('_input');
        } else {
            input.classList.remove('_input');
        }
    }
}
