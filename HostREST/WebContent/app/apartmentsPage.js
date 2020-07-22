Vue.component('apartments',{
    template:`
        <div id="apartments-overview">
            <header id='main-header'>
                <h1> App Title </h1>
                <nav>
                    <ul>
                        <li><router-link to="/homepage">Home</router-link></li> 
                        <li v-if='!isGuest'><router-link to="/users">Users</router-link></li>
                        <li><router-link to="/reservations">Reservations</router-link></li>
                        <li><router-link to="/profile">Profile</router-link></li>
                    </ul>
                </nav>
            </header>
            <div> 
                <h1>Hello from Overview Apartments Page {{user.username}}!</h1>
                <h3>You are {{user.role}}</h3>
            </div>
            <p v-if='isGuest'>
                Pregled rezervacija<br>
                ● Kao Gost:<br>
                ○ Želim da imam pregled svih svojih rezervacija:<br>
                ■ Imam i mogućnost odustanka od rezervacija, ali samo onih sa statusom<br>
                KREIRANA ili PRIHVAĆENA, pri čemu novi status postaje ODUSTANAK<br>


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
            </p> 
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