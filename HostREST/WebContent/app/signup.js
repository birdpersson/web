Vue.component("signup", {
	data: function () {
		return {
			user: {
				username: '',
				firstname: '',
				lastname: '',
				gender: '',
				password: '',
				password2: '',
				role: 'GUEST'
			},
			error: false,
			success: false,
		}
	},
	template: `<div id="signup">
	<div class="container-fluid">
		<div class="row no-gutter">

			<div class="col-md-8 col-lg-6">
				<div class="login d-flex alignlogin d-flex align-items-center py-5">
					<div class="container">
						<div class="row">
							<div class="col-md-9 col-lg-8 mx-auto">
								<h3 class="login-heading mb-4">Create Account</h3>
								<div class="alert alert-danger" v-if="error">Username already exists</div>

								<form class="form-signin">
									<div class="form-label-group">
										<b>Choose a username</b>
										<input v-model="user.username" class="form-control" placeholder="Username" required autofocus>
										<br>
									</div>

									<div class="form-label-group">
										<b>What is your first name?</b>
										<input v-model="user.firstname" class="form-control" placeholder="First Name" required autofocus>
										<br>
									</div>

									<div class="form-label-group">
										<b>What is your last name?</b>
										<input v-model="user.lastname" class="form-control" placeholder="Last Name" required autofocus>
										<br>
									</div>

									<div class="form-label-group">
										<b>What is your Gender?</b>
										<br>
										<input type="radio" v-model="user.gender" required value="Male"> Male
										<input type="radio" v-model="user.gender" required value="Female"> Female
										<input type="radio" v-model="user.gender" required value="Other"> Other
										<br>
										<br>
									</div>

									<div class="form-label-group">
										<b>Create a password</b>
										<input v-model="user.password" type="password" class="form-control" placeholder="Password" required>
										<br>
									</div>

									<div class="form-label-group">
										<b>Confirm your password</b>
										<input v-model="user.password2" type="password" class="form-control" placeholder="Password" required>
										<br>
									</div>

									<button type="button"
										class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
										v-on:click='signup(user)'>Sign up</button>
									Have an account? <router-link to='/login' class="medum" exact>Log in</router-link>.
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</div>`
	,
	methods: {
		signup: function (user) {
			axios
				.post('rest/signup', {
					username: user.username,
					password: user.password,
					firstname: user.firstname,
					lastname: user.lastname,
					gender: user.gender,
					role: user.role
				})
				.then(response => this.signupSuccessful(response))
				.catch(() => this.signupFailed())
		},
		signupSuccessful: function (response) {
			if (response.status === 201) {
				this.login(response.data);
			}
			this.signupFailed()
		},
		signupFailed: function () {

			this.error = true;
		},
		login: function (user) {
			axios
				.post('rest/login', { username: user.username, password: user.password })
				.then(response => this.loginSuccessful(response.data))
				.catch(() => this.loginFailed())
		},
		loginSuccessful: function (data) {
			if (!data.jwt) {
				this.loginFailed();
				return;
			}
			localStorage.setItem('jwt', data.jwt);
			localStorage.setItem('role', data.role);
			localStorage.setItem('user', data.username);

			window.location.reload(); //refresh Authorization Bearer with new token
			this.error = false;
			this.$router.push('/homepage');
		},
		loginFailed: function () {
			localStorage.removeItem('jwt');
			localStorage.removeItem('role');
			localStorage.removeItem('user');

			this.error = true;
		}
	},
	mounted() {

	},
	created() {
		if (localStorage.getItem('jwt')) {
			this.$router.push('/homepage');
		}
	}

})