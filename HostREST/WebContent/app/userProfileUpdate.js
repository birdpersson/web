Vue.component('profile-update',{
    template:`
        <div id="profile-update">
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
            <div>

                <h2 class="title">User Profile Update</h2>   
                <hr style='background:#e8491d;'>
                <div class="container">          

                    <fieldset class="form-group">
                        <label>Korisnicko ime</label>
                        <input type="text" class="form-control" v-model="profile.username"  disabled/>
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Ime</label>
                        <input type="text" class="form-control" v-model="profile.firstname" />
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Prezime</label>
                        <input type="text" class="form-control" v-model="profile.lastname" />
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Adresa</label>
                        <input type="text" class="form-control" v-model="profile.gender" />
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Grad</label>
                        <input type="text" class="form-control" v-model="profile.role" />
                    </fieldset>

                    <hr>

                    <fieldset class="form-group">
                        <label>Sifra</label>
                        <input type="text" class="form-control" v-model="profile.newPassword" />
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Nova Sifra</label>
                        <input type="text" class="form-control" v-model="profile.newPassword" />
                    </fieldset>

                    <fieldset class="form-group">
                        <label>Potvrda sifre</label>
                        <input type="text" class="form-control" v-model="profile.newPasswordRepeat" />
                    </fieldset>

                <button type="button" class="btn btn-lg btn-success" v-on:click='updatePacijentProfile'> Save </button>
                </div>
            </div>
        </div>
        <br>
        <hr>
        <br>
        <h1>Hello from Profile Page {{user.username}}!</h1>
        <h3>You are {{user.role}}</h3>
        <p>
        Izmena ličnih podataka<br>
            ● Kao ulogovani korisnik bilo kog tipa:<br>
            ○ Mogu da menjam svoje lične podatke, kao i lozinku (osim korisničkog imena)<br>
            ■ Sve izmene moraju biti validne - ako neko polje nije popunjeno ili lozinke<br>
            nisu odgovarajuće (stara nije dobra ili nova i kontrolna nisu iste), pored<br>
            odgovarajućeg polja se ispisuje poruka o grešci<br>
            ■ Pritiskom na dugme za slanje se šalje zahtev za izmenu na server<br>
            ■ U slučaju uspešne izmene podata korisnik se obaveštava o tome<br>
            ■ U slučaju neuspešne izmene podata korisniku se ispisuje greška<br>
        </p>
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
                newPassword:'',
                newPasswordRepeat:'',

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