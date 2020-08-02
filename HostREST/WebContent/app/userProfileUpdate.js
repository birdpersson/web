Vue.component('profile-update', {
    template: `
<div id="profile-update">
    <div id='main'>
        <div class="container" id='page-title'>
            <h1 style="margin-top:10px;color:#35424a;">User Profile<span id='titleEffect'> Update</span></h1>
            <hr style='background:#e8491d;height:1px;'>
        </div>
        <div class="container">

            <fieldset class="form-group">
                <label>Korisnicko ime</label>
                <input type="text" class="form-control" v-model="profile.username" disabled />
            </fieldset>

            <fieldset class="form-group">
                <label>Ime</label>
                <input type="text" class="form-control" v-model="profile.firstname" />
            </fieldset>

            <fieldset class="form-group">
                <label>Prezime</label>
                <input type="text" class="form-control" v-model="profile.lastname" />
            </fieldset>

            <fieldset class="form-group">
                <label>Adresa</label>
                <input type="text" class="form-control" v-model="profile.gender" />
            </fieldset>

            <fieldset class="form-group">
                <label>Grad</label>
                <input type="text" class="form-control" v-model="profile.role" />
            </fieldset>

            <hr>

            <fieldset class="form-group">
                <label>Sifra</label>
                <input type="text" class="form-control" v-model="profile.newPassword" />
            </fieldset>

            <fieldset class="form-group">
                <label>Nova Sifra</label>
                <input type="text" class="form-control" v-model="profile.newPassword" />
            </fieldset>

            <fieldset class="form-group">
                <label>Potvrda sifre</label>
                <input type="text" class="form-control" v-model="profile.newPasswordRepeat" />
            </fieldset>

            <button type="button" class="btn btn-lg btn-success" v-on:click='updatePacijentProfile'> Save </button>
        </div>
    </div>
</div>`,
    data: function () {
        return {
            user: {
                username: '',
                role: ''
            },
            profile: {
                username: 'tttesttt',
                password: 'test12345',
                firstname: 'Test',
                lastname: 'Testovic',
                gender: 'M',
                role: 'admin',
                newPassword: '',
                newPasswordRepeat: '',

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