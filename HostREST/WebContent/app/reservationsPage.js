Vue.component('reservations',{
    template:`
        <div id="reservation-list">
            <header id='main-header'>
                <h1> App Title </h1>
                <nav>
                    <ul>
                        <li><router-link to="/homepage">Home</router-link></li>
                        <li><router-link to="/apartments">Apartments</router-link></li>     
                        <li v-if='!isGuest'><router-link to="/users">Users</router-link></li>
                        <li><router-link to="/profile">Profile</router-link></li>
                    </ul>
                </nav>
            </header>
            <div> 
                <h1>Hello from Overview Reservation Page {{user.username}}!</h1>
                <h3>You are {{user.role}}</h3>
            </div>
            <p v-if='isAdmin'>
                Kao Administratoru:<br>
                ○ Omogućen mi je pregled svih rezervacija u sistemu<br>
            </p> 
            <p v-if='isHost'>
                Kao Domaćin:<br>
                ○ Imam pregled rezervacija nad svim mojim apartmanima (bez obzira na status):<br>
                ■ Mogu da prihvatim rezervaciju koja se nalazi u statusu KREIRANA, pri<br>
                čemu rezervacija menja status u PRIHVAĆENA<br>
                ■ Mogu da odbijem rezervaciju ako se nalazi u statusu KREIRANA ili<br>
                PRIHVAĆENA, pri čemu rezervacija menja status u ODBIJENA<br>
                ■ Nakon završnog datuma noćenja, mogu da postavim rezervaciju na<br>
                status ZAVRŠENA<br>
            </p>
            <p v-if='isGuest'>
                Pregled rezervacija<br>
                ● Kao Gost:<br>
                ○ Želim da imam pregled svih svojih rezervacija:<br>
                ■ Imam i mogućnost odustanka od rezervacija, ali samo onih sa statusom<br>
                KREIRANA ili PRIHVAĆENA, pri čemu novi status postaje ODUSTANAK<br>
            </p> 
            <footer >
                <p>Copyrights &copy; Web Programiranje 2020</p>
            </footer>
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