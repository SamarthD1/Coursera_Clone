// In js/government-script.js

document.addEventListener('DOMContentLoaded', function() {

    const tabsNav = document.getElementById('gov-tabs-nav');
    const tabsContent = document.getElementById('gov-tabs-content');

    if (tabsNav && tabsContent) {
        tabsNav.addEventListener('click', function(e) {
            if (e.target.tagName !== 'BUTTON') return;

            // Deactivate current active elements
            tabsNav.querySelector('.active').classList.remove('active');
            const currentActivePane = tabsContent.querySelector('.active');
            if (currentActivePane) currentActivePane.classList.remove('active');

            // Activate new tab and pane
            const newActiveTab = e.target;
            newActiveTab.classList.add('active');
            const newActivePane = document.getElementById(newActiveTab.dataset.target);
            if (newActivePane) newActivePane.classList.add('active');
        });
    }
});