Vue.component('apartment-comments', {
    template: `
<div id="apartment-comments">
    <div>
        <h1>Hello from apartment comments overview {{user.username}}!</h1>
        <h3>You are {{user.role}}</h3>

        <p v-if='isGuest'>
            Pregled svih komentara za taj stan koje je odobrio host. Ovo moze biti ista stranica na kojoj
            ce se prikazivati SVI stanovi za administraora ili SVI ono stanovi koji pripadaju jedom hostu.
            Pa ako je id stana = null i rola != guest onda spram role da se getu iz baze potrebni apartmani, ili da se
            pravi posebna stranica za
            prikaz stanova za admina i hosta, a da ova bude samo za guesta.
        </p>

        <p v-if='isAdmin'>
            ● Kao Administrator:
            ○ Mogu da vidim sve komentare na sve apartmane u sistemu (bez obzira na to da li<br>
            ih je Domaćin odabrao ili nije)<br>

        </p>

        <p v-if='isHost'>
            Kao Domaćin:<br>
            ○ Imam pregled svih komentara na moje apartmane:<br>
            ■ Mogu da odaberem koji komentar će biti prikazan Gostima, a koji neće<br>
            (dakle Gosti vide samo komentare koje je Domaćin odabrao)<br>
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