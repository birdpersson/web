Vue.component('new-reservation',{
    template:`
        <div id="new-Reservation">
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
                <h1>Hello from kreiranje nove rezervacije za odabrani stan {{user.username}}!</h1>
                <h3>You are {{user.role}} (sme samo guest)</h3>
            
                <p v-if='isGuest'>
                    Kreiranje rezervacije<br>
                    ● Kao Gost, ja jedini mogu da izvršim kreiranje rezervacije:<br>
                    ○ Rezervaciju apartmana obavljam po sledećem postupku<br>
                    ■ Odaberem apartman koji hoću da rezervišem, a zatim mi se omogućava<br>
                    pregled datuma kad je dostupan<br>
                    ■ Biram datum početka rezervacije i unosim broj noćenja<br>
                    ■ Unosim poruku namenjenu domaćinu<br>
                    ■ Klikom na dugme šalje se zahtev za kreuranje rezervacije na server<br>
                    (potrebno je izvršiti i proveru raspoloživosti apartmana)<br>
                    ■ Ukoliko je sve u redu kreira se rezervacija sa statusom KREIRANA<br>
                    ■ Ukoliko provera nije prošla Gostu se ispisuje poruka da rezervaciju nije<br>
                    moguće izvršiti za navedene datume<br>
                    
                    <button>Sacuvaj</button>
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