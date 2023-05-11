import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './App.js';
import landingpage from './landingpage.js';
import './login/login.css';

function Appbar() {
	return (
		<Router>
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route path="/landingp" component={landingpage} />
			</Switch>
		</Router>
	);
}

export default Appbar;
