import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
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
							<input type="text" class="input-designs" placeholder="First Name" onChange={handleInputChange} name="firstname" />
							<div class="row">
								<div class="col">
									<input type="text" class="input-designs" placeholder="Middle Name" onChange={handleInputChange} name="middlename" />
								</div>
								<div class="col">
									<input type="text" class="input-designs" placeholder="Last Name" onChange={handleInputChange} name="lastname" />
								</div>
							</div>

							<input type="text" class="input-designs" placeholder="Username" onChange={handleInputChange} name="username" />

							<input type="text" class="input-designs" placeholder="Email" onChange={handleInputChange} name="email" />

							<input type="password" class="input-designs" placeholder="Password" onChange={handleInputChange} name="password" />

							<input type="password" class="input-designs" placeholder="Retype Password" name="password2" onChange={handleInputChange} />
							<div class="drop-container">
								<Dropdown className="drop">
									<Dropdown.Toggle
										className="ddown"
										variant="success"
										id="dropdown-autoclose-true"
										onChange={handleInputChange}
										name="business_unit"
									>
										<div class="bu">Business Unit</div>
									</Dropdown.Toggle>

									<Dropdown.Menu className="menu">
										<Dropdown.Item href="#/action-1">Developver</Dropdown.Item>
										<Dropdown.Divider />
										<Dropdown.Item href="#/action-2">QA</Dropdown.Item>
										<Dropdown.Divider />
										<Dropdown.Item href="#/action-3">BA</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
								<Dropdown className="drop">
									<Dropdown.Toggle
										className="ddownp"
										variant="success"
										id="dropdown-autoclose-true"
										onChange={handleInputChange}
										name="position"
									>
										<div class="bu">Position</div>
									</Dropdown.Toggle>

									<Dropdown.Menu className="menup">
										<Dropdown.Item href="#/action-1">JES</Dropdown.Item>
										<Dropdown.Divider />
										<Dropdown.Item href="#/action-2">SEM</Dropdown.Item>
										<Dropdown.Divider />
										<Dropdown.Item href="#/action-3">SDE</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>
						</div>

						<div class="agree">
							<div class="form-check">
								<input class="form-check-input" type="checkbox" value="" />
								<label class="form-check-label" for="tncp">
									<p>
										By signing up, you agree to our{' '}
										<a id="tpp" href="#">
											Terms & Privacy Policy
										</a>
									</p>
								</label>
							</div>
						</div>
						<button class="sub" type="button" onClick={handleSubmit}>
							Sign Up
						</button>

						<div class="acc">
							<p>
								Already have an account? <a href="/"> Sign in now</a>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}