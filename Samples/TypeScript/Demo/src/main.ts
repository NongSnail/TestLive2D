import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/pages/LoginPage.vue';
import RegisterPage from './components/pages/RegisterPage.vue';
import VirtualAssistant from './components/pages/VirtualAssistant.vue';
import * as _ from './logic/main';


const routes = [
  { path: '/', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/VirtualAssistant', component: VirtualAssistant },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

// Use the router plugin
app.use(router);

// Mount the app to the #app element
app.mount('#app');

_
