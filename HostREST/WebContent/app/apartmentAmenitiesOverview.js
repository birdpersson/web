Vue.component('amenities-overview', {
    template: `
<div id="home">
    <div>
        <h1>Hello from AmenitiesOverview {{user.username}} Only Admin!</h1>
        <h3>You are {{user.role}}</h3>

        <p v-if='isAdmin'>
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
        <table border="1px;">
            <thead>
                <tr>
                    <th colspan="4">
                        Pregled svih sadrzaja stana
                    </th>
                </tr>
                <tr>
                    <th>Atribut1</th>
                    <th>Atribut2</th>
                    <th>Izmeni naziv</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>atribut1</td>
                    <td>atribut2</td>
                    <td><button v-on:click='message'> edit </button></td>
                </tr>
                <tr>
                    <td>atribut3</td>
                    <td>atribut4</td>
                    <td><button v-on:click='message'> edit </button></td>
                </tr>
            </tbody>
        </table>
        </p>
        </p>
    </div>

    <router-link to="/amenitiesNew"><button v-if='!isGuest' style='padding-left: 5px;'>Dodaj sadrzaj</button>
    </router-link>

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
        message: function () {
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

