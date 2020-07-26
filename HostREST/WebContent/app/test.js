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

<div id="test">
  
    <table class="table">
        <thead>
        <tr>
            <th @click="sort('name')">Name <img v-if='currentSortDir == "asc"' src='img/up-arrow1.1.png'><img v-if='currentSortDir == "desc"' src='img/down-arrow1.1.png'></th>
            <th @click="sort('age')">Age</th>
            <th @click="sort('breed')">Breed</th>
            <th @click="sort('gender')">Gender</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="cat in sortedCats">
            <td>{{cat.name}}</td>
            <td>{{cat.age}}</td>
            <td>{{cat.breed}}</td>
            <td>{{cat.gender}}</td>
        </tr>
        </tbody>
    </table>
    
    debug: sort={{currentSort}}, dir={{currentSortDir}}
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
            //sort data
            cats:[
                {
                    name:'Acat',
                    age:1,
                    breed:'Abreed',
                    gender:'M'
                },
                {                    
                    name:'Bat',
                    age:10,
                    breed:'Bbreed',
                    gender:'M'},
                {
                    name:'Ccat',
                    age:5,
                    breed:'Abreed',
                    gender:'F'
                },
            ],
            currentSort:'name',
            currentSortDir:'asc'
		}
	},
	methods: {
        searchUser(){
            alert(`Trazite usera ${this.searchedUser.username}
            ${this.searchedUser.gender}
            ${this.searchedUser.role}
            `);
        },

        sort:function(s) {
            //if s == current sort, reverse
            if(s === this.currentSort) {
              this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
            }
            this.currentSort = s;
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
        },

        sortedCats:function() {
            return this.cats.sort((a,b) => {
              let modifier = 1;
              if(this.currentSortDir === 'desc') modifier = -1;
              if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
              if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
              return 0;
            });
          }
    },
    

    
})



// <!--<div v-if='isAdmin'>
// Kao Administratoru:<br>
// ○ Omogućen mi je pregled svih rezervacija u sistemu<br>
// <table border="1px;">
//     <thead>
//         <tr>
//             <th colspan="4">
//                 Pregled svih rezervacija
//             </th>
//         </tr>
//         <tr>
//             <th>Atribut1</th>
//             <th>Atribut2</th>
//         </tr>
//     </thead>
//     <tbody>
//         <tr>
//             <td>atribut1</td>
//             <td>atribut2</td>

//         </tr>
//         <tr>
//             <td>atribut3</td>
//             <td>atribut4</td>
//         </tr>
//     </tbody>
// </table>
// </div> <!-- isAdmin -->

// <div v-if='isHost'>
// Kao Domaćin:<br>
// ○ Imam pregled rezervacija nad svim mojim apartmanima (bez obzira na status):<br>
// ■ Mogu da prihvatim rezervaciju koja se nalazi u statusu KREIRANA, pri<br>
// čemu rezervacija menja status u PRIHVAĆENA<br>
// ■ Mogu da odbijem rezervaciju ako se nalazi u statusu KREIRANA ili<br>
// PRIHVAĆENA, pri čemu rezervacija menja status u ODBIJENA<br>
// ■ Nakon završnog datuma noćenja, mogu da postavim rezervaciju na<br>
// status ZAVRŠENA<br>
// <br>
// <br>
// <table class="table">
//     <thead>
//         <tr>
//             <th colspan="4">
//                 Pregled svih rezervacija stanova tog hosta
//             </th>
//         </tr>
//         <tr>
//             <th>Atribut1</th>
//             <th>Atribut2</th>
//             <th>Status</th>
//             <th>Status</th>
//             <th>Status</th>
//         </tr>
//     </thead>
//     <tbody>
//         <tr>
//             <td>atribut1</td>
//             <td>atribut2</td>
//             <td><button v-on:click='messageHost'> prihvacen </button></td>
//             <td><button v-on:click='messageHost'> odbijen </button></td>
//             <td><button v-on:click='messageHost'> zavrsen </button></td>
//         </tr>
//         <tr>
//             <td>atribut3</td>
//             <td>atribut4</td>
//             <td><button v-on:click='messageHost'> prihvacen </button></td>
//             <td><button v-on:click='messageHost'> odbijen </button></td>
//             <td><button v-on:click='messageHost'> zavrsen </button></td>
//         </tr>
//     </tbody>
// </table>
// </div>--> <!-- isHost -->