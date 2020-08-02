Vue.component('new-reservation', {
    template: `
<div id="new-Reservation">
    <div class="container" id='page-title'>
        <h1 style="margin-top:10px;color:#35424a;">Create new <span id='titleEffect'>Reservation</span></h1>
        <hr style='background:#e8491d;height:1px;'>
    </div>

    <div id='main' class='container'>
        <div v-if='isGuest'>
            Kreiranje rezervacije<br>
            ● Kao Gost, ja jedini mogu da izvršim kreiranje rezervacije:<br>
            ○ Rezervaciju apartmana obavljam po sledećem postupku<br>
            ■ Odaberem apartman koji hoću da rezervišem, a zatim mi se omogućava<br>
            pregled datuma kad je dostupan<br>
            ■ Biram datum početka rezervacije i unosim broj noćenja<br>
            ■ Unosim poruku namenjenu domaćinu<br>
            ■ Klikom na dugme šalje se zahtev za kreiranje rezervacije na server<br>
            (potrebno je izvršiti i proveru raspoloživosti apartmana)<br>
            ■ Ukoliko je sve u redu kreira se rezervacija sa statusom KREIRANA<br>
            ■ Ukoliko provera nije prošla Gostu se ispisuje poruka da rezervaciju nije<br>
            moguće izvršiti za navedene datume<br>
            <br>
            <p>Ovde moze i prikaz sadrzaja u tom stanu</p>
            <label>Day of begining:</label>
            mora se menjati
            <input type="date">
            <label>Number of nights:</label>
            <select style="padding:7px; margin-right: 10px" id='NoOfNights' v-model="reservation.night">
                <option disabled value="">No. of nights</option>
                <option v-for='night in nights'>{{night}}</option>
            </select>
            <label>Message:</label>
            <textarea v-model='reservation.message' placeholder="message..."></textarea>
            <button class="btn btn-lg btn-success" v-on:click='addMessage'> Send </button>
        </div> <!--isGuest-->
    </div> <!--main-->
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

            reservation:{
                night: null,
                message:'',
            },

            nights:null,
        }
    },
    methods: {
        addMessage(){
            alert(`Message: ${this.reservation.message}\n
                   Night:  ${this.reservation.night}`);
        },

        // pomocna metoda za ogranicen odabir dana:
        range(start=1, end){
            var ans=[];
            for(let i = start; i<=end; i++){
                ans.push(i);
            }
            return ans;
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
        //dodaje se opseg dana za izbor trajanja odmora
        this.nights = this.range(1,30);
    }
});