"use strict";



import * as devFunctions from './modules/functions.js';

//  init Fancybox
// if (typeof Fancybox !== "undefined" && Fancybox !== null) {
//     Fancybox.bind("[data-fancybox]", {
//         dragToClose: false,
//         closeButton: false
//     });
// }

document.addEventListener('DOMContentLoaded', () => {

    devFunctions.OS();
    devFunctions.isWebp();
    devFunctions.checkEmptyInputs();
    devFunctions.animation();
    devFunctions.mask();
    devFunctions.filter();
    devFunctions.cookies();




    // event handlers

    document.addEventListener('click', (e) => {

        const target = e.target;




        if (target.matches('.form__field-clear')) {
            target.previousElementSibling.value = "";
            target.previousElementSibling.classList.remove('_input');
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
            document.querySelector('.header').style = "";
            document.querySelector('.header').classList.remove('fixed');
            document.querySelector('.header__logo').classList.remove('visible');
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


                    if (x < slideWidth * 0.1) {
                        swiper.slidePrev();
                    } else if (x > slideWidth * 0.9) {

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
            document.body.style.setProperty('margin-top', `${document.querySelector('.header__wrapper').offsetHeight}px`)
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
    if (document.querySelector('[name="nda"]')) {
        document.querySelector('[name="nda"]').addEventListener('change', (e) => {
            if (e.target.checked) {
                e.target?.closest('form')?.querySelector('button[type="submit"]').removeAttribute('disabled');
            } else {
                e.target?.closest('form')?.querySelector('button[type="submit"]').setAttribute('disabled', 'disabled');
            }
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
    }





})




