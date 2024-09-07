export const filter = () => {

    if (!document.querySelector('.products__filters')) return;

    const filterColumns = document.querySelectorAll('.products__filters-column');
    const priceInputs = document.querySelectorAll('input[name="start-price"], input[name="end-price"]');
    const filterForm = document.querySelector('.products__filters');
    let filterTimeout;




    filterColumns.forEach(column => {
        const clearButton = column.querySelector('.products__filters-clear');
        const inputs = column.querySelectorAll('.products__filters-input');

        if (inputs.length > 0) {
            inputs.forEach(input => {
                input.addEventListener('change', () => {
                    toggleClearButton(column);
                    handleFilterChange();
                });
            });
        }


        if (clearButton) {
            clearButton.addEventListener('click', () => {
                inputs.forEach(input => {
                    input.checked = false;
                });
                toggleClearButton(column);
                handleFilterChange();
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
            input.value = input.value.replace(' ₽/м²', '');
        });

        input.addEventListener('blur', () => {
            const sanitizedValue = input.value.replace(/\D/g, '');
            if (input.value.length !== 0) {
                input.value = `${sanitizedValue} ₽/м²`;
                handleFilterChange();
            }
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

    function handleFilterChange() {
        clearTimeout(filterTimeout);
        filterTimeout = setTimeout(() => {
            sendFilterRequest();
        }, 300);
    }

    function sendFilterRequest() {
        const filterBody = document.querySelector('.products__body');
        filterBody.classList.add('_loading');
        setTimeout(() => {
            filterBody.classList.remove('_loading');
        }, 500)

        // fetch(filterForm.action, {
        //     method: 'GET',
        // })
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
        //         console.log('Success:', data);
        //     })
        //     .catch(error => {
        //         console.error('There was a problem with the fetch operation:', error);
        //     })
        //     .finally(() => {
        //         filterBodies.forEach(body => body.classList.remove('_loading'));
        //     });
    }
}
