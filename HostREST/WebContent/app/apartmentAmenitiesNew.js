Vue.component('new-amenities',{
    template:`
        <div id="home">
            <header id='main-header'>
                <h1> App Title </h1>
                <nav class="nav navbar-nav">
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
                <h1>Hello from New Amenities {{user.username}} Only Admin!</h1>
                <h3>You are {{user.role}}</h3>
            
                <p v-if='isAdmin'>
                    Održavanje sadržaja apartmana<br>
                    ● Kao administrator zadužen sam i za održavanje liste koja predstavlja sadržaj apartmana:<br>
                    ○ Mogu da dodajem novi entitet u spisak sadržaja apartmana:<br>
                    
                    ■ Neophodno je uneti naziv novog sadržaja<br>
                    ■ Pritiskom na dugme za slanje se šalje zahtev za dodavanje sadržaja<br>
                    apartmana na server<br>
                    ■ U slučaju uspešnog dodavanja korisnik se obaveštava o tome<br>
                    ■ U slučaju neuspešne izmene korisniku se ispisuje greška<br>
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
