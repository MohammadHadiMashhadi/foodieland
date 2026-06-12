(function () {
    function initSlider() {
        const track = document.getElementById('likeSliderTrack');
        const prevBtn = document.getElementById('likePrev');
        const nextBtn = document.getElementById('likeNext');
        const dotsContainer = document.getElementById('likeSliderDots');

        if (!track || !prevBtn || !nextBtn) return;

        const items = Array.from(track.querySelectorAll('.item'));
        let currentIndex = 0;
        let startX = 0;

        function getVisibleCount() {
            return window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 4;
        }

        function getItemWidth() {
            const trackStyles = window.getComputedStyle(track);
            const gap = parseFloat(trackStyles.columnGap) || parseFloat(trackStyles.gap) || 0;
            const itemRect = items[0].getBoundingClientRect();
            return itemRect.width + gap;
        }

        function buildDots() {
            dotsContainer.innerHTML = '';
            const visibleCount = getVisibleCount();
            const totalDots = items.length - visibleCount + 1;
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goTo(i));
                dotsContainer.appendChild(dot);
            }
        }

        function goTo(index) {
            const visibleCount = getVisibleCount();
            const maxIndex = items.length - visibleCount;
            currentIndex = Math.max(0, Math.min(index, maxIndex));

            const itemWidth = getItemWidth();
            track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

            dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
                d.classList.toggle('active', i === currentIndex);
            });
        }

        prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
        nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

        track.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            track.classList.add('dragging');
        });

        window.addEventListener('mouseup', (e) => {
            if (!track.classList.contains('dragging')) return;
            track.classList.remove('dragging');
            const diff = startX - e.clientX;
            if (Math.abs(diff) > 50) goTo(currentIndex + (diff > 0 ? 1 : -1));
        });

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) goTo(currentIndex + (diff > 0 ? 1 : -1));
        });

        track.addEventListener('click', (e) => {
            if (Math.abs(startX - e.clientX) > 5) e.preventDefault();
        });

        window.addEventListener('resize', () => {
            buildDots();
            goTo(0);
        });

        buildDots();
        goTo(0);
    }

    window.addEventListener('load', initSlider);
})();