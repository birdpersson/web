Vue.component('reservations',{
    template:`
    <div id='reservation-list'>
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
        </div> <!--navigation-->

        <div class="container" id='page-title'>
            <h1 style="margin-top:10px;color:#35424a;" >List of <span id='titleEffect'>Reservations</span></h1>
            <hr style='background:#e8491d;height:1px;'>  
        </div>

        <div class="container" id='main'>

            <div v-if='isGuest'>
                Pregled rezervacija<br>
                ● Kao Gost:<br>
                ○ Želim da imam pregled svih svojih rezervacija:<br>
                ■ Imam i mogućnost odustanka od rezervacija, ali samo onih sa statusom<br>
                KREIRANA ili PRIHVAĆENA, pri čemu novi status postaje ODUSTANAK<br>
                <br>
                <br>
                <table class="table">
                    <thead>
                        <tr>
                            <th colspan="9">
                                Pregled svih guests rezervacija
                            </th>
                        </tr>
                        <tr>
                            <th>Apartment type</th>
                            <th>Apartment location</th>
                            <th>Date</th>
                            <th>Night</th>
                            <th @click="sort('price')">Price  <img v-if='currentSortDir == "asc"' src='img/up-arrow1.1.png'><img v-if='currentSortDir == "desc"' src='img/down-arrow1.1.png'></th>
                            <th>Confirmation</th>
                            <th>Status</th>
                            <th>Cancel reserv.</th>
                            <th>Leave comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-bind:key='apartments.id' v-for="apartment in sortedApartments">
                            <td>{{apartment.apartmentType}}</td>
                            <td>{{apartment.apartmentLocation}}</td>
                            <td>{{apartment.date}}</td>
                            <td>{{apartment.night}}</td>
                            <td>{{apartment.price}}</td>
                            <td>{{apartment.confirmation}}</td>
                            <td>{{apartment.status}}</td>
                            <td><button v-on:click='message'> Odustani</button></td>
                            <td><router-link to="/newComment"><button> + Komentar </button></router-link></td>
                        </tr>
                    </tbody>
                </table>

            </div>  <!--isGeust-->
        </div> <!--id='main'-->

    </div> <!-- reservation-list-->` ,
    data:function(){
        return{
            user:{
                username:'',
                role:''
            },
            
            isAdmin:false,
            isHost:false,
            isGuest:false,

            //sort data
            apartments:[
                {
                    id:'1',
                    apartmentType:'apar',
                    apartmentLocation:'Fiftieth street',
                    date:'01.01.2020',
                    night:'10',
                    price:250,
                    confirmation: true,
                    status:'confirmed'
                },
                {
                    id:'2',
                    apartmentType:'panthhouse',
                    apartmentLocation:'Main Boulevard 1',
                    date:'01.01.2020',
                    night:'15',
                    price:100,
                    confirmation: true,
                    status:'confirmed'
                },
                {
                    id:'3',
                    apartmentType:'panthhouse',
                    apartmentLocation:'Main Boulevard 2',
                    date:'01.01.2020',
                    night:'15',
                    price:50,
                    confirmation: false,
                    status:'waiting'
                },
                {
                    id:'4',
                    apartmentType:'panthhouse',
                    apartmentLocation:'Main Boulevard 3',
                    date:'01.01.2020',
                    night:'20',
                    price:150,
                    confirmation: true,
                    status:'waiting'
                },

            ],
            currentSort:'name',
            currentSortDir:'asc'
        }
    },
    methods:{
        message:function(){
            alert('Ako je aktivna rezervacija ovim bi se ona otkazala!');
        },
        messageHost:function(){
            alert('Menja se status rezervacije!');
        },

        sort:function(s) {
            //if s == current sort, reverse
            if(s === this.currentSort) {
              this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
            }
            this.currentSort = s;
          }
    },
    computed:{
        sortedApartments:function() {
          return this.apartments.sort((a,b) => {
            let modifier = 1;
            if(this.currentSortDir === 'desc') modifier = -1;
            if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
          });
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