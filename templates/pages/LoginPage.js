import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import logo from '../asessts/logotgsi.png';
import '../styles/login.css';

export function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post('http://localhost:9094/api/login', {
				email: email,
				password: password,
			});
			if (response.status === 200 && response.data.message === 'Login Successful') {
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'You have successfully logged in',
				}).then(() => {
					window.location.href = '/landing-page';
				});
			}
		} catch (error) {
			if (error.response && error.response.status === 401) {
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: 'Invalid email or password',
				});
			} else {
				console.error(error);
			}
		}
	};

	return (
		<div class="contain">
			<div class="container">
				<div class="image-container">
					<img src={logo} alt="" width="700px" />
				</div>
				<div class="input-form">
					<strong>Welcome!</strong>
					<form onSubmit={handleSubmit}>
						<div class="input-container">
							<input
								type="text"
								class="input-design"
								placeholder="Email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>

							<input
								type="password"
								class="input-design"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>

							<div class="forgot-log">
								<div class="form-check" id="tsek">
									<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
									<label class="form-check-label" for="flexCheckDefault">
										<p>Remember me <a href="#">Forgot Password?</a></p>
									</label>
								</div>
								
							</div>

							<button type="submit">Sign In</button>
						</div>
					</form>
					<div class="create">
						<p>
							Don't have an account? <a href="/create-account">Create Now</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
