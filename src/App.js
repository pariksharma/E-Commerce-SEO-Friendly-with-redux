import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './App.css';
import AppHome from './Component/Home';
import AppNavbar from './Component/Navbar';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route } from 'react-router-dom'
import AppProducts from './Component/Products';
import AppProductItem from './Component/ProductItem';
import AppLogin from './Component/Login';
import AppRegister from './Component/Register';
import AppFooter from './Component/Footer';
import AppCart from './Component/Cart';
import AppCheckout from './Component/Checkout';
import User from './Component/User';
import NoPageFound from './Component/NoPageFound';
import AppAbout from './Component/About';
import AppContact from './Component/Conatct';

function App() {
  return (
    <>
      <header>
        <AppNavbar />
      </header>
      <Routes>
        <Route exact path='/' Component={AppHome} />
        <Route exact path='/products' Component={AppProducts} />
        <Route exact path='/products/:id' Component={AppProductItem} />
        <Route exact path='/login' Component={AppLogin} />
        <Route exact path='/register' Component={AppRegister} />
        <Route exact path='/cart' Component={AppCart} />
        <Route exact path='/checkout' Component={AppCheckout} />
        <Route exact path='/user' Component={User} />
        <Route exact path='/about' Component={AppAbout} />
        <Route exact path='/contact' Component={AppContact} />
        <Route path="*" element={<NoPageFound />} />
      </Routes>
      <footer>
        <AppFooter />
      </footer>
    </>
  );
}

export default App;