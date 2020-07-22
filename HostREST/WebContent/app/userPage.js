Vue.component('users',{
    template:`
        <div id="user-list">
            <header id='main-header'>
                <h1> App Title </h1>
                <nav>
                    <ul>
                        <li><router-link to="/homepage">Home</router-link></li>
                        <li><router-link to="/apartments">Apartments</router-link></li>                  
                        <li><router-link to="/reservations">Reservations</router-link></li>
                        <li><router-link to="/profile">Profile</router-link></li>
                    </ul>
                </nav>
            </header>
            <div> 
                <h1>Hello from Users Page {{user.username}}!</h1>
                <h3>You are {{user.role}}</h3>
            </div>
            <p v-if='isAdmin'>
                Pregled svih korisnika
                Kao Administrator:
                Imam pregled svih postojećih korisnika u sistemu, a mogu vršiti i pretragu
            </p> 
            <p v-if='isHost'>
                Kao Domaćin:
                Imam pregled svih korisnika koji su napravili rezervaciju za moje apartmane i
                mogu vršiti pretragu među njima
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