import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthService from './services/auth.service';

import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Vehicle from './pages/Vehicle';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
	const [currentUser, setCurrentUser] = useState(false);

	useEffect(() => {
		const user = AuthService.getCurrentUser()
		if(user) {
			setCurrentUser(user)
		}
	}, [])

	const logOut = () => {
		AuthService.logout();
	}

	return (
		<div>
			<h1>Demo logging in</h1>
			<div>
				{
					currentUser === false
					? <h2>Logged In</h2>
					: <h2>Logged Out</h2>
				}
			</div>
			<section>
				<Routes>
					<Route path='/login' exact element={<Login />} />
					<Route path='/signup' exact element={<SignUp />} />
					<Route path='/inventory/:id' exact element={<Vehicle />} />
					<Route path='/inventory' exact element={<Inventory />} />
					<Route path='/' exact element={<Home />} />
				</Routes>
			</section>
		</div>
	);
}

export default App;
