const Login = { template: '<login></login>' }
const Signup = { template: '<signup></signup>' }
const Navbar = { template: '<navbar></navbar>' }
const Homepage = { template: '<homepage></homepage>' }
const HomeFront = { template: '<home-front></home-front>' }
const Profile = { template: '<profile></profile>' }
const ProfileUpdate = { template: '<profile-update></profile-update>' }
const Users = { template: '<users></users>' }
const Reservations = { template: '<reservations></reservations>' }
const Apartments = { template: '<apartments></apartments>' }
const ApartmentsComments = { template: '<apartment-comments></apartment-comments>' }
const NewReservation = { template: '<new-reservation></new-reservation>' }
const NewComment = { template: '<new-comment></new-comment>' }
const AmenitiesOverview = { template: '<amenities-overview></amenities-overview>' }
const NewAmenities = { template: '<new-amenities></new-amenities>' }
const NewApartment = { template: '<new-apartment></new-apartment>' }
const ApartmentDetails = { template: '<apartment-details></apartment-details>' }
const ApartmentEdit = { template: '<apartment-edit></apartment-edit>' }
const AddHost = { template: '<new-host></new-host>' }

const Test = { template: '<test></test>' }

const routes = [
	{ path: '/', component: HomeFront},  //stranica pre logina
	{ path: '/login', component: Login },
	{ path: '/signup', component: Signup },
	{ path: '/homepage', component: Homepage },
	{ path: '/profile', component: Profile },
	{ path: '/profile/update', component: ProfileUpdate },
	{ path: '/users', component: Users },
	{ path: '/users/addHost', component: AddHost },
	// { path: '/reservations', component: Reservations },
	{ path: '/reservations', component: Test },
	{ path: '/apartments', component: Apartments },
	{ path: '/apartment/:id/comments', component: ApartmentsComments },
	{ path: '/apartmentComments', component: ApartmentsComments },//za admina i hosta
	{ path: '/apartment/:id/newReservation', component: NewReservation },
	{ path: '/newComment/:id', component: NewComment },
	{ path: '/amenitiesOverview', component: AmenitiesOverview },
	{ path: '/amenitiesNew', component: NewAmenities },
	{ path: '/apartmentNew', component: NewApartment },
	{ path: '/apartment/:id/edit', component: ApartmentEdit},
	{ path: '/apartment/:id/details', component: ApartmentDetails},

	{ path: '/test', component: Test },
]

const router = new VueRouter({
	routes
});


axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwt');

const app = new Vue({
	router,
}).$mount('#app');