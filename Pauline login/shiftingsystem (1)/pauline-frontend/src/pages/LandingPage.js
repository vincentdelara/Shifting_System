import React from 'react';

export function LandingPage() {
	return (
		<div>
			<h1>Welcome to My Website</h1>
			<p>Thank you for visiting! Please log in or create an account to continue.</p>
			<button>
				<a href="/">Login</a>
			</button>
			<button>
				<a href="/create-account">Create Account</a>
			</button>
		</div>
	);
}
