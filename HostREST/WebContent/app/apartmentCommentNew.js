Vue.component('new-comment', {
    template: `
<div id="aparm-new-comment">
    
        <div class="container" id='page-title'>
            <h1 style="margin-top:10px;color:#35424a;">Add <span id='titleEffect'>Comment</span></h1>
            <hr style='background:#e8491d;height:1px;'>
        </div>
        <div class="container" id='main'>
            <div v-if='isGuest'>
              <!--  Kao Gost:<br>
                ○ Mogu da ostavim komentar na apartman za koji imam rezervaciju sa statusom<br>
                ODBIJENA ili ZAVRŠENA:<br>
                <br>
                ■ Unosim komentar u polje<br>
                ■ Dodeljujem ocenu apartmanu<br>
                ■ Klikom na dugme se komentar šalje na server<br>
                ■ U slučaju uspešnog slanja komentara korisnik se o tome obaveštava<br>
                ■ U slučaju neuspešnog slanja komentara korisniku se ispisuje greška<br>
                <br>
                <br>-->
                <div v-if='messages.errorResponse' class="alert alert-danger" v-html="messages.errorResponse"></div>
                <div v-if='messages.successResponse' class="alert alert-success" v-html="messages.successResponse"></div>
                <label>Comment:</label>
                <div v-if='messages.errorText' class="alert alert-danger" v-html="messages.errorText"></div>
                <textarea v-model='review.text' placeholder="Enter comment..."></textarea>
                <br>
                <label>Rating: </label>
                <div v-if='messages.errorStar' class="alert alert-danger" v-html="messages.errorStar"></div>
                <star-rating
                    inactive-color="#35424a"
                    active-color="#e8491d"
                    glow:2
                    glow-color="#e8491d"
                    v-model="review.star"></star-rating>
                <br>

                <button class="btn btn-lg btn-success" v-on:click='addComment'> Add comment </button>
            </div>
        </div>
</div>`,
    data: function () {
        return {
            user: {
                username: '',
                role: ''
            },
            isGuest: false,
            review:{
	            guestId:'',
	            apartmentId:'',
	            text:'',
	            star:null,
	            visible:false,
                // comment:'',
                // rating:null,
            },
            messages:{
                errorText:'',
                errorStar:'',
                errorResponse:'',
                successResponse:'',
            }
        }
    },

    methods: {
        addComment: function(){
            if(this.review.text=='' &&  this.review.star!=null){
                this.messages.errorText =  `<h4>Text of comment can't be empty!</h4>`;
                setTimeout(()=>this.messages.errorText='',3000);
            }
            else if(this.review.text!='' && this.review.star==null){
                this.messages.errorStar =  `<h4>Rating can't be empty!</h4>`;
                setTimeout(()=>this.messages.errorStar='',3000);
            }
            else if(this.review.text=='' && this.review.star==null){
                this.messages.errorText =  `<h4>Text of comment can't be empty!</h4>`;
                this.messages.errorStar =  `<h4>Rating can't be empty!</h4>`;
                setTimeout(()=>this.messages.errorText='',3000);
                setTimeout(()=>this.messages.errorStar='',3000);
               
            }
            else{
                axios
                .post('rest/reviews/', this.review)
                .then(response => {
                    this.messages.successResponse = `<h4>Your review was sent successfuly! Thank you for your feedback!</h4>`;
                    this.review.text='';
                    this.review.star=null;
                    setTimeout(() => this.messages.successResponse='', 5000);

                })
                .catch(error => {
                    if(error.response.status === 500 || error.response.status === 404){
                        this.messages.errorResponse= `<h4>We had some server errors, please try again later!</h4>`;
                        setTimeout(() => this.messages.errorResponse='', 5000);
                    }
                });
            }
        }
    },
    computed:{
        id() {
            return this.$route.params.id; //preuzimam id apartmana za koga dodajem novi komentara
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
            this.review.guestId = this.user.username;
            this.review.apartmentId = this.id 
            // alert('Apartment id: ' + this.review.apartmentId);
        }
    },
});