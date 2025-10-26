export const filter = () => {

    if (!document.querySelector('.products__filters')) return;

    const filterColumns = document.querySelectorAll('.products__filters-column');
    const priceInputs = document.querySelectorAll('.start-price, .end-price');
    const filterForm = document.querySelector('.products__filters');

    const formatNumber = (value) => {
        const sanitizedValue = String(value).replace(/\D/g, '');
        if (sanitizedValue.length === 0) return '';
        return sanitizedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    const applyFormatting = (input) => {
        const sanitizedValue = input.value.replace(/\D/g, '');
        if (sanitizedValue.length > 0) {
            const formattedValue = formatNumber(sanitizedValue);
            const inputUnit = input.dataset.measure ? input.dataset.measure : "₽/м²";
            input.value = `${formattedValue} ${inputUnit}`;
        }
    };

    const initializePriceInputs = () => {
        priceInputs.forEach(input => {
            applyFormatting(input);
        });
    };

    filterColumns.forEach(column => {
        const clearButton = column.querySelector('.products__filters-clear');
        const inputs = column.querySelectorAll('.products__filters-input');

        if (inputs.length > 0) {
            inputs.forEach(input => {
                input.addEventListener('change', () => {
                    toggleClearButton(column);
                    document.dispatchEvent(new CustomEvent('filter:updated'));

                });
            });
        }

        if (clearButton) {
            clearButton.addEventListener('click', () => {
                inputs.forEach(input => {
                    input.checked = false;
                });
                toggleClearButton(column);
                document.dispatchEvent(new CustomEvent('filter:updated'));

            });
        }
    });

    priceInputs.forEach(input => {

        input.addEventListener('keydown', (event) => {

            if (
                (event.key >= '0' && event.key <= '9') ||
                event.key === 'Backspace' ||
                event.key === 'Delete' ||
                event.key === 'ArrowLeft' ||
                event.key === 'ArrowRight' ||
                event.key === 'Tab'
            ) {

                return;
            } else {

                event.preventDefault();
            }
        });

        input.addEventListener('focus', () => {
            const sanitizedValue = input.value.replace(/\D/g, '');
            input.value = formatNumber(sanitizedValue);

        });

        input.addEventListener('input', () => {
            const caretPosition = input.selectionStart;
            const oldValue = input.value;
            const oldValueSanitized = oldValue.replace(/\D/g, '');
            const formattedValueWithoutUnit = formatNumber(oldValueSanitized);
            input.value = formattedValueWithoutUnit;

            let newCaretPosition = caretPosition + (input.value.length - oldValue.length);

            if (
                oldValue.length < input.value.length &&
                (input.value.charAt(newCaretPosition - 1) === ' ' || input.value.charAt(newCaretPosition - 1) === '/')
            ) {
                newCaretPosition += 1;
            }

            if (newCaretPosition < 0) {
                newCaretPosition = 0;
            }

            input.setSelectionRange(newCaretPosition, newCaretPosition);

            document.dispatchEvent(new CustomEvent('filter:updated'));
        });

        input.addEventListener('blur', () => {
            applyFormatting(input);
            document.dispatchEvent(new CustomEvent('filter:updated'));
        });
    });

    function toggleClearButton(column) {
        const clearButton = column.querySelector('.products__filters-clear');
        const hasCheckedInputs = column.querySelector('.products__filters-input:checked');

        if (hasCheckedInputs) {
            clearButton.classList.remove('hidden');
        } else {
            clearButton.classList.add('hidden');
        }
    }

    filterForm.addEventListener('submit', function (e) {

        e.preventDefault();

        const url = new URL(window.location.href);
        if (url.searchParams.has('pages')) {
            url.searchParams.delete('pages');
            history.replaceState(null, '', url.toString());
        }

        const startPriceInput = filterForm.querySelector('.start-price');
        const endPriceInput = filterForm.querySelector('.end-price');

        const originalStartPrice = startPriceInput.value;
        const originalEndPrice = endPriceInput.value;

        startPriceInput.value = startPriceInput.value.replace(/\D/g, '');
        endPriceInput.value = endPriceInput.value.replace(/\D/g, '');

        filterForm.submit();

        startPriceInput.value = originalStartPrice;
        endPriceInput.value = originalEndPrice;

        document.dispatchEvent(new CustomEvent('filter:updated'));

    });

    initializePriceInputs();

}