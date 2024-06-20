import React, { useState } from 'react'
import { Card, Col, Container, Row, Form } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AddUser } from '../../Redux/handleUser';
import { useDispatch, useSelector } from 'react-redux';
import ModalOpen from '../../Containers/Modal/Modal';
import { imgUrl, successLogo } from '../../assets/imageUrl';
import { validationRegister } from '../../utils/validation';

function AppRegister() {

    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.user.users)

    const [modalShow, setModalShow] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [userData, setUserData] = useState([])

    let CountryCode = 'in';
    
    const handleRegister = (e) => {
        e.preventDefault();
        const status = validationRegister(name, email, phone, password, confirmPassword, CountryCode);
        if(status === "success") {
            setUserData({name: name, email: email, country: CountryCode, countryCode: phone.substring(0, 2), phone: phone.substring(2, phone.length),  password: password});
            CountryCode = 'in';
            // console.log("h");
            setModalShow(true);
        }
        else{
            toast.error(status)
        }
    }

    const navigate = useNavigate();

    const handleConfirmRegister = () => {
        toast.success("Registration Successful!")
        setModalShow(false);
        setName("")
        setEmail("")
        setPassword("")
        setPhone("91")
        setConfirmPassword("")
        setTimeout(() => {
        dispatch(AddUser(userData));
        navigate("/");
        }, 1500)
        
    }

  return (
    <div>
        <ToastContainer autoClose={1800} />
        <ModalOpen
        email = {email}
        contact = {`+${phone.substring(0, 2)} ${phone.substring(2, phone.length)}`}
        show={modalShow}
        handleconfirm = {handleConfirmRegister}
        onHide={() => setModalShow(false)}
      />
        <Container className='py-5'>
            {userInfo.length === 0 ?
                <Card>
                    <Row className='py-5'>
                        <Col md={6}>
                            <Card.Img variant='top' height={500} width={300} src={imgUrl}></Card.Img>
                        </Col>
                        <Col md={6}>
                            <div >
                                <Card.Title className='fs-3 fw-bold'>Register - Create Account</Card.Title>
                                <Form className='py-4'>
                                    <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Your Name</Form.Label>
                                        <Form.Control className="mb-2" autoComplete='off' value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="David Jones" />
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control className="mb-2" autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="davidjones@adk.com" />
                                        <Form.Label>Mobile Number</Form.Label>
                                        <PhoneInput
                                            country={CountryCode}
                                            inputStyle={{width: '100%'}}
                                            value={phone}
                                            onChange={phone => setPhone(phone)}
                                        />
                                        <Form.Label className="mb-2">Password</Form.Label>
                                        <Form.Control type="password" autoComplete='off' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*********" />
                                        {password.length > 0 && password.length < 8 ? <p className='text-danger fs-6'>Password length should be atleast 8 or more</p> : "" }
                                        <Form.Label className="mb-2" >Confirm Password</Form.Label>
                                        <Form.Control className="mb-4" autoComplete='off' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="*********" />
                                    </Form.Group>
                                    <button className='btn btn-outline-dark me-2' onClick={handleRegister}>Proceed</button>
                                    <NavLink to='/' className='btn btn-dark'>Go To Home</NavLink>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Card>
                : 
                <div className='container my-5'>
                    <div className='d-flex flex-column align-items-center'>
                        <img className='w-25' src={successLogo} />
                        <h2 className='text-center'>You Successfully Registered!</h2>
                        <NavLink to='/' className='btn btn-outline-dark my-4'>Go to Home</NavLink>
                    </div>    
                </div>
                }
        </Container>
    </div>
  )
}

export default AppRegister