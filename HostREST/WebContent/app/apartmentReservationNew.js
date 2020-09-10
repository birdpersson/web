Vue.component('new-reservation', {
    template: `
<div id="new-Reservation">
    <div class="container" id='page-title'>
        <h1 style="margin-top:10px;color:#35424a;">Create new <span id='titleEffect'>Reservation</span></h1>
        <hr style='background:#e8491d;height:1px;'>
    </div>

    <div id='main' class='container'>
        <div v-if='isGuest'>
            <div class="card-body">
                <h3 class="card-title">
                    <label for="">Type: </label>
                    <span style="font-size: 25px;">{{apartment.type}}</span>
                </h3>
                <h3 class="card-title">
                    <label for="">Address: </label>
                    <span style="font-size: 25px;">{{apartment.location.address.street}} -
                        {{apartment.location.address.postalCode}} {{apartment.location.address.city}}</span>
                </h3>
                <hr style='background:#e8491d;height:1px;'>

                <label>Select Checkin Date:</label>
                <div>
                    <vuejsDatepicker :inline="true" :disabled-dates="disabledDates" :highlighted="dates"
                        v-model="dates.from" v-on:input="calculatePrice()">
                    </vuejsDatepicker>
                </div>
                <div style="margin-top:20px" v-if='messages.errorDates' class="alert alert-danger" v-html="messages.errorDates"></div>

                <label>Number of nights:</label>
                <select style="padding:7px; margin-right: 10px" id='NoOfNights' v-model="reservation.night"
                    v-on:click="calculatePrice()">
                    <option disabled value="">No. of nights</option>
                    <option v-for='night in nights'>{{night}}</option>
                </select>
                <label for="">Price:</label>
                <h4>{{reservation.price}}$ </h4>
                <label>Message:</label>
                <textarea v-model='reservation.message' placeholder="Enter message..."></textarea>
                <button class="btn btn-lg btn-success" v-on:click='sendReservation'> Send </button>
            </div>
        </div>
    </div>
</div>
`,
    data: function () {
        return {
            user: {
                username: '',
                role: ''
            },
            isAdmin: false,
            isHost: false,
            isGuest: false,

            reservation: {
                apartmentId: null,
                guestId: null,
                from: null,
                to: null,
                night: null,
                price: null,
                confirmation: false,
                message: ""
            },

            apartment: {
                type: null,
                rooms: null,
                guests: null,
                location: {
                    latitude: '',
                    longitude: '',
                    address: {
                        street: '',
                        city: '',
                        postalCode: ''
                    }
                },
                to: null,
                from: null,
                price: null,
                reservations: []
            },

            disabledDates: {
                ranges: [],
                to: null,
                from: null,
            },

            ranges: [{ // Disable dates in given ranges (exclusive).
                from: new Date(2020, 9, 25),
                to: new Date(2020, 9, 30)
              }, {
                from: new Date(2020, 10, 12),
                to: new Date(2020, 10, 15)
              }],

            night: null,
            nights: null,
            dates: {
                from: null,
                to: null,
                includeDisabled: true
            },
            messages: {
                errorDates: ""
            }
        }
    },
    methods: {
        setApartment: function (data) {
            console.log(data);
            this.apartment = data;
            this.disabledDates.to = new Date(this.apartment.to);
            this.disabledDates.from = new Date(this.apartment.from);

            if (this.reservations != null) {
                for (let i = 0; i < reservations.length; i++) {
                    let available = {
                        from: new Date(reservations[i].from),
                        to: new Date(reservations[i].to),
                    }
                    this.disabledDates.ranges.push(available);
                    //cutting corners
                }
            }
        },
        sendReservation() {
            if (this.dates.to >= this.disabledDates.from) {
                this.messages.errorDates = `<h4>Reservation checkout date not available!</h4>`;
                setTimeout(() => this.messages.errorDates = '', 20000);
            } else {
                this.reservation.from = this.dates.from.getTime();
                this.reservation.to = this.dates.to.getTime();

                console.log(this.reservation);
                axios
                    .post('rest/reservation', this.reservation)
                    .then(Response => (console.log(Response)));
            }
        },

        // pomocna metoda za ogranicen odabir dana:
        range: function (start = 1, end) {
            var ans = [];
            for (let i = start; i <= end; i++) {
                ans.push(i);
            }
            return ans;
        },

        //Metoda za automatsko racunanje cene rezervacija spram cene apartmana * broj nocenja
        calculatePrice: function () {
            this.reservation.price = this.reservation.night * this.apartment.price;
            this.dates.to = new Date(this.dates.from.getTime() + this.reservation.night * 1000 * 60 * 60 * 24);
        },

        insertReservData: function () {
            // dodaje se u rezervaciju id apartmana za koji se pravi rezervacija
            this.reservation.apartmentId = this.apartmentId;
            // dodaje se u rezervaciju id gusta koji pravi rezervaciju
            this.reservation.guestId = this.user.username;
        },

        // getApartmentData: function () {
        //     axios
        //         .get(`rest/apartment/${this.apartmentId}`)
        //         .then(response => {
        //             this.apartment.type = response.data.type;
        //             this.apartment.rooms = response.data.rooms;
        //             this.apartment.price = response.data.price;
        //             this.apartment.location = response.data.location;
        //             this.disabledDates.to = response.data.to;
        //             this.disabledDates.from = response.data.from;
        //         })
        // }

    },
    components: {
        vuejsDatepicker
    },
    computed: {
        id() {
            return this.$route.params.id; //preuzimam id apartmana na cijoj sam stranici za prikaz komentara
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
            //preuzima se id apartmana iz url-a
            this.apartmentId = this.id;

            this.insertReservData();
            // this.getApartmentData();
        }

    },
    mounted() {
        //dodaje se opseg dana za izbor trajanja odmora
        this.nights = this.range(1, 28);

        axios
            .get('rest/apartment/' + this.$route.params.id)
            .then(Response => (this.setApartment(Response.data)));
    }
});