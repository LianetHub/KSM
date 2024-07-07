gsap.registerPlugin(ScrollTrigger);

export const animation = () => {


    function initAnimation() {
        const logo = document.querySelector('.header__logo');
        if (!logo) return;
        const logoCurrent = document.querySelector('.header__logo-current');
        const maxScroll = 600;
        const oneThirdScroll = maxScroll / 3;

        gsap.set(logo, { scale: 1 });
        gsap.set(logoCurrent, { autoAlpha: 1 });

        ScrollTrigger.create({
            trigger: logo,
            start: 0,
            end: oneThirdScroll,
            scrub: true,
            onUpdate: self => {
                const progress = self.progress;
                const scale = 1 - (0.5 * progress);
                gsap.to(logo, {
                    scale: scale,
                    duration: 0
                });
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
                    scale: 0.5,
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
                    scale: 0.5,
                    duration: 0
                });
            }
        });
    }

    function checkWidthAndInitAnimation() {
        if (window.innerWidth > 1023.98) {
            initAnimation();
        }
    }

    checkWidthAndInitAnimation();
    window.addEventListener('resize', function () {

        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        checkWidthAndInitAnimation();
    });





};
