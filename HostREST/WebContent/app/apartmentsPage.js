Vue.component('apartments', {
    template: `
<div id="apartments-overview">
    <div class="container" id='page-title'>
        <h1 style="margin-top:10px;color:#35424a;">List of <span id='titleEffect'>Apartments</span></h1>
        <hr style='background:#e8491d;height:1px;'>
    </div>

    <div class='container 'id='filter'>
        <nav class="navbar navbar-light bg-light justify-content-between">
            <a class="navbar-brand">Filter</a>
            <form class="form-inline">
                <div>
                   <link style='display:inline;'><img v-on:click='isFilter = !isFilter' src='img/filterIcon1.1.png' style="display:inline;"></link>
                    <div style='display:inline;' v-show='isFilter'>
                        <select style="padding:7px; margin-right: 10px" id='listOfTypes' v-model="filterQueryType">
                            <option disabled value="">Types</option>
                            <option v-for='status in statuses'>{{status}}</option>
                        </select>
                        <select style="padding:7px; margin-right: 10px" id='listOfStatuses' v-model="filterQueryStatus">
                            <option disabled value="">Status</option>
                            <option v-for='type in types'>{{type}}</option>
                        </select>
                        <select style="padding:7px; margin-right: 10px" id='listOfAmenities' v-model="filterQueryAmanity">
                            <option disabled value="">Amenities</option>
                            <option v-for='amenity in amenities'>{{amenity}}</option>
                        </select>
                    </div>
                </div>
               
            </form>
        </nav>
    </div>
    <div class='container 'id='filter'>
        <nav class="navbar navbar-light bg-light justify-content-between">
            <a class="navbar-brand">Search</a>
            <form class="form-inline">
                <div>
                    <link style='display:inline;'><img v-on:click='isSearch = !isSearch' src='img/searchIcon1.1.png' style="display:inline;"></link>
                    <div style='display:inline;' v-show='isSearch'>
                        <span>From</span>
                        <input class="form-control mr-sm-2" type="date">
                        <span>To</span>
                        <input class="form-control mr-sm-2" type="date">
                        <span>Price</span>
                        <input class="form-control mr-sm-2" type="text" placeholder="min price" aria-label="Search">
                        <span style="padding-right:2px;"> - </span>
                        <input class="form-control mr-sm-2" type="text" placeholder="max price" aria-label="Search">
                        <div>
                            <span>Location</span>
                            <input class="form-control mr-sm-2" type="text" placeholder="location" aria-label="Search">
                            <span>Rooms</span>
                            <input class="form-control mr-sm-2" type="text" placeholder="No. of rooms" aria-label="Search">
                            <span>Persons</span>
                            <input class="form-control mr-sm-2" type="text" placeholder="No. of people" aria-label="Search">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="button" v-on:click=''>Search</button>
                        </div>
                    </div>
                </div> 
               
            </form>
        </nav>
    </div>


    <div class="container" id='main'>
        <div v-if='isGuest'>                       
            <table class="table">
                <thead>
                    <tr>
                        <th>Apartment type</th>
                        <th>Apartment location</th>
                        <th>Rooms</th>
                        <th>Date</th>
                        <th @click="sort('price')">Price <img style='display:inline;' v-if='currentSortDir == "asc"'
                                src='img/up-arrow1.1.png'><img v-if='currentSortDir == "desc"'
                                src='img/down-arrow1.1.png'></th>
                        <th>Availability</th>
                        <th>Status</th>
                        <th>Amenities</th>
                        <th>Comments</th>
                        <th>Reserv</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-bind:key='apartments.id' v-for="apartment in filteredApartments">
                        <td>{{apartment.type}}</td>
                        <td>{{apartment.location}}</td>
                        <td>{{apartment.rooms}}</td>
                        <td>{{apartment.dates}}</td>
                        <td>{{apartment.price}}</td>
                        <td>{{apartment.availability}}</td>
                        <td>{{apartment.status}}</td>
                        <td>
                            <ul>
                                <li style="list-style: none;display: inline;padding-right:2px;" v-for="amenity in apartment.amenities">{{amenity}}</li>
                            </ul>
                            <!-- <div class="dropdown">
                                <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Amenities </button>
                                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                      <p v-for="amenity in apartment.amenities" class="dropdown-item"> {{amenity}} </p> 
                                  </div>
                            </div> -->
                        </td>
                        <td>
                            <router-link to="/apartmentComments"><button> Comments </button></router-link>
                        </td>
                        <td>
                            <router-link to="/newReservation"><button> Reserv </button></router-link>
                        </td>
                    </tr>
                </tbody>
            </table>

            <router-link to="/reservations"><button id='reservationButton' class="btn btn-lg btn-warning">List of reservations</button></router-link>
        </div> <!--IsGuest-->

        <div v-if='!isGuest'>
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
            <table class="table">
                <thead>
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
                        <td>
                            <router-link to="/apartmentNew"><button> Edit </button></router-link>
                        </td>
                    </tr>
                    <tr>
                        <td>atribut3</td>
                        <td>atribut4</td>
                        <td><button v-on:click='showMessage'> delete </button></td>
                        <td>
                            <router-link to="/apartmentNew"><button> Edit </button></router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id='options'>
            <!--Neaktivni stanovi i dodaj stan pripadaju hostu,
                    Komentari i rezervacije hostu i adminu,
                    dok sadrzaj apartmana samo adminu.-->
            <router-link to="/apartmentComments"> <button v-if='!isGuest' style='padding-left: 5px;'>Komentari</button>
            </router-link>
            <router-link to="/apartInactiveOverview"> <button v-if='isHost' style='padding-left: 5px;'>Neaktivni
                    stanovi</button> </router-link>
            <router-link to="/apartmentNew"> <button v-if='isHost' style='padding-left: 5px;'>Dodaj stan</button>
            </router-link>
            <router-link to="/reservations"> <button v-if='!isGuest' style='padding-left: 5px;'>Rezervacije</button>
            </router-link>
            <router-link to="/amenitiesOverview"> <button v-if='isAdmin' style='padding-left: 5px;'>Sadrzaj apartmana</button> </router-link>
        </div>
    </div>
</div>`,
    data: function () {
        return {
            user: {
                username: '',
                role: ''
            },
            isAdmin: false,
            isHost: false,
            isGuest: false,

        //     private String id;
        //     private String hostId;	//ovo se ne menja jer je vlasnik isti;
        //     private String guestId; //ovo se menja sa promenom gosta;
        //     private Type type;
        //     private int rooms;
        //     private int guests;
        //     private Location location;
        //     private ArrayList<Date> dates;
        //     private ArrayList<Date> availability;
        // //	private Host host;
        //     private ArrayList<Review> reviews;
        //     private ArrayList<String> images;
        //     private int price;
        //     private String checkin;
        //     private String checkout;
        //     private boolean status;
        //     private ArrayList<Amenitie> amenities;
        //     private ArrayList<Reservation> reservations;

            apartments: [
                {
                    id: '1',
                    type: 'ceo apartman',
                    rooms: 4,
                    location: 'Fiftieth street',
                    dates: '01.01.2020',
                    availability: true,
                    price: 250,
                    status: 'aktivno',
                    amenities:['frizider','parking'],
                },
                {
                    id: '2',
                    type: 'ceo apartman',
                    rooms: 6,
                    apartmentLocation: 'Main Boulevard 1',
                    dates: '01.01.2020',
                    availability: true,
                    price: 100,
                    status: 'aktivno',
                    amenities:['frizider','parking','TV'],
                },
                {
                    id: '3',
                    type: 'soba',
                    rooms: 1,
                    location: 'Main Boulevard 2',
                    dates: '01.01.2020',
                    availability: true,
                    price: 150,
                    status: 'aktivno',
                    amenities:['parking','klima','TV'],
                },
                {
                    id: '4',
                    type: 'soba',
                    rooms: 1,
                    location: 'Main Boulevard 3',
                    dates: '01.01.2020',
                    availability: true,
                    price: 350,
                    status: 'neaktivno',
                    amenities:['parking','klima','TV'],
                },
            
                {
                    id: '5',
                    type: 'ceo apartman',
                    rooms: 8,
                    location: 'Main Boulevard 2',
                    dates: '01.01.2020',
                    availability: true,
                    price: 450,
                    status: 'neaktivno',
                    amenities:['frizider','parking','klima','TV','ves masina','djakuzi'],
                },
              

            ],

            //sortiranje:
            currentSort: 'name',
            currentSortDir: 'asc',

            //filtriranje:
            filterQueryType: '',
            filterQueryStatus: '',
            filterQueryAmanity: '',
            types: ['ceo apartman', 'soba'],
            statuses:['aktivno', 'neaktivno'],
            amenities:['frizider','parking','klima','TV','ves masina','djakuzi'],

            isFilter:true,
            isSearch:true,
        }
    },
    methods: {
        showMessage: function () {
            alert('Klikom na ovo dugme se brise odabrani stan!');
        },

        sort: function (s) {
            //if s == current sort, reverse
            if (s === this.currentSort) {
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
            }
            this.currentSort = s;
        },

    },
    computed: {
        sortedApartments: function () {
            return this.apartments.sort((a, b) => {
                let modifier = 1;
                if (this.currentSortDir === 'desc') modifier = -1;
                if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                return 0;
            });
        },
        //Filtriranje #3
        filteredApartments: function () {
            let filteredApartment = null;

            if(this.filterQueryType === '' && this.filterQueryType === '' && this.filterQueryAmanity === ''){
                filteredApartment = this.sortedApartments;
            }

            //Filter by Type: ovde samo gledam sortedApartments
            if(this.filterQueryType !== '' && filteredApartment === null){
                filteredApartment = this.sortedApartments.filter((items) => {
                    for (var item in items) {
                        if (String(items[item]).indexOf(this.filterQueryType) !== -1) {
                            return true
                        }
                    }
                    return false
                })
            }
            else if(this.filterQueryType !== '' && filteredApartment !== null){
                filteredApartment = filteredApartment.filter((items) => {
                    for (var item in items) {
                        if (String(items[item]).indexOf(this.filterQueryType) !== -1) {
                            return true
                        }
                    }
                    return false
                })
            }

            //Filter by Status:
            if(this.filterQueryStatus !== '' && filteredApartment === null){
                filteredApartment = this.sortedApartments.filter((items) => {
                    for (var item in items) {
                        if (String(items[item]).indexOf(this.filterQueryStatus) !== -1) {
                            return true
                        }
                    }
                    return false
                })
            }

            else if(this.filterQueryStatus !== '' && filteredApartment !== null){
                filteredApartment = filteredApartment.filter((items) => {
                    for (var item in items) {
                        if (String(items[item]).indexOf(this.filterQueryStatus) !== -1) {
                            return true
                        }
                    }
                    return false
                })
            }

            //Filter by Amanity:
            if(this.filterQueryAmanity !== '' && filteredApartment === null){
                filteredApartment = this.sortedApartments.filter((items) => {
                    for (var item in items) {
                        if (String(items[item]).indexOf(this.filterQueryAmanity) !== -1) {
                            return true
                        }
                    }
                    return false
                })
            }

            else if(this.filterQueryAmanity !== '' && filteredApartment !== null){
                filteredApartment = filteredApartment.filter((items) => {
                    for (var item in items) {
                        if (String(items[item]).indexOf(this.filterQueryAmanity) !== -1) {
                            return true
                        }
                    }
                    return false
                })
            }

            return filteredApartment;
        }
    },
    created() {
        this.user.username = localStorage.getItem('user');
        this.user.role = localStorage.getItem('role');
        if (this.user.role == "ADMIN") {
            this.isAdmin = true;
        } else if (this.user.role == "HOST") {
            this.isHost = true;
        } else {
            this.isGuest = true;
        }
    },
});