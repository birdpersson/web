Vue.component('homepage',{
    template:`
        <div id="home">
            <div id="navigation">
                <nav class="navbar navbar-expand-lg navbar-dark static-top">
                    <div class="container">
                        <h1><span id='titleEffect'>Apartment</span>Finder</h1>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarResponsive">
                            <ul class="navbar-nav ml-auto">

                                <li class="nav-item active">
                                    <router-link to="/homepage" class="nav-link" exact>Home</router-link>
                                </li> <!--Zakomentarisati za navbar-->

                                <li class="nav-item active">
                                    <router-link to="/apartments"  class="nav-link" exact>Apartments
                                        <span class="sr-only">current)</span>     
                                    </router-link>
                                </li>
                
                                <li class="nav-item" v-if='!isGuest'>
                                        <router-link class="nav-link" to="/users" exact>Users</router-link>
                                </li>
                
                                <li class="nav-item">
                                    <router-link class="nav-link" to="/reservations" exact>Reservations</router-link>
                                </li>
                
                                <li class="nav-item">
                                    <router-link class="nav-link" to="/profile" exact>Profile</router-link>
                                </li> 
                                <!--<li class="nav-item">
                                    <router-link  to='#' class="nav-link" exact> <button class="btn" id='btnLogin'>Log In</button> </router-link>
                                </li>
                                <li class="nav-item">
                                    <button  class="btn"  id='btnLogout' >Log Out</button> 
                                </li>-->
                            </ul>
                            <router-link  to='#' class="nav-link" exact> <button class="btn" id='btnLogin'>Log In</button> </router-link>
                            <button  class="btn"  id='btnLogout' >Log Out</button> 
                        </div> <!--navbarResponsive-->
                    </div><!--container-->
                </nav>
            </div> <!--navigation-->
            <div id='main'> 
                <div class="container">
                    <h1 style="margin-top:10px;color:#35424a;" >Welcome <span id='titleEffect'>{{user.username}}</span>!</h1>
                    <hr style='background:#e8491d;height:1px;'>  
                </div>

                <div v-if='!isGuest'>
                    <!-- Page Content -->
                    <div class="container">
                        <div class="row">
                            <!-- Apartments -->
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-0 shadow">
                                    <router-link style='text-decoration: none;color:#35424a;' to="/apartments"  class="nav-link" exact> 
                                        <img src="img/apartment2.1.jpg" class="card-img-top" alt="...">
                                        <div class="card-body text-center">
                                            <h5 class="card-title mb-0">Apartments</h5>
                                            <div class="card-text text-black-50">See list of all apartments</div>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                            
                            <!-- Users -->
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-0 shadow">
                                    <router-link style='text-decoration: none;color:#35424a;' to="/users"  class="nav-link" exact> 
                                        <img src="img/users1.2.jpg" class="card-img-top" alt="...">
                                        <div class="card-body text-center">
                                            <h5 class="card-title mb-0">Users</h5>
                                            <div class="card-text text-black-50">See list of all users</div>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                            <!-- Reservations -->
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-0 shadow">
                                    <router-link style='text-decoration: none;color:#35424a;' to="/reservations"  class="nav-link" exact>
                                        <img src="img/reservation1.1.jpg" class="card-img-top" alt="...">
                                        <div class="card-body text-center">
                                            <h5 class="card-title mb-0">Reservations</h5>
                                            <div class="card-text text-black-50">See list of all reservations</div>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                            <!-- Profile-->
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-0 shadow">
                                    <router-link style='text-decoration: none;color:#35424a;' to="/profile"  class="nav-link" exact>
                                        <img src="img/profile3.1.jpg" class="card-img-top" alt="...">
                                        <div class="card-body text-center">
                                            <h5 class="card-title mb-0">Profile</h5>
                                            <div class="card-text text-black-50">See or edit your profile</div>
                                        </div>  
                                    </router-link>
                                </div>
                            </div>
                        </div><!-- /.row -->
                    </div><!-- /container-->
                    
                </div>  <!-- !isGuest -->

                <div v-if='isGuest'>
                <!-- Page Content -->
                    <div class="container">
                        <div class="row">
                            <!-- Apartments -->
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-0 shadow">
                                    <router-link style='text-decoration: none;color:#35424a;' to="/apartments"  class="nav-link" exact> 
                                        <img src="img/apartment2.1.jpg" class="card-img-top" alt="...">
                                        <div class="card-body text-center">
                                            <h5 class="card-title mb-0">Apartments</h5>
                                            <div class="card-text text-black-50">See list of all apartments</div>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                            <!-- Reservations -->
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-0 shadow">
                                    <router-link style='text-decoration: none;color:#35424a;' to="/reservations"  class="nav-link" exact>
                                        <img src="img/reservation1.1.jpg" class="card-img-top" alt="...">
                                        <div class="card-body text-center">
                                            <h5 class="card-title mb-0">Reservations</h5>
                                            <div class="card-text text-black-50">See list of all reservations</div>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                            <!-- Profile-->
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-0 shadow">
                                    <router-link style='text-decoration: none;color:#35424a;' to="/profile"  class="nav-link" exact>
                                        <img src="img/profile3.1.jpg" class="card-img-top" alt="...">
                                        <div class="card-body text-center">
                                            <h5 class="card-title mb-0">Profile</h5>
                                            <div class="card-text text-black-50">See or edit your profile</div>
                                        </div>  
                                    </router-link>
                                </div>
                            </div>
                        </div><!-- /.row -->
                    </div>
                </div><!--IsGuest-->
            </div> <!--main-->

        </div><!--Home-->
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

