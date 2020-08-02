Vue.component('navbar', {
    template: `
<div id="navbar">
    <div id="navigation">
        <nav class="navbar navbar-expand-lg navbar-dark static-top">
            <div class="container">
                <h1><span id='titleEffect'>Apartment</span>Finder</h1>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon">TEST</span>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">

                        <li class="nav-item active">
                            <router-link to="/homepage" class="nav-link" exact>Home</router-link>
                        </li>

                        <li class="nav-item active">
                            <router-link to="/apartments" class="nav-link" exact>Apartments
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
                        <!--Zakomentarisati za navbar-->
                    </ul>

                    <router-link to='#' class="nav-link" exact>
                        <button class="btn" id='btnLogin'>Log In</button>
                    </router-link>
                    <button class="btn" id='btnLogout' v-on:click='logout()'>Log Out</button>
                </div>
            </div>
        </nav>
    </div>
</div>`,
    data: function () {
        return {
            loggedIn: false
        }
    },
    methods: {
        logout: function () {
            localStorage.removeItem('jwt');
            localStorage.removeItem('role');
            localStorage.removeItem('user');
            window.location.reload();
        }
    },
    created() {
        if (localStorage.getItem('jwt')) {
            loggedIn = true;
        }
    },
});