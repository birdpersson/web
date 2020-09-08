Vue.component("test", {
  template: `
  <div id="new-apartment">
    <div class="container" id='page-title'>
      <h1 style="margin-top:10px;color:#35424a;"> New/<span id='titleEffect'>Edit Apartment TEST</span></h1>
      <hr style='background:#e8491d;height:1px;'>
    </div>
  
    <div v-if='messages.errorResponse' class="alert alert-danger" v-html="messages.errorResponse"></div>
    <div v-if='messages.successResponse' class="alert alert-success" v-html="messages.successResponse"></div>
    <div class="container" id='main'>
      <div>
        <div v-if='messages.errorType' class="alert alert-danger" v-html="messages.errorType"></div>          
        <label>Type of apartment</label>
        <select v-model="apartment.type">
          <option v-for="type in types" v-on:click="checkApartment">{{type}}</option>
        </select>
  
        <div v-if='messages.errorRooms' class="alert alert-danger" v-html="messages.errorRooms"></div>          
        <label>Number of rooms</label>
        <select v-show="isApartment" v-model="apartment.rooms">
          <option disabled value="">No. of rooms</option>
          <option v-for="room in rooms">{{room}}</option>
        </select>
  
        <div v-if='messages.errorGuests' class="alert alert-danger" v-html="messages.errorGuests"></div>          
        <label>Number of guests</label>
        <select v-model="apartment.guests">
          <option disabled value="">No. of guests</option>
          <option v-for="guest in guests">{{guest}}</option>
        </select>
  
        <div v-if='messages.errorLocation' class="alert alert-danger" v-html="messages.errorLocation"></div>          
        <label>Location</label>
        <input class='half-size' type="text" placeholder="Enter location latitude..."
          v-model='apartment.location.latitude'> -
        <input class='half-size' type="text" placeholder="Enter location longitude..."
          v-model='apartment.location.longitude'>
  
        <div v-if='messages.errorAddress' class="alert alert-danger" v-html="messages.errorAddress"></div>          
          <label>Address</label>
          <div> 
            <input class="one-third" placeholder="Enter street" v-model='apartment.location.address.street'>
            <input class="one-third" placeholder="Enter city" v-model='apartment.location.address.city'>
            <input class="one-third" placeholder="Enter postal colde" v-model='apartment.location.address.postalCode'>
          </div>
      
        <div v-if='messages.errorPrice' class="alert alert-danger" v-html="messages.errorPrice"></div>          
        <label>Price</label>
        <input id='price' type="text" placeholder="Enter price..." v-model='apartment.price'>
  
        <div v-if='messages.errorCheckInOut' class="alert alert-danger" v-html="messages.errorCheckInOut"></div>          
        <label>Time to checkin & checkout</label>
        <input class='half-size' type="text" placeholder="Checkin..." v-model='apartment.checkin'> -
        <input class='half-size' type="text" placeholder="Checkout..." v-model='apartment.checkout'>
  
        <div v-if='messages.errorDates' class="alert alert-danger" v-html="messages.errorDates"></div>          
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
  
        <div v-if='messages.errorAmenities' class="alert alert-danger" v-html="messages.errorAmenities"></div>          
        <label>Amenities</label>
        <div id='amenities' style="margin-top:20px">
            <div class="row">
              <div class="col-md-3 col-sm-6 mb-4">
                  <h4>Base</h4>
                  <ul style="list-style: none; padding-left:0px" v-for="base in amenities.base">
                    <li><input :value="base" v-model="apartment.amenities" type="checkbox"> {{base}}</li>
                  </ul>
              </div>
  
            <div class="col-md-3 col-sm-6 mb-4">
                <h4>Family</h4>
                <ul style="list-style: none; padding-left:0px" v-for="family in amenities.family">
                    <li><input :value="family" v-model="apartment.amenities" type="checkbox"> {{family}}</li>
                </ul>
            </div>
  
            <div class="col-md-3 col-sm-6 mb-4">
                <h4>Dining</h4>
                <ul style="list-style: none; padding-left:0px" v-for="dining in amenities.dining">
                    <li><input :value="dining" v-model="apartment.amenities" type="checkbox"> {{dining}}</li>
                </ul>
            </div>
  
            <div class="col-md-3 col-sm-6 mb-4">
                <h4>Facilities</h4>
                <ul style="list-style: none; padding-left:0px" v-for="fac in amenities.fac">
                    <li><input :value="fac" v-model="apartment.amenities" type="checkbox"> {{fac}}</li>
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

        <button class="btn btn-lg btn-success" v-on:click="create(apartment)">Save</button>
      </div>
    </div>
  </div>
  `
    ,
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
      messages:{
        errorType:'',
        errorRooms:'',
        errorGuests:'',
        errorLocation:'',
        errorAddress:'',
        errorPrice:'',
        errorCheckInOut:'',
        errorDates:'',
        errorAmenities:'',
        errorResponse:'',
        successResponse:'',
      },
      allAmenities:[], //svi amenties koji su u bazi
      amenities:{
        base:[],
        family:[],
        dining:[],
        fac:[],
    },
		}
	},

	methods: {
		create: function (apartment) {
      if(this.apartment.type == ''){
        this.messages.errorType =  `<h4>Field type of apartment can't be empty!</h4>`;
        setTimeout(()=>this.messages.errorType='',3000);
      }
      else if(this.apartment.rooms == ''){
        this.messages.errorRooms =  `<h4>Field rooms of apartment can't be empty!</h4>`;
        setTimeout(()=>this.messages.errorRooms='',3000);
      }
      else if(this.apartment.guests == ''){
        this.messages.errorGuests =  `<h4>Field rooms of apartment can't be empty!</h4>`;
        setTimeout(()=>this.messages.errorGuests='',3000);
      }
      else if(this.apartment.location.latitude == ''){
        this.messages.errorLocation =  `<h4>Field latitude of apartment can't be empty!</h4>`;
        setTimeout(()=>this.messages.errorLocation='',3000);
      }
      else if(this.apartment.location.longitude == ''){
        this.messages.errorLocation =  `<h4>Field longitude of apartment can't be empty!</h4>`;
        setTimeout(()=>this.messages.errorLocation='',3000);
      }
      else if(this.apartment.address == ''){
        this.messages.errorAddress =  `<h4>Field address of apartment can't be empty!</h4>`;
        setTimeout(()=>this.messages.errorAddress='',3000);
      }
      else if(this.apartment.price == ''){
        this.messages.errorPrice =  `<h4>Field price of apartment can't be empty!</h4>`;
        setTimeout(()=>this.messages.errorPrice='',3000);
      }
      else if(this.apartment.checkin == ''){
        this.messages.errorCheckInOut =  `<h4>Field check in of apartment can't be empty!</h4>`;
        setTimeout(()=>this.messages.errorCheckInOut='',3000);
      }
      else if(this.apartment.checkout == ''){
        this.messages.errorCheckInOut =  `<h4>Field check out of apartment can't be empty!</h4>`;
        setTimeout(()=>this.messages.errorCheckInOut='',3000);
      }
      else if(this.apartment.dates == ''){
        this.messages.errorDates =  `<h4>Field dates of apartment can't be empty!</h4>`;
        setTimeout(()=>this.messages.errorDates='',3000);
      }
      else if(this.apartment.amenities == ''){
        this.messages.errorAmenities =  `<h4>Amenities of apartment can't be empty!</h4>`;
        setTimeout(()=>this.messages.errorAmenities='',3000);
      }
      else{
        // unselected dates will be disabled
        this.apartment.to = this.dates.from.getTime();
        this.apartment.from = this.dates.to.getTime() + 1000 * 60 * 60 * 24;
        // console.log(apartment);
        axios
          .post('rest/apartment', apartment)
          .then(Response => (console.log(Response)));
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
    arrangeAmenities(){
      for(let i = 0; i< this.allAmenities.length; i++){
        if(this.allAmenities[i].type === 'Base'){
          this.amenities.base.push(this.allAmenities[i].name);
        }
        else if(this.allAmenities[i].type === 'Family' ){
          this.amenities.family.push(this.allAmenities[i].name);
        }
        else if(this.allAmenities[i].type === 'Dining'){
          this.amenities.dining.push(this.allAmenities[i].name);
        }
        else if(this.allAmenities[i].type === 'Facilities'){
          this.amenities.fac.push(this.allAmenities[i].name);
        }
      }
    },
  },
  
	created() {      
    axios
    .get('rest/amenity/all')
    .then(response => {
        this.allAmenities = response.data;
        this.arrangeAmenities();
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
})


















// <!-- Slide Two - Set the background image for this slide in the line below -->
// <div class="carousel-item" v-for="img in getOtherImgs" :style="{'background-image': 'url(' + img + ')'}">
//   <div class="carousel-caption d-none d-md-block">
//     <h3 class="display-4">Second Slide</h3>
//     <p class="lead">This is a description for the second slide.</p>
//   </div>
// </div> 


// else{
     // axios.post('rest/signup',this.user).then(Response => {
                //     // this.messages.successResponse = `<h4>You registered successfully!</h4>`;
                //     // setTimeout(() => this.messages.successResponse='', 5000);
                   
                //     this.signupSuccessful(response)
                // })
                // .catch(error => {
                //     if(error.response.status === 500 || error.response.status === 404){
                //         this.messages.errorResponse= `<h4>We had some server errors, please try again later!</h4>`;
                //         setTimeout(() => this.messages.errorResponse='', 5000);
                //     }
                // });
// }

      // else if(this.user.username=='' && this.user.firstname=='' && this.user.lastname=='' && this.user.gender=='' && this.user.password==''  && this.user.password2==''){
      //   this.messages.errorUsername =  `<h4>Username name of user can't be empty!</h4>`;
      //   this.messages.errorFirstName =  `<h4>First name of user can't be empty!</h4>`;
      //   this.messages.errorLastName =  `<h4>Last name of user can't be empty!</h4>`;
      //   this.messages.errorGender =  `<h4>Gender of user can't be empty!</h4>`;
      //   this.messages.errorNewPass =  `<h4>Password of user can't be empty!</h4>`;
      //   this.messages.errorRepNewPass =  `<h4>Confirmation password can't be empty!</h4>`;
          
      //   setTimeout(()=>this.messages.errorUsername='',3000);  
      //   setTimeout(()=>this.messages.errorFirstName='',3000);
      //   setTimeout(()=>this.messages.errorLastName='',3000);
      //   setTimeout(()=>this.messages.errorGender='',3000);
      //   setTimeout(()=>this.messages.errorNewPass='',3000);
      //   setTimeout(()=>this.messages.errorRepNewPass='',3000);
          
      // }