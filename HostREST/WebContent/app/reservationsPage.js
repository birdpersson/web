Vue.component('reservations',{
    template:`
        <div id="reservation-list">
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
                            </li><!--Zakomentarisati za navbar-->
            
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
                <h1>Reservation Page {{user.username}}!</h1>
                <h3>You are {{user.role}}</h3>
            </div>
            <p v-if='isAdmin'>
                Kao Administratoru:<br>
                ○ Omogućen mi je pregled svih rezervacija u sistemu<br>
                <table border="1px;">
                <thead>
                    <tr>
                        <th colspan="4">
                            Pregled svih rezervacija
                        </th>
                    </tr>
                    <tr>
                        <th>Atribut1</th>
                        <th>Atribut2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>atribut1</td>
                        <td>atribut2</td>

                    </tr>
                    <tr>
                        <td>atribut3</td>
                        <td>atribut4</td>
                    </tr>
                </tbody>
            </table>
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
                <br>
                <br>
                <table border="1px;">
                <thead>
                    <tr>
                        <th colspan="4">
                            Pregled svih rezervacija stanova tog hosta
                        </th>
                    </tr>
                    <tr>
                        <th>Atribut1</th>
                        <th>Atribut2</th>
                        <th>Status</th>
                        <th>Status</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>atribut1</td>
                        <td>atribut2</td>
                        <td><button v-on:click='messageHost'> prihvacen </button></td>
                        <td><button v-on:click='messageHost'> odbijen </button></td>
                        <td><button v-on:click='messageHost'> zavrsen </button></td>
                    </tr>
                    <tr>
                        <td>atribut3</td>
                        <td>atribut4</td>
                        <td><button v-on:click='messageHost'> prihvacen </button></td>
                        <td><button v-on:click='messageHost'> odbijen </button></td>
                        <td><button v-on:click='messageHost'> zavrsen </button></td>
                    </tr>
                </tbody>
            </table>

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
        },
        messageHost:function(){
            alert('Menja se status rezervacije!');
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