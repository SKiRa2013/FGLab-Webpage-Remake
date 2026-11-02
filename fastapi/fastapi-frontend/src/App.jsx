import { lazy, Suspense } from 'react';
import './App.css';

import { Link } from './routes/Link.jsx';
import { Router } from './routes/Router.jsx';
import { Route } from './routes/Route.jsx';

const CounterPage = lazy(() => import('./components/Counter/Counter.jsx'));
const LabmemPage = lazy(() => import('./components/Labmem/Labmem.jsx'));
import Button from './components/Counter/Button.jsx';

const appRoutes = [
	{
		path: '/labmem/:code',
		Component: ({ routeParams }) => <h1>Code: {routeParams.code}</h1>,
	},
];


function Main() {
	return (
		<div className="m-12 p-4">
			<Link to='/counter'> <Button text={"Counter Page"} color={'green'} func={()=>{}} /> </Link>
			<Link to='/labmem'> <Button text={"Labmem Page"} color={'green'} func={()=>{}} /> </Link>
		</div>
	);
};

function App() {
    return (
		<Suspense fallback={<div>Loading...</div>}>
			<main>
				<Router routes={appRoutes}>
					<Route path='/' Component={Main} />
					<Route path='/counter' Component={CounterPage} />
					<Route path='/labmem' Component={LabmemPage} />
				</Router>
			</main>
		</Suspense>
    );
};

export default App
