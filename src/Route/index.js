import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AppCart from '../Component/Cart/Cart';
import AppCheckout from '../Component/CheckOut/Checkout';
import Profile from '../Component/Profile/Profile';
import NoPageFound from '../Component/NoPageFound/NoPageFound';
import AppAbout from '../Component/About/About';
import AppContact from '../Component/Contact/Conatct';
import AppProducts from '../Component/Products/Products';
import AppProductItem from '../Component/ProductItem/ProductItem';
import AppLogin from '../Component/Login/Login';
import AppRegister from '../Component/Register/Register';
import AppHome from '../Component/Home/Home';
import * as Auth from './auth'
import { useDispatch } from 'react-redux';
import { AddUser } from '../Redux/handleUser';

const RoutePage = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        const isLogin = Auth.isAuth()
        if(isLogin) {
            // Dispatch user details to Redux store if authenticated
            dispatch(AddUser(JSON.parse(isLogin)))
        }
    }, [])

    // PublicRoute component renders its children if user is not authenticated, otherwise redirects
    const PublicRoute = ({children, redirect}) => {
        const isLogin = Auth.isAuth()
        return isLogin ? <Navigate to = {redirect} /> : children
    }

    // PrivateRoute component renders its children if user is authenticated, otherwise redirects
    const PrivateRoute = ({children, redirect}) => {
        const isLogin = Auth.isAuth()
        return isLogin ? children : <Navigate to = {redirect} />
    }

  return (
    <>
        <Routes>
            {/* Public Routes */}
            <Route exact path='/' element={<AppHome />} />
            <Route exact path='/products' element={<AppProducts />} />
            <Route exact path='/products/:id' element={<AppProductItem />} />
            {/* Restricted Routes - Only accessible to non-authenticated users */}
            <Route exact path='/login' element={<PublicRoute redirect={'/'}><AppLogin /></PublicRoute>} />
            <Route exact path='/register' element={<PublicRoute redirect={'/'}><AppRegister /></PublicRoute>} />
            {/* Private Routes - Only accessible to authenticated users */}
            <Route exact path='/cart' element={<PrivateRoute redirect={'/'}><AppCart /></PrivateRoute>} />
            <Route exact path='/checkout' element={<PrivateRoute redirect={'/'}><AppCheckout /></PrivateRoute>} />
            <Route exact path='/user' element={<PrivateRoute redirect={'/'}><Profile /></PrivateRoute>} />
            {/* Public Routes */}
            <Route exact path='/about' element={<AppAbout />} />
            <Route exact path='/contact' element={<AppContact />} />
            {/* Fallback Route */}
            {/* <Route path="*" element={<NoPageFound />} /> */}
        </Routes>
    </>
  )
}

export default RoutePage