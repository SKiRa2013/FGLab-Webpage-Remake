import { useState, useEffect, Children } from 'react';
import { match } from 'path-to-regexp';

import { EVENTS } from '../constants/events.jsx';

import { Route } from './Route.jsx';
import Page404 from './404.jsx';

export function Router({ children, routes = [], defaultComponent: DefaultComponent = () => <Page404 /> }) {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        const onLocationChange = () => {
        	setCurrentPath(window.location.pathname);
        };

        window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
		window.addEventListener(EVENTS.POPSTATE, onLocationChange);

        return () => {
        	window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
			window.addEventListener(EVENTS.POPSTATE, onLocationChange);
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
