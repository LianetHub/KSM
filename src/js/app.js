"use strict";


import * as devFunctions from './modules/functions.js';

//  init Fancybox
if (typeof Fancybox !== "undefined" && Fancybox !== null) {
    Fancybox.bind("[data-fancybox]", {
        dragToClose: false,
        closeButton: false
    });
}

document.addEventListener('DOMContentLoaded', () => {

    devFunctions.OS();
    devFunctions.isWebp();
    devFunctions.intInputMask();
    devFunctions.beforeSlider();
    devFunctions.formSubmit();
    devFunctions.animation()




    // event handlers

    document.addEventListener('click', (e) => {

        const target = e.target;


        if (target.closest('.icon-menu') || (target.classList.contains('menu') && document.querySelector('.header').classList.contains('open-menu'))) {
            getMenu()
        }

        if (target.classList.contains('banner__close')) {
            target.closest('.banner').classList.add('banner-hidden');
        }

        if (target.classList.contains('promo__btn')) {

            const contactsBlock = document.getElementById('feedback');
            const form = contactsBlock.querySelector('form');
            const firstInput = form.querySelector('input');

            if (firstInput) {

                setTimeout(() => {
                    firstInput.focus();
                }, 1000)
            }
        }

        if (target.classList.contains('product-info__nav-link')) {
            document.querySelectorAll('.product-info__nav-link').forEach(link => link.classList.remove('active'));
            document.querySelectorAll('.product-info__block').forEach(content => content.classList.remove('active'));

            let currentIndex = getIndexInParent(target.parentNode);
            document.querySelectorAll('.product-info__nav-link')[currentIndex].classList.add('active')
            document.querySelectorAll('.product-info__block')[currentIndex].classList.add('active')


        }


    });

    function getMenu() {
        document.body.classList.toggle('lock');
        document.querySelector('.header').classList.toggle('open-menu');
    }


    function getIndexInParent(node) {
        var children = node.parentNode.childNodes;
        var num = 0;
        for (var i = 0; i < children.length; i++) {
            if (children[i] == node) return num;
            if (children[i].nodeType == 1) num++;
        }
        return -1;
    }




    //  sliders

    if (document.querySelector('.products__slider')) {
        new Swiper('.products__slider', {
            slidesPerView: "auto",
            spaceBetween: 30,
            grabCursor: true,
            navigation: {
                nextEl: '.products__next',
                prevEl: '.products__prev'
            },
            breakpoints: {
                1199.98: {
                    spaceBetween: 48,
                }
            }
        })
    }
    if (document.querySelector('.reviews__slider')) {
        new Swiper('.reviews__slider', {
            slidesPerView: 1,
            navigation: {
                nextEl: '.reviews__next',
                prevEl: '.reviews__prev'
            },
        })
    }
    if (document.querySelector('.blog__slider')) {
        new Swiper('.blog__slider', {
            slidesPerView: "auto",
            spaceBetween: 16,
            grabCursor: true,
            navigation: {
                nextEl: '.blog__next',
                prevEl: '.blog__prev'
            },
            breakpoints: {
                1199.98: {
                    spaceBetween: 24,
                }
            }
        })
    }
    if (document.querySelector('.project__slider')) {
        new Swiper('.project__slider', {
            slidesPerView: 1,
            effect: "fade",
            fadeEffect: {
                crossFade: true,
            },
            navigation: {
                nextEl: '.project__next',
                prevEl: '.project__prev'
            },
            pagination: {
                el: '.project__pagination',
                clickable: true
            },
        })
    }
    if (document.querySelector('.projects__slider')) {
        new Swiper('.projects__slider', {
            slidesPerView: "auto",
            navigation: {
                nextEl: '.projects__next',
                prevEl: '.projects__prev'
            },
            spaceBetween: 12,
            grabCursor: true,
            breakpoints: {
                767.98: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                },
                1199.98: {
                    slidesPerView: 2,
                    spaceBetween: 100,
                }
            }
        })
    }
    if (document.querySelectorAll('.product-info__slider').length > 0) {

        document.querySelectorAll('.product-info__slider').forEach(slider => {
            let wrapper = slider.closest('.product-info__block');
            let prev = wrapper.querySelector('.product-info__block-prev');
            let next = wrapper.querySelector('.product-info__block-next');

            new Swiper(slider, {
                slidesPerView: "auto",
                navigation: {
                    nextEl: next,
                    prevEl: prev
                },
                spaceBetween: 12,
                grabCursor: true,
                breakpoints: {
                    767.98: {
                        slidesPerView: "auto",
                        spaceBetween: 20,
                    },
                    1199.98: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    }
                }
            })
        })
    }

    if (document.querySelector('.product-info__navbar')) {

        new Swiper('.product-info__navbar', {
            slidesPerView: "auto",
            grabCursor: true,
            slideToClickedSlide: true
        });
    }

    // animation header
    window.addEventListener('scroll', function (e) {

        document.body.style.setProperty("--header-height", Math.ceil(document.querySelector('.header__wrapper').offsetHeight) + "px")
    })


    const headerElement = document.querySelector('.header');

    const callback = function (entries, observer) {
        if (entries[0].isIntersecting) {
            headerElement.classList.remove('scroll');
        } else {
            headerElement.classList.add('scroll');
        }
    };

    const headerObserver = new IntersectionObserver(callback);
    headerObserver.observe(headerElement);




    // configurator

    if (document.querySelectorAll('.configurator__block-input').length > 0) {
        document.querySelectorAll('.configurator__block-input').forEach(input => {
            input.checked = false;
        })

        let updateSidePanel = () => {
            let configuratorProps = document.getElementById('configurator-props');
            let anyChecked = document.querySelectorAll('.configurator__block-input:checked').length > 0;
            if (anyChecked) {
                configuratorProps.classList.add('active');
            } else {
                configuratorProps.classList.remove('active');
            }
        };

        let updateProductNumber = () => {
            let optics = document.querySelector('input[name="optics"]:checked')?.value || '';
            let led = document.querySelector('input[name="led"]:checked')?.value || '';
            let color = document.querySelector('input[name="color"]:checked')?.value || '';
            let extras = document.querySelector('input[name="extras"]:checked')?.value || '';

            let productNumber = [optics, led, color, extras].filter(Boolean).join('-');
            document.querySelector('.configurator__number').textContent = productNumber;
        };

        let updateRowActiveState = (name) => {
            let row = document.querySelector(`.configurator__side-item[data-row="${name}"]`);
            let anyChecked = document.querySelectorAll(`input[name="${name}"]:checked`).length > 0;
            if (anyChecked) {
                row.classList.add('active');
            } else {
                row.classList.remove('active');
                row.querySelector('.configurator__side-value').textContent = '';


                let followingRow = row.nextElementSibling;
                while (followingRow) {
                    followingRow.classList.remove('active');
                    followingRow.querySelector('.configurator__side-value').textContent = '';
                    followingRow = followingRow.nextElementSibling;
                }
            }
        };

        document.querySelectorAll('.configurator__block-input').forEach(configuratorInput => {
            configuratorInput.addEventListener('change', (e) => {
                let checkbox = e.target;
                let options = checkbox.closest('.configurator__block-options');
                let stepCheckboxes = options.querySelectorAll('.configurator__block-input');
                let parentBlock = checkbox.closest('.configurator__block');
                let nextBlock = parentBlock.nextElementSibling;

                if (checkbox.checked) {
                    stepCheckboxes.forEach(stepCheckbox => {
                        if (stepCheckbox !== checkbox) {
                            stepCheckbox.disabled = true;
                        }
                    });
                    if (nextBlock) {
                        nextBlock.classList.add('active');
                    }
                } else {
                    stepCheckboxes.forEach(stepCheckbox => {
                        stepCheckbox.disabled = false;
                    });

                    let followingBlock = parentBlock.nextElementSibling;
                    while (followingBlock) {
                        let followingCheckboxes = followingBlock.querySelectorAll('.configurator__block-input');
                        followingCheckboxes.forEach(followingCheckbox => {
                            followingCheckbox.checked = false;
                            followingCheckbox.disabled = false;
                        });
                        followingBlock.classList.remove('active');
                        followingBlock = followingBlock.nextElementSibling;
                    }
                }

                let name = checkbox.getAttribute('name');
                let value = (name === "code") ? checkbox.value : checkbox.nextElementSibling.textContent;
                let row = document.querySelector(`.configurator__side-item[data-row="${name}"]`);
                if (name === 'code') {
                    if (checkbox.checked) {
                        document.getElementById('product-name').textContent = value;
                        row.classList.add('active');
                        row.querySelector('.configurator__side-value').textContent = value;
                    }
                } else if (name === 'optics') {
                    if (checkbox.checked) {
                        row.classList.add('active');
                        row.querySelector('.configurator__side-value').textContent = checkbox.nextElementSibling.textContent;
                    }
                    updateProductNumber();
                } else {
                    if (checkbox.checked) {
                        row.classList.add('active');
                        row.querySelector('.configurator__side-value').textContent = value;
                    }
                    updateProductNumber();
                }

                updateRowActiveState(name);
                updateSidePanel();
            });
        });
    }

    if (document.querySelector('[data-product-name]')) {

        const caseColorInputs = document.querySelectorAll('input[name="case-color"]');
        const ledColorInputs = document.querySelectorAll('input[name="led-color"]');
        const productImage = document.querySelector('.product-card__image img');
        const productSource = document.querySelector('.product-card__image source');
        const productName = productImage.getAttribute('data-product-name');

        function updateProductImage() {
            const caseColor = document.querySelector('input[name="case-color"]:checked').value;
            const ledColor = document.querySelector('input[name="led-color"]:checked').value;
            const newSrc = `img/products/spotlights/${productName}-${caseColor}-${ledColor}.png`;
            const newWebpSrc = `img/products/spotlights/${productName}-${caseColor}-${ledColor}.png`;

            productImage.src = newSrc;
            if (productSource) productSource.srcset = newWebpSrc;

        }

        function preloadImages() {
            const caseColors = Array.from(caseColorInputs).map(input => input.value);
            const ledColors = Array.from(ledColorInputs).map(input => input.value);
            const hiddenContainer = document.createElement('div');
            hiddenContainer.style.display = 'none';
            document.body.appendChild(hiddenContainer);

            caseColors.forEach(caseColor => {
                ledColors.forEach(ledColor => {
                    const img = document.createElement('img');
                    img.src = `img/products/spotlights/${productName}-${caseColor}-${ledColor}.png`;
                    hiddenContainer.appendChild(img);
                });
            });

            setTimeout(() => {
                document.body.removeChild(hiddenContainer);
            }, 3000);
        }

        caseColorInputs.forEach(input => {
            input.addEventListener('change', updateProductImage);
        });

        ledColorInputs.forEach(input => {
            input.addEventListener('change', updateProductImage);
        });


        updateProductImage();
        preloadImages();
    }


    const colorBlocks = document.querySelectorAll('.product-card__colors');
    if (colorBlocks.length > 0) {

        colorBlocks.forEach(block => {
            const currentColorDisplay = block.querySelector('.product-card__colors-current');
            const colorItems = block.querySelectorAll('.product-card__colors-item');

            colorItems.forEach(item => {
                const btn = item.querySelector('.product-card__colors-btn');
                const input = item.querySelector('input');

                btn.addEventListener('mouseenter', function () {
                    currentColorDisplay.textContent = btn.getAttribute('title');
                });

                btn.addEventListener('mouseleave', function () {
                    const checkedInput = block.querySelector('.product-card__colors-input:checked');
                    const checkedImg = checkedInput.nextElementSibling;
                    currentColorDisplay.textContent = checkedImg.getAttribute('title');
                });

                input.addEventListener('change', function () {
                    const checkedImg = input.nextElementSibling;
                    currentColorDisplay.textContent = checkedImg.getAttribute('title');
                });
            });
        });
    }



    if (document.getElementById('map')) {
        ymaps.ready(init);
        let map = document.getElementById('map');
        let centerCoods = map.getAttribute('data-center').split(',').map(Number);
        let placemarkCoods = map.getAttribute('data-placemark').split(',').map(Number);;

        function init() {
            var myMap = new ymaps.Map("map", {
                center: centerCoods,
                zoom: 17,
                controls: ['zoomControl']
            }, {
                suppressMapOpenBlock: true
            });

            var myPlacemark = new ymaps.Placemark(placemarkCoods, {}, {
                iconLayout: 'default#image',
                iconImageHref: 'img/icons/placemark.svg',
                iconImageSize: [70, 80],
                iconImageOffset: [-15, -42]
            });

            myMap.geoObjects.add(myPlacemark);
            myMap.controls.remove('routeEditor');
        }
    }




})




