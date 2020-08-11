Vue.component("test", {
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
            <div class="carousel-inner" role="listbox">
              <!-- Slide One - Set the background image for this slide in the line below -->
              <div class="carousel-item active" style="background-image: url('https://source.unsplash.com/RCAhiGJsUUE/1920x1080')">
                <div class="carousel-caption d-none d-md-block">
                  <h3 class="display-4">First Slide</h3>
                  <p class="lead">This is a description for the first slide.</p>
                </div>
              </div>
              <!-- Slide Two - Set the background image for this slide in the line below -->
              <div class="carousel-item" style="background-image: url('https://source.unsplash.com/wfh8dDlNFOk/1920x1080')">
                <div class="carousel-caption d-none d-md-block">
                  <h3 class="display-4">Second Slide</h3>
                  <p class="lead">This is a description for the second slide.</p>
                </div>
              </div>
              <!-- Slide Three - Set the background image for this slide in the line below -->
              <div class="carousel-item" style="background-image: url('https://source.unsplash.com/O7fzqFEfLlo/1920x1080')">
                <div class="carousel-caption d-none d-md-block">
                  <h3 class="display-4">Third Slide</h3>
                  <p class="lead">This is a description for the third slide.</p>
                </div>
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
          </div>
        </header>
        <div class="card-body">
          <h3 class="card-title">{{apartment.type}}</h3>
          <h3 class="card-title">{{apartment.location}}</h3>
          <h4>Price: {{apartment.price}}</h4>
          <h4>Rooms: {{apartment.rooms}}</h4>
          <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente dicta fugit fugiat hic aliquam itaque facere, soluta. Totam id dolores, sint aperiam sequi pariatur praesentium animi perspiciatis molestias iure, ducimus!</p>
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

      <div class="card card-outline-secondary my-4">
        <div class="card-header">
          Product Reviews
        </div>
        <div class="card-body">
          <span class="text-warning">&#9733; &#9733; &#9733; &#9733; &#9734;</span>
          4.0 stars
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
          <small class="text-muted">Posted by Anonymous on 3/1/17</small>
          <hr>
          <span class="text-warning">&#9733; &#9733; &#9733; &#9733; &#9734;</span>
          4.0 stars
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
          <small class="text-muted">Posted by Anonymous on 3/1/17</small>
          <hr>
          <span class="text-warning">&#9733; &#9733; &#9733; &#9733; &#9734;</span>
          4.0 stars
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
          <small class="text-muted">Posted by Anonymous on 3/1/17</small>
          <hr>
          <a href="#" class="btn btn-success">Leave a Review</a>
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
                // img:`C:\\Users\\Maregenije\\Desktop\\TestSlike`,
                location: 'Fiftieth street',
                dates: '01.01.2020',
                availability: true,
                price: 250,
                status: 'aktivno',
                amenities:['frizider','parking'],
            },
            amenities:{
                base:['base1','base2','base3','base4','base5','base6'],
                family:[' family1','family2','family3','family4','family5','family6'],
                dining:[' dining1','dining2','dining3','dining4','dining5','dining6'],
                fac:[' fac1','fac2','fac3','fac4','fac5','fac6'],
            }
        }
    },
    methods: {
    
    },
    computed: {
     
    },
    created(){
        // alert(this.img);
    }
})

