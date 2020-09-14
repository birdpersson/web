Vue.component('navbar', {
    template: `
<div id="navbar">
    <div id="navigation">
        <nav class="navbar navbar-expand-lg navbar-dark static-top">
            <div class="container">
                <h1><span id='titleEffect'>Apartment</span>Finder</h1>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">

                        <li class="nav-item active" v-if='!loggedIn'>
                            <router-link to="/" class="nav-link" exact>Home</router-link>
                        </li>

                        <li class="nav-item active"  v-if='loggedIn'>
                            <router-link to="/homepage" class="nav-link" exact>Home</router-link>
                        </li>

                        <li class="nav-item active">
                            <router-link to="/apartments" class="nav-link" exact>Apartments
                                <span class="sr-only">current)</span>
                            </router-link>
                        </li>

                        <li class="nav-item" v-if='isAdmin || isHost'>
                            <router-link class="nav-link" to="/users" exact>Users</router-link>
                        </li>

                        <li class="nav-item" v-if='loggedIn'>
                            <router-link class="nav-link" to="/reservations" exact>Reservations</router-link>
                        </li>
                    </ul>

                    <router-link to='/login' class="nav-link" exact>
                        <button v-if="!loggedIn" class="btn" id='btnLogin'>Log In</button>
                    </router-link>

                    <button v-if="loggedIn" class="btn" id='btnLogout' v-on:click='logout()'>Log Out</button>

                    <router-link to='/signup' class="nav-link" exact>
                        <button v-if="!loggedIn" class="btn" id='btnRegister'>Sign Up</button>
                    </router-link>
                    
                    <router-link to='/profile' class="nav-link" exact>
                        <button v-if="loggedIn" class="btn" id='btnProfile'>Profile</button>
                    </router-link>
                </div>
            </div>
        </nav>
    </div>
</div>`,
    data: function () {
        return {
            role: localStorage.getItem('role'),
            loggedIn: localStorage.getItem('jwt') ? true : false,
            isAdmin: false,
            isHost: false,
            isGuest: false
        }
    },
    methods: {
        logout: function () {
            localStorage.removeItem('jwt');
            localStorage.removeItem('role');
            localStorage.removeItem('user');
            window.location.reload();
            this.$router.push('/login');
        }
    },
    created() {
        if (this.role == "ADMIN") {
            this.isAdmin = true;
        } else if (this.role == "HOST") {
            this.isHost = true;
        } else if (this.role == "GUEST") {
            this.isGuest = true;
        } else {
            this.loggedIn = false;
        }
    },
});