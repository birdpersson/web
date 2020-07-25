Vue.component('users',{
    template:`
        <div id="user-list">
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
            <div> 
                <h1>User list {{user.username}}!</h1>
            </div>
            <p v-if='isAdmin'>
            <h3>As an administrator on this page you can see list of all users in the system.</h3>
                    
            

                <br>
                <br>
                Pregled svih korisnika
                Kao Administrator:
                Imam pregled svih postojećih korisnika u sistemu, a mogu vršiti i pretragu
            </p> 
            <p v-if='isHost'>
            <h3>As a host on this page you can see list of all users that have reservation on your's apartment.</h3>
                Kao Domaćin:
                Imam pregled svih korisnika koji su napravili rezervaciju za moje apartmane i
                mogu vršiti pretragu među njima
            </p>

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
            isAdmin:false,
            isHost:false,
            isGuest:false
        }
    },
    methods:{

    },
    created(){
        this.user.username = localStorage.getItem('user');
        this.user.role = localStorage.getItem('role');
        if(this.user.role == "ADMIN"){
            this.isAdmin = true;
        }else if(this.user.role == "HOST"){
            this.isHost = true;
        }else{
            this.isGuest= true;
        }
    },
});