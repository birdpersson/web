Vue.component('users',{
    template:`
        <div id="user-list">
            <div id="navigation">
                <nav class="navbar navbar-expand-lg navbar-dark static-top">
                    <div class="container">
                        <h1><span id='titleEffect'>Apartment</span>Finder</h1>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ml-auto">

                            <li class="nav-item active">
                                <router-link to="/homepage" class="nav-link" exact>Home</router-link>
                            </li>

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
                            </li> <!--Zakomentarisati za navbar-->
                        </ul>
                                    
                        <router-link  to='#' class="nav-link" exact> <button class="btn" id='btnLogin'>Log In</button> </router-link>
                        <button  class="btn"  id='btnLogout' >Log Out</button> 
                        </div>
                    </div>
                </nav> 
            </div>
            <div id='main'> 
                <h1>List of users</h1>
                    <div v-if='isAdmin'>
                        <h3>As an administrator on this page you can see list of all users in the system.</h3>
                        <div class="container" > 
                            <div id='filter'>
                                <nav class="navbar navbar-light bg-light justify-content-between">
                                    <a class="navbar-brand">Pretraga</a>
                                    <form class="form-inline">
                                    <input class="form-control mr-sm-2" v-model='searchedUser.username' type="text" placeholder="username" aria-label="Search">
                                    <select style="padding:7px; margin-right: 10px" id='listOfRoles' v-model="searchedUser.role">
                                        <option disabled value="">Role</option>
                                        <option>admin</option>
                                        <option>host</option>
                                        <option>guest</option>
                                    </select>
                                    <select style="padding:7px; margin-right: 10px" id='listOfGenders' v-model="searchedUser.gender">
                                        <option disabled value="">Gender</option>
                                        <option>male</option>
                                        <option>female</option>
                                        <option>other</option>
                                    </select>
                                    <button class="btn btn-outline-success my-2 my-sm-0" type="button" v-on:click='searchUser()'>Search</button>
                                    </form>
                                </nav>
                            </div> 

                            <div class="container" >
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
                        <br>
                        <br>
                        Pregled svih korisnika
                        Kao Administrator:
                        Imam pregled svih postojećih korisnika u sistemu, a mogu vršiti i pretragu
                    </div>

                    <div v-if='isHost'>
                        <h3>As a host on this page you can see list of all users that have reservation on your's apartment.</h3>
                            Kao Domaćin:
                            Imam pregled svih korisnika koji su napravili rezervaciju za moje apartmane i
                            mogu vršiti pretragu među njima

                            Mozda i da ne budu 2 odvojena pogleda veca jedan isit tj.jedna ista tabela koju popunjavamo drugacije u
                            zavisnosti od role korisnika.
                    </div>
            </div>
        </div>
    `,
    data:function(){
        return{
            user:{
                username:'',
                role:''
            },
            users:[
                {
                    username:'username1',
                    password:'password1',
                    firstname:'Test',
                    lastname:'Testovic',
                    gender:'M',
                    role:'admin',
                },
                {
                    username:'username2',
                    password:'password2',
                    firstname:'Test1',
                    lastname:'Testovic1',
                    gender:'M',
                    role:'host',
                },
                {
                    username:'username3',
                    password:'password3',
                    firstname:'Test2',
                    lastname:'Testovic',
                    gender:'M',
                    role:'host',
                },
                {
                    username:'username4',
                    password:'password4',
                    firstname:'Test3',
                    lastname:'Testovic',
                    gender:'M',
                    role:'guest',
                },
                {
                    username:'username5',
                    password:'password5',
                    firstname:'Testa',
                    lastname:'Testovic',
                    gender:'Z',
                    role:'guest',
                },
            ],
            //User objekat koji sadrzi atribute po kojima pretrazujemo i
            // kojeg saljemo na bek.
            searchedUser: {
				username: '',
                gender: '',
                role:'',
            },
            isAdmin:false,
            isHost:false,
            isGuest:false
        }
    },
    methods:{
        searchUser(){
            alert(`Trazite usera ${this.searchedUser.username}
            ${this.searchedUser.gender}
            ${this.searchedUser.role}
            `);
        }
    },
    created(){
        this.user.username = localStorage.getItem('user');
        this.user.role = localStorage.getItem('role');
        if(this.user.role == "ADMIN"){
            this.isAdmin = true;
            //get metoda koja vraca sve usere.
        }else if(this.user.role == "HOST"){
            this.isHost = true;
            //get metoda koja vraca sve usere tipa guest koji imaju rezervaciju kod tog hosta
        }else{
            this.isGuest= true;
        }
    },
});