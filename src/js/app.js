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

        // if (target.closest('.icon-menu')) {
        //     getMenu()
        // }


    });

    // function getMenu() {
    //     document.body.classList.toggle('lock');
    //     document.querySelector('.header').classList.toggle('open-menu');
    // }


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




