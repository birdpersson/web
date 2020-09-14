Vue.component('apartment-edit', {
	template: `
	<div id="new-apartment">
	  <div class="container" id='page-title'>
		<h1 style="margin-top:10px;color:#35424a;">Edit <span id='titleEffect'>Apartment</span></h1>
		<hr style='background:#e8491d;height:1px;'>
	  </div>
	  
	  <div class="container" id='main'>
	  <div v-if='messages.errorResponse' class="alert alert-danger" v-html="messages.errorResponse"></div>
	  <div v-if='messages.successResponse' class="alert alert-success" v-html="messages.successResponse"></div>
		<div>
		  <div style="margin-top:20px" v-if='messages.errorType' class="alert alert-danger" v-html="messages.errorType"></div>          
		  <label>Type of apartment</label>
		  <select v-model="apartment.type">
			<option v-for="type in types" v-on:click="checkApartment">{{type}}</option>
		  </select>
	
		  <div style="margin-top:20px" v-if='messages.errorRooms' class="alert alert-danger" v-html="messages.errorRooms"></div>          
		  <label>Number of rooms</label>
		  <select v-show="isApartment()" v-model="apartment.rooms">
			<option disabled value="">No. of rooms</option>
			<option v-for="room in rooms">{{room}}</option>
		  </select>
		  <div v-show="!isApartment()">
			<img src="./img/negativ1.1.png" alt=""> <span>This option is anavailable</span>
		  </div>
	
		  <div style="margin-top:20px" v-if='messages.errorGuests' class="alert alert-danger" v-html="messages.errorGuests"></div>          
		  <label>Number of guests</label>
		  <select v-model="apartment.guests">
			<option disabled value="">No. of guests</option>
			<option v-for="guest in guests">{{guest}}</option>
		  </select>
	
		  <div style="margin-top:20px" v-if='messages.errorLocation' class="alert alert-danger" v-html="messages.errorLocation"></div>          
		  <label>Location</label>
		  <input class='half-size' type="text" placeholder="Enter location latitude..."
			v-model='apartment.location.latitude'> -
		  <input class='half-size' type="text" placeholder="Enter location longitude..."
			v-model='apartment.location.longitude'>
	
		  <div style="margin-top:20px" v-if='messages.errorAddress' class="alert alert-danger" v-html="messages.errorAddress"></div>          
			<label>Address</label>
			<div> 
			  <input class="one-third" placeholder="Enter street" v-model='apartment.location.address.street'>
			  <input class="one-third" placeholder="Enter city" v-model='apartment.location.address.city'>
			  <input class="one-third" placeholder="Enter postal code" v-model='apartment.location.address.postalCode'>
			</div>
		
		  <div style="margin-top:20px" v-if='messages.errorPrice' class="alert alert-danger" v-html="messages.errorPrice"></div>          
		  <label>Price</label>
		  <input id='price' type="text" placeholder="Enter price..." v-model='apartment.price'>
	
		  <div style="margin-top:20px" v-if='messages.errorCheckInOut' class="alert alert-danger" v-html="messages.errorCheckInOut"></div>          
		  <label>Time to checkin & checkout</label>
		  <input class='half-size' type="text" placeholder="Checkin..." v-model='apartment.checkin'> -
		  <input class='half-size' type="text" placeholder="Checkout..." v-model='apartment.checkout'>
	
		  <div style="margin-top:20px" v-if='messages.errorDates' class="alert alert-danger" v-html="messages.errorDates"></div>          
		  <label>Dates available</label>
		  <div class="row">
			<div class="col">
			  <vuejsDatepicker placeholder="Select Checkin Date" v-model="dates.from" :highlighted="dates" :disabled-dates="disabledDates">
			  </vuejsDatepicker>
			</div>
			<div class="col">
			  <vuejsDatepicker placeholder="Select Checkout Date" v-model="dates.to" :highlighted="dates" :disabled-dates="disabledDates">
			  </vuejsDatepicker>
			</div>
		  </div>
	
		  <div style="margin-top:20px" v-if='messages.errorAmenities' class="alert alert-danger" v-html="messages.errorAmenities"></div>          
		  <label>Amenities</label>
		  <div id='amenities' style="margin-top:20px">
			  <div class="row">
				<div class="col-md-3 col-sm-6 mb-4">
					<h4>Base</h4>
					<ul style="list-style: none; padding-left:0px" v-for="base in amenities.base">
					  <li><input :value="base" v-model="apartment.amenities" type="checkbox"> {{base.name}}</li>
					</ul>
				</div>
	
			  <div class="col-md-3 col-sm-6 mb-4">
				  <h4>Family</h4>
				  <ul style="list-style: none; padding-left:0px" v-for="family in amenities.family">
					  <li><input :value="family" v-model="apartment.amenities" type="checkbox"> {{family.name}}</li>
				  </ul>
			  </div>
	
			  <div class="col-md-3 col-sm-6 mb-4">
				  <h4>Dining</h4>
				  <ul style="list-style: none; padding-left:0px" v-for="dining in amenities.dining">
					  <li><input :value="dining" v-model="apartment.amenities" type="checkbox"> {{dining.name}}</li>
				  </ul>
			  </div>
	
			  <div class="col-md-3 col-sm-6 mb-4">
				  <h4>Facilities</h4>
				  <ul style="list-style: none; padding-left:0px" v-for="fac in amenities.fac">
					  <li><input :value="fac" v-model="apartment.amenities" type="checkbox"> {{fac.name}}</li>
				  </ul>
			  </div>
			  
			</div> <!--.row-->
		  </div><!--#amenities-->
  
		  <div>
			<label>Images</label>
			<input type="file" class="filestyle" multiple v-on:change="handleFileUploads()">	
		  </div>
  
		  <!--   
			<div>
			<h2>Images overview</h2>
			<div class="carousel-item" v-for="img in images" :style="{'background-image': 'url(' + img + ')'}">
			</div> 
		  </div> -->
  
		  <div v-if='messages.errorResponse' class="alert alert-danger" v-html="messages.errorResponse"></div>
	  <div v-if='messages.successResponse' class="alert alert-success" v-html="messages.successResponse"></div>
		  <button class="btn btn-lg btn-success" v-on:click="create(apartment)">Save</button>
		</div>
	  </div>
	</div>
	`
	,
	data: function () {
		return {

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
				checkin: '2 PM',
				checkout: '10 AM',
				amenities: []
			},

			types: ['APARTMENT', 'ROOM'],
			rooms: null,
			guests: null,
			images: null,
			amenities: [],

			dates: {
				from: null,
				to: null
			},

			disabledDates: {
				to: null
			},

			highlighted: {
				to: null,
				from: null
			},
			apartmentId: '',

			messages: {
				errorType: '',
				errorRooms: '',
				errorGuests: '',
				errorLocation: '',
				errorAddress: '',
				errorPrice: '',
				errorCheckInOut: '',
				errorDates: '',
				errorAmenities: '',
				errorResponse: '',
				successResponse: '',
			},
			allAmenities: [], //svi amenties koji su u bazi
			amenities: {
				base: [],
				family: [],
				dining: [],
				fac: [],
			},
		}
	},

	methods: {
		create: function (apartment) {
			if (this.apartment.type == null) {
				this.messages.errorType = `<h4>Field type of apartment can't be empty!</h4>`;
				setTimeout(() => this.messages.errorType = '', 10000);
			}
			else if (this.apartment.rooms == null && this.apartment.type == 'APARTMENT') {
				this.messages.errorRooms = `<h4>Field rooms of apartment can't be empty!</h4>`;
				setTimeout(() => this.messages.errorRooms = '', 10000);
			}
			else if (this.apartment.guests == null) {
				this.messages.errorGuests = `<h4>Field number of guests of apartment can't be empty!</h4>`;
				setTimeout(() => this.messages.errorGuests = '', 10000);
			}

			//Apartment location
			else if (this.apartment.location.latitude == '') {
				this.messages.errorLocation = `<h4>Field latitude of apartment can't be empty!</h4>`;
				setTimeout(() => this.messages.errorLocation = '', 10000);
			}
			//Provera da li je apartment latitude broj;
			else if (this.isNumeric(this.apartment.location.latitude)) {
				this.messages.errorLocation = `<h4>Latitude of apartment must be number!</h4>`;
				setTimeout(() => this.messages.errorLocation = '', 10000);
			}
			else if (this.apartment.location.longitude == '') {
				this.messages.errorLocation = `<h4>Field longitude of apartment can't be empty!</h4>`;
				setTimeout(() => this.messages.errorLocation = '', 10000);
			}
			//Provera da li je apartment longitude broj;
			else if (this.isNumeric(this.apartment.location.longitude)) {
				this.messages.errorLocation = `<h4>Longitude of apartment must be number!</h4>`;
				setTimeout(() => this.messages.errorLocation = '', 10000);
			}

			//Apartment address
			else if (this.apartment.location.address.street == '') {
				this.messages.errorAddress = `<h4>Field street of address of apartment can't be empty!</h4>`;
				setTimeout(() => this.messages.errorAddress = '', 10000);
			}
			else if (this.apartment.location.address.city == '') {
				this.messages.errorAddress = `<h4>Field city of address of apartment can't be empty!</h4>`;
				setTimeout(() => this.messages.errorAddress = '', 10000);
			}
			else if (this.apartment.location.address.postalCode == '') {
				this.messages.errorAddress = `<h4>Field postal code of address of apartment can't be empty!</h4>`;
				setTimeout(() => this.messages.errorAddress = '', 10000);
			}

			//Apartment price: 
			else if (this.apartment.price == null) {
				this.messages.errorPrice = `<h4>Field price of apartment can't be empty!</h4>`;
				setTimeout(() => this.messages.errorPrice = '', 10000);
			}
			//Provera da li je cena broj;
			else if (this.isNumeric(this.apartment.price)) {
				this.messages.errorPrice = `<h4>Price of apartment must be number!</h4>`;
				setTimeout(() => this.messages.errorPrice = '', 10000);
			}

			else if (this.apartment.checkin == '') {
				this.messages.errorCheckInOut = `<h4>Field check in of apartment can't be empty!</h4>`;
				setTimeout(() => this.messages.errorCheckInOut = '', 5000);
			}
			else if (this.apartment.checkout == '') {
				this.messages.errorCheckInOut = `<h4>Field check out of apartment can't be empty!</h4>`;
				setTimeout(() => this.messages.errorCheckInOut = '', 5000);
			}
			else if (this.dates.from == null) {
				this.messages.errorDates = `<h4>Field checkin date of apartment can't be empty!</h4>`;
				setTimeout(() => this.messages.errorDates = '', 5000);
			}
			else if (this.dates.to == null) {
				this.messages.errorDates = `<h4>Field checkout to of apartment can't be empty!</h4>`;
				setTimeout(() => this.messages.errorDates = '', 5000);
			}
			else if (this.apartment.amenities == '') {
				this.messages.errorAmenities = `<h4>Amenities of apartment can't be empty!</h4>`;
				setTimeout(() => this.messages.errorAmenities = '', 5000);
			}
			else {

				// unselected dates will be disabled
				this.apartment.to = this.dates.from.getTime();
				this.apartment.from = this.dates.to.getTime() + 1000 * 60 * 60 * 24;
				console.log(this.apartment);
				// axios
				//     .post('rest/apartment', this.apartment)
				//     .then(Response => {
				//     console.log(Response);
				//     this.messages.successResponse = `<h4>Apartment was edited successfully!</h4>`;                
				//     setTimeout(() => this.messages.successResponse='', 5000);
				// })
				// .catch(error => {
				//     if(error.response.status === 500 || error.response.status === 404){
				//         this.messages.errorResponse= `<h4>We had some server errors, please try again later!</h4>`;
				//         setTimeout(() => this.messages.errorResponse='', 5000);
				//     }
				// });
			}
		},

		update: function (apartment) {

		},
		handleFileUploads() {

		},
		submitFiles: function () {

		},
		checkApartment: function () {
			if (this.apartment.type == "ROOM") {
				this.isApartment = false;
			}
			else {
				this.isApartment = true;
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

		// pomocna metoda za razvrstavanje amenities:
		arrangeAndCheckAmenities() {
			for (let i = 0; i < this.allAmenities.length; i++) {
				if (this.allAmenities[i].type === 'Base') {
					this.amenities.base.push(this.allAmenities[i]);
				}
				else if (this.allAmenities[i].type === 'Family') {
					this.amenities.family.push(this.allAmenities[i]);
				}
				else if (this.allAmenities[i].type === 'Dining') {
					this.amenities.dining.push(this.allAmenities[i]);
				}
				else if (this.allAmenities[i].type === 'Facilities') {
					this.amenities.fac.push(this.allAmenities[i]);
				}
			}
		},
		isNumeric(num) {
			//isNaN(num) returns true if the variable does NOT contain a valid number
			return isNaN(num);
		},
		isApartment() {
			if (this.apartment.type == 'APARTMENT') {
				return true;
			}
			else {
				return false;
			}
		}
	},
	computed: {
		id() {
			return this.$route.params.id; //preuzimam id apartmana koji hocu da editujem 
		}
	},
	created() {
		if (!localStorage.getItem('jwt'))
			this.$router.push('/login');

		this.apartmentId = this.id;
		axios
			.get(`rest/apartment/${this.apartmentId}`)
			.then(response => {
				this.apartment = response.data;
			})

		axios
			.get('rest/amenity/all')
			.then(response => {
				this.allAmenities = response.data;
				this.arrangeAndCheckAmenities();
			})
	},

	mounted() {
		this.rooms = this.range(1, 10);
		this.guests = this.range(1, 15);

		let to = new Date();
		to.setDate(to.getDate() - 1)

		this.disabledDates.to = to;
	},

	components: {
		vuejsDatepicker
	}
});

