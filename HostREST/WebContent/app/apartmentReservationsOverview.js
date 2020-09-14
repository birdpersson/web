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
            ○ Želim da filtriram rezervacije po statusu<br>
            <br>
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
                            <input class="form-control mr-sm-2" type="text" placeholder="username" aria-label="Search" v-model="searchedQuery">
                        </div>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="button" v-on:click='search()'>Search</button>
                    </form>
                </nav>
            </div>
            <div v-if='messages.errorResponse' class="alert alert-danger" v-html="messages.errorResponse"></div>
            <div v-if='messages.successResponse' class="alert alert-success" v-html="messages.successResponse"></div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Reserved by</th>
                        <th>Apart. type</th>
                        <th>Apart. locat.</th>
                        <th>Date</th>
                        <th>Night</th>
                        <th @click="sort('price')">Price <img v-if='currentSortDir == "asc"'
                                src='img/up-arrow1.1.png'><img v-if='currentSortDir == "desc"'
                                src='img/down-arrow1.1.png'></th>
                        <th>Confirmation</th>
                        <th>Status</th>
                        <th v-if='isHost'>Status</th>
                
                    </tr>
                </thead>
                <tbody>
                    <tr  v-bind:key='reservations.id' v-for="reservation in filteredReservations">
                        <td>{{reservation.guestId}}</td>
                        <td>{{reservation.type}}</td>
                        <td>{{reservation.address}}</td>
                        <td>{{reservation.from | moment}}</td>
                        <td>{{reservation.to | moment}}</td>
                        <td>{{reservation.night}}</td>
                        <td>{{reservation.price}}</td>
                        <td>{{reservation.confirmation}}</td>
                        <td>{{reservation.status}}</td>
                        <td v-if='isHost'>
                            <button v-if='statusAccept(reservation)' v-on:click='acceptReservation(reservation)'> accept </button>
                            <button v-if='statusReject(reservation)' v-on:click='rejectReservation(reservation)'> reject </button>
                            <button v-if='statusComplete(reservation)' v-on:click='completeReservation(reservation)'> complete </button>
                        </td>
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
            <div v-if='messages.errorResponse' class="alert alert-danger" v-html="messages.errorResponse"></div>
            <div v-if='messages.successResponse' class="alert alert-success" v-html="messages.successResponse"></div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Apart. type</th>
                        <th>Apart. locat.</th>
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
                        <td>{{reservation.type}}</td>
                        <td>{{reservation.address}}</td>
                        <td>{{reservation.from | moment}}</td>
                        <td>{{reservation.to | moment}}</td>
                        <td>{{reservation.night}}</td>
                        <td>{{reservation.price}}</td>
                        <td>{{reservation.confirmation}}</td>
                        <td>{{reservation.status}}</td>
                        <td><button :disabled='statusCancel(reservation.status)' v-on:click='cancelReservation(reservation)'> Cancel </button></td>
                        <td><button :disabled='statusComment(reservation.status)'v-on:click='addComment(reservation.apartmentId)'> + Comment </button></td>
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

            reservations: [],

            //sortiranje:
            currentSort: 'name',
            currentSortDir: 'asc',

            //filtriranje:
            statuses: ['Created', 'Rejected', 'Canceled', 'Accepted', 'Completed'],
            filterQuery: '',
            searchedQuery: '',

            messages: {
                errorName: '',
                errorType: '',
                errorResponse: '',
                successResponse: '',
            },

            updatedReserv: {
                id: null,
                apartmentId: null,
                guestId: null,
                date: null,
                night: null,
                price: null,
                confirmation: null,
                message: null,
                status: null,
            },

        }
    },
    methods: {
        messageHost: function () {
            alert('Promeni se status!');
        },
        getReservations: function () {
            axios
                .get(`rest/reservation/`)
                .then(response => {
                    this.reservations = response.data;
                })
        },
        cancelReservation: function (chosenReservation) {
            if (confirm('Do you whant to cancel this reservation?')) {
                //Mora da se iz reservationDTO prebaci u reservation model pre slanja;
                this.updatedReserv.id = chosenReservation.id;
                this.updatedReserv.apartmentId = chosenReservation.apartmentId;
                this.updatedReserv.guestId = chosenReservation.guestId;
                this.updatedReserv.date = chosenReservation.date;
                this.updatedReserv.night = chosenReservation.night;
                this.updatedReserv.price = chosenReservation.price;
                this.updatedReserv.confirmation = chosenReservation.confirmation;
                this.updatedReserv.message = chosenReservation.message;
                this.updatedReserv.status = 'Canceled';

                axios
                    .put(`rest/reservation/${this.updatedReserv.id}`, this.updatedReserv)
                    .then(response => {
                        this.getReservations();
                        this.messages.successResponse = `<h4>You successfuly canceled reservation!</h4>`;

                        setTimeout(() => this.messages.successResponse = '', 5000);
                    }).catch(error => {
                        if (error.response.status === 400) {
                            this.messages.errorResponse = `<h4>We had some server errors, please try again later!</h4>`;

                            setTimeout(() => this.messages.errorResponse = '', 5000);
                        }
                    });
            }
        },

        acceptReservation: function (chosenReservation) {
            if (confirm('Do you whant to accept this reservation?')) {
                //Mora da se iz reservationDTO prebaci u reservation model pre slanja;
                this.updatedReserv.id = chosenReservation.id;
                this.updatedReserv.apartmentId = chosenReservation.apartmentId;
                this.updatedReserv.guestId = chosenReservation.guestId;
                this.updatedReserv.date = chosenReservation.date;
                this.updatedReserv.night = chosenReservation.night;
                this.updatedReserv.price = chosenReservation.price;
                this.updatedReserv.confirmation = chosenReservation.confirmation;
                this.updatedReserv.message = chosenReservation.message;
                this.updatedReserv.status = 'Accepted';

                axios
                    .put(`rest/reservation/${this.updatedReserv.id}`, this.updatedReserv)
                    .then(response => {
                        this.getReservations();
                        this.messages.successResponse = `<h4>You successfuly accepted reservation!</h4>`;

                        setTimeout(() => this.messages.successResponse = '', 5000);
                    }).catch(error => {
                        if (error.response.status === 400) {
                            this.messages.errorResponse = `<h4>We had some server errors, please try again later!</h4>`;

                            setTimeout(() => this.messages.errorResponse = '', 5000);
                        }
                        else if (error.response.status === 403) {
                            this.messages.errorResponse = `<h4>You don't have permission for this action!</h4>`;

                            setTimeout(() => this.messages.errorResponse = '', 5000);
                        }
                    });
            }
        },

        rejectReservation: function (chosenReservation) {
            if (confirm('Do you whant to reject this reservation?')) {
                //Mora da se iz reservationDTO prebaci u reservation model pre slanja;
                this.updatedReserv.id = chosenReservation.id;
                this.updatedReserv.apartmentId = chosenReservation.apartmentId;
                this.updatedReserv.guestId = chosenReservation.guestId;
                this.updatedReserv.date = chosenReservation.date;
                this.updatedReserv.night = chosenReservation.night;
                this.updatedReserv.price = chosenReservation.price;
                this.updatedReserv.confirmation = chosenReservation.confirmation;
                this.updatedReserv.message = chosenReservation.message;
                this.updatedReserv.status = 'Rejected';

                axios
                    .put(`rest/reservation/${this.updatedReserv.id}`, this.updatedReserv)
                    .then(response => {
                        this.getReservations();
                        this.messages.successResponse = `<h4>You successfuly rejected reservation!</h4>`;

                        setTimeout(() => this.messages.successResponse = '', 5000);
                    }).catch(error => {
                        if (error.response.status === 400) {
                            this.messages.errorResponse = `<h4>We had some server errors, please try again later!</h4>`;

                            setTimeout(() => this.messages.errorResponse = '', 5000);
                        }
                        else if (error.response.status === 403) {
                            this.messages.errorResponse = `<h4>You don't have permission for this action!</h4>`;

                            setTimeout(() => this.messages.errorResponse = '', 5000);
                        }
                    });
            }
        },
        completeReservation: function (chosenReservation) {
            if (confirm('Do you whant to complete this reservation?')) {
                //Mora da se iz reservationDTO prebaci u reservation model pre slanja;
                this.updatedReserv.id = chosenReservation.id;
                this.updatedReserv.apartmentId = chosenReservation.apartmentId;
                this.updatedReserv.guestId = chosenReservation.guestId;
                this.updatedReserv.date = chosenReservation.date;
                this.updatedReserv.night = chosenReservation.night;
                this.updatedReserv.price = chosenReservation.price;
                this.updatedReserv.confirmation = chosenReservation.confirmation;
                this.updatedReserv.message = chosenReservation.message;
                this.updatedReserv.status = 'Completed';

                axios
                    .put(`rest/reservation/${this.updatedReserv.id}`, this.updatedReserv)
                    .then(response => {
                        this.getReservations();
                        this.messages.successResponse = `<h4>You successfuly completed reservation!</h4>`;

                        setTimeout(() => this.messages.successResponse = '', 5000);
                    }).catch(error => {
                        if (error.response.status === 400) {
                            this.messages.errorResponse = `<h4>We had some server errors, please try again later!</h4>`;

                            setTimeout(() => this.messages.errorResponse = '', 5000);
                        }
                        else if (error.response.status === 403) {
                            this.messages.errorResponse = `<h4>You don't have permission for this action!</h4>`;

                            setTimeout(() => this.messages.errorResponse = '', 5000);
                        }
                    });
            }
        },
        addComment: function (apartmentId) {
            this.$router.push(`/newComment/${apartmentId}`);
        },
        sort: function (s) {
            //if s == current sort, reverse
            if (s === this.currentSort) {
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
            }
            this.currentSort = s;
        },
        statusCancel: function (status) {
            if (status === "Created" || status === 'Accepted') {
                return false; //nemoj disable uraditi
            }
            return true; //za sve ostale ce uraditi disable
        },
        statusComment: function (status) {
            if (status === "Rejected" || status === 'Completed') {
                return false; //nemoj disable uraditi
            }
            return true; //za sve ostale ce uraditi disable
        },


        //Za dugmad kod Host:
        statusAccept: function (reservation) {
            if (reservation.status === 'Created') { //prelazi u Accepted
                return true;
            }
            return false;
        },
        statusReject: function (reservation) {
            if (reservation.status === 'Accepted' || reservation.status === "Created") {//prelazi u Rejected
                return true;
            }
            return false;
        },
        statusComplete: function (reservation) {
            //fali i length>current.date uslov, jer rezervacija mora biti prihvacena
            //i da je istekao odmor 
            if (reservation.status === 'Accepted') {
                return true;
            }

            // Nakon završnog datuma noćenja, mogu da postavim rezervaciju na
            // status ZAVRŠENA
            // const length = reservation.date + reservation.night;
            // if(length>current.date){
            //     return true;
            // }
            // return false; 
        },
        search: function () {
            axios
                .get(`rest/reservation/search?username=${this.searchedQuery}`)
                .then(response => {
                    this.reservations = response.data;
                })

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
            this.getReservations();
        } else if (this.user.role == "HOST") {
            this.isHost = true;
            this.getReservations();
        } else {
            this.isGuest = true;
            this.getReservations();
        }
    },
    filters: {
        moment: function (date) {
            // US date format
            return this.moment(date).format("MMMM Do YYYY");
        }
    }
});


