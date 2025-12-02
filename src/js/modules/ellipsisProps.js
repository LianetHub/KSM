export const initPropEllipsis = () => {
    const PROP_NAME_SELECTOR = '.product__props-name';
    const FORCE_ELLIPSIS_CLASS = 'text-ellipsis';
    const FULL_TEXT_ATTRIBUTE = 'data-full-text';
    const FORCED_ATTRIBUTE = 'data-force-ellipsis';
    const BREAKPOINT = 575.98;

    const allInitializedElements = new Set();

    function initEllipsis(element) {
        if (element.classList.contains(FORCE_ELLIPSIS_CLASS)) {
            element.setAttribute(FORCED_ATTRIBUTE, 'true');
            element.classList.remove(FORCE_ELLIPSIS_CLASS);
        }

        let originalText = element.textContent.trim();
        if (originalText.endsWith(':')) {
            originalText = originalText.slice(0, -1);
        }

        element.setAttribute(FULL_TEXT_ATTRIBUTE, originalText);

        const applyEllipsis = () => {
            const fullText = element.getAttribute(FULL_TEXT_ATTRIBUTE);
            if (!fullText) return;

            const isWideScreen = window.innerWidth >= BREAKPOINT;
            const isForced = element.hasAttribute(FORCED_ATTRIBUTE);

            if (!isWideScreen && !isForced) {
                element.textContent = fullText + ':';
                return;
            }

            element.textContent = fullText + ':';

            if (element.scrollWidth <= element.clientWidth) {
                return;
            }

            let low = 0;
            let high = fullText.length;
            let bestLength = 0;

            while (low <= high) {
                const mid = Math.floor((low + high) / 2);
                const truncatedText = fullText.substring(0, mid);
                element.textContent = truncatedText + '...:';

                if (element.scrollWidth <= element.clientWidth) {
                    bestLength = mid;
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }

            const finalContent = (bestLength === fullText.length)
                ? fullText + ':'
                : fullText.substring(0, bestLength) + '...:';

            element.textContent = finalContent;
        };

        element._applyEllipsis = applyEllipsis;
        allInitializedElements.add(element);

        const resizeObserver = new ResizeObserver(() => {
            applyEllipsis();
        });

        resizeObserver.observe(element);
        if (element.parentElement) {
            resizeObserver.observe(element.parentElement);
        }

        applyEllipsis();
    }

    function setupEllipsis() {
        const elementsToProcess = document.querySelectorAll(PROP_NAME_SELECTOR);

        elementsToProcess.forEach(element => {
            if (!element.hasAttribute(FULL_TEXT_ATTRIBUTE)) {
                initEllipsis(element);
            }
        });
    }

    window.addEventListener('resize', () => {
        allInitializedElements.forEach(el => {
            if (el._applyEllipsis) {
                el._applyEllipsis();
            }
        });
    });

    const targetNode = document.querySelector('.product__props');
    if (targetNode) {
        const observerConfig = { childList: true, subtree: true };

        const mutationCallback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) {
                            if (node.matches(PROP_NAME_SELECTOR)) {
                                initEllipsis(node);
                            }
                            node.querySelectorAll(PROP_NAME_SELECTOR).forEach(initEllipsis);
                        }
                    });
                }
            }
        };

        const observer = new MutationObserver(mutationCallback);
        observer.observe(targetNode, observerConfig);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupEllipsis);
    } else {
        setupEllipsis();
    }
};