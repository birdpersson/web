Vue.component('profile-update', {
    template: `
<div id="profile-update">
    <div id='main'>
        <div class="container" id='page-title'>
            <h1 style="margin-top:10px;color:#35424a;">User Profile<span id='titleEffect'> Update</span></h1>
            <hr style='background:#e8491d;height:1px;'>
        </div>
        <div class="container">
            <div v-if='messages.errorResponse' class="alert alert-danger" v-html="messages.errorResponse"></div>
            <div v-if='messages.successResponse' class="alert alert-success" v-html="messages.successResponse"></div>
            <hr>
            <h4>Data change</h4>
            <hr>
            <fieldset class="form-group">
                <label>Username</label>
                <input type="text" class="form-control" v-model="profile.username" disabled />
            </fieldset>

            <div v-if='messages.errorFirstName' id='testError' class="alert alert-danger" v-html="messages.errorFirstName"></div>
            <fieldset class="form-group">
                <label>First name</label>
                <input type="text" class="form-control" v-model="profile.firstname" />
            </fieldset>

            <div v-if='messages.errorLastName' class="alert alert-danger" v-html="messages.errorLastName"></div>
            <fieldset class="form-group">
                <label>Last name</label>
                <input type="text" class="form-control" v-model="profile.lastname" />
            </fieldset>

            <div class="form-label-group">
                <label>Gender</label>
                <br>
                <input type="radio" v-model="profile.gender" required value="Male"> Male
                <input type="radio" v-model="profile.gender" required value="Female"> Female
                <input type="radio" v-model="profile.gender" required value="Other"> Other
                <br>
                <br>
            </div>

            <hr>
            <h4>Password change</h4>
            <hr>
            <div v-if='messages.errorNotEqualOldPassword' class="alert alert-danger" v-html="messages.errorNotEqualOldPassword"></div>
            <div v-if='messages.errorOldPass' class="alert alert-danger" v-html="messages.errorOldPass"></div>
            <fieldset class="form-group">
                <label>Old password</label>
                <input type="password" class="form-control" v-model="changedPassword.oldPassword" placeholder="Enter old password" />
            </fieldset>

            <div v-if='messages.errorNewPass' class="alert alert-danger" v-html="messages.errorNewPass"></div>
            <fieldset class="form-group">
                <label>New password</label>
                <input type="password" class="form-control" v-model="changedPassword.newPassword" placeholder="Enter new password" />
            </fieldset>

            <div v-if='messages.errorNotEqualNewPassword' class="alert alert-danger" v-html="messages.errorNotEqualNewPassword"></div>
            <div v-if='messages.errorRepNewPass' class="alert alert-danger" v-html="messages.errorRepNewPass"></div>
            <fieldset class="form-group">
                <label>Repeat new password</label>
                <input type="password" class="form-control" v-model="changedPassword.newPasswordRepeat" placeholder="Repeat your new password"  />
            </fieldset>

            <button type="button" class="btn btn-lg btn-success" v-on:click='updateProfile'> Save </button>
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
                username: '',
                password: '',
                firstname: '',
                lastname: '',
                gender: '',
                role: '',
            },
            changedPassword: {
                oldPassword: '',
                newPassword: '',
                newPasswordRepeat: '',
            },
            isAdmin: false,
            isHost: false,
            isGuest: false,

            messages: {
                errorFirstName: '',
                errorLastName: '',
                errorOldPass: '',
                errorNewPass: '',
                errorRepNewPass: '',
                errorNotEqualOldPassword: '',
                errorNotEqualNewPassword: '',
                errorResponse: '',
                successResponse: '',
            }
        }
    },
    methods: {

        updateProfile: function () {
            // First name i last name se u paru gledaju da li su popunjeni
            // Ako su oba prazna u isto vreme ce za oba izbaciti error
            if (this.profile.firstname == '' && this.profile.lastname != '') {
                this.messages.errorFirstName = `<h4>First name of user can't be empty!</h4>`;
                setTimeout(() => this.messages.errorFirstName = '', 3000);
            }
            else if (this.profile.firstname != '' && this.profile.lastname == '') {
                this.messages.errorLastName = `<h4>Last name of user can't be empty!</h4>`;
                setTimeout(() => this.messages.errorLastName = '', 3000);
            }
            else if (this.profile.firstname == '' && this.profile.lastname == '') {
                this.messages.errorFirstName = `<h4>First name of user can't be empty!</h4>`;
                this.messages.errorLastName = `<h4>Last name of user can't be empty!</h4>`;
                setTimeout(() => this.messages.errorFirstName = '', 3000);
                setTimeout(() => this.messages.errorLastName = '', 3000);

            }
            //Password check
            //Ako je unet old password, a nije uneto jedno od polja newPassword ili newPassword reapeat unosi se error
            else if (this.changedPassword.oldPassword !== '' && this.changedPassword.newPassword !== '' && this.changedPassword.newPasswordRepeat === '') {
                this.messages.errorRepNewPass = `<h4>You need to repeat your new password!</h4>`;
                setTimeout(() => this.messages.errorRepNewPass = '', 3000);
            }

            //Ako je unet old password, a nije uneto jedno od polja newPassword ili newPassword reapeat unosi se error
            else if (this.changedPassword.oldPassword !== '' && this.changedPassword.newPassword === '' && this.changedPassword.newPasswordRepeat !== '') {
                this.messages.errorNewPass = `<h4>You need to enter your new password!</h4>`;
                setTimeout(() => this.messages.errorNewPass = '', 3000);
            }

            //Ako je unet old password, a nije uneto jedno od polja newPassword ili newPassword reapeat unosi se error
            else if (this.changedPassword.oldPassword !== '' && this.changedPassword.newPassword === '' && this.changedPassword.newPasswordRepeat === '') {
                this.messages.errorNewPass = `<h4>You need to enter your new password!</h4>`;
                this.messages.errorRepNewPass = `<h4>You need to repeat your new password!</h4>`;
                setTimeout(() => this.messages.errorNewPass = '', 3000);
                setTimeout(() => this.messages.errorRepNewPass = '', 3000);
            }

            //Ako nije unet old password, a jesu novi ispisuje se error
            else if (this.changedPassword.oldPassword === '' && this.changedPassword.newPassword !== '' && this.changedPassword.newPasswordRepeat !== '') {
                this.messages.errorOldPass = `<h4>You need to enter your old password first!</h4>`;
                setTimeout(() => this.messages.errorOldPass = '', 3000);
            }

            //Ako su uneta sva 3 passworda, nema errora za prazna polja, ali se proverava validnost samog unosa
            else if (this.changedPassword.oldPassword !== '' && this.changedPassword.newPassword !== '' && this.changedPassword.newPasswordRepeat !== '') {
                //Provera da li je stara sifra dobro uneta
                if (this.profile.password !== this.changedPassword.oldPassword) {
                    this.messages.errorNotEqualOldPassword = `<h4>Your old password is incorrect! Please try again...</h4>`;
                    setTimeout(() => this.messages.errorNotEqualOldPassword = '', 3000);
                }
                else {
                    //Provera da li se nove sifre poklapaju
                    if (this.changedPassword.newPassword !== this.changedPassword.newPasswordRepeat) {
                        this.messages.errorNotEqualNewPassword = `<h4>Your passwords don't match! Please try again...</h4>`;
                        setTimeout(() => this.messages.errorNotEqualNewPassword = '', 3000);
                    }
                    else {
                        //ako je stara sifra dobro uneta, a nove se poklapaju,
                        //stara sifra se menja novom.
                        this.profile.password = this.changedPassword.newPassword;

                        axios.put(`rest/profile/${this.user.username}`, this.profile).then(Response => {
                            this.messages.successResponse = `<h4>Your profile was edited successfully!</h4>`;
                            setTimeout(() => this.messages.successResponse = '', 5000);

                            this.getUserProfile();

                        })
                            .catch(error => {
                                if (error.response.status === 500 || error.response.status === 404) {
                                    this.messages.errorResponse = `<h4>We had some server errors, please try again later!</h4>`;
                                    setTimeout(() => this.messages.errorResponse = '', 5000);
                                }
                            });

                    }
                }
            }
            else {
                axios.put(`rest/profile/${this.user.username}`, this.profile).then(Response => {
                    this.messages.successResponse = `<h4>Your profile was edited successfully!</h4>`;
                    setTimeout(() => this.messages.successResponse = '', 5000);

                    this.getUserProfile();

                })
                    .catch(error => {
                        if (error.response.status === 500 || error.response.status === 404) {
                            this.messages.errorResponse = `<h4>We had some server errors, please try again later!</h4>`;
                            setTimeout(() => this.messages.errorResponse = '', 5000);
                        }
                    });
            }
        },
        getUserProfile: function () {
            axios.get(`rest/profile/${this.user.username}`).then(Response => {
                this.profile = Response.data;
            })
        }
    },
    created() {
        if (!localStorage.getItem('jwt'))
            this.$router.push('/login');

        this.user.username = localStorage.getItem('user');
        this.user.role = localStorage.getItem('role');
        if (this.user.role == "ADMIN") {
            this.isAdmin = true;
        } else if (this.user.role == "HOST") {
            this.isHost = true;
        } else {
            this.isGuest = true;
        }
        this.getUserProfile();

    },
});