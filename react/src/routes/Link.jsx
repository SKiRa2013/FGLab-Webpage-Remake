import { EVENTS } from '../constants/events.jsx'
import { BUTTONS } from '../constants/buttons.jsx'

export function navigate(href) {
    window.history.pushState({}, '', href);

    // Create a custom event to tell the page that a new path has been accessed
    const navEvent = new Event(EVENTS.PUSHSTATE);
    window.dispatchEvent(navEvent);
};

export function Link ({ target, to, ...props }) {
    const handleClick = (event) => {
        const isMainEvent = event.button === BUTTONS.primaryClick
        const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
        const isManageableEvent = target === undefined || target === '_self';

        if (isMainEvent && isManageableEvent && !isModifiedEvent) {
            event.preventDefault();
            navigate(to);
        }        
    };

    return ( <a onClick={handleClick} href={to} target={target} { ...props } /> );
};
