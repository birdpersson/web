Vue.component('amenities-overview', {
    template: `
<div id="home">
    <div class="container" id='page-title'>
        <h1 style="margin-top:10px;color:#35424a;">List of <span id='titleEffect'>Amenities</span></h1>
        <hr style='background:#e8491d;height:1px;'>
    </div>
    <div class="container" id='main'>
        <div v-if='isAdmin'>
            Održavanje sadržaja apartmana<br>
            ● Kao administrator zadužen sam i za održavanje liste koja predstavlja sadržaj apartmana:<br>
            ○ Mogu da dodajem novi entitet u spisak sadržaja apartmana:<br>

            ■ Neophodno je uneti naziv novog sadržaja<br>
            ■ Pritiskom na dugme za slanje se šalje zahtev za dodavanje sadržaja<br>
            apartmana na server<br>
            ■ U slučaju uspešnog dodavanja korisnik se obaveštava o tome<br>
            ■ U slučaju neuspešne izmene korisniku se ispisuje greška<br>
            ○ Mogu da menjam nazive postojećih sadržaja apartmana<br>
            ○ Mogu da obrišem neki postojeći sadržaj apartmana (potrebno je obrisati taj<br>
            sadržaj i kod svih apartmana koji ga poseduju)<br>
            <br>
            <br>
            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>In apartment</th>
                        <th>Change name</th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for='amenity in amenities'>
                    <td>{{amenity.name}}</td>
                    <td>{{amenity.apartmentId}}</td>
                    <td><button v-on:click='message'> edit </button></td>
                </tr>
                </tbody>
            </table>
                <router-link to="/amenitiesNew"><button class="btn btn-lg btn-success" v-if='!isGuest' style='padding-left: 5px;'>Add amenity</button>
                </router-link>
                <button v-on:click='isAddNew=!isAddNew' class="btn btn-lg btn-dark" style='margin-top: 80px;'>New amenity</button> 
            <hr>
            <div v-if='isAddNew' id="new-amenity">
                <div class="container" id='page-title'>
                    <h1 style="margin-top:10px;color:#35424a;">New <span id='titleEffect'>Amenity</span></h1>
                    <hr style='background:#e8491d;height:1px;'>
                </div>
                <div class="container">
                    <div>       
                        <label>Name of new amenity :</label>
                        <input style="width:100%; padding:10px; margin-bottom:25px" type="text" placeholder="Enter name...">
                        <button class="btn btn-success">Save</button>
                    </div>
                </div>
            </div>,
            <hr>
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
            amenities:[
                {	
                    id:'1',
                    name:'parking',
                    apartmentId:[1,2,3],
                },
                {	
                    id:'2',
                    name:'frizider',
                    apartmentId:[1,2,3],
                },
                {	
                    id:'3',
                    name:'kuhinja',
                    apartmentId:[1,2,3],
                },
                {	
                    id:'4',
                    name:'pegla',
                    apartmentId:[1,2,3],
                },
                {	
                    id:'5',
                    name:'ves masina',
                    apartmentId:[1,2,3],
                },
                {	
                    id:'6',
                    name:'djakuzi',
                    apartmentId:[1,2,3],
                },
                {	
                    id:'7',
                    name:'parking',
                    apartmentId:[1,2,3],
                },
                {	
                    id:'8',
                    name:'klima',
                    apartmentId:[1,2,3],
                },
                {	
                    id:'9',
                    name:'TV',
                    apartmentId:[1,2,3],
                }
            ],

            isAddNew:false,
        }
    },
    methods: {
        message: function() {
            alert('Menja se ime sadrzaja ili direktno u tabeli ili iz posebnog prozora');
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

