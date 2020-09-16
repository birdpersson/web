Vue.component('amenities-overview', {
    template: `
<div id="amenities-overview">
    <div class="container" id='page-title'>
        <h1 style="margin-top:10px;color:#35424a;">List of <span id='titleEffect'>Amenities</span></h1>
        <hr style='background:#e8491d;height:1px;'>
    </div>
    <div class="container" id='main'>
        <div v-if='isAdmin'>
            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Change name</th>
                        <th>Delete amenity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='amenity in amenities'>
                        <td>{{amenity.name}}</td>
                        <td>{{amenity.type}}</td>
                        <td><a href="#edit-amenity"><button v-on:click='showEdit(amenity)'> edit </button></a></td>
                        <td><button v-on:click='deleteAmenity(amenity)'> delete </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- <button class="btn btn-lg btn-success" v-if='!isGuest' style='padding-left: 5px;'>Add amenity</button> -->
            <a href="#new-amenity"><button v-on:click='showNew()' class="btn btn-lg btn-dark"
                    style='margin-top: 80px;'>Add amenity</button></a>
            <hr>

            <div v-if='isAddNew' id="new-amenity">
                <div class="container" id='page-title'>
                    <h1 v-if='isAddNew' style="margin-top:10px;color:#35424a;">New <span id='titleEffect'>Amenity</span>
                    </h1>
                    <hr style='background:#e8491d;height:1px;'>
                </div>
                <div class="container">
                    <div v-if='messages.errorResponse' class="alert alert-danger" v-html="messages.errorResponse"></div>
                    <div v-if='messages.successResponse' class="alert alert-success" v-html="messages.successResponse">
                    </div>
                    <div>
                        <div v-if='messages.errorName' class="alert alert-danger" v-html="messages.errorName"></div>
                        <label>Name of new amenity :</label>
                        <input style="width:100%; padding:10px; margin-bottom:25px" type="text"
                            placeholder="Enter name..." v-model="newAmenity.name">
                        <div v-if='messages.errorType' class="alert alert-danger" v-html="messages.errorType"></div>
                        <label>Type :</label>
                        <div id="amenity-type">
                            <label for="one">Base</label>
                            <input type="radio" id="one" value="Base" v-model="newAmenity.type">

                            <label for="two">Dining</label>
                            <input type="radio" id="two" value="Dining" v-model="newAmenity.type">

                            <label for="two">Facilities</label>
                            <input type="radio" id="two" value="Facilities" v-model="newAmenity.type">

                            <label for="two">Family</label>
                            <input type="radio" id="two" value="Family" v-model="newAmenity.type">
                        </div>
                        <button class="btn btn-success" v-on:click='addAmenity()'>Save</button>
                    </div>
                </div>
            </div>
            <!--New Amenity-->
            <div v-if='isEdit' id="edit-amenity">
                <div class="container" id='page-title'>
                    <h1 style="margin-top:10px;color:#35424a;">Edit <span id='titleEffect'>Amenity</span></h1>
                    <hr style='background:#e8491d;height:1px;'>
                </div>
                <div class="container">
                    <div v-if='messages.errorResponse' class="alert alert-danger" v-html="messages.errorResponse"></div>
                    <div v-if='messages.successResponse' class="alert alert-success" v-html="messages.successResponse">
                    </div>
                    <div>
                        <div v-if='messages.errorName' class="alert alert-danger" v-html="messages.errorName"></div>
                        <label>Name of new amenity :</label>
                        <input style="width:100%; padding:10px; margin-bottom:25px" type="text"
                            v-model="updatedAmenity.name" placeholder="Enter name...">

                    </div>
                    <button class="btn btn-success" v-on:click='editAmenity()'>Save</button>
                    <button class="btn btn-danger" v-on:click='closeEdit()'>Close</button>
                </div>
            </div>
        </div>
        <!--Edit Amenity-->
        <hr>
    </div>
</div>
`,
    data: function () {
        return {
            user: {
                username: '',
                role: ''
            },

            isAdmin: false,
            isHost: false,
            isGuest: false,
            amenities: [],

            newAmenity: {
                name: '',
                type: '',
                // apartmentId:[],
            },
            isAddNew: false,
            isEdit: false,
            updatedAmenity: {
                id: '',
                name: '',
                type: '',
                // apartmentId:[],
            },
            beckupName: '',

            messages: {
                errorName: '',
                errorType: '',
                errorResponse: '',
                successResponse: '',
            }
        }
    },
    methods: {
        showAllAmenities: function () {
            axios
                .get('rest/amenity/all')
                .then(response => {
                    this.amenities = response.data;
                })
        },
        showNew: function () {
            //Ako je otvoreno polje za edit zatvori se prvo
            // da bi se otvorilo polje za dodavanje novog sadrzaja.
            if (this.isEdit === true) {
                this.isEdit = false;

                this.updatedAmenity.name = this.beckupName
            }
            this.isAddNew = !this.isAddNew
        },
        showEdit: function (chosenAmenity) {
            //Ako je otvoreno polje za dodavanje novog sadrzaja
            //zatvori se prvo da bi se otvorilo polje za edit.
            if (this.isAddNew === true) {
                this.isAddNew = false;
            }
            //Ako je vec otvoreno polje za edit
            //i odabere se neki drugi sadrzaj ostaje polje otvoreno,
            //a novi sadrzaj se edituje.
            if (this.isEdit === true) {
                this.isEdit = true;
                //ako promeni ime a ne sacuva nego skoci na sledeci sadrzaj
                //promenjeo ime se gubi i vraca na staro;
                this.updatedAmenity.name = this.beckupName

                this.updatedAmenity = chosenAmenity;
                this.beckupName = chosenAmenity.name;
            }
            else {
                this.isEdit = !this.isEdit;
                this.updatedAmenity = chosenAmenity;
                this.beckupName = chosenAmenity.name;
            }
        },
        closeEdit() {
            //Ako je vec otvoreno polje za edit zatvori se.
            if (this.isEdit === true) {
                this.isEdit = !this.isEdit;
                //ako promeni ime a ne sacuva nego ugasi edit 
                //promenjeo ime se gubi i vraca na staro;
                this.updatedAmenity.name = this.beckupName
                // this.updatedAmenity = {};
            }
        },
        addAmenity: function () {
            if (this.newAmenity.name == '' && this.newAmenity.type != '') {
                this.messages.errorName = `<h4>Name of amenity can't be empty!</h4>`;
                setTimeout(() => this.messages.errorName = '', 3000);
            }
            else if (this.newAmenity.name != '' && this.newAmenity.type == '') {
                this.messages.errorType = `<h4>Type of amenity can't be empty!</h4>`;
                setTimeout(() => this.messages.errorType = '', 3000);
            }
            else if (this.newAmenity.name == '' && this.newAmenity.type == '') {
                this.messages.errorName = `<h4>Name of amenity can't be empty!</h4>`;
                this.messages.errorType = `<h4>Type of amenity can't be empty!</h4>`;
                setTimeout(() => this.messages.errorName = '', 3000);
                setTimeout(() => this.messages.errorType = '', 3000);

            }
            else {
                axios
                    .post('rest/amenity/', this.newAmenity)
                    .then(response => {
                        this.messages.successResponse = `<h4>Amenity was added successfully!</h4>`;
                        this.newAmenity.name = '';
                        this.newAmenity.type = '';
                        this.showAllAmenities();
                        setTimeout(() => this.messages.successResponse = '', 5000);

                    })
                    .catch(error => {
                        if (error.response.status === 500 || error.response.status === 404) {
                            this.messages.errorResponse = `<h4>We had some server errors, please try again later!</h4>`;
                            setTimeout(() => this.messages.errorResponse = '', 5000);
                        }
                    });
            }
        },
        editAmenity: function () {
            if (this.updatedAmenity.name === '') {
                this.messages.errorName = `<h4>Name of amenity can't be empty!</h4>`;
                setTimeout(() => this.messages.errorName = '', 3000);
            }
            else {
                axios
                    .put(`rest/amenity/${this.updatedAmenity.id}`, this.updatedAmenity)
                    .then(response => {
                        this.messages.successResponse = `<h4>Amenity was updated successfuly!</h4>`;
                        this.updatedAmenity.name = '';
                        this.showAllAmenities();
                        setTimeout(() => this.messages.successResponse = '', 5000);

                    })
                    .catch(error => {
                        if (error.response.status === 500 || error.response.status === 404) {
                            this.messages.errorResponse = `<h4>We had some server errors, please try again later!</h4>`;
                            setTimeout(() => this.messages.errorResponse = '', 5000);
                        }
                    });
            }
        },
        deleteAmenity: function (amenity) {
            axios
            .delete('rest/amenity/' + amenity.id)
            .then(response => {
                if (response.status == 201) {
                    alert('Amenity deleted');
                    console.log(response.data);
                    window.location.reload();
                }
                else {
                    alert('Failed to delete amenity');
                    console.log(response.data);
                }
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
            this.showAllAmenities();

        } else if (this.user.role == "HOST") {
            this.isHost = true;
        } else {
            this.isGuest = true;
        }
    },
});
