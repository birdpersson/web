Vue.component('apartments',{
    template:`
        <div id="apartments-overview">
            <div id="navigation">
                <nav class="navbar navbar-expand-lg navbar-dark static-top">
                    <div class="container">
                        <h1><span id='titleEffect'>Apartment</span>Finder</h1>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon">TEST</span>
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
                            </li><!--Zakomentarisati za navbar-->
            
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
                <h1>Hello from Overview Apartments Page {{user.username}}!</h1>
                <h3>You are {{user.role}}</h3>
            </div>
            <div id='search'>
                <input type="text" placeholder="datum">
                <input type="text" placeholder="cena">
                <input type="text" placeholder="lokacija">
                <input type="text" placeholder="broj soba">
                <input type="text" placeholder="broj osoba">
            </div>

            <p v-if='isGuest'>
                Kao Guest:<br>
                <table border="1px;">
                    <thead>
                        <tr >
                            <th colspan="4">
                                Lista stanova
                            </th>
                        </tr>
                        <tr>
                            <th>Atribut1</th>
                            <th>Atribut2</th>
                            <th>Komentari</th>
                            <th>Rezervacija</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>atribut1</td>
                            <td>atribut2</td>
                            <td><router-link to="/apartmentComments"><button> Komentari </button></router-link></td>
                            <td><router-link to="/newReservation"><button> Rezervacija </button></router-link></td>
                        </tr>
                        <tr>
                            <td>atribut3</td>
                            <td>atribut4</td>
                            <td><router-link to="/apartmentComments"><button> Komentari </button></router-link></td>
                            <td><router-link to="/newReservation"><button> Rezervacija </button></router-link></td>
                        </tr>
                    </tbody>
                </table>
                <br>  
                <router-link to="/reservations"><button>List of reservations</button></router-link>
            </p> 

            <p v-if='!isGuest'>
                Kao Domaćin:<br>
                ○ Pregleda, sortiranja i filtriranja po svim kriterijumima, ali isključivo svojih<br>
                apartmana sa statusom AKTIVAN<br>
                ○ Imam pregled svojih apartmana sa statusom NEAKTIVAN<br>
                ○ Mogu da menjam podatke o svom apartmanu:<br>
                ■ Sve izmene moraju biti validne - ako neko obavezno polje nije popunjeno,<br>
                pored odgovarajućeg polja se ispisuje poruka o grešci<br>
                ■ Pritiskom na dugme za slanje se šalje zahtev za izmenu na server<br>
                ■ U slučaju uspešne izmene podataka korisnik se obaveštava o tome<br>
                ■ U slučaju neuspešne izmene podataka korisniku se ispisuje greška<br>
                ○ Mogu da obrišem svoj apartman<br>
                <br>
                <br>
                Kao Administratoru:<br>
                ○ Vidim sve apartmane bez obzira na njihov status<br>
                ○ Modifikujem podatke o apartmanu (isti postupak izmene kao kod Domaćina)<br>
                ○ Brišem sve postojeće apartmane<br>
                <br>
                <br>
                <table border="1px;">
                    <thead>
                        <tr >
                            <th colspan="4">
                                Lista stanova
                            </th>
                        </tr>
                        <tr>
                            <th>Atribut1</th>
                            <th>Atribut2</th>
                            <th>Obrisi</th>
                            <th>Izmeni</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>atribut1</td>
                            <td>atribut2</td>
                            <td><button v-on:click='showMessage'> delete </button></td>
                            <td><router-link to="/apartmentNew"><button> Edit </button></router-link></td>
                        </tr>
                        <tr>
                            <td>atribut3</td>
                            <td>atribut4</td>
                            <td><button v-on:click='showMessage'> delete </button></td>
                            <td><router-link to="/apartmentNew"><button> Edit </button></router-link></td>
                        </tr>
                    </tbody>
                </table>
            </p>
            <div id='options' >
                <!--Neaktivni stanovi i dodaj stan pripadaju hostu,
                Komentari i rezervacije hostu i adminu,
                dok sadrzaj apartmana samo adminu.-->  
                <router-link to="/apartmentComments"> <button v-if='!isGuest' style='padding-left: 5px;'>Komentari</button> </router-link>
                <router-link to="/apartInactiveOverview"> <button v-if='isHost'   style='padding-left: 5px;'>Neaktivni stanovi</button> </router-link>
                <router-link to="/apartmentNew"> <button v-if='isHost'   style='padding-left: 5px;'>Dodaj stan</button> </router-link>
                <router-link to="/reservations"> <button v-if='!isGuest' style='padding-left: 5px;'>Rezervacije</button> </router-link>
                <router-link to="/amenitiesOverview"> <button v-if='isAdmin'  style='padding-left: 5px;'>Sadrzaj apartmana</button> </router-link>
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
        showMessage:function(){
            alert('Klikom na ovo dugme se brise odabrani stan!');
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