Vue.component('profile', {
    template: `
<div id="user-profile">
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

                    <router-link to='#' class="nav-link" exact> <button class="btn" id='btnLogin'>Log In</button>
                    </router-link>
                    <button class="btn" id='btnLogout'>Log Out</button>
                </div>
            </div>
        </nav>
    </div>
    <div>
        <div class="container" id='page-title'>
            <h1 style="margin-top:10px;color:#35424a;">User <span id='titleEffect'>Profile</span></h1>
            <hr style='background:#e8491d;height:1px;'>
        </div>
        <div class="container">
            <form>
                <ul id="services" class="list-group">
                    <li class="list-group-item">
                        <h4>Korisnicko ime</h4>
                        <p>{{profile.username}}</p>
                    </li>
                    <li class="list-group-item">
                        <h4>Ime</h4>
                        <p>{{profile.firstname}}</p>
                    </li>

                    <li class="list-group-item">
                        <h4>Prezime</h4>
                        <p>{{profile.lastname}}</p>
                    </li>

                    <li class="list-group-item">
                        <h4>Pol</h4>
                        <p>{{profile.gender}}</p>
                    </li>

                    <li class="list-group-item">
                        <h4>Uloga</h4>
                        <p>{{profile.role}}</p>
                    </li>
                </ul>

                <div id='buttonUpdate'>
                    <router-link to='/patient/update'><button type='button' class="btn btn-lg btn-success "> Update
                        </button> </router-link>
                </div>
            </form>
        </div>
    </div>
</div>`,
    data: function () {
        return {
            user: {
                username: localStorage.getItem('user'),
                role: localStorage.getItem('role')
            },
            profile: {
                username: '',
                password: '',
                firstname: '',
                lastname: '',
                gender: '',
                role: ''
            },
            isAdmin: false,
            isHost: false,
            isGuest: false
        }
    },
    methods: {
        loadProfile: function (data) {
            this.profile.username = data.username;
            this.profile.password = data.password;
            this.profile.firstname = data.firstname;
            this.profile.lastname = data.lastname;
            this.profile.gender = data.gender;

            if (this.data.role == "ADMIN") {
                this.isAdmin = true;
            } else if (this.data.role == "HOST") {
                this.isHost = true;
            } else {
                this.isGuest = true;
            }
        }
    },
    mounted() {

    },
    created() {

        if (!localStorage.getItem('jwt')) {
            this.$router.push('/login');
        }
        axios
            .get('rest/profile/' + localStorage.getItem('user'))
            .then(response => this.loadProfile(response.data))

    },
});