"use strict";

import * as devFunctions from './modules/functions.js';
import { Timepicker } from './modules/timepicker.js';
import { Datepicker } from './modules/datepicker.js';
import initMap from './modules/map.js';
import { Cart } from './modules/cart.js';

document.addEventListener('DOMContentLoaded', () => {

    devFunctions.animation();
    devFunctions.OS();
    devFunctions.isWebp();
    devFunctions.checkEmptyInputs();
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
        const dateInput = daypicker.querySelector('input.date');
        const timeInput = daypicker.querySelector('input.time');

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

            dateInput.addEventListener('click', () => {
                if (dateInput.classList.contains('focus-datepicker')) {
                    closeBothPickers();
                    return
                } else {
                    openBothPickers()
                }
            });
            timeInput.addEventListener('click', () => {
                if (timeInput.classList.contains('focus-timepicker')) {
                    closeBothPickers()
                } else {
                    openBothPickers()
                }
            });


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

        // if (target.tagName.toLowerCase() === 'a' && target.getAttribute('href') == '#') {
        //     e.preventDefault();

        //     window.scrollTo({
        //         top: 0,
        //         behavior: "smooth"
        //     })
        // }



    });






    function getMenu() {
        document.body.classList.toggle('menu-lock');
        document.querySelector('.header').classList.toggle('open-menu');
    }

    //  sliders

    if (document.querySelectorAll('.slider')) {
        document.querySelectorAll('.slider').forEach(slider => {
            const nextBtn = slider.querySelector('.slider__next');
            const prevBtn = slider.querySelector('.slider__prev');

            const swiper = new Swiper(slider, {
                slidesPerView: 1,
                // loop: true,
                watchOverflow: true,
                // navigation: {
                //     nextEl: nextBtn,
                //     prevEl: prevBtn
                // },
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
                on: {
                    init: (swiper) => {
                        if (swiper.slides.length === 1) {
                            swiper.el.classList.add('swiper-single-slide')
                        }
                    }
                }

            })
            function addLeadingZero(number) {
                return number < 10 ? '0' + number : number;
            }

            nextBtn.addEventListener('click', () => {
                if (swiper.isEnd) {
                    swiper.slideTo(0);
                } else {
                    swiper.slideNext();
                }
            });

            prevBtn.addEventListener('click', () => {
                if (swiper.isBeginning) {
                    swiper.slideTo(swiper.slides.length - 1);
                } else {
                    swiper.slidePrev();
                }
            });

            swiper.slides.forEach(slide => {
                slide.addEventListener('click', (e) => {
                    const rect = slide.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const slideWidth = rect.width;

                    if (x < slideWidth * 0.5) {
                        if (swiper.isBeginning) {
                            swiper.slideTo(swiper.slides.length - 1);
                        } else {
                            swiper.slidePrev();
                        }
                    } else {
                        if (swiper.isEnd) {
                            swiper.slideTo(0);
                        } else {
                            swiper.slideNext();
                        }
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

        // function preloadImages() {
        //     const seemInputs = document.querySelectorAll('[name="product-color"]');
        //     const seemColors = Array.from(seemInputs).map(input => input.value);

        //     const hiddenContainer = document.createElement('div');
        //     hiddenContainer.style.display = 'none';
        //     document.body.appendChild(hiddenContainer);

        //     seemColors.forEach(seemColor => {
        //         const img = document.createElement('img');
        //         let imageSrc = `../img/colors/${seemColor}.png`;
        //         img.src = imageSrc;

        //         img.onerror = () => {
        //             console.warn(`Image not found: ${imageSrc}`);
        //         };

        //         hiddenContainer.appendChild(img);
        //     });

        //     setTimeout(() => {
        //         document.body.removeChild(hiddenContainer);
        //     }, 3000);
        // }

        // preloadImages();
    }



    function handleFadeImages(images) {
        images?.forEach(fadeImage => {
            if (fadeImage.complete) {
                fadeImage.classList.add('loaded');
            } else {
                fadeImage.addEventListener('load', () => {
                    fadeImage.classList.add('loaded');
                });
            }
        });
    }

    const fadeImages = document.querySelectorAll('.fade-load-image');
    handleFadeImages(fadeImages);

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && node.classList.contains('fade-load-image')) {
                        handleFadeImages([node]);
                    }

                    const newImages = node.querySelectorAll?.('.fade-load-image');
                    if (newImages && newImages.length) {
                        handleFadeImages(newImages);
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });


    // function updateColumns() {

    //     const mediaQuery = window.matchMedia('(min-width: 1440px)');
    //     if (!mediaQuery.matches) return;


    //     const propsValues = document.querySelectorAll('.product__props-value');


    //     if (!propsValues?.length) return;


    //     propsValues.forEach(value => {
    //         const parentCol = value.closest('.col-8');
    //         if (parentCol) {

    //             const lineHeight = Math.ceil(parseFloat(getComputedStyle(value).lineHeight));
    //             const elementHeight = value.offsetHeight;

    //             parentCol.classList.add('col-xl-4', 'col-md-8', 'col-sm-4');
    //             if (elementHeight > lineHeight) {
    //                 parentCol.classList.remove('col-xl-4', 'col-md-8', 'col-sm-4');
    //             }
    //         }
    //     });
    // }


    // const hasPropsValues = document.querySelector('.product__props-value') !== null;


    // if (hasPropsValues) {

    //     updateColumns();

    //     // window.addEventListener('resize', updateColumns);
    // }



    const shareButton = document.querySelector('.products__share');

    if (shareButton) {
        let resetTimeout;

        shareButton.addEventListener('click', async function (e) {
            e.preventDefault();

            clearTimeout(resetTimeout);


            shareButton.classList.add('submit');
            shareButton.classList.remove('success');
            shareButton.textContent = 'Получение ссылки';

            try {
                const response = await fetch(`${CART_SHARE_URL}`, { method: 'GET' });

                if (!response.ok) {
                    throw new Error('Ошибка получения ссылки');
                }

                const shareUrl = await response.text();


                if (window.innerWidth <= 768 && navigator.share) {
                    await navigator.share({
                        title: document.title,
                        url: shareUrl,
                    });
                } else if (navigator.clipboard) {
                    await navigator.clipboard.writeText(shareUrl);
                } else {
                    const textArea = document.createElement("textarea");
                    textArea.value = shareUrl;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                }

                // Успех
                shareButton.classList.remove('submit');
                shareButton.classList.add('success');
                shareButton.textContent = 'Ссылка скопирована';

                resetTimeout = setTimeout(() => {
                    shareButton.classList.remove('success');
                    shareButton.textContent = 'Поделиться корзиной ↽';
                }, 5000);
            } catch (error) {
                console.error('Ошибка:', error);
                shareButton.classList.remove('submit');

                shareButton.textContent = 'Поделиться корзиной ↽';
            }
        });
    }






    document.querySelectorAll('[data-vk-video]')?.forEach(slide => {
        const videoCode = slide.dataset.videoCode;
        const videoOwner = slide.dataset.videoOwner;

        if (!videoCode || !videoOwner) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'vk-video-wrapper';


        const iframe = document.createElement('iframe');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '100%');
        iframe.src = `https://vk.com/video_ext.php?oid=${videoOwner}&id=${videoCode}&hd=2&autoplay=0`;

        wrapper.appendChild(iframe);
        slide.appendChild(wrapper);
        slide.appendChild(playBtn);


    });



    // more load content
    let currentPage = parseInt(new URLSearchParams(window.location.search).get('pages')) || 1;
    let observerLoadMore = null;

    function observeMoreButton() {
        if (observerLoadMore) {
            observerLoadMore.disconnect();
        }

        const moreButton = document.querySelector('#more__button > a');
        if (!moreButton) return;

        observerLoadMore = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    obs.unobserve(entry.target);
                    loadMoreContent(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px 200px 0px'
        });

        observerLoadMore.observe(moreButton);
    }

    function loadMoreContent(button) {
        const typePage = button.dataset.type;
        const href = button.getAttribute('href');
        const wrapper = document.querySelector(`#js-${typePage}-loader`);
        const parentDiv = button.closest('#more__button');

        if (parentDiv) parentDiv.remove();
        // document.querySelector('.products__body')?.classList.add('_loading');

        currentPage++;

        const currentUrl = new URL(window.location.href);
        const currentPageInUrl = parseInt(currentUrl.searchParams.get('pages')) || 1;

        if (currentPage !== currentPageInUrl) {
            currentUrl.searchParams.set('pages', currentPage);
            history.pushState({ page: currentPage }, '', currentUrl);
        }

        fetch(href + (href.includes('?') ? '&' : '?') + 'ajax=Y')
            .then(response => response.text())
            .then(data => {
                if (wrapper) wrapper.insertAdjacentHTML('beforeend', data);
                // document.querySelector('.products__body')?.classList.remove('_loading');
                observeMoreButton();
            })
            .catch(error => {
                console.error('Ошибка при загрузке:', error);
                // document.querySelector('.products__body')?.classList.remove('_loading');
            });
    }

    document.addEventListener('click', function (e) {
        const target = e.target.closest('#more__button > a');
        if (!target) return;

        e.preventDefault();
        loadMoreContent(target);
    });

    window.addEventListener('popstate', function (event) {

        if (location.hash) return;

        const pageFromHistory = event.state?.page;
        if (pageFromHistory) {
            location.href = location.pathname + '?pages=' + pageFromHistory;
        } else {
            location.href = location.pathname;
        }
    });


    observeMoreButton();

    document.addEventListener('filter:updated', () => {
        observeMoreButton();
    });













})


