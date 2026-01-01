
document.addEventListener('DOMContentLoaded', () => {
    // Function to initialize pane styles for transition
    const initPaneStyle = (pane) => {
        pane.style.transition = 'opacity 0.4s ease, transform 0.4s ease'; // Smooth 400ms transition
    };

    // Apply init styles to all existing panes
    document.querySelectorAll('.w-tab-pane').forEach(initPaneStyle);

    const tabLinks = document.querySelectorAll('.w-tab-link');

    tabLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // 1. Find Query Context
            const tabsContainer = this.closest('.w-tabs');
            if (!tabsContainer) return;

            const tabMenu = tabsContainer.querySelector('.w-tab-menu');
            const tabContent = tabsContainer.querySelector('.w-tab-content');
            if (!tabMenu || !tabContent) return;

            // 2. Determine Indices and Direction
            const links = Array.from(tabMenu.querySelectorAll('.w-tab-link'));
            const currentLink = tabMenu.querySelector('.w-tab-link.w--current');

            const currentIndex = links.indexOf(currentLink);
            const targetIndex = links.indexOf(this);

            if (currentIndex === targetIndex) return; // Clicked same tab

            // Direction: 'next' (Right) or 'prev' (Left)
            // If we move index 0 -> 1, we are going "Next". Content should exit Left, New enters from Right.
            const direction = targetIndex > currentIndex ? 'next' : 'prev';

            // 3. Update Link Classes
            links.forEach(l => l.classList.remove('w--current'));
            this.classList.add('w--current');

            // 4. Find Panes
            const currentPane = tabContent.querySelector('.w-tab-pane.w--tab-active') ||
                Array.from(tabContent.querySelectorAll('.w-tab-pane')).find(p => getComputedStyle(p).display !== 'none');

            const targetTabId = this.getAttribute('data-w-tab');
            const targetPane = tabContent.querySelector(`[data-w-tab="${targetTabId}"]`);

            if (targetPane) {
                // Initialize transition style just in case
                initPaneStyle(targetPane);

                // Animation Parameters
                const offset = 50; // px
                // Exit: if going Next, move -50px (Left). If Prev, move 50px (Right).
                const exitTransform = `translateX(${direction === 'next' ? -offset : offset}px)`;
                // Enter: if going Next, start from 50px (Right). If Prev, start from -50px (Left).
                const enterStartTransform = `translateX(${direction === 'next' ? offset : -offset}px)`;

                // 5. Animate OUT Current
                if (currentPane) {
                    initPaneStyle(currentPane);
                    currentPane.style.opacity = '0';
                    currentPane.style.transform = exitTransform;

                    // Wait for transition to finish
                    setTimeout(() => {
                        currentPane.classList.remove('w--tab-active');
                        currentPane.style.display = 'none';
                        // Reset transform for future use
                        currentPane.style.transform = 'translateX(0)';

                        // Proceed to Show Target (Sequential feel)
                        animateInTarget(targetPane, enterStartTransform);
                    }, 400); // 400ms matches CSS transition
                } else {
                    // No current pane active? Just show target.
                    animateInTarget(targetPane, enterStartTransform);
                }
            }
        });
    });

    function animateInTarget(pane, startTransform) {
        // Prepare state
        pane.style.display = 'block';
        pane.style.opacity = '0';
        pane.style.transform = startTransform;
        pane.classList.add('w--tab-active');

        // Force Reflow
        void pane.offsetWidth;

        // Animate IN
        pane.style.opacity = '1';
        pane.style.transform = 'translateX(0)';
    }
});
