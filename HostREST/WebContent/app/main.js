const Login = { template: '<login></login>' }

const routes = [
	{ path: '/login', component: Login }
]

const router = new VueRouter({
	routes
});

const app = new Vue({
	router
}).$mount('#app');