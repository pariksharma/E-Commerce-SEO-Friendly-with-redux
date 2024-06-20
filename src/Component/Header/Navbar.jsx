import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import * as Auth from '../../Route/auth';

function AppNavbar() {
    // Check if the user is authenticated
    const isLogin = Auth.isAuth();

    // Destructure items and user from the Redux store
    const { items, user } = useSelector((state) => ({
        items: state.item.Items,
        user: state.user.users
    }));

    // Function to handle user logout
    const handleLogout = () => {
        localStorage.removeItem('users'); 
        localStorage.removeItem('myitems'); 
        window.location.reload(); 
    };

    // Function to render the user section based on login status
    const renderUserSection = () => {
        return isLogin ? (
            <>
                <span>Hello, {user.name?.charAt(0).toUpperCase() + user.name?.slice(1)}</span>
                <div className="btn btn-outline-dark ms-2 dropdown">
                    <i className="fa fa-user-circle" aria-hidden="true"></i>
                    <div className="dropdown-content">
                        <NavLink to="/user">My Profile</NavLink>
                        <hr className='m-0' />
                        <NavLink to="/" className="d-flex justify-content-between" onClick={handleLogout}>
                            Logout <i className="my-1 fa fa-sign-out" aria-hidden="true"></i>
                        </NavLink>
                    </div>
                </div>
            </>
        ) : (
            <NavLink to="/register" className="btn btn-outline-dark ms-2">
                <i className='fa fa-user-plus'></i> Register
            </NavLink>
        );
    };

    return (
        <div className='fixed-top'>
            {/* Navbar component with styling */}
            <Navbar expand="lg" className="bg-body-tertiary py-3 bg-white shadow-sm">
                <Container>
                    <Navbar.Brand className='fs-3 fw-bold'>Indo Trends</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="mx-auto my-2 my-lg-0" style={{ maxHeight: '100px', fontSize: '18px' }} navbarScroll>
                            <NavLink to="/" className="text-dark me-5" style={{ textDecoration: 'none' }}>Home</NavLink>
                            <NavLink to="/products" className="text-dark me-5" style={{ textDecoration: 'none' }}>Products</NavLink>
                            <NavLink to="/about" className="text-dark me-5" style={{ textDecoration: 'none' }}>About</NavLink>
                            <NavLink to="/contact" className="text-dark me-5" style={{ textDecoration: 'none' }}>Contact</NavLink>
                        </Nav>
                        <div className="buttons">
                            {renderUserSection()}
                            {isLogin && (
                                <NavLink to="/cart" className="btn btn-outline-dark ms-2">
                                    <i className='fa fa-shopping-cart'></i> Cart ({items.length})
                                </NavLink>
                            )}
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default AppNavbar;
