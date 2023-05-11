import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { CreateAcc } from './pages/CreateAcc';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';

function App() {
	return (
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="/landing-page" element={<LandingPage />} />
			<Route path="/create-account" element={<CreateAcc />} />
		</Routes>
	);
}

export default App;
