import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';

import AuthService from '../services/auth.service';

import '../App.css';
import '../Custom.css';


function SignUp() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const handleSignup = async (event) => {
		event.preventDefault();
		try {
			await AuthService.signup(email, password).then(
				res => {
					navigate('/inventory')
				}
			)
		} catch(err) {
			console.error(err)
		}
	}

	return(
		<div className='App'>
			<header className='App-header'>
				<h1>SignUp Screen</h1>
				<Link to='/'>Home</Link>  

				<section>
					<form onSubmit={handleSignup}>
						<input type='text' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
						<input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
						<button type='submit'>Submit</button>
					</form>
				</section>   
			</header>
		</div>
	);
}

export default SignUp;