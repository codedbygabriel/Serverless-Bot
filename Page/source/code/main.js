const scrollHelper = () => {
    const body = document.querySelector('body');
    const plausiblePages = {
        0: 'init',
        1: 'mid',
        2: 'end',
    };
    
    let currentIndex = 0; 

    body.addEventListener('wheel', scrolled => {
        const SCROLL_DOWN = scrolled.deltaY > 0;
        const SCROLL_UP = scrolled.deltaY < 0;

        const previousIndex = currentIndex;

        if (SCROLL_DOWN) {
            if (currentIndex < 2) currentIndex++;
        } else if (SCROLL_UP) {
            if (currentIndex > 0) currentIndex--;
        }

        if (currentIndex !== previousIndex) {
            const nextPageId = plausiblePages[currentIndex];
            const targetElement = document.querySelector(`#${nextPageId}`);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

(() => {
    scrollHelper();
})();
