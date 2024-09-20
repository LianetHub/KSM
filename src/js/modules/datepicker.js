export class Datepicker {


    constructor(element, options) {
        this.element = element;
        this.currentDate = new Date();
        this.selectedDate = new Date();

        this.createDatepicker();

        this.init();
    }

    createDatepicker() {

        this.datepicker = document.createElement('div');
        this.datepicker.classList.add('datepicker');
        this.datepicker.style.display = 'none';

        const body = document.createElement('div');
        body.classList.add('datepicker__body');

        this.grid = document.createElement('div');
        this.grid.classList.add('datepicker__grid');

        body.appendChild(this.grid);

        const footer = document.createElement('div');
        footer.classList.add('datepicker__footer');

        this.prevButton = document.createElement('button');
        this.prevButton.type = 'button';
        this.prevButton.classList.add('datepicker__prev');
        this.prevButton.textContent = '←';

        this.pagination = document.createElement('span');
        this.pagination.classList.add('datepicker__pagination');

        this.nextButton = document.createElement('button');
        this.nextButton.type = 'button';
        this.nextButton.classList.add('datepicker__next');
        this.nextButton.textContent = '→';

        footer.appendChild(this.prevButton);
        footer.appendChild(this.pagination);
        footer.appendChild(this.nextButton);

        this.datepicker.appendChild(body);
        this.datepicker.appendChild(footer);


        this.element.insertAdjacentElement('afterend', this.datepicker);
    }

    init() {

        this.element.addEventListener('focus', () => {
            console.log('focis');
            this.show();
        });
        this.element.addEventListener('blur', (e) => {
            console.log('blur');
            if (!e.relatedTarget?.closest('.datepicker')) {
                this.hide();
            }

        });
        this.element.addEventListener('clear', () => {
            this.currentDate = new Date();
            this.selectedDate = new Date();
            this.render();
        });
        // document.addEventListener('click', (e) => this.handleOutsideClick(e));

        this.prevButton.addEventListener('click', () => this.changeMonth(-1));
        this.nextButton.addEventListener('click', () => this.changeMonth(1));

        this.render();
    }

    show() {
        this.datepicker.style.display = 'block';
        this.element.setAttribute('placeholder', this.element.getAttribute('placeholder').replace('↓', '↑'))
        this.element.classList.add('focus-datepicker');
    }

    hide() {
        this.datepicker.style.display = 'none';
        this.element.setAttribute('placeholder', this.element.getAttribute('placeholder').replace('↑', '↓'))
        this.element.classList.remove('focus-datepicker');
    }

    handleOutsideClick(e) {
        if (!this.datepicker.contains(e.target) && e.target !== this.element) {
            this.hide();
        }
    }

    changeMonth(offset) {
        this.currentDate.setMonth(this.currentDate.getMonth() + offset);

        this.render();
    }

    render() {
        this.grid.innerHTML = '';
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        this.pagination.textContent = `${String(month + 1).padStart(2, '0')}/12`;

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = this.getFirstDayOfMonth(month, year);
        const lastMonthDays = new Date(year, month, 0).getDate();

        for (let i = firstDayOfMonth; i > 0; i--) {
            const day = lastMonthDays - i + 1;
            const dayButton = this.createDayButton(day, 'greyed');
            this.grid.appendChild(dayButton);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayButton = this.createDayButton(i);
            if (i === this.selectedDate.getDate() && month === this.selectedDate.getMonth() && year === this.selectedDate.getFullYear()) {
                dayButton.classList.add('selected');
            }
            this.grid.appendChild(dayButton);
        }

        const remainingDays = 42 - (firstDayOfMonth + daysInMonth);
        for (let i = 1; i <= remainingDays; i++) {
            const dayButton = this.createDayButton(i, 'greyed');
            this.grid.appendChild(dayButton);
        }
    }


    getFirstDayOfMonth(month, year) {
        const firstDay = new Date(year, month, 1).getDay();

        return (firstDay === 0 ? 6 : firstDay - 1);
    }

    createDayButton(day, extraClass = '') {
        const button = document.createElement('button');
        button.textContent = day;
        button.type = 'button';
        if (extraClass) button.classList.add(extraClass);

        button.addEventListener('click', () => {
            this.selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
            this.element.value = this.formatDate(this.selectedDate);
            this.render();
            console.log('btn click');

            this.hide();
        });

        return button;
    }

    formatDate(date) {
        return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
    }
}