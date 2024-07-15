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
    devFunctions.checkEmptyInputs()
    devFunctions.animation()




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
            target.nextElementSibling.classList.toggle('active');
        }

        if (target.matches('.swiper-pagination-current')) {
            let sliderBlock = target.closest('.slider');
            sliderBlock && sliderBlock.swiper.slidePrev()
        }

        if (target.matches('.swiper-pagination-total')) {
            let sliderBlock = target.closest('.slider');
            sliderBlock && sliderBlock.swiper.slideNext();
        }

        if (target.matches('.header__menu-link')) {
            document.querySelector('.page').style = "";
            document.querySelector('.header').classList.remove('fixed');
            document.querySelector('.logo').classList.remove('visible');
        }


    });

    function getMenu() {
        document.body.classList.toggle('menu-lock');
        document.querySelector('.header').classList.toggle('open-menu');
    }


    // function getIndexInParent(node) {
    //     var children = node.parentNode.childNodes;
    //     var num = 0;
    //     for (var i = 0; i < children.length; i++) {
    //         if (children[i] == node) return num;
    //         if (children[i].nodeType == 1) num++;
    //     }
    //     return -1;
    // }




    //  sliders

    if (document.querySelectorAll('.slider')) {
        document.querySelectorAll('.slider').forEach(slider => {
            new Swiper(slider, {
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

        })
    }

    if (document.querySelector('.header__logo')) {

        document.querySelector('.header__logo').addEventListener('mouseenter', (e) => {
            let logo = e.target;
            if (logo.classList.contains('clip-logo')) {
                document.querySelector('.header').classList.add('fixed');
                logo.classList.add('visible');
                document.querySelector('.page').style.setProperty('padding-top', `${document.querySelector('.header').offsetHeight}px`);
            }
        })
        document.querySelector('.header').addEventListener('mouseleave', (e) => {

            document.querySelector('.header').classList.remove('fixed');
            document.querySelector('.header__logo').classList.remove('visible');
            document.querySelector('.page').style = "";

        })
    }


    // animation header

    // window.addEventListener('scroll', function (e) {

    //     document.body.style.setProperty("--header-height", Math.ceil(document.querySelector('.header__wrapper').offsetHeight) + "px")
    // })


    // const headerElement = document.querySelector('.header');

    // const callback = function (entries, observer) {
    //     if (entries[0].isIntersecting) {
    //         headerElement.classList.remove('scroll');
    //     } else {
    //         headerElement.classList.add('scroll');
    //     }
    // };

    // const headerObserver = new IntersectionObserver(callback);
    // headerObserver.observe(headerElement);




    // configurator





})




