gsap.registerPlugin(ScrollTrigger);

export const animation = () => {
    function initAnimation(logo) {
        if (!logo) return;

        const isSmallScreen = window.innerWidth < 1600;
        const maxScroll = isSmallScreen ? 50 : 100;
        const popup = logo.closest('.popup');
        const scroller = popup ? popup : window;

        const logoCurrent = logo.querySelector('.header__logo-current');
        const oneThirdScroll = maxScroll / 3;

        gsap.set(logo, { scale: 1 });
        gsap.set(logoCurrent, { autoAlpha: 1 });

        const scaleReductionFactor = isSmallScreen ? 0 : 0.465;

        ScrollTrigger.create({
            trigger: logo,
            scroller: scroller,
            start: 0,
            end: 3 * oneThirdScroll,
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
            scroller: scroller,
            start: 3 * oneThirdScroll,
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

                setTimeout(() => {
                    logoCurrent.style = ""
                }, 0)

            }
        });

        ScrollTrigger.create({
            trigger: logo,
            scroller: scroller,
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


    document.querySelectorAll('.header__logo').forEach(logo => {
        initAnimation(logo);
    });

    window.addEventListener('resize', function () {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        document.querySelectorAll('.header__logo').forEach(logo => {
            logo.classList.remove('clip-logo');
            initAnimation(logo);
        });
    });
};
