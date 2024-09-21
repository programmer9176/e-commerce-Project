import './App.css';
import { Route, Routes } from 'react-router-dom';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Home from './Pages/Home';
import Service from './Pages/Service';
import Login from './Pages/Auth/Login';
import Error from './Pages/Error';
import Signup from './Pages/Auth/Signup';
import Forgot_password from './Pages/Auth/Forgot_password';
import Dashboard from './Pages/User/Dashboard';
import PrivateRoute from './Routes/PrivateRoute';
import Admindashboard from './Pages/Admin/Admindashboard';
import CreateCategory from './Pages/Admin/CreateCategory';
import CreateProduct from './Pages/Admin/CreateProduct';
import Users from './Pages/Admin/Users';
import Profile from './Pages/User/Profile';
import Orders from './Pages/User/Orders';
import Products from './Pages/Admin/Products';
import UpdateProduct from './Pages/Admin/UpdateProduct';

function App() {
  return (
    <>
      <Routes>
        <Route path='/dashboard' element={<PrivateRoute />} >
          <Route path='user' element={<Dashboard />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/orders' element={<Orders />} />
        </Route>

        <Route path='/dashboard' element={<PrivateRoute />} >
          <Route path='admin' element={<Admindashboard />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/create-product' element={<CreateProduct />} />
          <Route path='admin/users' element={<Users />} />
          <Route path='admin/products' element={<Products />} />
          <Route path='admin/update-product/:slug' element={<UpdateProduct />} />
        </Route>
        <Route path='/' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Service' element={<Service />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<Forgot_password />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
