Vue.component('new-comment', {
    template: `
<div id="aparm-new-comment">
    
        <div class="container" id='page-title'>
            <h1 style="margin-top:10px;color:#35424a;">Add <span id='titleEffect'>Comment</span></h1>
            <hr style='background:#e8491d;height:1px;'>
        </div>
        <div class="container" id='main'>
            <div v-if='isGuest'>
                Kao Gost:<br>
                ○ Mogu da ostavim komentar na apartman za koji imam rezervaciju sa statusom<br>
                ODBIJENA ili ZAVRŠENA:<br>
                <br>
                ■ Unosim komentar u polje<br>
                ■ Dodeljujem ocenu apartmanu<br>
                ■ Klikom na dugme se komentar šalje na server<br>
                ■ U slučaju uspešnog slanja komentara korisnik se o tome obaveštava<br>
                ■ U slučaju neuspešnog slanja komentara korisniku se ispisuje greška<br>
                <br>
                <br>
               
                <label>Comment:</label>
                <textarea v-model='comment' placeholder="Enter comment..."></textarea>
                <br>
                <label>Rating: </label>
                <star-rating
                    inactive-color="#35424a"
                    active-color="#e8491d"
                    glow:2
                    glow-color="#e8491d"
                    v-model="rating"></star-rating>
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
            
            comment:'',
            rating:null,
        }
    },

    methods: {
        addComment: function(){
            alert(`Komentar: ${this.comment}, Ocena: ${this.rating}`);
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
    },

});