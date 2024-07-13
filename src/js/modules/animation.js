gsap.registerPlugin(ScrollTrigger);

export const animation = () => {


    function initAnimation() {
        const logo = document.querySelector('.header__logo');
        if (!logo) return;
        const logoCurrent = document.querySelector('.header__logo-current');
        const maxScroll = logo.classList.contains('header__logo_animate-sm') ? 150 : 600;
        const oneThirdScroll = maxScroll / 3;

        gsap.set(logo, { scale: 1 });
        gsap.set(logoCurrent, { autoAlpha: 1 });


        let scaleReductionFactor;
        if (window.innerWidth < 1600 && window.innerWidth > 1400) {
            scaleReductionFactor = 0.1;
        } else if (window.innerWidth < 1400 && window.innerWidth > 1200) {
            scaleReductionFactor = 0.3;
        } else if (window.innerWidth < 1200) {
            scaleReductionFactor = 0.45;
        } else {
            scaleReductionFactor = 0.5;
        }



        ScrollTrigger.create({
            trigger: logo,
            start: 0,
            end: oneThirdScroll,
            scrub: true,
            onUpdate: self => {
                const progress = self.progress;


                const scale = 1 - (scaleReductionFactor * progress);
                gsap.to(logo, {
                    scale: scale,
                    duration: 0
                });
            },
            onEnter: () => {
                logo.classList.add('init-animation')
            },
            onLeaveBack: () => {
                logo.classList.remove('init-animation')
            }
        });

        ScrollTrigger.create({
            trigger: logo,
            start: 2 * oneThirdScroll,
            end: maxScroll,
            scrub: true,
            onUpdate: self => {
                const progress = (self.scroll() - 2 * oneThirdScroll) / oneThirdScroll;

                gsap.to(logoCurrent, {
                    autoAlpha: 1 - progress,
                    duration: 0,
                });

                gsap.to(logo, {
                    scale: 1 - scaleReductionFactor,
                    duration: 0
                });
            },
            onLeave: () => {
                logo.classList.add('clip-logo');
            },
            onEnterBack: () => {
                logo.classList.remove('clip-logo');
            }
        });

        ScrollTrigger.create({
            trigger: logo,
            start: maxScroll,
            end: "+=300",
            scrub: true,
            onUpdate: self => {
                gsap.to(logoCurrent, {
                    autoAlpha: 0,
                    duration: 0,
                });

                gsap.to(logo, {
                    scale: 1 - scaleReductionFactor,
                    duration: 0
                });
            }
        });
    }

    initAnimation();

    // function checkWidthAndInitAnimation() {
    //     if (window.innerWidth > 1023.98) {
    //         initAnimation();
    //     }
    // }

    // checkWidthAndInitAnimation();
    window.addEventListener('resize', function () {

        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        initAnimation();
        // checkWidthAndInitAnimation();
    });





};
