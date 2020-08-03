Vue.component("login", {
	data: function () {
		return {
			user: {
				username: '',
				password: ''	
			},
			error: false
		}
	},
	template: `
<div id="login">
	<div class="container-fluid">
	<div class="row no-gutter">

		<div class="col-md-8 col-lg-6">
		<div class="login d-flex alignlogin d-flex align-items-center py-5">
			<div class="container">
			<div class="row">
				<div class="col-md-9 col-lg-8 mx-auto">
				<h3 class="login-heading mb-4">Welcome back!</h3>
				<div class="alert alert-danger" v-if="error">Wrong username or password</div>

				<form>
					<div class="form-label-group">
						<input v-model="user.username" class="form-control" placeholder="username" required>
						<label/>
					</div>

					<div class="form-label-group">
						<input v-model="user.password" type="password" class="form-control" placeholder="password" required>
						<label/>
					</div>

					<button type="button" class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" v-on:click='login(user)'>Sign in</button>
					<router-link to='/registration' class="small" exact>Not Registered?</router-link>
				</form>
				</div>
			</div>
			</div>
		</div>
		</div>
	</div>
	</div>
	
</div>
`
	,
	methods: {
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