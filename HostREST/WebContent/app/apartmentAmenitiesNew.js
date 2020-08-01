Vue.component('new-amenities', {
    template: `
<div id="new-amenity">
   <div class="container" id='page-title'>
        <h1 style="margin-top:10px;color:#35424a;">New <span id='titleEffect'>Amenity</span></h1>
        <hr style='background:#e8491d;height:1px;'>
    </div>
    <div class="container">
        <div v-if='isAdmin'>       
            <label>Name of new amenity :</label>
            <input style="width:100%; padding:10px; margin-bottom:25px" type="text" placeholder="Enter name...">
            <button class="btn btn-success">Save</button>
        </div>
        ■ Neophodno je uneti naziv novog sadržaja<br>
        ■ Pritiskom na dugme za slanje se šalje zahtev za dodavanje sadržaja<br>
        apartmana na server<br>
        ■ U slučaju uspešnog dodavanja korisnik se obaveštava o tome<br>
        ■ U slučaju neuspešne izmene korisniku se ispisuje greška<br>
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
            isGuest: false
        }
    },
    methods: {

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
