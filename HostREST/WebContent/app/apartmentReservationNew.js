Vue.component('new-reservation', {
	template: `
<div id="new-Reservation">
    <div class="container" id='page-title'>
        <h1 style="margin-top:10px;color:#35424a;">Create new <span id='titleEffect'>Reservation</span></h1>
        <hr style='background:#e8491d;height:1px;'>
    </div>

    <div id='main' class='container'>
        <div v-if='messages.errorResponse' class="alert alert-danger" v-html="messages.errorResponse"></div>
        <div v-if='messages.successResponse' class="alert alert-success" v-html="messages.successResponse"></div>
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


                <div style="margin-top:20px" v-if='messages.errorDates' class="alert alert-danger" v-html="messages.errorDates"></div>
                <label>Select Checkin Date:</label>
                <div>
                    <vuejsDatepicker :inline="true" :disabled-dates="disabledDates" :highlighted="dates"
                        v-model="dates.from" v-on:input="calculatePriceAndDate()">
                    </vuejsDatepicker>
                </div>

                <label>Number of nights:</label>
                <select style="padding:7px; margin-right: 10px" id='NoOfNights'  v-model="reservation.night"
                    v-on:click="calculatePriceAndDate()">
                    <option disabled value="">No. of nights</option>
                    <option v-for='night in nights'>{{night}}</option>
                </select>
                <!-- <h2>Selected: {{reservation.night}}</h2> -->
                <label for="">Price:</label>
                <h4>{{reservation.price}}$ </h4>
                <div style="margin-top:20px" v-if='messages.errorMessage' class="alert alert-danger" v-html="messages.errorMessage"></div>
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
				to: null,
				from: null,
				ranges: [],
			},

			night: null,
			nights: null,
			dates: {
				from: new Date,
				to: null,
				includeDisabled: true
			},
			messages: {
				errorDates: '',
				errorMessage: '',
				errorResponse: '',
				successResponse: '',
			},
			error: false,

		}
	},
	methods: {
		setApartment: function (data) {
			this.apartment = data;
			this.disabledDates.to = new Date(this.apartment.to - 1000 * 60 * 60 * 24);
			this.disabledDates.from = new Date(this.apartment.from);

			let today = new Date();
			if (this.disabledDates.to < today) {
				today.setDate(today.getDate() - 1);

				this.disabledDates.to = today;
			}
			this.insertReservData();

			if (this.apartment.reservations != null) {
				for (let i = 0; i < this.apartment.reservations.length; i++) {
					let available = {
						from: new Date(this.apartment.reservations[i].from),
						to: new Date(this.apartment.reservations[i].to + 1000 * 60 * 60 * 24)
					}
					this.disabledDates.ranges.push(available);
				}
			}
		},
		sendReservation() {
			for (let i = 0; i < this.disabledDates.ranges.length; i++) {
				if (this.dates.from <= this.disabledDates.ranges[i].from && this.dates.to > this.disabledDates.ranges[i].from) {
					this.error = true;
				}
			}
			//Provera da li je unet datum
			if (this.dates.to == null) {
				this.messages.errorDates = `<h4>Reservation checkout date can't be empty!</h4>`;
				setTimeout(() => this.messages.errorDates = '', 10000);
			}
			//Ako je datum unet provera da li je dostupan
			else if (this.dates.to >= this.disabledDates.from || this.error) {
				this.messages.errorDates = `<h4>Filed checkout date not available!</h4>`;
				setTimeout(() => this.messages.errorDates = '', 10000);
			}
			//Provera da li je unet tekst poruke
			else if (this.reservation.message == '') {
				this.messages.errorMessage = `<h4>Message can't be empty!</h4>`;
				setTimeout(() => this.messages.errorMessage = '', 10000);
			}
			else {
				// datepicker disables day after reservatoin.from
				this.reservation.from = this.dates.from.getTime();
				this.reservation.to = this.dates.to.getTime();

				axios
					.post('rest/reservation', this.reservation)
					.then(response => {
						this.messages.successResponse = `<h4>Your reservation was sent successfully!</h4>`;
						this.reservation.message = '';
						this.reservation.night = 1;
						this.reservation.price = this.apartment.price;
						setTimeout(() => this.messages.successResponse = '', 5000);
						if (response.status === 201) {
							alert('Reservation created');
							this.$router.push('/reservations');
						}

					})
					.catch(error => {
						if (error.response.status === 500 || error.response.status === 404) {
							this.messages.errorResponse = `<h4>We had some server errors, please try again later!</h4>`;
							setTimeout(() => this.messages.errorResponse = '', 5000);
						}
					});
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

		//Metoda za automatsko racunanje krajneg datuma spram broja nocenja i cene rezervacija spram cene apartmana * broj nocenja
		calculatePriceAndDate: function () {
			this.reservation.price = this.reservation.night * this.apartment.price;
			this.dates.to = new Date(this.dates.from.getTime() + this.reservation.night * 1000 * 60 * 60 * 24);
			this.error = false;
		},

		insertReservData: function () {
			// dodaje se u rezervaciju id apartmana za koji se pravi rezervacija
			this.reservation.apartmentId = this.apartmentId;

			// dodaje se u rezervaciju id gusta koji pravi rezervaciju
			this.reservation.guestId = this.user.username;

			// dodaje se u rezervaciju inicijalni broj nocenja koji je uvek bar 1
			this.reservation.night = 1;

			// dodaje se u rezervaciju cene rezervacije spram cene apartmana * broj nocenja kao i krajnji datum;
			this.calculatePriceAndDate();
		},
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
		if (!localStorage.getItem('jwt'))
			this.$router.push('/login');

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