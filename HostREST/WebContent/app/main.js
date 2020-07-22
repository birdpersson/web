const Login = { template: '<login></login>' }
const Homepage = {template: '<homepage></homepage>'}
const Profile = {template: '<profile></profile>'}
const Users = {template: '<users></users>'} 
const Reservations = {template: '<reservations></reservations>'}
const Apartments = {template: '<apartments></apartments>'}
const ApartmentsComments = {template: '<apartment-comments></apartment-comments>'}
const NewReservation  = {template: '<new-reservation></new-reservation>'}
const NewComment  = {template: '<new-comment></new-comment>'}

const routes = [
	// { path: '/', component: FrontHomepage }, //stranica pre logina
	{ path: '/login', component: Login },
	{ path: '/homepage', component:Homepage },
	{ path: '/profile', component:Profile },
	{ path: '/users', component:Users },
	{ path: '/reservations', component:Reservations },
	{ path: '/apartments', component:Apartments },
	{ path: '/apartmentComments', component:ApartmentsComments }, //vrv treba /apartmentComments:idApartmana
	{ path: '/newReservation', component:NewReservation }, //vrv treba /apartmentComments:idApartmana
	{ path: '/newComment', component:NewComment },
]

const router = new VueRouter({
	routes
});

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwt');

const app = new Vue({
	router
}).$mount('#app');