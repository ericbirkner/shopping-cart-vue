import Home from "../components/Home"
import Producto from '../components/Producto'

const routes= [
      { path: '/', component: Home },
      { path: '/productos', component: Home },
      { path: '/productos/page/:page', component: Home },
      { path: '/producto/:id', name: 'Producto', component: Producto }
    ]
export default routes;
