const Login = { template: '<login></login>' }
const Homepage = {template: '<homepage></homepage>'}
const Profile = {template: '<profile></profile>'}

const routes = [
	// { path: '/', component: FrontHomepage }, //stranica pre logina
	{ path: '/login', component: Login },
	{ path: '/homepage', component:Homepage },
	{ path: '/profile', component:Profile },
]

const router = new VueRouter({
	routes
});

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwt');

const app = new Vue({
	router
}).$mount('#app');