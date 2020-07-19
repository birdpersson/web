Vue.component("login", {
	data: function () {
		return {
			user: {
				username: '',
				password: ''	
			}
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

				<form>
					<div class="form-label-group">
						<input v-model="user.username" class="form-control" placeholder="username" required>
						<label for="inputUsername"></label>
					</div>

					<div class="form-label-group">
						<input v-model="user.password" type="password" class="form-control" placeholder="password" required>
						<label for="inputPassword"></label>
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
		checkLoggedIn: function (data) {
			if (!data.jwt) {
				this.$router.push('/error')
			}

			localStorage.setItem('jwt', data.jwt);
			localStorage.setItem('role', data.role);
			localStorage.setItem('user', data.username);

			this.$router.push('/');
		},

		login: function (user) {
			axios
				.post('rest/login', { username: user.username, password: user.password })
				.then(response => this.checkLoggedIn(response.data));
		}
	}
})