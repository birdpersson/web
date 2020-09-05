Vue.component('new-reservation', {
    template: `
<div id="new-Reservation">
    <div class="container" id='page-title'>
        <h1 style="margin-top:10px;color:#35424a;">Create new <span id='titleEffect'>Reservation</span></h1>
        <hr style='background:#e8491d;height:1px;'>
    </div>

    <div id='main' class='container'>
        <div v-if='isGuest'>
            <div class="card-body">
                <div class="card-header">
                    <h4>FOR</h4>
                </div>
                <h3 class="card-title"> 
                    <label for="">Type: </label> 
                    <span style="font-size: 25px;">{{apartment.type}}</span >
                </h3>

                <!-- OBRISATI -->
                <h3 class="card-title"> 
                    <label for="">Price per day (samo za test): </label> 
                    <span style="font-size: 25px;">{{apartment.price}}</span >
                </h3>
            
                <h3 class="card-title">
                    <label for="">Address: </label> 
                    <span style="font-size: 25px;">{{apartment.location.address.street}} - {{apartment.location.address.postalCode}} {{apartment.location.address.city}}</span >
                </h3>
                <hr style='background:#e8491d;height:1px;'>
            
                    <label>Day of begining:</label>
                    mora se menjati
                    <input type="date">
                    <label>Number of nights:</label>
                    <select style="padding:7px; margin-right: 10px" id='NoOfNights' v-model="newReservation.night">
                        <option disabled value="">No. of nights</option>
                        <option v-for='night in nights' v-on:click="calculatePrice()">{{night}}</option>
                    </select>
                    <label for="">Price:</label>
                    <h4>{{newReservation.price}}$ </h4>
                    <label>Message:</label>
                    <textarea v-model='newReservation.message' placeholder="Enter message..."></textarea>
                    <button class="btn btn-lg btn-success" v-on:click='sendReservation'> Send </button>
            </div>
        </div> <!--isGuest-->
    </div> <!--main-->
    OBRISATI!<br>
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

            //Nova rezervaciju koja se pravi
            newReservation:{
                apartmentId:null,
                guestId: null,
                date: null,
                night: null,
                price: null,
                confirmation: false,
                message: "",
                status: "Created"
            },

            nights:null, //max broj nocenja koje se moze odabrati.
            //Apartman za koji se rezrvacija pravi iciji se podaci prikazuju i koriste;
            apartment: {
                type: null,
                rooms: null,
                price: null,
                location: {
                  latitude: '',
                  longitude: '',
                  address: {
                    street: '',
                    city: '',
                    postalCode: ''
                  }
                }
              },
        }
    },
    methods: {
        sendReservation(){
            alert(` 
                    ApartId: ${this.newReservation.apartmentId}\n
                    GuestId: ${this.newReservation.guestId}\n
                    Night:  ${this.newReservation.night}\n
                    Date: ${this.newReservation.date}\n
                    Price:  ${this.newReservation.price}\n
                    Confirmation:  ${this.newReservation.confirmation}\n
                    Message: ${this.newReservation.message}\n
                    Status: ${this.newReservation.status}\n
                   `);
        },

        // pomocna metoda za ogranicen odabir dana:
        range:function(start=1, end){
            var ans=[];
            for(let i = start; i<=end; i++){
                ans.push(i);
            }
            return ans;
        },
        
        //Metoda za automatsko racunanje cene rezervacija spram cene apartmana * broj nocenja
        calculatePrice:function(){
            this.newReservation.price = this.newReservation.night * this.apartment.price;
        },

        
        insertReservData:function(){
            // dodaje se u rezervaciju id apartmana za koji se pravi rezervacija
            this.newReservation.apartmentId =  this.apartmentId;
            // dodaje se u rezervaciju id gusta koji pravi rezervaciju
            this.newReservation.guestId = this.user.username;
        },

        
        getApartmentData:function(){
            axios
            .get(`rest/apartment/${this.apartmentId}`)
            .then(response => {
                this.apartment.type = response.data.type;
                this.apartment.rooms = response.data.rooms;
                this.apartment.price = response.data.price;
                this.apartment.location = response.data.location;
            })
        }

    },
    computed: {
        id() {
          return this.$route.params.id; //preuzimam id apartmana na cijoj sam stranici za prikaz komentara
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
            //preuzima se id apartmana iz url-a
            this.apartmentId = this.id; 
            
            this.insertReservData();
            this.getApartmentData();
        }

    },
    mounted(){
        //dodaje se opseg dana za izbor trajanja odmora
        this.nights = this.range(1,30);
    }
});