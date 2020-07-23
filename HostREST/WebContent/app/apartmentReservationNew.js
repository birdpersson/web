Vue.component('new-reservation',{
    template:`
        <div id="new-Reservation">
            <header id='main-header'>
                <h1> App Title </h1>
                <nav>
                    <ul>
                        <li><router-link to="/homepage">Home</router-link></li>
                        <li><router-link to="/apartments">Apartments</router-link></li>                      
                        <li v-if='!isGuest'><router-link to="/users">Users</router-link></li>
                        <li><router-link to="/reservations">Reservations</router-link></li>
                        <li><router-link to="/profile">Profile</router-link></li>
                    </ul>
                </nav>
            </header>
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