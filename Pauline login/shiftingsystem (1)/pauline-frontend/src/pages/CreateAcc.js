import React, { useState } from 'react';
import Swal from 'sweetalert2';
import logo from '../asessts/tsu.png';
import '../styles/createacc.css';

export function CreateAcc() {
	const [user, setUser] = useState({
		firstname: '',
		middlename: '',
		lastname: '',
		username: '',
		email: '',
		password: '',
		business_unit: '',
		position: '',
	});
	const [password2, setPassword2] = useState('');

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		if (name === 'password2') {
			setPassword2(value);
		} else {
			setUser({ ...user, [name]: value });
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (user.password !== password2) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Passwords do not match!',
			});
			return;
		}
		fetch('http://localhost:9094/api/CreateUser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'User created successfully!',
				}).then(() => {
					window.location.href = '/landing-page';
				});
			})
			.catch((error) => {
				console.error('Error:', error);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Error creating user!',
				});
			});
	};
	return (
		<div class="cont">
			<div class="create-container">
				<div class="image-contain">
					<img src={logo} alt="" width="650px" />
				</div>
				<div class="input-forms">
					<strong>Create Account</strong>
					<form>
						<div class="input-containers">
							<input type="text" class="input-design" placeholder="First Name" onChange={handleInputChange} name="firstname" />
							<div class="row">
								<div class="col">
									<input type="text" class="input-design" placeholder="Middle Name" onChange={handleInputChange} name="middlename" />
								</div>
								<div class="col">
									<input type="text" class="input-design" placeholder="Last Name" onChange={handleInputChange} name="lastname" />
								</div>
							</div>
							<input type="text" class="input-design" placeholder="Username" onChange={handleInputChange} name="username" />
							<input type="text" class="input-design" placeholder="Email" onChange={handleInputChange} name="email" />
							<input type="password" class="input-design" placeholder="Password" onChange={handleInputChange} name="password" />
							<input type="password" class="input-design" placeholder="Retype Password" name="password2" onChange={handleInputChange} />
						</div>
						<div class="row-drpd">
							<button class="btn-ch" type="button" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
								Business Unit
							</button>
							<select id="department-dropdown" onChange={handleInputChange} name="business_unit">
								<option value="">Select Business Unit</option>
								<option value="dev">Dev</option>
								<option value="qa">QA</option>
								<option value="ba">BA</option>
							</select>
							<div class="spce"></div>
							<button class="btn-ch" type="button" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
								Position
							</button>
							<select id="position-dropdown" onChange={handleInputChange} name="position">
								<option value="">Select Position</option>
								<option value="jes">JES</option>
								<option value="sem">SEM</option>
								<option value="sde">SDE</option>
							</select>
						</div>
					</form>
				</div>
				<div class="forgot">
					<div class="form-check">
						<input class="form-check-input" type="checkbox" value="" />
						<label class="form-check-label" for="tncp">
							By signing up, you agree to our
						</label>
						<a id="tpp" href="#">
							Terms & Privacy Policy
						</a>
					</div>
					<button class="btn" type="button" onClick={handleSubmit}>
						Sign Up
					</button>
					<div class="acc">
						<p>
							Already have an account? <a href="/"> Sign in now</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
