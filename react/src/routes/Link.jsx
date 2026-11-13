import { EVENTS } from '../constants/events.jsx'
import { BUTTONS } from '../constants/buttons.jsx'

// En local ('/') queda vacío ''; en GitHub Pages ('/FGLab-Webpage-Remake/') queda '/FGLab-Webpage-Remake'
const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '');

export function toFullPath(to) {
    // Si es un enlace externo (ej. https://...), no lo tocamos
    if (/^https?:\/\//.test(to)) return to;
    const cleanTo = to.startsWith('/') ? to : `/${to}`;
    return `${BASENAME}${cleanTo}`;
}

export function navigate(href) {
    window.history.pushState({}, '', toFullPath(href));

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

    return ( <a onClick={handleClick} href={toFullPath(to)} target={target} { ...props } /> );
};
