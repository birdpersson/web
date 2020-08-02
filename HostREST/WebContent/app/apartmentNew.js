Vue.component('new-apartment', {
    template: `
<div id="new-apartment">
    <div class="container" id='page-title'>
        <h1 style="margin-top:10px;color:#35424a;"> New/<span id='titleEffect'>Edit Apartment</span></h1>
        <hr style='background:#e8491d;height:1px;'>
    </div>

    <div class="container" id='main'>
        <div v-if='isHost'>
            Kao Domaćin:<br>
            ○ Mogu da izvršim dodavanje novog apartmana:<br>
            ■ Neophodno je da unesem potrebne podatke u polja (tip apartmana, broj<br>
            soba, broj gostiju, lokaciju, itd)<br>
            Napomena: Postoji pregled svih dostupnih sadržaja apartmana koji se<br>
            mogu dodeliti apartmanu<br>
            ■ Pritiskom na dugme za slanje se šalje zahtev za dodavanje apartmana na<br>
            server<br>
            ■ U slučaju uspešnog dodavanja korisnik se obaveštava o tome<br>
            ■ U slučaju neuspešnog dodavanja korisniku se ispisuje greška<br>
            Napomena: Inicijalan status apartmana je NEAKTIVAN, a Domaćin je onaj ko je<br>
            inicirao kreiranje<br>
            Moze se stranica iskoristiti i za editovanje stanova iz liste stanova, ili da se u tom slucaju<br>
            napravi nova stranica koja ce sluziti iskljucivo za edit stanova.
            
            <label>Type of apartment</label>
            <select v-model="apartment.type">
                <option disabled value="">Type</option>
                <option v-for="type in types" v-on:click="checkApartment">{{type}}</option> 
                <!-- <option v-for="type in types">{{type}}</option>  -->
            </select>

            <label>Number of rooms</label>
            <img src="img/negativ1.1.png" v-show="!isApartment">
            <select v-show="isApartment" v-model="apartment.rooms">
                <option disabled value="">No. of rooms</option>
                <option v-for="room in rooms">{{room}}</option> 
            </select>
            
            <label>Number of guests</label>
            <select v-model="apartment.guests">
                <option disabled value="">No. of guests</option>
                <option v-for="guest in guests">{{guest}}</option> 
            </select>
                
            <label>Location</label>
            <input class='half-size' type="text" placeholder="Enter location longitude..." v-model='apartment.location.longitude'> -
            <input class='half-size' type="text" placeholder="Enter location latitude..." v-model='apartment.location.latitude'>
            
            <label style="display:inline;">Address</label>
            <input id='address' type="text" placeholder="Enter address..." v-model='apartment.location.address'>	
            
            <label>Price</label>
            <input id='price' type="text" placeholder="Enter price..." v-model='apartment.price'>	
           
            <label>Time to checkin & checkout</label>
            <input class='half-size' type="text" placeholder="Checkin..." v-model='apartment.checkin'> -
            <input class='half-size' type="text" placeholder="Checkout..." v-model='apartment.checkout'>
            <button class="btn btn-lg btn-success" v-on:click="checkSave()">Save</button> 
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

            isApartment:true,

            apartment:{
                type:null,
                rooms:null,
                guests:null,
                location:{
                    longitude:'',
                    latitude:'',
                    address:'',
                },
                dates:null,
                // availability:null,
                host:null,
                // reviews:null,
                images:null,
                price:null,
                checkin:'2pm',
                checkout:'10pm',
                status:'neaktivno',
                amenities:null,
            },

            types:['ceo apartman','soba'],
            statuses:['aktivno','neaktivno'],
            rooms:null,
            guests:null,
            location:{
                longitude:'',
                latitude:'',
                address:'',
            }
        }
    },
    methods: {
        checkSave:function(){
            // this.apartment.location = this.location
         
            alert(`
            type:${this.apartment.type}\n
            rooms:${this.apartment.rooms}\n
            guests:${this.apartment.guests}\n
            location:${this.apartment.location.address}\n
            dates:${this.apartment.dates}\n
            availability:${this.apartment.availability}\n
            host:${this.apartment.host}\n
            reviews:${this.apartment.reviews}\n
            images:${this.apartment.images}\n
            price:${this.apartment.price}\n
            checkin:${this.apartment.checkin}\n
            checkout:${this.apartment.checkout}\n
            status:${this.apartment.status}\n
            amenities:${this.apartment.amenities}\n
            `);
        },
        checkApartment:function(){
            if(this.apartment.type==="ceo apartman"){
                this.isApartment = true;
            }
            else{
                this.isApartment = false;
            }
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
        if(this.isGuest === true){
            //preuzeti hosta pa ga smestiti ovde;
           //ovo samo za test
            this.apartment.host =  this.user.username;
        }
        this.rooms = this.range(1,10);
        this.guests = this.range(1,15);
    }
});

