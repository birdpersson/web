const Login = { template: '<login></login>' }

const routes = [
	{ path: '/login', component: Login }
]

const router = new VueRouter({
	routes
});

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwt');

const app = new Vue({
	router
}).$mount('#app');