Vue.component('apartments',{
    template:`
        <div id="apartments-overview">
            <header id='main-header'>
                <h1> App Title </h1>
                <nav>
                    <ul>
                        <li><router-link to="/homepage">Home</router-link></li> 
                        <li v-if='!isGuest'><router-link to="/users">Users</router-link></li>
                        <li><router-link to="/reservations">Reservations</router-link></li>
                        <li><router-link to="/profile">Profile</router-link></li>
                    </ul>
                </nav>
            </header>
            <div> 
                <h1>Hello from Overview Apartments Page {{user.username}}!</h1>
                <h3>You are {{user.role}}</h3>
            </div>
            <p v-if='isGuest'>
                Kao Guest:<br>
                <table border="1px;">
                    <thead>
                        <tr >
                            <th colspan="4">
                                Lista stanova
                            </th>
                        </tr>
                        <tr>
                            <th>Atribut1</th>
                            <th>Atribut2</th>
                            <th>Komentari</th>
                            <th>Rezervacija</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>atribut1</td>
                            <td>atribut2</td>
                            <td><router-link to="/apartmentComments"><button> Komentari </button></router-link></td>
                            <td><router-link to="/newReservation"><button> Rezervacija </button></router-link></td>
                        </tr>
                        <tr>
                            <td>atribut3</td>
                            <td>atribut4</td>
                            <td><router-link to="/apartmentComments"><button> Komentari </button></router-link></td>
                            <td><router-link to="/newReservation"><button> Rezervacija </button></router-link></td>
                        </tr>
                    </tbody>
                </table>
                <br>  
                <router-link to="/reservations"><button>List of reservations</button></router-link>
            </p> 
            <p v-if='isAdmin'>
                Kao Administratoru:<br>

            </p> 
            <p v-if='isHost'>
                Kao Domaćin:<br>
                
                
            </p>
           
        </div>
    `,
    data:function(){
        return{
            user:{
                username:'',
                role:''
            },
            isAdmin:false,
            isHost:false,
            isGuest:false
        }
    },
    methods:{

    },
    created(){
        this.user.username = localStorage.getItem('user');
        this.user.role = localStorage.getItem('role');
        if(this.user.role == "ADMIN"){
            this.isAdmin = true;
        }else if(this.user.role == "HOST"){
            this.isHost = true;
        }else{
            this.isGuest= true;
        }
    },
});