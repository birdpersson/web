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
                <br>
                <br>
                <table border="1px;">
                <thead>
                    <tr >
                        <th colspan="4">
                            Pregled svih guests rezervacija
                        </th>
                    </tr>
                    <tr>
                        <th>Atribut1</th>
                        <th>Atribut2</th>
                        <th>Odustani</th>
                        <th>Ostavi komentar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>atribut1</td>
                        <td>atribut2</td>
                        <td><button v-on:click='message'> Odustani</button></td>
                        <td><router-link to="/newComment"><button> + Komentar </button></router-link></td>
                        
                    </tr>
                    <tr>
                        <td>atribut3</td>
                        <td>atribut4</td>
                        <td><button v-on:click='message'> Odustani</button></td>
                        <td><router-link to="/newComment"><button> + Komentar </button></router-link></td>
                    </tr>
                </tbody>
            </table>


            </p> 
   
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
        message:function(){
            alert('Ako je aktivna rezervacija ovim bi se ona otkazala!');
        }
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