Vue.component('apartment-comments', {
    template: `
<div id="apartment-comments">

    <div class="container" id='page-title'>
        <h1 style="margin-top:10px;color:#35424a;">List Of <span id='titleEffect'>Comments</span></h1>
        <hr style='background:#e8491d;height:1px;'>
    </div>

    <div id='main' class='container'>

        <div v-if='isAdmin'>
           <!-- ● Kao Administrator:
            ○ Mogu da vidim sve komentare na sve apartmane u sistemu (bez obzira na to da li<br>
            ih je Domaćin odabrao ili nije)<br>
            <br>-->
            <div class="comments" v-for='apartment in apartments'>
                <div id='apartmentInfo'>
                    <div class="card-header">
                        <h4><b>Apartment type:</b> {{apartment.type}}</h4>
                        <h4><b>Apartment address:</b> {{apartment.location.address.street}} {{apartment.location.address.postalCode}} - {{apartment.location.address.city}}</h4>
                        <h4><b>Apartments host:</b> {{apartment.host}}</h4>
                    </div>
                </div>
                <div v-show='isThereReviews(apartment)' class="card-body">
                        <h3>There are no reviews for this apartment...</h3>
                </div>
                <div id='all-comments' v-for='comment in apartment.reviews'>
                    <div class="single-comment">
                        <div id='username'>{{comment.guestId}} </div>
                        <div id='star-rating'>
                            <star-rating
                                inactive-color="#35424a"
                                active-color="#e8491d"
                                v-bind:read-only= "true"
                                v-bind:star-size="25"
                                v-bind:show-rating="false"
                                v-bind:rating="comment.star">
                            </star-rating>
                        </div>
                        <div id='comment'>
                            {{comment.text}}  
                        </div>
                    </div>
                </div>
            </div> <!--comments-->
        </div>

        <div v-if='isHost'>
        <!--   Kao Domaćin:<br>
            ○ Imam pregled svih komentara na moje apartmane:<br>
            ■ Mogu da odaberem koji komentar će biti prikazan Gostima, a koji neće<br>
            (dakle Gosti vide samo komentare koje je Domaćin odabrao)<br>
            <br> -->
            
            <!-- <div id='apartmentInfo'>
                <h3>Apartmetn id: {{apartmentId}}</h3>
            </div>
            <div class="comments" v-for='comment in comments'>
                <div class="single-comment">
                    <div id='username'>{{comment.guestId}} </div>
                    
                    <div id='star-rating'>
                        <star-rating
                            inactive-color="#35424a"
                            active-color="#e8491d"
                            v-bind:read-only= "true"
                            v-bind:star-size="25"
                            v-bind:show-rating="false"
                            v-bind:rating="comment.star">
                        </star-rating>
                    </div>
                    <div id='comment'>
                        {{comment.text}}  
                    </div>

                    <div id='comment-visibility'>
                        <label style="display:block">Show comment</label>
                        <input type="checkbox" v-on:mouseup='checkComment(comment)' v-model='comment.visible'>
                        <div id='visibility-message' v-if='comment.visible'>
                            <p>This comment will be shown to guest user!</p> 
                        </div>
                    </div>
                </div>
            </div> -->
             <!--comments-->
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

            isTest: false,
            //overview u modelu
            comments: [],
            apartments:[],
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
              noReview : false,
        }
    },
    methods: {
        setRating: function (rating) {
            this.rating = rating;
        },
        getComments: function () {
            // dobavljanje svih komentara preko apartmana za prikaz adminu ili hostu
            axios
                .get('rest/apartment/all')
                .then(response => {
                    this.apartments = response.data;
                })
        },
        checkComment: function (updatedComment) {

            updatedComment.visible = !updatedComment.visible;
            axios
                .put(`rest/reviews/${updatedComment.id}`, updatedComment)
                .then(response => {
                    this.getComments();
                })
        },
        isThereReviews:function(apartment){     
            console.log('this.apartment.reviews.length: ' + apartment.reviews.length);   
            if(apartment.reviews === undefined || apartment.reviews.length === 0){
              // console.log('this.apartment.reviews.length = 0 ');
              return true;
            }
            else {
                return false;
            }
        }

    },
    computed: {
        id() {
            return this.$route.params.id; //preuzimam id apartmana na cijoj sam stranici za prikaz komentara

        }
    },
    created() {
        if (!localStorage.getItem('jwt'))
            this.$router.push('/login');

        this.user.username = localStorage.getItem('user');
        this.user.role = localStorage.getItem('role');

        if (this.user.role == "ADMIN") {
            this.isAdmin = true;
            this.getComments();
        } else if (this.user.role == "HOST") {
            this.isHost = true;
            this.getComments();
        } else {
            this.isGuest = true;
            this.apartmentId = this.id;
            axios
                .get(`rest/reviews/apartment/${this.apartmentId}`)
                .then(response => {
                    this.comments = response.data;
                })
        }
    },
});










// Vue.component('apartment-comments', {
//     template: `
// <div id="apartment-comments">

//     <div class="container" id='page-title'>
//         <h1 style="margin-top:10px;color:#35424a;">List Of <span id='titleEffect'>Comments</span></h1>
//         <hr style='background:#e8491d;height:1px;'>
//     </div>

//     <div id='main' class='container'>
//         <div v-if='isGuest'>
//            <!-- Pregled svih komentara za taj stan koje je odobrio host. Ovo moze biti ista stranica na kojoj<br>
//             ce se prikazivati SVI stanovi za administraora ili SVI ono stanovi koji pripadaju jedom hostu.<br>
//             Pa ako je id stana = null i rola != guest onda spram role da se geutje iz baze potrebni apartmani, ili da se<br>
//             pravi posebna stranica za prikaz stanova za admina i hosta, a da ova bude samo za guesta.<br>
//             <br>-->
//             <div id='apartmentInfo'>
//                 <h3>Apartment id: {{apartmentId}}</h3>
//             </div>
//             <div class="comments" v-for='comment in comments'>
//                 <div class="single-comment" v-if="comment.visible">
//                     <div id='username'>{{comment.guestId}} </div>
//                     <div id='star-rating'>
//                         <star-rating
//                             inactive-color="#35424a"
//                             active-color="#e8491d"
//                             v-bind:read-only= "true"
//                             v-bind:star-size="20"
//                             v-bind:show-rating="false"
//                             v-bind:rating="comment.star">
//                         </star-rating>
//                     </div>
//                     <div id='comment'>
//                         {{comment.text}}  
//                     </div>
//                 </div>
//             </div> <!--comments-->
//         </div> <!--isGuest-->

//         <div v-if='isAdmin'>
//            <!-- ● Kao Administrator:
//             ○ Mogu da vidim sve komentare na sve apartmane u sistemu (bez obzira na to da li<br>
//             ih je Domaćin odabrao ili nije)<br>
//             <br>-->
//             <div id='apartmentInfo'>
//                 <h3>Apartment id: {{apartmentId}}</h3>
//             </div>
//             <div class="comments" v-for='comment in comments'>
//                 <div class="single-comment">
//                     <div id='username'>{{comment.guestId}} </div>
//                     <div id='star-rating'>
//                         <star-rating
//                             inactive-color="#35424a"
//                             active-color="#e8491d"
//                             v-bind:read-only= "true"
//                             v-bind:star-size="25"
//                             v-bind:show-rating="false"
//                             v-bind:rating="comment.star">
//                         </star-rating>
//                     </div>
//                     <div id='comment'>
//                         {{comment.text}}  
//                     </div>
//                 </div>
//             </div> <!--comments-->
//         </div>

//         <div v-if='isHost'>
//         <!--   Kao Domaćin:<br>
//             ○ Imam pregled svih komentara na moje apartmane:<br>
//             ■ Mogu da odaberem koji komentar će biti prikazan Gostima, a koji neće<br>
//             (dakle Gosti vide samo komentare koje je Domaćin odabrao)<br>
//             <br> -->
            
//             <div id='apartmentInfo'>
//                 <h3>Apartmetn id: {{apartmentId}}</h3>
//             </div>
//             <div class="comments" v-for='comment in comments'>
//                 <div class="single-comment">
//                     <div id='username'>{{comment.guestId}} </div>
                    
//                     <div id='star-rating'>
//                         <star-rating
//                             inactive-color="#35424a"
//                             active-color="#e8491d"
//                             v-bind:read-only= "true"
//                             v-bind:star-size="25"
//                             v-bind:show-rating="false"
//                             v-bind:rating="comment.star">
//                         </star-rating>
//                     </div>
//                     <div id='comment'>
//                         {{comment.text}}  
//                     </div>

//                     <div id='comment-visibility'>
//                         <label style="display:block">Show comment</label>
//                         <input type="checkbox" v-on:mouseup='checkComment(comment)' v-model='comment.visible'>
//                         <div id='visibility-message' v-if='comment.visible'>
//                             <p>This comment will be shown to guest user!</p> 
//                         </div>
//                     </div>
//                 </div>
//             </div> <!--comments-->
//         </div>
//     </div>
// </div>`,
//     data: function () {
//         return {
//             user: {
//                 username: '',
//                 role: ''
//             },
//             isAdmin: false,
//             isHost: false,
//             isGuest: false,

//             isTest: false,
//             //overview u modelu
//             comments: [],
//             apartmentId: ''
//         }
//     },
//     methods: {
//         setRating: function (rating) {
//             this.rating = rating;
//         },
//         getComments: function () {
//             // dobavljanje svih komentara za prikaz adminu ili hostu
//             axios
//                 .get('rest/reviews/')
//                 .then(response => {
//                     this.comments = response.data;
//                 })
//         },
//         checkComment: function (updatedComment) {

//             updatedComment.visible = !updatedComment.visible;
//             axios
//                 .put(`rest/reviews/${updatedComment.id}`, updatedComment)
//                 .then(response => {
//                     this.getComments();
//                 })
//         },

//     },
//     computed: {
//         id() {
//             return this.$route.params.id; //preuzimam id apartmana na cijoj sam stranici za prikaz komentara

//         }
//     },
//     created() {
//         if (!localStorage.getItem('jwt'))
//             this.$router.push('/login');

//         this.user.username = localStorage.getItem('user');
//         this.user.role = localStorage.getItem('role');

//         if (this.user.role == "ADMIN") {
//             this.isAdmin = true;
//             this.getComments();
//         } else if (this.user.role == "HOST") {
//             this.isHost = true;
//             this.getComments();
//         } else {
//             this.isGuest = true;
//             this.apartmentId = this.id;
//             axios
//                 .get(`rest/reviews/apartment/${this.apartmentId}`)
//                 .then(response => {
//                     this.comments = response.data;
//                 })
//         }
//     },
// });