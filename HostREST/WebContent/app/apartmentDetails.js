Vue.component("apartment-details", {
    template: `<div id="apartment-details">
    <div class="container" id='page-title'>
        <h1 style="margin-top:10px;color:#35424a;">Apartment <span id='titleEffect'>Details</span></h1>
        <hr style='background:#e8491d;height:1px;'>
    </div>
 <!--Reviews-->
  <div id="test3" class="container">
    <div class="col-lg-12">

      <!-- <div class="card mt-4"> -->
      <div>
      <!--SLIDBAR-->
        <header class="container">
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner"  role="listbox">
              <!-- Slide One - Set the background image for this slide in the line below  "{background-image:  'url(' + getImgUrl() + ')}"--> 
              <div class="carousel-item active"   :style="{'background-image': 'url(' + apartment.img[0] + ')'}">
                <div class="carousel-caption d-none d-md-block">
                </div>
              </div>
              <!-- Slide Two - Set the background image for this slide in the line below -->
              <div class="carousel-item" v-for="img in getOtherImgs" :style="{'background-image': 'url(' + img + ')'}">
                <div class="carousel-caption d-none d-md-block">
                  <h3 class="display-4">Second Slide</h3>
                  <p class="lead">This is a description for the second slide.</p>
                </div>
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
        <div class="card-body" style="margin-left:10px;">
          <h3 class="card-title">Type: 
            <span style="font-size: 30px;">{{apartment.type}}</span >
          </h3>
      
          <h3 class="card-title">Address:
            <span style="font-size: 30px;">{{apartment.location.address.street}} - {{apartment.location.address.postalCode}} {{apartment.location.address.city}}<small class="text-muted">(longitude:{{apartment.location.longitude}} latitude:{{apartment.location.latitude}})</small></span >
          </h3>

          <h3 class="card-title">Price:
            <span style="font-size: 30px;">{{apartment.price}}$/ per day</span >
          </h3>

          <h3 class="card-title">Rooms:
            <span style="font-size: 30px;">{{apartment.rooms}}</span >
          </h3>
          
        </div>
      </div>
      <!-- /.card -->

       <!-- Amenities Row -->
      <div id='amenities' class='container'>
        <h3 class="my-4">Amenities</h3>

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

      <h3 class="my-4">Reviews</h3>
      <div class="card card-outline-secondary my-4">
        <div class="card-header">
          Apartment Reviews
        </div>
        <div class="card-body" v-for="review in apartment.reviews">
          <div style="margin-bottom: 10px;" id='star-rating'>
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
      </div>
      <!-- /.card -->

    </div>
    <!-- /.col-lg-9 -->

    </div>

    </div>
    <!-- /.container -->
  </div>  
</div>`,
    data: function () {
        return {
            apartment:{   
                id: '1',
                type: 'ceo apartman',
                rooms: 4,
                reviews:[
                  {
                    id:'1',
                    guestId:'guesttt',
                    apartmentId:'1',
                    text:'Best ever! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.',
                    star:5,
                    visible:'true',
                  },
                  {
                    id:'2',
                    guestId:'NoobMaster69',
                    apartmentId:'1',
                    text:'Very good! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.',
                    star:4,
                    visible:'true',
                  },
                  {
                    id:'3',
                    guestId:'guest',
                    apartmentId:'1',
                    text:'Bad, very bad! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.',
                    star:2,
                    visible:'true',
                  }
                ],
                img:['https://source.unsplash.com/RCAhiGJsUUE/1920x1080','https://source.unsplash.com/wfh8dDlNFOk/1920x1080','https://source.unsplash.com/O7fzqFEfLlo/1920x1080'],
                location:{
                  id:'1',
                  longitude:'12.256',
                  latitude:'44.12',
                  address:'Fiftieth street',
                }, 
                dates: '01.01.2020',
                availability: true,
                price: 250,
                status: 'aktivno',
                amenities:[
                  {
                    id:'1',
                    name:'Wifi',
                    type:'Base',
                  },
                  {
                    id:'2',
                    name:'Laptop friendly workspace',
                    type:'Base',
                  },
                  {
                    id:'3',
                    name:'Cable TV',
                    type:'Base',
                  },
                  {
                    id:'4',
                    name:'Washer',
                    type:'Base',
                  },
                  {
                    id:'5',
                    name:'Air conditioning',
                    type:'Base',
                  },
                  {
                    id:'6',
                    name:'TV',
                    type:'Base',
                  },

                  {
                    id:'7',
                    name:'Crib',
                    type:'Family',
                  },
                  {
                    id:'8',
                    name:'High chair',
                    type:'Family',
                  },
                  {
                    id:'9',
                    name:"Pack'n Play",
                    type:'Family',
                  },
                  {
                    id:'10',
                    name:'Room-darkening shades',
                    type:'Family',
                  },

                  {
                    id:'11',
                    name:'Elevator',
                    type:'Facilities',
                  },
                  {
                    id:'12',
                    name:'Paid parking off premises',
                    type:'Facilities',
                  },
                  {
                    id:'13',
                    name:'Single level home',
                    type:'Facilities',
                  },
                  {
                    id:'14',
                    name:'Free street parking',
                    type:'Facilities',
                  },

                  {
                    id:'15',
                    name:'Kitchen',
                    type:'Dining',
                  },
                  {
                    id:'16',
                    name:'Coffee maker',
                    type:'Dining',
                  },
                  {
                    id:'17',
                    name:'Cooking basics',
                    type:'Dining',
                  },
                  {
                    id:'18',
                    name:'Refrigerator',
                    type:'Dining',
                  },

                ],
            },
            amenities:{
                base:[],
                family:[],
                dining:[],
                fac:[],
            },
            isOtherImgs: true,
        }
    },
    methods: {
      
    },
    computed: {
      getOtherImgs:function(){
        //Prva slika mora da se manuelno postavi, a ostale se dodaju preko v-for:
        imgs = this.apartment.img.slice(1);
        //Ako ima samo jednu sliku onda se sklanjaju strelice < > za kretanje kroz slike. 
        if(imgs.length === 0){
          this.isOtherImgs = false;
        }
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
      axios
      .get('rest/apartment')
      .then(response => {
          this.apartments = response.data;
      }) 
    },
    mounted(){

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
    }
})

