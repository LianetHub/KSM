export const animation = () => {
    const logo = document.querySelector('.header__logo');
    const logoCurrent = document.querySelector('.header__logo-current');
    const maxScroll = 600; // Максимальная высота прокрутки для всей анимации
    const oneThirdScroll = maxScroll / 3;

    // Обработчик прокрутки
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY || window.pageYOffset;

        if (scrollY <= oneThirdScroll) {
            // Первая треть: изменение масштаба
            const scale = 1 - (0.5 * scrollY / oneThirdScroll);

            anime({
                targets: logo,
                scale: scale,
                duration: 0,
                easing: 'linear'
            });

            // Показать логотип и установить полную непрозрачность
            logo.style.visibility = 'visible';
            logo.style.opacity = '1';

            // Сброс clipPath
            logo.style.clipPath = 'none';
        } else if (scrollY > oneThirdScroll && scrollY <= 2 * oneThirdScroll) {
            // Вторая треть: ничего не происходит
            anime({
                targets: logo,
                scale: 0.5,
                opacity: 1,
                duration: 0,
                easing: 'linear'
            });

            // Показать логотип
            logo.style.visibility = 'visible';

            // Сброс clipPath
            logo.style.clipPath = 'none';
        } else if (scrollY > 2 * oneThirdScroll && scrollY <= maxScroll) {
            // Третья треть: скрытие видимости части логотипа
            const opacity = 1 - ((scrollY - 2 * oneThirdScroll) / oneThirdScroll);

            anime({
                targets: logoCurrent,
                opacity: opacity,
                duration: 0,
                easing: 'linear',
                complete: () => {
                    if (opacity === 0) {
                        logoCurrent.style.visibility = 'hidden';
                    } else {
                        logoCurrent.style.visibility = 'visible';
                    }
                }
            });

            // Применяем clipPath для обрезания логотипа в complete
            const clipWidth = (scrollY - 2 * oneThirdScroll) * (404 / oneThirdScroll); // Рассчитываем ширину обрезания
            const polygonPoints = `0 0, ${404 - clipWidth} 0, ${404 - clipWidth} 142, 0 142`; // Точки для polygon

            anime({
                targets: logo,
                clipPath: `polygon(${polygonPoints})`,
                duration: 0,
                easing: 'linear'
            });
        } else if (scrollY > maxScroll) {
            // Если скролл превышает maxScroll, принудительно скрываем часть логотипа
            logoCurrent.style.opacity = '0';
            logoCurrent.style.visibility = 'hidden';
            anime({
                targets: logo,
                scale: 0.5,
                duration: 0,
                easing: 'linear'
            });

            // Сброс clipPath

        }
    });
}
