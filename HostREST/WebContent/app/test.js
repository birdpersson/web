Vue.component("navigation", {
	
	template: `
    <div id="navigation">
    <nav class="navbar navbar-expand-lg navbar-dark static-top">
        <div class="container">
            <h1><span id='titleEffect'>Apartment</span>Finder</h1>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon">TEST</span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                    <router-link to="/apartments"  class="nav-link" exact>Apartments
                        <span class="sr-only">current)</span>     
                    </router-link>
                </li>

                <li class="nav-item" v-if='!isGuest'>
                        <router-link class="nav-link" to="/users" exact>Users</router-link>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link" to="/reservations" exact>Reservations</router-link>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link" to="/profile" exact>Profile</router-link>
                </li>

            </ul>
                           
            <router-link  to='#' class="nav-link" exact> <button class="btn" id='btnLogin'>Log In</button> </router-link>
            <button  class="btn"  id='btnLogout' >Log Out</button> 
            </div>
        </div>
    </nav> 
</div>
`
    ,
    data: function () {
		return {
			user: {
				username: '',
				password: ''	
			}
		}
	},
	methods: {
		checkLoggedIn: function (data) {
			if (!data.jwt) {
				this.$router.push('/error')
			}

			localStorage.setItem('jwt', data.jwt);
			localStorage.setItem('role', data.role);
			localStorage.setItem('user', data.username);

			this.$router.push('/homepage');
		},

		login: function (user) {
			axios
				.post('rest/login', { username: user.username, password: user.password })
				.then(response => this.checkLoggedIn(response.data));
		}
	}
})

