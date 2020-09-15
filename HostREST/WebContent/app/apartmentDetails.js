Vue.component("apartment-details", {
  template: `<div id="apartment-details">
  <div class="container" id='page-title'>
      <h1 style="margin-top:10px;color:#35424a;">Apartment #second <span id='titleEffect'>Details</span></h1>
      <hr style='background:#e8491d;height:1px;'>
  </div>

  <div id="test3" class="container">
    <div class="col-lg-12">
      <div id='slidebar'>
        <header class="container">
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner"  role="listbox">
              <!-- Slide One - Set the background image for this slide in the line below  "{background-image:  'url(' + getImgUrl() + ')}"-->
             <div class="carousel-item active"   :style="{'background-image': 'url(' + this.apartment.images[0] + ')'}">
                <!-- <div class="carousel-caption d-none d-md-block">
                </div> -->
              </div>
              <!-- Slide Two - Set the background image for this slide in the line below -->
            <div class="carousel-item" v-for="img in getOtherImgs" :style="{'background-image': 'url(' + img + ')'}">
                <!-- <div class="carousel-caption d-none d-md-block">
                </div> -->
              </div> 
    
            </div>
            <a v-if='isOtherImgs' class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a v-if='isOtherImgs' class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </header>
        <div class="card-body">
          <div class="card-header">
              <h4>Details</h4>
          </div>
          <h3 class="card-title">Type: 
            <span style="font-size: 25px;">{{apartment.type}}</span >
          </h3>
      
          <h3 class="card-title">Address:
            <span style="font-size: 25px;">{{apartment.location.address.street}} - {{apartment.location.address.postalCode}} {{apartment.location.address.city}}</span >
          </h3>

          <h3 class="card-title">Location:
            <span style="font-size: 25px;">longitude: {{apartment.location.longitude}} - latitude: {{apartment.location.latitude}}</span >
          </h3>

          <h3 class="card-title">Price:
            <span style="font-size: 25px;">{{apartment.price}} $/per day</span >
          </h3>

          <h3 class="card-title">Rooms:
            <span style="font-size: 25px;">{{apartment.rooms}}</span >
          </h3>
          
        </div>
      </div><!-- /.card -->

       <!-- Amenities Row -->
      <div id='amenities' class='container'>
        <div class="card-header">
            <h4>Amenities</h4>
        </div>
        <div class="row">

          <div class="col-md-3 col-sm-6 mb-4">
              <h4>Base</h4>
               <ul v-for="base in amenities.base">
                 <li>{{base}}</li>
               </ul>
          </div>

          <div class="col-md-3 col-sm-6 mb-4">
              <h4>Family</h4>
              <ul v-for="family in amenities.family">
                <li>{{family}}</li>
              </ul>
          </div>

          <div class="col-md-3 col-sm-6 mb-4">
              <h4>Dining</h4>
              <ul v-for="dining in amenities.dining">
                <li>{{dining}}</li>
              </ul>
          </div>

          <div class="col-md-3 col-sm-6 mb-4">
              <h4>Facilities</h4>
              <ul v-for="fac in amenities.fac">
                <li>{{fac}}</li>
              </ul>
          </div>
          
        </div>
        <!-- /.row -->
      </div>

      <div class="card card-outline-secondary my-4">
        <div class="card-header">
          <h4>Apartment Reviews</h4>
        </div>

        <div class="card-body" v-for="review in apartment.reviews" v-if="review.visible" >
            <div style="margin-bottom: 10px;" id='star-rating' >
                <star-rating
                    inactive-color="#35424a"
                    active-color="#e8491d"
                    v-bind:read-only= "true"
                    v-bind:star-size="20"
                    v-bind:show-rating="false"
                    v-bind:rating="review.star">
                </star-rating>
            </div>
            <p>{{review.text}}</p>
            <small class="text-muted">Posted by {{review.guestId}}</small>
          <hr>
        </div>

        <div v-show='noReview' class="card-body">
          <h3>There are no reviews for this apartment...</h3>
        </div>
      </div>
      <!-- /.card -->
    </div>
    <!-- /.col-lg-9 -->
    </div>
    </div>
  </div>  <!-- /.test3 -->
</div> <!--apartment details-->`,
    data: function () {
        return {
            user: {
              username: '',
              role: ''
            },
            isAdmin: false,
            isHost: false,
            isGuest: false,

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
              images:[],
              price: null,
              checkin: '',
              checkout: '',
              amenities: [],
              reviews:[]
            },
            amenities:{
                base:[],
                family:[],
                dining:[],
                fac:[],
            },
            isOtherImgs: true,
            noReview: false,
        }
    },
    methods: {
      getFirstImg:function(){
        //provera da li ima slika za dati stan
        if(this.apartment.images == null){
          img = ['./img/No_Image_Available.png'];
          // ako nema smesti noimage sliku
            this.apartment.images = img;
            console.log(this.apartment.images[0])
          }
      },
      arrangeAmenities:function(){
        for(let i = 0; i< this.apartment.amenities.length; i++){
          if(this.apartment.amenities[i].type === 'Base'){
            this.amenities.base.push(this.apartment.amenities[i].name);
          }
          else if(this.apartment.amenities[i].type === 'Family' ){
            this.amenities.family.push(this.apartment.amenities[i].name);
          }
          else if(this.apartment.amenities[i].type === 'Dining'){
            this.amenities.dining.push(this.apartment.amenities[i].name);
          }
          else if(this.apartment.amenities[i].type === 'Facilities'){
            this.amenities.fac.push(this.apartment.amenities[i].name);
          }
        }
      },
      noComment:function(){     
        console.log('this.apartment.reviews.length: ' + this.apartment.reviews.length);   
        if(this.apartment.reviews === undefined || this.apartment.reviews.length === 0){
          // console.log('this.apartment.reviews.length = 0 ');
          this.noReview = true;
        }
        else if(this.apartment.reviews !== undefined || this.apartment.reviews.length !== 0){
          // console.log('this.apartment.reviews.length != 0 ');
          let visible = false;
          //ako ima komentara za dati stan, prolazimo kroz sve komentare 
          //i proveravamo da li su odobreni ako ni jedan nije odobren opet prikazujemo poruku
          for(let i = 0; i < this.apartment.reviews.length; i++){
            if(this.apartment.reviews[i].visible === false){
              // console.log('review.visible: ' + this.apartment.reviews[i].visible);
              continue;
            }
            else{
              visible = true;
              // console.log('review.visible: ' + this.apartment.reviews[i].visible);
              break;
              
            }
          }
          //ako je visibilitu svakog komentara false onda 
          //prikazuje poruku kako nema komentara
          if(visible === false){
            this.noReview = true;
          }
        }
        else{

          this.noReview = false;
        }

      }
    },
    computed: {
      id() {
        return this.$route.params.id; //preuzimam id apartmana na cijoj sam stranici za prikaz komentara
      },

      getOtherImgs:function(){
        //Prva slika mora da se manuelno postavi, a ostale se dodaju preko v-for:
        imgs = this.apartment.images.slice(1);
        //Ako ima samo jednu sliku onda se sklanjaju strelice < > za kretanje kroz slike. 
        if(imgs.length === 0){
          this.isOtherImgs = false;
        }
        //vec je true, ali za svaki slucaj
        this.isOtherImgs = true;
        return imgs;
        
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

      this.apartmentId = this.id;
      axios
      .get(`rest/apartment/${this.apartmentId}`)
      .then(response => {
          this.apartment = response.data;
          this.getFirstImg();
          this.arrangeAmenities();
          this.noComment();
      })
  },
  
})


