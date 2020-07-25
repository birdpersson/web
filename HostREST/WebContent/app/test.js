Vue.component("test", {
	
    template: `
    <!--<div>
        <h3>Izvestaj o pregledu</h3>
        <div id='izvestajOPregledu' class="container" >
            <div id='filter'>
                <nav class="navbar navbar-light bg-light justify-content-between">
                    <a class="navbar-brand">Filtriranje</a>
                    <form class="form-inline" >
                    <select v-model="column" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <option v-bind:value="null">No Column Filter</option>
                        <option v-for="col in cols" v-bind:key="col">{{ col }}</option>
                        </select>
                        <input type="text" v-model="search" placeholder="Search">
                    </form>
                </nav>
            </div> 
            
            <table class="table">
                <thead>
                <tr>
                    <th v-for="col in cols" :key="col"> {{ col }} </th>  
                    <th>Details</th>
                </tr>
            
                </thead>
                <tbody>
                    <tr v-for="row in rows" :key="row.username">
                    <td v-for="col in cols" :key="col">{{ row[col] }}</td>
                <td> <button type='button' v-on:click=' goToPatientKartonDetails(row.id)' class="btn btn-outline-warning">Detaljnije</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div> -->

    <!-- <div class="col-sm-8 text-center">-->
    <!--SEARCH RESTAURANT FORM-->
    <!--<h1>Search restaurants</h1>
        <form id="searchRestaurants">
            <table style="width: 100%; text-align: center">
                <tr>
                    <td> Name:
                        <br/>
                        <input type="text" name="name" placeholder="Restaurant name" style="width: 90%;" />
                    </td>
                    <td> Address:
                        <br/>
                        <input type="text" name="address" placeholder="Address 21, City" style="width: 90%;" />
                    </td>
                    <td> Category:
                        <br/>
                        <select name="category" style="width: 90%; height: 25px">
                            <option value="" selected="selected">Choose category </option>
                            <option value="HOMESTYLE_FOOD">Homestyle food </option>
                            <option value="GRILLED_FOOD">Grilled food </option>
                            <option value="CHINESE_FOOD">Chinese food </option>
                            <option value="INDIAN_FOOD">Indian food </option>
                            <option value="PASTRY_SHOP">Pastry shop</option>
                            <option value="PIZZERIA">Pizzeria</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center" colspan="3">
                        <button type="button" id="searchRestaurantsBtn" class="btn btn-default" style="margin-top: 10px; margin-bottom: 10px" onclick="searchRestaurants()">Search</button>
                        <button type="button" class="btn btn-default" style="margin-top: 10px; margin-bottom: 10px" onclick="resetSearchRestaurantsForm()">Clear search</button>
                    </td>
                </tr>
            </table>
        </form>
        <hr>-->
    
        <!--RESTAURANTS TABLE-->
        <!--<div class="row">
            <table id="restaurantsTable" class="table table-striped" style="text-align: left">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody id="restaurantsTableBody">
                </tbody>
            </table>
        </div>
    </div>
</div>-->


<div id='test'>
    <div class="container" > 
        <div id='filter'>
            <nav class="navbar navbar-light bg-light justify-content-between">
                <a class="navbar-brand">Filtriranje</a>
                <form class="form-inline">
                <input class="form-control mr-sm-2" v-model='searchedUser.username' type="text" placeholder="username" aria-label="Search">
                <input class="form-control mr-sm-2" v-model='searchedUser.role' type="text" placeholder="role" aria-label="Search">
                <select style="padding:7px; margin-right: 10px" id='listOfGenders' v-model="searchedUser.gender">
                    <option disabled value="">Gender</option>
                    <option>male</option>
                    <option>female</option>
                    <option>other</option>
                </select>
                <button class="btn btn-outline-success my-2 my-sm-0" type="button" v-on:click='searchUser()'>Search</button>
                </form>
            </nav>

        </div> 
        <div class="container" >
            <table class="table">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Gender</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                <tr v-bind:key='users.username' v-for='user in users'>
                    <td>{{user.username}}</td>
                    <td>{{user.firstname}}</td>
                    <td>{{user.lastname}}</td>
                    <td>{{user.gender}}</td>
                    <td>{{user.role}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div> 
</div> 
        `,
    data: function () {
		return {
			user: {
				username: '',
				password: ''	
            },
            users:[
                {
                    username:'username1',
                    password:'password1',
                    firstname:'Test',
                    lastname:'Testovic',
                    gender:'M',
                    role:'admin',
                },
                {
                    username:'username2',
                    password:'password2',
                    firstname:'Test1',
                    lastname:'Testovic1',
                    gender:'M',
                    role:'host',
                },
                {
                    username:'username3',
                    password:'password3',
                    firstname:'Test2',
                    lastname:'Testovic',
                    gender:'M',
                    role:'host',
                },
                {
                    username:'username4',
                    password:'password4',
                    firstname:'Test3',
                    lastname:'Testovic',
                    gender:'M',
                    role:'guest',
                },
                {
                    username:'username5',
                    password:'password5',
                    firstname:'Testa',
                    lastname:'Testovic',
                    gender:'Z',
                    role:'guest',
                },
            ],
            searchedUser: {
				username: '',
                gender: '',
                role:'',
            },
		}
	},
	methods: {
        searchUser(){
            alert(`Trazite usera ${this.searchedUser.username}
            ${this.searchedUser.gender}
            ${this.searchedUser.role}
            `);
        }
    },
    computed: {
        cols () {
        return this.users.length >= 1 ? Object.keys(this.users[0]) : []
         },
        rows () {
            if (!this.users.length) {
                return []
            }
        
            return this.users.filter(user => {
                let props = (this.search && this.column) ? [user[this.column]] : Object.values(user)
            
            
                return props.some(prop => !this.search || ((typeof prop === 'string') ? prop.includes(this.search) : prop.toString(10).includes(this.search)))
            })
        }
    },
})

