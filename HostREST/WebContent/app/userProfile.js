Vue.component('profile', {
    template: `
<div id="user-profile">
    <div>
        <div class="container" id='page-title'>
            <h1 style="margin-top:10px;color:#35424a;">User <span id='titleEffect'>Profile</span></h1>
            <hr style='background:#e8491d;height:1px;'>
        </div>
        <div class="container">
            <form>
                <ul id="services" class="list-group">
                    <li class="list-group-item">
                        <h5 style="color:#e8491d;">Username:</h5>
                        <h4>{{profile.username}}</h4>
                    </li>
                    <li class="list-group-item">
                        <h5 style="color:#e8491d">First name:</h5>
                        <h4>{{profile.firstname}}</h4>
                    </li>

                    <li class="list-group-item">
                        <h5 style="color:#e8491d">Last name:</h5>
                        <h4>{{profile.lastname}}</h4>
                    </li>

                    <li class="list-group-item">
                        <h5 style="color:#e8491d">Gender:</h5>
                        <h4>{{profile.gender}}</h4>
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

            if (this.user.role == "ADMIN") {
                this.isAdmin = true;
            } else if (this.user.role == "HOST") {
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