import { useState, useEffect, Children } from 'react';
import { match } from 'path-to-regexp';

import { EVENTS } from '../constants/events.jsx';

import { Route } from './Route.jsx';
import Page404 from './404.jsx';


const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '');

function getAppPath() {
    let pathname = window.location.pathname;

    if (BASENAME && pathname.startsWith(BASENAME)) {
        pathname = pathname.slice(BASENAME.length);
    }

    // Normaliza barras finales ('/bbs/' -> '/bbs') pero mantiene '/' intacto
    if (pathname.length > 1 && pathname.endsWith('/')) {
        pathname = pathname.slice(0, -1);
    }

    return pathname || '/';
}

export function Router({ children, routes = [], defaultComponent: DefaultComponent = () => <Page404 /> }) {
    const [currentPath, setCurrentPath] = useState(getAppPath);

    useEffect(() => {
        const onLocationChange = () => {
        	setCurrentPath(getAppPath());
        };

        window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
		window.addEventListener(EVENTS.POPSTATE, onLocationChange);

        return () => {
        	window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
			window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
        };
    }, []);

    let routeParams = {};

    // Add routes from children <Route /> components
    const routesFromChildren = Children.map(children, ({props, type}) => {
        const isRoute = type === Route || type?.isRoute;

        if (!isRoute) return null;
        return props;
    });

    const appRoutes = routes.concat(routesFromChildren);

    const Page = appRoutes.find( ({ path }) => {
        if (path === currentPath) return true;

        // Path-to-regexp is used to handle dynamic routes.
        // Example: /labmem/:code
        const matcherUrl = match(path, { path: decodeURIComponent });
        const matched = matcherUrl(currentPath);

        if (!matched) return false;

        // Save dynamic parameters found in the URL
        // Example: For /labmem/:code and URL '/labmem/1'
        // matched.params.code === 1
        routeParams = matched.params;
        return true;
    })?.Component;

    return (
        Page
        ? <Page routeParams={routeParams} /> 
        : <DefaultComponent />
    );
}
