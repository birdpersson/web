Vue.component('profile',{
    template:`
        <div id="user-profile">
            <header id='main-header'>
                <h1> App Title </h1>
                <nav class="nav navbar-nav">
                    <ul>
                        <li><router-link to="/homepage">Home</router-link></li>
                        <li><router-link to="/apartments">Apartments</router-link></li>                  
                        <li v-if='!isGuest'><router-link to="/users">Users</router-link></li>
                        <li><router-link to="/reservations">Reservations</router-link></li>
                    </ul>
                 
                </ul>
                </nav>
            </header>
            <div> 
                <h1>Hello from Profile Page {{user.username}}!</h1>
                <h3>You are {{user.role}}</h3>
                <p>
                Izmena ličnih podataka<br>
                    ● Kao ulogovani korisnik bilo kog tipa:<br>
                    ○ Imam uvid u svoje lične podatke<br>
                    ○ Mogu da menjam svoje lične podatke, kao i lozinku (osim korisničkog imena)<br>
                    ■ Sve izmene moraju biti validne - ako neko polje nije popunjeno ili lozinke<br>
                    nisu odgovarajuće (stara nije dobra ili nova i kontrolna nisu iste), pored<br>
                    odgovarajućeg polja se ispisuje poruka o grešci<br>
                    ■ Pritiskom na dugme za slanje se šalje zahtev za izmenu na server<br>
                    ■ U slučaju uspešne izmene podata korisnik se obaveštava o tome<br>
                    ■ U slučaju neuspešne izmene podata korisniku se ispisuje greška<br>
                </p>
                <br>
                <hr>
                <br>
                <h2 class="title">User Profile</h2>   
                <hr style='background:#e8491d;'>
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
                        <router-link to='/patient/update'><button type='button' class="btn btn-lg btn-success "> Update </button> </router-link> 
                        </div>
                    </form>
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
            profile:{
                username:'tttesttt',
                password:'test12345',
                firstname:'Test',
                lastname:'Testovic',
                gender:'M',
                role:'admin',
            },
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