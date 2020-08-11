Vue.component('home-front', {
    template: `
    <div id='home'>
        <section id="showcase"> 
            <div class="container">
                <div>
                <h1>The best software solution in the field of apartment renting</h1>
                <h5 >Whether you are a host who want to facilitate creation of ads for their apartments or someone who wants to quickly and easily schedule the desired place to stay... <span style="color: #e8491d;font-weight: bold;">ApartmentFinder</span> is aplication just for you!</h4>
                </div>
        </section>

        <section id="newsletter">
            <div class="container">
                <h1>You need a place to stay? Check out our wide offer... </h1>
                <form>
                    <router-link to='/apartments' class="nav-link" exact> <button type='submit' class="btn button_1" id='btnRegistration'>Apartments</button> </router-link>
                </form>
            </div>
        </section>

        <section id="boxes">
            <div class="container">
                <div class="box" id='box1'>                        
                    <img src="img/searchIcon1.png">
                    <h3>For guests</h3>
                    <p>Wide selection of apartments and accommodation with all necessary amenities in one place. Easily and quickly search, filter and choose the apartment you are interested in and reserve it in just a few clicks! Ability to update your own profile, leave comments and access all your reservations.</p>
                </div>
                <div class="box" id='box2'>
                    <img src='img/add2.1.png'>
                    <h3>For hosts</h3>
                    <p>An easy and fast way to add new apartments, their amenities, as well as update old data about them. Very simple  and  clear display of reservations and comments related to your apartments, as well as a quick way to select those comments that you wish to be displayed.</p>
                </div>
                <div class="box" id='box3'>
                    <img src='img/comment3.jpg'>
                    <h3>Tell us your impressions</h3>
                    <p>Your feedback and opinion is important to us. Rate the apartments and accommodation, leave a comment and help us become even better.</p>
                </div>
            </div>
        </section>
    </div>`,
    data: function () {
        return {
            user: {
                username: '',
                role: ''
            },
            isAdmin: false,
            isHost: false,
            isGuest: false
        }
    },
    methods: {

    },
    created() {
        this.user.username = localStorage.getItem('user');
        this.user.role = localStorage.getItem('role');
        if (this.user.role == "ADMIN") {
            this.isAdmin = true;
        } else if (this.user.role == "HOST") {
            this.isHost = true;
        } else {
            this.isGuest = true;
        }
    },

});


