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
            Pa ako je id stana = null i rola != guest onda spram role da se geutje iz baze potrebni apartmani, ili da se<br>
            pravi posebna stranica za prikaz stanova za admina i hosta, a da ova bude samo za guesta.<br>
            <br>
            <div id='apartmentInfo'>
                <h3>Apartment id: {{apartmentId}}</h3>
            </div>
            <div class="comments" v-for='comment in comments'>
                <div class="single-comment" v-if="comment.visible">
                    <div id='username'>{{comment.guestId}} </div>
                    <div id='star-rating'>
                        <star-rating
                            inactive-color="#35424a"
                            active-color="#e8491d"
                            v-bind:read-only= "true"
                            v-bind:star-size="20"
                            v-bind:show-rating="false"
                            v-bind:rating="comment.star">
                        </star-rating>
                    </div>
                    <div id='comment'>
                        {{comment.text}}  
                    </div>
                </div>
            </div> <!--comments-->
        </div> <!--isGuest-->

        <div v-if='isAdmin'>
            ● Kao Administrator:
            ○ Mogu da vidim sve komentare na sve apartmane u sistemu (bez obzira na to da li<br>
            ih je Domaćin odabrao ili nije)<br>
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
            </div> <!--comments-->
        </div>

        <div v-if='isHost'>
            Kao Domaćin:<br>
            ○ Imam pregled svih komentara na moje apartmane:<br>
            ■ Mogu da odaberem koji komentar će biti prikazan Gostima, a koji neće<br>
            (dakle Gosti vide samo komentare koje je Domaćin odabrao)<br>
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

                    <div id='comment-visibility'>
                        <label style="display:block">Show comment</label>
                        <input type="checkbox" v-on:mouseup='checkComment(comment)' v-model='comment.visible'>
                        <!--<input type="checkbox" v-on:mouseup='checkTestAfter(test)' v-on:mousedown='checkTestBefore(test)'>-->
                        <div id='visibility-message' v-if='comment.visible'>
                            <p>This comment will be shown to guest user!</p> 
                        </div>
                    </div>
                </div>
            </div> <!--comments-->
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
         
            isTest:false,
            //overview u modelu
            comments:[],
            apartmentId:''
        }
    },
    methods: {
        setRating: function(rating){
        this.rating = rating;
        },
        getHostsComments:function(){
            axios
            .get('rest/reviews/apartmentHost?id='+ this.user.username)
            .then(response => {
                this.comments=response.data;
            })
        },
        checkComment:function(updatedComment){
            alert(`Comment id: ${updatedComment.id}\nStari status:${updatedComment.visible}`);
            updatedComment.visible = !updatedComment.visible;
            axios
            .put(`rest/reviews/${updatedComment.id}`, updatedComment)
            .then(response => {
                alert('Novi status response:\n'+response.data.visible);
                this.getHostsComments();
            })
        },

        checkCommentAfter(updatedComment){
            alert(`Comment id: ${updatedComment.id}\nNovi status:${updatedComment.visible}`);
        },

    },
    computed:{
        id() {
            return this.$route.params.id; //preuzimam id apartmana na cijoj sam stranici za prikaz komentara
            
        }
    },
    created() {
        this.user.username = localStorage.getItem('user');
        this.user.role = localStorage.getItem('role');

        if (this.user.role == "ADMIN") {
            this.isAdmin = true;
            // dobavljanje svih komentara za prikaz adminu
            axios
            .get('rest/reviews/')
            .then(response => {
                this.comments=response.data;
            })
        } else if (this.user.role == "HOST") {
            this.isHost = true;
            // dobavljanje komentara vezanih za stan koji
            // pripada tom hostu
            // var searchUrl = "?id=" + this.user.username;

            this.getHostsComments();
        } else {
            this.isGuest = true;
            this.apartmentId = this.id;
            axios
            .get(`rest/reviews/apartment/${this.apartmentId}`)
            .then(response => {
                this.comments=response.data;
            })
        }
    },
});