Vue.component('inactive-overview',{
    template:`
        <div id="home">
            <header id='main-header'>
                <h1> App Title </h1>
                <nav class="nav navbar-nav">
                    <ul>
                        <li><router-link to="/homepage">Home</router-link></li>
                        <li><router-link to="/apartments">Apartments</router-link></li>                      
                        <li v-if='!isGuest'><router-link to="/users">Users</router-link></li>
                        <li><router-link to="/reservations">Reservations</router-link></li>
                        <li><router-link to="/profile">Profile</router-link></li>
                    </ul>
                </nav>
            </header>
            <div> 
                <h1>Hello from Inactive overview {{user.username}}! Hosts only</h1>
                <h3>You are {{user.role}}</h3>
            
                <p v-if='isHost'>
                    Kao Domaćin imam mogućnost:<br>
                    ○ Pregleda, sortiranja i filtriranja po svim kriterijumima, ali isključivo svojih<br>
                    apartmana sa statusom AKTIVAN<br>
                    ○ Imam pregled svojih apartmana sa statusom NEAKTIVAN<br>
                </p>
            </div>
      
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

