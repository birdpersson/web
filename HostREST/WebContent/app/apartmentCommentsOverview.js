Vue.component('apartment-comments', {
    template: `
<div id="apartment-comments">

    <div class="container" id='page-title'>
        <h1 style="margin-top:10px;color:#35424a;">List Of <span id='titleEffect'>Comments</span></h1>
        <hr style='background:#e8491d;height:1px;'>
    </div>

    <div id='main' class='container'>
        <div v-if='isGuest'>
            Pregled svih komentara za taj stan koje je odobrio host. Ovo moze biti ista stranica na kojoj<br>
            ce se prikazivati SVI stanovi za administraora ili SVI ono stanovi koji pripadaju jedom hostu.<br>
            Pa ako je id stana = null i rola != guest onda spram role da se getu iz baze potrebni apartmani, ili da se<br>
            pravi posebna stranica za<br>
            prikaz stanova za admina i hosta, a da ova bude samo za guesta.<br>
            <br>
            <div id='apartmentInfo'>
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
                </div>

               <!--Kako bi trebalo da izgleda komentar na kraju-->
                <!-- <div class="single-comment">
                    <div id='username'> username1 </div>
                    <div id='star-rating'>
                        <star-rating
                            inactive-color="#35424a"
                            active-color="#e8491d"
                            v-bind:read-only= "true"
                            v-bind:star-size="25"
                            v-bind:show-rating="false"
                            v-model="rating">
                        </star-rating>
                    </div>
                    <div id='comment'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quae quos eius et! Commodi nam ipsum ab natus quaerat! Pariatur neque quo, quibusdam expedita molestiae saepe architecto placeat cupiditate asperiores.   
                    </div>
                </div> -->
            </div> <!--comments-->
        </div> <!--isGuest-->

        <div v-if='isAdmin'>
            ● Kao Administrator:
            ○ Mogu da vidim sve komentare na sve apartmane u sistemu (bez obzira na to da li<br>
            ih je Domaćin odabrao ili nije)<br>
        </div>

        <div v-if='isHost'>
            Kao Domaćin:<br>
            ○ Imam pregled svih komentara na moje apartmane:<br>
            ■ Mogu da odaberem koji komentar će biti prikazan Gostima, a koji neće<br>
            (dakle Gosti vide samo komentare koje je Domaćin odabrao)<br>
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
            rating: 3,
         
            //overview u modelu
            comments:[
                {
                    id:'1',
                    guestId:'1',
                    apartmentId:'1',
                    text:'Luxurious,clean,friendly people, huge pool... need I say more? This place is awesome!',
                    star:5,
                },
                {
                    id:'2',
                    guestId:'2',
                    apartmentId:'1',
                    text:'Luxurious,clean... need I say more? This place is awesome!',
                    star:4,
                },
                {
                    id:'3',
                    guestId:'3',
                    apartmentId:'1',
                    text:'Nicely apartment very nice place to live!',
                    star:3,
                }
            ],
            apartmentId:''
           
        }
    },
    methods: {
        setRating: function(rating){
        this.rating = rating;
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
    mounted(){
        this.apartmentId = this.comments[0].apartmentId;
    }
    

});