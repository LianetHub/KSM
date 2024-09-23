export class Timepicker {
    constructor(input, options) {
        this.input = input;
        this.startTime = options.startTime || "10:00";
        this.endTime = options.endTime || "19:30";
        this.timeInterval = 30;
        this.timepicker = null;
        this.createTimepicker();
        this.addEventListeners();
    }

    createTimepicker() {

        this.timepicker = document.createElement('div');
        this.timepicker.classList.add('timepicker');
        this.timepicker.style.display = 'none';

        const timeItemsContainer = document.createElement('div');
        timeItemsContainer.classList.add('timepicker__items');


        let currentTime = this.parseTime(this.startTime);
        const endTime = this.parseTime(this.endTime);

        while (currentTime <= endTime) {
            const timeString = this.formatTime(currentTime);
            const timeButton = document.createElement('button');
            timeButton.type = 'button';
            timeButton.classList.add('timepicker__item');
            timeButton.textContent = timeString;


            timeButton.addEventListener('click', () => {
                this.input.value = timeString;
                this.hideTimepicker();
            });

            timeItemsContainer.appendChild(timeButton);
            currentTime = this.addMinutes(currentTime, this.timeInterval);
        }

        this.timepicker.appendChild(timeItemsContainer);
        this.input.insertAdjacentElement('afterend', this.timepicker);
    }

    addEventListeners() {

        this.input.addEventListener('focus', () => {
            this.showTimepicker();
        });

        this.input.addEventListener('blur', () => {
            this.hideTimepicker();
        });
    }

    showTimepicker() {
        this.timepicker.style.display = 'block';
        this.input.setAttribute('placeholder', this.input.getAttribute('placeholder').replace('↓', '↑'))
        this.input.classList.add('focus-timepicker')

    }

    hideTimepicker() {
        this.timepicker.style.display = 'none';
        this.input.setAttribute('placeholder', this.input.getAttribute('placeholder').replace('↑', '↓'))
        this.input.classList.remove('focus-timepicker')
    }


    parseTime(time) {
        const [hours, minutes] = time.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    }


    formatTime(date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }


    addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    }
}

