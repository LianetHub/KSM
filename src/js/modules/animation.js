gsap.registerPlugin(ScrollTrigger);

export const animation = () => {


    function initAnimation() {
        const logo = document.querySelector('.header__logo');
        if (!logo) return;

        const isSmallScreen = window.innerWidth < 1600;
        const maxScroll = isSmallScreen ? 50 : (logo.classList.contains('header__logo_animate-sm') ? 100 : 600);

        const logoCurrent = document.querySelector('.header__logo-current');
        const oneThirdScroll = maxScroll / 3;

        gsap.set(logo, { scale: 1 });
        gsap.set(logoCurrent, { autoAlpha: 1 });

        const scaleReductionFactor = isSmallScreen ? 0 : 0.475;


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
                logo.classList.add('init-animation');
            },
            onLeaveBack: () => {
                logo.classList.remove('init-animation');
            }
        });

        ScrollTrigger.create({
            trigger: logo,
            start: 2 * oneThirdScroll,
            end: maxScroll,
            scrub: true,
            onUpdate: self => {

                gsap.to(logoCurrent, {
                    autoAlpha: 1,
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
        document.querySelector('.header__logo').classList.remove('clip-logo')
        initAnimation();
        // checkWidthAndInitAnimation();
    });





};
