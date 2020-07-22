Vue.component('profile',{
    template:`
        <div id="user-profile">
            <header id='main-header'>
                <h1> App Title </h1>
                <nav>
                    <ul>
                        <li><a href="#">Apartments</a></li>                  
                        <li v-if='!isGuest'><a href="#">Users</a></li>
                        <li v-if='isGuest'><a href="#">Reservations</a></li>
                        <li><router-link to="/profile">Profile</router-link>
                    </ul>
                </nav>
            </header>
            <div> 
                <h1>Hello from Profile Page {{user.username}}!</h1>
                <h3>You are {{user.role}}</h3>
            </div>
            <footer >
                <p>Copyrights &copy; Web Programiranje 2020</p>
            </footer>
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