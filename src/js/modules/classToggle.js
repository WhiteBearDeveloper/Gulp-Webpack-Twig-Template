/**
 * @param ctx - контекст
 */
function classToggle(ctx = document) {
    const toggleElements = [...ctx.querySelectorAll('[data-js-toggle]')];
    if (toggleElements && toggleElements.length) {
        toggleElements.forEach((toggleElement) => {
            toggleElement.addEventListener('click', (e) => {
                e.preventDefault();
                const group = e.currentTarget.dataset && e.currentTarget.dataset.groupName;
                const toggleClass = e.currentTarget.dataset && e.currentTarget.dataset.toggleClass;
                if (group) {
                    const groupElements = [...ctx.querySelectorAll(`[data-js-toggle][data-group-name="${group}"]`)];
                    if (groupElements && groupElements.length) {
                        groupElements.forEach((groupElement) => {
                            if (groupElement !== e.currentTarget) groupElement.classList.remove(toggleClass);
                        });
                    }
                }
                if (toggleClass) {
                    e.currentTarget.classList.toggle(toggleClass);
                }
            });
        });
    }
}

export default classToggle;