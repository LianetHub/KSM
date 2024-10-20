"use strict";

import * as devFunctions from './modules/functions.js';
import { Timepicker } from './modules/timepicker.js';
import { Datepicker } from './modules/datepicker.js';
import initMap from './modules/map.js';
import { Cart } from './modules/cart.js';

document.addEventListener('DOMContentLoaded', () => {

    devFunctions.OS();
    devFunctions.isWebp();
    devFunctions.checkEmptyInputs();
    devFunctions.animation();
    devFunctions.mask();
    devFunctions.filter();
    devFunctions.cookies();
    devFunctions.popup();
    devFunctions.formSubmit();
    devFunctions.inputFiles();

    if (document.getElementById('map')) {
        initMap()
    }


    new Cart({
        openMenu: getFixedMenu,
        hideMenu: removeFixedMenu,
    });


    function initDayPicker(daypicker) {
        const dateInput = daypicker.querySelector('input[name="date"]');
        const timeInput = daypicker.querySelector('input[name="time"]');

        if (dateInput && timeInput) {

            const datepickerInstance = new Datepicker(dateInput);
            const timepickerInstance = new Timepicker(timeInput, {
                startTime: "10:00",
                endTime: "19:30"
            });

            function openBothPickers() {
                datepickerInstance.open();
                timepickerInstance.open();
            }

            function closeBothPickers() {
                datepickerInstance.close();
                timepickerInstance.close();
            }


            function areBothFieldsFilled() {
                return dateInput.value && timeInput.value;
            }

            dateInput.addEventListener('focus', openBothPickers);
            timeInput.addEventListener('focus', openBothPickers);

            const clearDateButton = dateInput.parentNode.querySelector('.form__field-clear');
            const clearTimeButton = timeInput.parentNode.querySelector('.form__field-clear');

            function clearAllFields() {
                dateInput.value = '';
                timeInput.value = '';
                dateInput.classList.remove('_input');
                timeInput.classList.remove('_input');
            }

            clearDateButton?.addEventListener('click', () => {
                clearAllFields();
                closeBothPickers();
            });

            clearTimeButton?.addEventListener('click', () => {
                clearAllFields();
                closeBothPickers();
            });


            dateInput.addEventListener('input', () => {
                if (areBothFieldsFilled()) {
                    closeBothPickers();
                }
            });

            timeInput.addEventListener('input', () => {
                if (areBothFieldsFilled()) {
                    closeBothPickers();
                }
            });
        }
    }

    document.querySelectorAll('.daypicker')?.forEach(initDayPicker);



    // event handlers

    document.addEventListener('click', (e) => {

        const target = e.target;


        if (target.matches('.form__field-clear')) {
            const parentNode = target.closest('.form__field');
            const input = parentNode?.querySelector('.form__input') || parentNode?.querySelector('.form__textarea');
            input.value = "";
            input.classList.remove('_input');
            input.dispatchEvent(new Event('clear'));
        }

        if (target.closest('.icon-menu')) {
            getMenu()
        }

        if (target.classList.contains('products__filters-caption')) {
            target.classList.toggle('active');
            target.parentNode.nextElementSibling.classList.toggle('active');
        }

        if (target.matches('.swiper-pagination-current')) {
            let sliderBlock = target.closest('.slider');
            sliderBlock && sliderBlock.swiper.slidePrev()
        }

        if (target.matches('.swiper-pagination-total')) {
            let sliderBlock = target.closest('.slider');
            sliderBlock && sliderBlock.swiper.slideNext();
        }

        if (target.matches('.header__menu-link') && target.getAttribute('href').startsWith('#')) {
            removeFixedMenu()
        }

        if (target.closest('.header__logo') && target.closest('.header__logo').getAttribute('href').startsWith('#')) {
            removeFixedMenu()
        }

        if (target.matches('[data-modal]')) {

            if (!target.dataset.modal) return;

            let currentModal = target.dataset.modal;
            let currentModalMenuItem = document.querySelector(`.popup__menu-link[href="#${currentModal}"]`);

            if (currentModalMenuItem) {

                currentModalMenuItem.click();
            }


        }

        if (target.matches('.popup__menu-link')) {
            e.preventDefault();

            let targetId = target.getAttribute('href').replace('#', "");

            document.querySelectorAll('.popup__menu-link').forEach(popupMenuItem => {
                popupMenuItem.classList.remove('active');
            });

            document.querySelectorAll('[data-form]').forEach(form => {
                form.classList.remove('active');
            });

            document.querySelector(`[data-form="${targetId}"]`)?.classList.add('active');
            target.classList.add('active');
        }

        if (target.tagName.toLowerCase() === 'a' && target.getAttribute('href') == '#') {
            e.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }

    });



    function getMenu() {
        document.body.classList.toggle('menu-lock');
        document.querySelector('.header').classList.toggle('open-menu');
    }

    //  sliders

    if (document.querySelectorAll('.slider')) {
        document.querySelectorAll('.slider').forEach(slider => {
            const swiper = new Swiper(slider, {
                slidesPerView: 1,
                loop: true,
                navigation: {
                    nextEl: slider.querySelector('.slider__next'),
                    prevEl: slider.querySelector('.slider__prev')
                },
                pagination: {
                    el: slider.querySelector('.slider__pagination'),
                    type: "fraction",
                    renderFraction: function (currentClass, totalClass) {


                        return '<span class="' + currentClass + '"></span>' +
                            '/' +
                            '<span class="' + totalClass + '"></span>';
                    },
                    formatFractionCurrent: function (number) {
                        return addLeadingZero(number);
                    },
                    formatFractionTotal: function (number) {
                        return addLeadingZero(number);
                    }
                },
            })
            function addLeadingZero(number) {
                return number < 10 ? '0' + number : number;
            }

            swiper.slides.forEach(slide => {

                slide.addEventListener('click', (e) => {
                    const rect = slide.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const slideWidth = rect.width;


                    if (x < slideWidth * 0.5) {
                        swiper.slidePrev();
                    } else if (x > slideWidth * 0.5) {

                        swiper.slideNext();
                    }
                });
            });


        })
    }

    if (document.querySelector('.header__logo')) {

        document.querySelector('.header__logo').addEventListener('mouseenter', (e) => {
            if (scrollY > document.querySelector('.header').offsetHeight) {
                getFixedMenu()
            }
        })

        document.querySelector('.header__top').addEventListener('mouseenter', (e) => {
            if (scrollY > document.querySelector('.header').offsetHeight) {
                getFixedMenu()
            }
        })
        document.querySelector('.header-fixed').addEventListener('mouseleave', (e) => {
            removeFixedMenu()
        });


    }

    function getFixedMenu() {
        let logo = document.querySelector('.header__logo');
        if (logo.classList.contains('clip-logo')) {
            document.querySelector('.header-fixed').classList.add('visible');
            document.querySelector('.header-static').classList.add('hide');
            logo.classList.add('visible');
        }
    }

    function removeFixedMenu() {
        document.querySelector('.header-fixed').classList.remove('visible');
        document.querySelector('.header-static').classList.remove('hide');
        document.querySelector('.header__logo').classList.remove('visible');
    }

    // disable form submit
    if (document.querySelectorAll('[name="nda"]').length > 0) {
        document.querySelectorAll('[name="nda"]').forEach(checkbox => {

            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    e.target?.closest('form')?.querySelector('button[type="submit"]').removeAttribute('disabled');
                } else {
                    e.target?.closest('form')?.querySelector('button[type="submit"]').setAttribute('disabled', 'disabled');
                }
            })
        })
    }


    const colorOptions = document.querySelectorAll('input[name="product-color"]');
    const seemsImages = Array.from(document.querySelectorAll('.product__options-seem'));

    if (colorOptions && seemsImages.length) {
        const selectedTitle = document.querySelector('.product__options-title');

        colorOptions.forEach(option => {

            option.addEventListener('change', function () {
                if (this.checked) {

                    window.requestAnimationFrame(() => {
                        const selectedValue = this.value;

                        seemsImages.forEach(image => {
                            image.classList.remove('active');
                        });
                        const activeImage = document.querySelector(`.product__options-seem[src*="${selectedValue}.png"]`);
                        if (activeImage) {
                            activeImage.classList.add('active');
                            selectedTitle.textContent = activeImage.getAttribute('title');
                        } else {
                            console.warn(`Image for value ${selectedValue} not found`);
                        }
                    })

                }
            });
        });

        function preloadImages() {
            const seemInputs = document.querySelectorAll('[name="product-color"]');
            const seemColors = Array.from(seemInputs).map(input => input.value);

            const hiddenContainer = document.createElement('div');
            hiddenContainer.style.display = 'none';
            document.body.appendChild(hiddenContainer);

            seemColors.forEach(seemColor => {
                const img = document.createElement('img');
                let imageSrc = `../img/colors/${seemColor}.png`;
                img.src = imageSrc;

                img.onerror = () => {
                    console.warn(`Image not found: ${imageSrc}`);
                };

                hiddenContainer.appendChild(img);
            });

            setTimeout(() => {
                document.body.removeChild(hiddenContainer);
            }, 3000);
        }

        preloadImages();
    }







})




