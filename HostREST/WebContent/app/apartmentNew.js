Vue.component('new-apartment', {
    template: `
<div id="home">
    <div>
        <h1>Hello from New/Edit Apartment {{user.username}}! Hosts only</h1>
        <h3>You are {{user.role}}</h3>

        <p v-if='isHost'>
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
        </p>
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

