import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';

import AuthService from '../services/auth.service';

import '../App.css';
import '../Custom.css';


function Login() {
    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
            await AuthService.login(email, password).then(
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
				<h1>Login Screen</h1>
				<Link to='/'>Home</Link>

                <section>
					<form onSubmit={handleLogin}>
						<input type='text' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
						<input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
						<button type='submit'>Submit</button>
					</form>
				</section>   
			</header>
		</div>
	);
}

export default Login;