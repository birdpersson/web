Vue.component('new-apartment', {
	data: function () {
		return {
			isApartment: 'true',

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
				period: {
					to: null,
					from: null
				},
				price: null,
				checkin: '2 PM',
				checkout: '10 AM'
			},

			types: ['APARTMENT', 'ROOM'],
			rooms: null,
			guests: null,

			dates: {
				from: null,
				to: null
			},

			disabledDates: {
				ranges: [],
				to: null,
				from: null
			},

			highlighted: {
				to: null,
				from: null
			},
		}
	},
	template: `
<div id="new-apartment">
	<div class="container" id='page-title'>
		<h1 style="margin-top:10px;color:#35424a;"> New/<span id='titleEffect'>Edit Apartment</span></h1>
		<hr style='background:#e8491d;height:1px;'>
	</div>

	<div class="container" id='main'>
		<div>

			<label>Type of apartment</label>
			<select v-model="apartment.type">
				<option v-for="type in types" v-on:click="checkApartment">{{type}}</option>
			</select>

			<label>Number of rooms</label>
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
					<vuejsDatepicker placeholder="Select Checkin Date" v-model="dates.from" :highlighted="dates"></vuejsDatepicker>
				</div>
				<div class="col">
					<vuejsDatepicker placeholder="Select Checkout Date" v-model="dates.to" :highlighted="dates"></vuejsDatepicker>
				</div>
			</div>

			<button class="btn btn-lg btn-success" v-on:click="create(apartment)">Save</button>
		</div>
	</div>
</div>
`
	,
	methods: {
		create: function (apartment) {
			// unselected dates will be disabled
			this.apartment.period.to = this.dates.from.getTime();
			this.apartment.period.from = this.dates.to.getTime();
			console.log(apartment);
			axios
				.post('rest/apartment', apartment)
				.then(Response => (console.log(Response)))
		},
		update: function (apartment) {

		},
		checkApartment: function () {
			if (this.apartment.type == "ROOM") {
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
	},
	mounted() {
		this.rooms = this.range(1, 10);
		this.guests = this.range(1, 15);
	},
	components: {
		vuejsDatepicker
	}
});

