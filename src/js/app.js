"use strict";



// import { Datepicker } from 'vanillajs-datepicker';
import * as devFunctions from './modules/functions.js';
import { Timepicker } from './modules/timepicker.js';


(function () {
    Datepicker.locales.ru = {
        days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        daysShort: ["Вск", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб"],
        daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        today: "Сегодня",
        clear: "Очистить",
        format: "dd.mm.yyyy",
        weekStart: 1,
        monthsTitle: 'Месяцы'
    };
}());



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


    document.querySelectorAll('input[name="date"]')?.forEach(datepicker => {
        let datepickerInstance = new Datepicker(datepicker, {
            language: "ru",
            todayBtn: false,
            weekNumbers: 0,
            clearBtn: false,
            autohide: true,
            prevArrow: '←',
            nextArrow: '→',
            showOnFocus: true,
        });
    });

    document.querySelectorAll('input[name="time"]')?.forEach(timepicker => {
        let timepickerInstance = new Timepicker(timepicker, {
            startTime: "10:00",
            endTime: "19:30"
        });
    })


    // event handlers

    document.addEventListener('click', (e) => {

        const target = e.target;


        if (target.matches('.form__field-clear')) {
            const parentNode = target.closest('.form__field');
            const input = parentNode?.querySelector('.form__input');
            input.value = "";
            input.classList.remove('_input');
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

        if (target.matches('.products__card-btn')) {
            target.classList.toggle('active');
            getQuantityCart(target);
        }

        if (target.matches('.product__delete-btn')) {

            target.classList.toggle('active');

            if (target.matches('.active')) {
                target.textContent = "УДАЛИТЬ";
            } else {
                target.textContent = "Выбрать";
            }
            getQuantityCart(target);
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


    function getQuantityCart(target) {
        if (target.classList.contains('active')) {
            document.querySelector('.header__menu-cart').innerHTML++;
        } else {
            document.querySelector('.header__menu-cart').innerHTML--;
        }
        getFixedMenu();
        setTimeout(() => {
            removeFixedMenu()
        }, 2000)
        if (document.querySelector('.header__menu-cart').innerHTML > 0) {
            document.querySelector('.header__menu-cart').classList.add('active')
        } else {
            document.querySelector('.header__menu-cart').classList.remove('active')
        }
    }

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
        document.querySelector('.header').addEventListener('mouseleave', (e) => {

            removeFixedMenu()

        });


    }

    function getFixedMenu() {
        let logo = document.querySelector('.header__logo');
        if (logo.classList.contains('clip-logo')) {
            document.body.style.setProperty('margin-top', `${document.querySelector('.header__wrapper').offsetHeight}px`);
            document.querySelector('.header').classList.add('fixed');
            logo.classList.add('visible');
        }
    }

    function removeFixedMenu() {
        document.body.style = "";
        document.querySelector('.header').classList.remove('fixed');
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
    const visualElement = document.querySelector('.product__options-visual');

    if (colorOptions && visualElement) {

        colorOptions.forEach(option => {

            option.addEventListener('change', function () {
                if (this.checked) {
                    visualElement.style.setProperty('--seam-color', `url('../img/colors/${this.value}.png')`);

                }
            });
        });


        function preloadImages() {

            const visualBlock = document.querySelector('.product__options-visual');

            if (!visualBlock) {
                console.warn('Block with class .product__options-visual not found');
                return;
            }


            const computedStyle = getComputedStyle(visualBlock);
            let seamColorUrl = computedStyle.getPropertyValue('--seam-color').trim();
            seamColorUrl = seamColorUrl.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');


            const basePath = seamColorUrl.substring(0, seamColorUrl.lastIndexOf('/') + 1);

            const seemInputs = document.querySelectorAll('[name="product-color"]');
            const seemColors = Array.from(seemInputs).map(input => input.value);

            const hiddenContainer = document.createElement('div');
            hiddenContainer.style.display = 'none';
            document.body.appendChild(hiddenContainer);

            seemColors.forEach(seemColor => {
                const img = document.createElement('img');
                let imageSrc = `${basePath}${seemColor}.png`;
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




