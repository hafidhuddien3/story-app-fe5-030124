// Import our custom CSS
import '../scss/main.scss';

// Import components
import './components/index';

// Import javascript file as needed
import Dashboard from './pages/dashboard';
import Add from './pages/story/add';
import About from './pages/about';
import NotFound from './pages/notFound';

import Login from './pages/auth/login';
import Register from './pages/auth/register';

import * as bootstrap from 'bootstrap';

const routes = {
  '/': Dashboard,
  '/story/add.html': Add,
  '/about.html': About,

  '/auth/login.html': Login,
  '/auth/register.html': Register,

  '/notFound.html': NotFound,
};

const detectRoute = () => {
  const route = routes[window.location.pathname];
  return route ? route : NotFound;
};

const initPages = () => {
  const header = document.querySelector('header');
  const main = document.querySelector('main');

  if (header && main) {
    main.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;
  }
};

window.addEventListener('DOMContentLoaded', async () => {
  initPages();

  const route = detectRoute();
  route.init();
});
