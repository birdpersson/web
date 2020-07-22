const Login = { template: '<login></login>' }
const Homepage = {template: '<homepage></homepage>'}
const Profile = {template: '<profile></profile>'}
const Users = {template: '<users></users>'} 
const Reservations = {template: '<reservations></reservations>'}
const Apartments = {template: '<apartments></apartments>'}

const routes = [
	// { path: '/', component: FrontHomepage }, //stranica pre logina
	{ path: '/login', component: Login },
	{ path: '/homepage', component:Homepage },
	{ path: '/profile', component:Profile },
	{ path: '/users', component:Users },
	{ path: '/reservations', component:Reservations },
	{ path: '/apartments', component:Apartments },
]

const router = new VueRouter({
	routes
});

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwt');

const app = new Vue({
	router
}).$mount('#app');