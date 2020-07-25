Vue.component('new-comment',{
    template:`
        <div id="aparm-new-comment">
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
                    </li> 
                </ul>
                            
                <router-link  to='#' class="nav-link" exact> <button class="btn" id='btnLogin'>Log In</button> </router-link>
                <button  class="btn"  id='btnLogout' >Log Out</button> 
                </div>
            </div>
        </nav> 
    </div>
            <div> 
                <h1>Hello from apartment comments overview {{user.username}}!</h1>
                <h3>You are {{user.role}}</h3>

                <p v-if='isGuest'>
                    Kao Gost:<br>
                    ○ Mogu da ostavim komentar na apartman za koji imam rezervaciju sa statusom<br>
                    ODBIJENA ili ZAVRŠENA:<br>
                    <br>
                    ■ Unosim komentar u polje<br>
                    ■ Dodeljujem ocenu apartmanu<br>
                    ■ Klikom na dugme se komentar šalje na server<br>
                    ■ U slučaju uspešnog slanja komentara korisnik se o tome obaveštava<br>
                    ■ U slučaju neuspešnog slanja komentara korisniku se ispisuje greška<br>
                    <br>
                    <br>
                    <button> Potvrdi komentar </button>
                </p>

                <p v-if='isAdmin'>
                   Samo gost ostavlja komentar.
                  
                </p>

                <p v-if='isHost'>
                    Samo gost ostavlja komentar.
                </p>
            </div>
        </div>
    `,
    data:function(){
        return{
            user:{
                username:'',
                role:''
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