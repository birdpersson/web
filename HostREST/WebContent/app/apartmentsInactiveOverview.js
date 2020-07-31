Vue.component('inactive-overview', {
    template: `
<div id="home">
    <div>
        <div class="container" id='page-title'>
            <h1 style="margin-top:10px;color:#35424a;">Overview inactive <span id='titleEffect'>Apartments</span></h1>
            <hr style='background:#e8491d;height:1px;'>
        </div>
        <div class="container" id='main'>
            <div v-if='isHost'>
                Kao Domaćin imam mogućnost:<br>
                ○ Pregleda, sortiranja i filtriranja po svim kriterijumima, ali isključivo svojih<br>
                apartmana sa statusom AKTIVAN<br>
                ○ Imam pregled svojih apartmana sa statusom NEAKTIVAN<br>

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
                            <th v-if='isGuest'>Comments</th>
                            <th v-if='isGuest'>Reserv</th>
                            <!-- <th v-if='isGuest'>Add aparment</th> -->
                            <th v-if='!isGuest'>Edit</th>
                            <th v-if='!isGuest'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-bind:key='apartments.id' v-for="apartment in sortedApartments">
                            <td>{{apartment.type}}</td>
                            <td>{{apartment.location}}</td>
                            <td>{{apartment.rooms}}</td>
                            <td>{{apartment.dates}}</td>
                            <td>{{apartment.price}}</td>
                            <td>{{apartment.availability}}</td>
                            <td>{{apartment.status}}</td>
                            <td >
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
                            <td v-if='isGuest'>
                                <router-link to="/apartmentComments"><button> Comments </button></router-link>
                            </td>
                            <td v-if='isGuest'>
                                <router-link to="/newReservation"><button> Reserv </button></router-link>
                            </td>

                            <td v-if='!isGuest'><button v-on:click='showMessage'> Delete </button></td>
                            <td v-if='!isGuest'>
                                <router-link to="/apartmentNew"><button> Edit </button></router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div> <!--isHost-->
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

