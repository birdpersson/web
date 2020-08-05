Vue.component('reservations', {
    template: `
<div id='reservation-list'>
    <div class="container" id='page-title'>
        <h1 style="margin-top:10px;color:#35424a;">List of <span id='titleEffect'>Reservations</span></h1>
        <hr style='background:#e8491d;height:1px;'>
    </div>

    <div class="container" id='main'>

        <div v-if='!isGuest'>
          ● Kao Domaćin/Administrator:<br>
            ○ Želim da pretražim rezervacije po korisničkom imenu gosta koji je kreirao
            rezervaciju,<br>
            ○ Želim da sortiram rezervacije po ceni:<br>
            ■ Rastuće<br>
            ■ Opadajuće<br>
            ○ Želim da filtriram rezervacije po statusu
            <br>
            <br>
            <div id='filter'>
                <nav class="navbar navbar-light bg-light justify-content-between">
                    <a class="navbar-brand">Filter&Search</a>
                    <form class="form-inline">
                        <div>
                            <img src='img/filterIcon1.1.png' style="display:inline;">
                            <select style="padding:7px; margin-right: 10px" id='listOfRoles' v-model="filterQuery">
                                <option disabled value="">Status</option>
                                <option v-for='status in statuses'>{{status}}</option>
                            </select>
                        </div>
                        <div>
                            <img src='img/searchIcon1.1.png' style="display:inline;">
                            <input class="form-control mr-sm-2" type="text" placeholder="username" aria-label="Search">
                        </div>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="button" v-on:click=''>Search</button>
                    </form>
                </nav>
            </div>

            <table class="table">
                <thead>
                    <tr>
                        <th>Reserved by</th>
                        <th>Apartment type</th>
                        <th>Apartment location</th>
                        <th>Date</th>
                        <th>Night</th>
                        <th @click="sort('price')">Price <img v-if='currentSortDir == "asc"'
                                src='img/up-arrow1.1.png'><img v-if='currentSortDir == "desc"'
                                src='img/down-arrow1.1.png'></th>
                        <th>Confirmation</th>
                        <th>Status</th>
                        <th v-if='isHost'>Status</th>
                        <th v-if='isHost'>Status</th>
                        <th v-if='isHost'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr  v-bind:key='reservations.id' v-for="reservation in filteredReservations">
                        <td>{{reservation.userId}}</td>
                        <td>{{reservation.apartmentType}}</td>
                        <td>{{reservation.apartmentLocation}}</td>
                        <td>{{reservation.date}}</td>
                        <td>{{reservation.night}}</td>
                        <td>{{reservation.price}}</td>
                        <td>{{reservation.confirmation}}</td>
                        <td>{{reservation.status}}</td>
                        <td v-if='isHost'><button v-on:click='messageHost'> prihvacen </button></td>
                        <td v-if='isHost'><button v-on:click='messageHost'> odbijen </button></td>
                        <td v-if='isHost'><button v-on:click='messageHost'> zavrsen </button></td>
                    </tr>
                </tbody>
            </table>
        </div> <!--!isGeust-->

        <div v-if='isGuest'>
          Pregled rezervacija<br>
            ● Kao Gost:<br>
            ○ Želim da imam pregled svih svojih rezervacija:<br>
            ■ Imam i mogućnost odustanka od rezervacija, ali samo onih sa statusom<br>
            KREIRANA ili PRIHVAĆENA, pri čemu novi status postaje ODUSTANAK<br>
            <br>
            Mogu da ostavim komnetar na apartman za koji imam rezervaciju sa statusom ODBIJENA ili ZAVRSENA.
            <br>
            Kao Gost:<br>
            ○ Želim da sortiram svoje rezervacije po ceni:<br>
            ■ Rastuće<br>
            ■ Opadajuće<br>
            <br>

            <table class="table">
                <thead>
                    <tr>
                        <th>Apartment type</th>
                        <th>Apartment location</th>
                        <th>Date</th>
                        <th>Night</th>
                        <th @click="sort('price')">Price <img v-if='currentSortDir == "asc"'
                                src='img/up-arrow1.1.png'><img v-if='currentSortDir == "desc"'
                                src='img/down-arrow1.1.png'></th>
                        <th>Confirmation</th>
                        <th>Status</th>
                        <th>Cancel reserv.</th>
                        <th>Leave comment</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-bind:key='reservations.id' v-for="reservation in filteredReservations">
                        <td>{{reservation.apartmentType}}</td>
                        <td>{{reservation.apartmentLocation}}</td>
                        <td>{{reservation.date}}</td>
                        <td>{{reservation.night}}</td>
                        <td>{{reservation.price}}</td>
                        <td>{{reservation.confirmation}}</td>
                        <td>{{reservation.status}}</td>
                        <td><button :disabled='statusCancel(reservation.status)' v-on:click='message'> Odustani </button></td>
                        <td><button :disabled='statusComment(reservation.status)'v-on:click='addComment(reservation.apartmentId)'> + Komentar </button></td>
                    </tr>
                </tbody>
            </table>
        </div><!--isGeust-->
    </div><!--id='main'-->
</div> <!-- reservation-list-->` ,
    data: function () {
        return {
            user: {
                username: '',
                role: ''
            },

            isAdmin: false,
            isHost: false,
            isGuest: false,

            //sort data //promeniti u reservations
            reservations: [
                {
                    id: '1',
                    apartmentType: 'apar',
                    apartmentLocation: 'Fiftieth street',
                    apartmentId:'1',
                    userId:'guest',
                    date: '01.01.2020',
                    night: '10',
                    price: 250,
                    confirmation: true,
                    status: "Created"
                },
                {
                    id: '2',
                    apartmentType: 'panthhouse',
                    apartmentLocation: 'Main Boulevard 1',
                    apartmentId:'1',
                    userId:'guest222',
                    date: '01.01.2020',
                    night: '15',
                    price: 100,
                    confirmation: true,
                    status: "Created"
                },
                {
                    id: '3',
                    apartmentType: 'panthhouse',
                    apartmentLocation: 'Main Boulevard 2',
                    apartmentId:'2',
                    userId:'guest',
                    date: '01.01.2020',
                    night: '15',
                    price: 50,
                    confirmation: false,
                    status: 'Canceled'
                },
                {
                    id: '4',
                    apartmentType: 'panthhouse',
                    apartmentLocation: 'Main Boulevard 3',
                    apartmentId:'3',
                    userId:'gue12st',
                    date: '01.01.2020',
                    night: '20',
                    price: 150,
                    confirmation: true,
                    status: 'Canceled'
                },
                {
                    id: '5',
                    apartmentType: 'panthhouse',
                    apartmentLocation: 'Main Boulevard 4',
                    apartmentId:'2',
                    userId:'guest213',
                    date: '01.01.2020',
                    night: '20',
                    price: 550,
                    confirmation: true,
                    status: 'Accepted'
                },
                {
                    id: '6',
                    apartmentType: 'panthhouse',
                    apartmentLocation: 'Main Boulevard 5',
                    apartmentId:'1',
                    userId:'guest3123',
                    date: '01.01.2020',
                    night: '20',
                    price: 450,
                    confirmation: true,
                    status: 'Accepted'
                },
                {
                    id: '7',
                    apartmentType: 'panthhouse',
                    apartmentLocation: 'Main Boulevard 6',
                    apartmentId:'1',
                    userId:'guest123',
                    date: '01.01.2020',
                    night: '20',
                    price: 1000,
                    confirmation: true,
                    status: 'Completed'
                },
                {
                    id: '8',
                    apartmentType: 'panthhouse',
                    apartmentLocation: 'Main Boulevard 7',
                    apartmentId:'2',
                    userId:'gues213t',
                    date: '01.01.2020',
                    night: '20',
                    price: 1000,
                    confirmation: true,
                    status: 'Completed'
                },

            ],

            //sortiranje:
            currentSort: 'name',
            currentSortDir: 'asc',

            //filtriranje:
            statuses: ['Created', 'Rejected', 'Canceled', 'Accepted', 'Completed'],
            filterQuery: '',

 
        }
    },
    methods: {
        message: function () {
            alert('Ako je aktivna rezervacija ovim bi se ona otkazala!');
        },
        messageHost: function () {
            alert('Menja se status rezervacije!');
        },

        addComment: function(apartmentId){
            this.$router.push(`/newComment/${apartmentId}`);
        },

        sort: function (s) {
            //if s == current sort, reverse
            if (s === this.currentSort) {
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
            }
            this.currentSort = s;
        },

        statusCancel:function(status){
            if(status==="Created" || status==='Accepted'){
                return false; //nemoj disable uraditi
            }
            return true; //za sve ostale ce uraditi disable
        },
        statusComment:function(status){
            if(status==="Rejected" || status==='Completed'){
                return false; //nemoj disable uraditi
            }
            return true; //za sve ostale ce uraditi disable
        }
    },
    computed: {
        sortedReservations: function () {
            return this.reservations.sort((a, b) => {
                let modifier = 1;
                if (this.currentSortDir === 'desc') modifier = -1;
                if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                return 0;
            });
        },
        //filtriranje #2
        filteredReservations: function () {
            return this.sortedReservations.filter((items) => {
                for (var item in items) {
                    if (String(items[item]).indexOf(this.filterQuery) !== -1) {
                        return true
                    }
                }
                return false
            })
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