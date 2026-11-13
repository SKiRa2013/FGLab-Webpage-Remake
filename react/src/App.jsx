import './App.css';

import { lazy, Suspense } from 'react';

import { Router } from './routes/Router.jsx';
import { Route } from './routes/Route.jsx';
// import { Link } from './routes/Link.jsx';

// import Button from './components/Counter/Button.jsx';
const CounterPage = lazy(() => import('./components/Counter/Counter.jsx'));
const LabmemPage = lazy(() => import('./components/Labmem/Labmem.jsx'));

import Index from './components/Fglab/Index.jsx';
import Toppu from './components/Fglab/Toppu.jsx';
import Seika from './components/Fglab/Seika.jsx';

import Bbs from './components/Fglab/Bbs/Bbs.jsx';
import Pass from './components/Fglab/Bbs/Pass.jsx';

import Links from './components/Fglab/Links.jsx';

import Labo from './components/Fglab/Labo/Labo.jsx';
import Katudou from './components/Fglab/Labo/Katudou.jsx';
import Rabomen from './components/Fglab/Labo/Rabomen.jsx';
import Kyuujin from './components/Fglab/Labo/Kyuujin.jsx';
import Menseki from './components/Fglab/Labo/Menseki.jsx';

const withMigi = (PageComponent) => {
    return function WrappedIndex(props) {
        return <Index migi={<PageComponent {...props} />} {...props} />;
    };
};

/*

function Sample() {
	return (
		<div className="m-12 p-4">
			<Link to='/counter'> <Button text={"Counter Page"} color={'green'} func={()=>{}} /> </Link>
			<Link to='/labmem'> <Button text={"Labmem Page"} color={'green'} func={()=>{}} /> </Link>
		</div>
	);
}

*/

const ToppuPage = withMigi(Toppu);
const SeikaPage = withMigi(Seika);

const BbsPage = withMigi(Bbs);
const PassPage = withMigi(Pass);

const LinksPage = withMigi(Links);

const LaboPage = withMigi(Labo);
const KatudouPage = withMigi(Katudou);
const RabomenPage = withMigi(Rabomen);
const KyuujinPage = withMigi(Kyuujin);
const MensekiPage = withMigi(Menseki);

const appRoutes = [
	{
		path: '/labmem/:code',
		Component: ({ routeParams }) => <h1>Code: {routeParams.code}</h1>,
	},
];

function App() {
    return (
		<Suspense fallback={<div className="p-6 text-neutral-400 main-container">Loading...</div>}>
			<main>
				<Router routes={appRoutes}>
					<Route path='/' Component={ ToppuPage } />
					<Route path='/seika' Component={ SeikaPage } />

					<Route path='/bbs' Component={ BbsPage } />
{/*
					<Route path='/pass' Component={ PassPage } />
					
					<Route path='/links' Component={ LinksPage } />
*/}
					<Route path='/labo' Component={ LaboPage } />
					<Route path='/katudou' Component={ KatudouPage } />
					<Route path='/rabomen' Component={ RabomenPage } />
					<Route path='/kyuujin' Component={ KyuujinPage } />
					<Route path='/menseki' Component={ MensekiPage } />

					<Route path='/counter' Component={ CounterPage } />
					<Route path='/labmem' Component={ LabmemPage }/>
				</Router>
			</main>
		</Suspense>
    );
};

export default App
