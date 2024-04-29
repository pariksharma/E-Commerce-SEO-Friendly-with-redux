import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';



function AppNavbar() {
    const state = useSelector((state) => state.item.Items);
    const data = useSelector((state) => state.user.users);
    
    console.log(data)
  return (
    <div className='fixed-top'>
        <Navbar expand="lg" className="bg-body-tertiary py-3 bg-white shadow-sm">
            <Container>
                <Navbar.Brand className='fs-3 fw-bold'>Indo Trends</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="mx-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px', fontSize: '18px' }}
                    navbarScroll
                >
                    <NavLink to="/" className="text-dark me-5" style={{textDecoration: 'none'}}>Home</NavLink>
                    <NavLink to="/products" className="text-dark me-5" style={{textDecoration: 'none'}}>Products</NavLink>
                    <NavLink to="/about" className="text-dark me-5" style={{textDecoration: 'none'}}>About</NavLink>
                    <NavLink to="/contact" className="text-dark me-5" style={{textDecoration: 'none'}}>Contact</NavLink>
                </Nav>
                <div className="buttons">
                    {data === "" ? 
                   <>
                   {/* <NavLink to="/login" className="btn btn-outline-dark">
                        <i className='fa fa-sign-in'></i>
                        {" "}Login
                    </NavLink>  */}
                    <NavLink to="/register" className="btn btn-outline-dark ms-2">
                        <i className='fa fa-user-plus'></i>
                        {" "}Register
                    </NavLink>
                    </>
                    :
                    <>
                    <span>Hello, {(data.name.substring(0,1)).toUpperCase()}{data.name.substring(1, data.name.length)}</span>
                    <div class="btn btn-outline-dark ms-2 dropdown">
                        {" "}<i className="fa fa-user-circle" aria-hidden="true"></i>
                        <div class="dropdown-content">
                            <NavLink to="/user">My Profile</NavLink>
                            {/* <NavLink to="#">Setting</NavLink> */}
                            <hr className='m-0' />
                            <NavLink to="/" className="d-flex justify-content-between" onClick={()=>window.location.reload("/")}>Logout<i class="my-1 fa fa-sign-out" aria-hidden="true"></i></NavLink>
                        </div>
                    </div>
                    </>
                    }
                    {data ? 
                    <NavLink to="/cart" className="btn btn-outline-dark ms-2">
                        <i className='fa fa-shopping-cart'></i>
                        {" "}Cart ({state.length})
                    </NavLink>
                    : "" }
                </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default AppNavbar