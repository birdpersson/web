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
			messages:{
				errorUsername:'',
				errorFirstName:'',
				errorLastName:'',
				errorGender:'',
				errorNewPass:'',
				errorRepNewPass:'',
				errorNotEqualNewPassword:'',
				errorResponse:'',
				successResponse:'',
			}
		}
	},
	template: `
	<div id="signup">
	  <div class="container-fluid">
		<div class="row no-gutter">
  
		  <div class="col-md-8 col-lg-6">
			<div class="login d-flex alignlogin d-flex align-items-center py-5">
			  <div class="container">
				<div class="row">
				  <div class="col-md-9 col-lg-8 mx-auto">
					<h3 class="login-heading mb-4">Create Account</h3>
					<div class="alert alert-danger" v-if="error" v-html="messages.errorResponse"></div>
  
					<form class="form-signin">
					  <div v-if='messages.errorUsername' class="alert alert-danger" v-html="messages.errorUsername"></div>
					  <div class="form-label-group">
						<b>Choose a username</b>
						<input v-model="user.username" class="form-control" placeholder="Username" required autofocus>
						<br>
					  </div>
					  
					  <div v-if='messages.errorFirstName' id='testError' class="alert alert-danger" v-html="messages.errorFirstName"></div>
					  <div class="form-label-group">
						<b>What is your first name?</b>
						<input v-model="user.firstname" class="form-control" placeholder="First Name" required autofocus>
						<br>
					  </div>
  
					  <div v-if='messages.errorLastName' class="alert alert-danger" v-html="messages.errorLastName"></div>
					  <div class="form-label-group">
						<b>What is your last name?</b>
						<input v-model="user.lastname" class="form-control" placeholder="Last Name" required autofocus>
						<br>
					  </div>
  
					  <div v-if='messages.errorGender' class="alert alert-danger" v-html="messages.errorGender"></div>
					  <div class="form-label-group">
						<b>What is your Gender?</b>
						<br>
						<input type="radio" v-model="user.gender" required value="Male"> Male
						<input type="radio" v-model="user.gender" required value="Female"> Female
						<input type="radio" v-model="user.gender" required value="Other"> Other
						<br>
						<br>
					  </div>
  
					  <div v-if='messages.errorNewPass' class="alert alert-danger" v-html="messages.errorNewPass"></div>
					  <div class="form-label-group">
						<b>Create a password</b>
						<input v-model="user.password" type="password" class="form-control" placeholder="Password" required>
						<br>
					  </div>
  
					  <div v-if='messages.errorNotEqualNewPassword' class="alert alert-danger" v-html="messages.errorNotEqualNewPassword"></div>
					  <div v-if='messages.errorRepNewPass' class="alert alert-danger" v-html="messages.errorRepNewPass"></div>
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
	</div>`,
	methods: {
	  	signup: function (user) {
			//Kombinacija sa praznim username poljem
			if(this.user.username==''){
				this.messages.errorUsername =  `<h4>Username name of user can't be empty!</h4>`;
				setTimeout(()=>this.messages.errorUsername='',3000);
			}
	
			//Kombinacija sa praznim firstname poljem
			else if(this.user.firstname==''){
			this.messages.errorFirstName =  `<h4>First name of user can't be empty!</h4>`;
			setTimeout(()=>this.messages.errorFirstName='',3000);
			}
	
			//Kombinacija sa praznim lastname poljem
			else if(this.user.lastname==''){
			this.messages.errorLastName =  `<h4>Last name of user can't be empty!</h4>`;
			setTimeout(()=>this.messages.errorLastName='',3000);
			}
	
			//Kombinacija sa praznim gender poljem
			else if(this.user.gender==''){
			this.messages.errorGender =  `<h4>Gender of user can't be empty!</h4>`;
			setTimeout(()=>this.messages.errorGender='',3000);
			}
	
			//Kombinacija sa praznim password poljem
			else if(this.user.password==''){
			this.messages.errorNewPass =  `<h4>Password of user can't be empty!</h4>`;
			setTimeout(()=>this.messages.errorNewPass='',3000);
			}
	
			//Kombinacija sa praznim password2 poljem
			else if(this.user.password2==''){
			this.messages.errorRepNewPass =  `<h4>Confirmation password can't be empty!</h4>`;
			setTimeout(()=>this.messages.errorRepNewPass='',3000);
			}
	
			else{
				//Ako su sva polja popunjena provera da li su unete iste sifre
				if(this.user.password !== this.user.password2){
					this.messages.errorNotEqualNewPassword =  `<h4>Your passwords don't match! Please try again...</h4>`;
					setTimeout(()=>this.messages.errorNotEqualNewPassword='',3000);
				}
				else{
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
				}
			}
		},
		signupSuccessful: function (response) {
			if (response.status === 201) {
				this.login(response.data);
			}
			this.signupFailed()
		},
		
	
		signupFailed: function () {
			this.error = true;
			setTimeout(()=>this.error=false,5000);
			this.messages.errorResponse= `<h4>Username already exists!</h4>`;
			// setTimeout(() => this.messages.errorResponse='', 5000);
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
			setTimeout(()=>this.error=false,5000);
			this.messages.errorResponse= `<h4>Username already exists!</h4>`;
			// setTimeout(() => this.messages.errorResponse='', 5000);
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