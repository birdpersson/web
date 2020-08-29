Vue.component('new-apartment', {
	template: `
<div id="new-apartment">
	<div class="container" id='page-title'>
		<h1 style="margin-top:10px;color:#35424a;"> New/<span id='titleEffect'>Edit Apartment</span></h1>
		<hr style='background:#e8491d;height:1px;'>
	</div>

	<div class="container" id='main'>
		<div v-if='isHost'>

			<label>Type of apartment</label>
			<select v-model="apartment.type">
				<option v-for="type in types" v-on:click="checkApartment">{{type}}</option>
			</select>

			<label>Number of rooms</label>
			<img src="img/negativ1.1.png" v-show="!isApartment">
			<select v-show="isApartment" v-model="apartment.rooms">
				<option disabled value="">No. of rooms</option>
				<option v-for="room in rooms">{{room}}</option>
			</select>

			<label>Number of guests</label>
			<select v-model="apartment.guests">
				<option disabled value="">No. of guests</option>
				<option v-for="guest in guests">{{guest}}</option>
			</select>

			<label>Location</label>
			<input class='half-size' type="text" placeholder="Enter location latitude..."
			v-model='apartment.location.latitude'> -
			<input class='half-size' type="text" placeholder="Enter location longitude..."
				v-model='apartment.location.longitude'>

			<div class="row">
				<label style="display:inline;">Address</label>
				<input placeholder="Enter street" v-model='apartment.location.address.street'>
				<input placeholder="Enter city" v-model='apartment.location.address.city'>
				<input placeholder="Enter postal colde" v-model='apartment.location.address.postalCode'>	
			</div>

			<label>Price</label>
			<input id='price' type="text" placeholder="Enter price..." v-model='apartment.price'>

			<label>Time to checkin & checkout</label>
			<input class='half-size' type="text" placeholder="Checkin..." v-model='apartment.checkin'> -
			<input class='half-size' type="text" placeholder="Checkout..." v-model='apartment.checkout'>

			<label>Dates available</label>
			<div class="row">
				<div class="col">
					<vuejsDatepicker placeholder="Select Checkin Date" v-model="apartment.dates.from" :highlighted="apartment.dates"></vuejsDatepicker>
				</div>
				<div class="col">
					<vuejsDatepicker placeholder="Select Checkout Date" v-model="apartment.dates.to" :highlighted="apartment.dates"></vuejsDatepicker>
				</div>
			</div>

			<button class="btn btn-lg btn-success" v-on:click="create(this.apartment)">Save</button>
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

			isApartment: true,

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
				dates: {
					to: null,
					from: null
				},
				// availability:null,
				host: localStorage.getItem("username"),
				// reviews:null,
				images: null,
				price: null,
				checkin: '2 PM',
				checkout: '10 AM',
				amenities: []
			},

			types: ['APARTMENT', 'ROOM'],

			disabledDates: {
				ranges: [],
				to: null,
				from: null
			},

			highlighted: {
				to: null,
				from: null
			},
			checkinDate: null,
			checkoutDate: null,
			date: null
		}
	},
	methods: {
		create: function (apartment) {
			axios
				.post('rest/apartment/new', apartment)
				.then(Response => (this.newApartmentSuccessful(Response)))
		},
		update: function (apartment) {

		},
		checkSave: function () {
			// this.apartment.location = this.location

			alert(`
            type:${this.apartment.type}\n
            rooms:${this.apartment.rooms}\n
            guests:${this.apartment.guests}\n
			longitude:${this.apartment.location.longitude}\n
			latitude:${this.apartment.location.latitude}\n
			address:${this.apartment.location.address}\n
			dates:${this.apartment.dates}\n
			to:${this.apartment.dates.to}\n
			from:${this.apartment.dates.from}\n
            host:${this.apartment.host}\n
            reviews:${this.apartment.reviews}\n
            images:${this.apartment.images}\n
            price:${this.apartment.price}\n
            checkin:${this.apartment.checkin}\n
            checkout:${this.apartment.checkout}\n
            status:${this.apartment.status}\n
            amenities:${this.apartment.amenities}\n
            `);
		},
		checkApartment: function () {
			if (this.apartment.type === "APARTMENT") {
				this.isApartment = true;
			}
			else {
				this.isApartment = false;
			}
		},
		// pomocna metoda za ogranicen odabir dana:
		range(start = 1, end) {
			var ans = [];
			for (let i = start; i <= end; i++) {
				ans.push(i);
			}
			return ans;
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
	mounted() {
		if (this.isGuest === true) {
			//preuzeti hosta pa ga smestiti ovde;
			//ovo samo za test
			this.apartment.host = this.user.username;
		}
		this.rooms = this.range(1, 10);
		this.guests = this.range(1, 15);
	},
	components: {
		vuejsDatepicker
	}
});

