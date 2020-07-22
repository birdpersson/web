Vue.component('new-comment',{
    template:`
        <div id="aparm-new-comment">
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