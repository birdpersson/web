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
                <!--<td> <button type='button' v-on:click=' goToPatientKartonDetails(row.id)' class="btn btn-outline-warning">Detaljnije</button></td>-->
                    </tr>
                </tbody>
            </table>
        </div>
    </div> -->
    <div class="col-sm-8 text-center">
    <!--SEARCH RESTAURANT FORM-->
        <h1>Search restaurants</h1>
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
        <hr>
    
        <!--RESTAURANTS TABLE-->
        <div class="row">
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
        <!--/row-->
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
		}
	},
	methods: {
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

