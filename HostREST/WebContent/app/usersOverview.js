Vue.component('users', {
    template: `<div id="user-list">
    <div class="container">
        <h1 style="margin-top:10px;color:#35424a;">List Of <span id='titleEffect'>Users</span></h1>
        <div v-if='isAdmin'>
            <h3 style="color:#35424a;">As an administrator on this page you can see list of all users in the system.
            </h3>
        </div>
        <div style="color:#35424a;" v-if='isHost'>
            <h3>As a host on this page you can see list of all users that have reservation on your's apartment.</h3>
        </div>
        <hr style='background:#e8491d;height:1px;'>
    </div>
    <div class="container">

        <div class="container" id='page-title'>
            <div id='filter'>
                <nav class="navbar navbar-light bg-light justify-content-between">
                    <a class="navbar-brand">Pretraga</a>
                    <form class="form-inline">
                        <input class="form-control mr-sm-2" v-model='searchedUser.username' type="text"
                            placeholder="username" aria-label="Search">
                        <select style="padding:7px; margin-right: 10px" id='listOfRoles' v-model="searchedUser.role">
                            <option disabled value="">Role</option>
                            <option v-for="role in roles">{{role}}</option>
                        </select>
                        <select style="padding:7px; margin-right: 10px" id='listOfGenders'
                            v-model="searchedUser.gender">
                            <option disabled value="">Gender</option>
                            <option v-for="gender in genders">{{gender}}</option>
                        </select>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="button"
                            v-on:click='searchUser()'>Search</button>
                    </form>
                </nav>
            </div>

            <div class="container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Gender</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-bind:key='users.username' v-for='user in users'>
                            <td>{{user.username}}</td>
                            <td>{{user.firstname}}</td>
                            <td>{{user.lastname}}</td>
                            <td>{{user.gender}}</td>
                            <td>{{user.role}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!--    <br>
                    <br>
                    Pregled svih korisnika
                    Kao Administrator:
                    Imam pregled svih postojećih korisnika u sistemu, a mogu vršiti i pretragu

                    <!--<div v-if='isHost'>
                        <h3>As a host on this page you can see list of all users that have reservation on your's apartment.</h3>
                            Kao Domaćin:
                            Imam pregled svih korisnika koji su napravili rezervaciju za moje apartmane i
                            mogu vršiti pretragu među njima

                            Mozda i da ne budu 2 odvojena pogleda veca jedan isit tj.jedna ista tabela koju popunjavamo drugacije u
                            zavisnosti od role korisnika.
                    </div>-->
    </div>
</div>`,
    data: function () {
        return {
            user: {
                username: '',
                role: ''
            },
            users: [],
            searchedUser: {
                username: '',
                gender: null,
                role: null,
            },
            searchedQuery:'?',
            isAdmin: false,
            isHost: false,
            isGuest: false,

            roles:['ADMIN','HOST','GUEST'],
            genders:['Male','Female','Other'],
        }
    },
    methods: {
        searchUser() {
            if(this.searchedUser.username !== ''){
               this.searchedQuery += 'username=' + this.searchedUser.username;
            }
            if(this.searchedUser.gender !== null){
                this.searchedQuery += '&gender=' + this.searchedUser.gender ;
            }
            if(this.searchedUser.role !== null){
                this.searchedQuery += '&role=' + this.searchedUser.role;
            }
            console.log(`Trazite usera ${this.searchedUser.username}
            ${this.searchedUser.gender}
            ${this.searchedUser.role}
            `);

            axios
            .get('rest/user/search'+searchedQuery)
            .then(response => this.users=response.data);

        }
    },
    mounted() {

    },
    created() {
        this.user.username = localStorage.getItem('user');
        this.user.role = localStorage.getItem('role');
        if (this.user.role == "ADMIN") {
            this.isAdmin = true;
            //get metoda koja vraca sve usere.
            axios
            .get('rest/user/all')
            .then(Response => (this.users=Response.data));
          
        } else if (this.user.role == "HOST") {
            this.isHost = true;
            //get metoda koja vraca sve usere tipa guest koji imaju rezervaciju kod tog hosta
            axios
            .get(`rest/user/customers`)
            .then(Response => (this.users=Response.data));
        } else {
            this.isGuest = true;
        }
    },
});