import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import PhoneInput from 'react-phone-input-2'
import { ToastContainer, toast } from 'react-toastify'
import ModalOpen from './Modal'
import { useDispatch } from 'react-redux'
import { AddUser } from '../Redux/handleUser'

function User() {
    
    const userInfo = useSelector((state) => state.user.users)
    const dispatch = useDispatch()
    
    const [showButton, setShowButton] = useState(true)
    const [name, setName] = useState(userInfo.name)
    const [email, setEmail] = useState(userInfo.email)
    const [phone, setPhone] = useState(userInfo.phone)
    const [password, setPassword] = useState(userInfo.password)
    const [userData, setUserData] = useState(userInfo)
    const [modalShow, setModalShow] = useState(false)


    const handleUpdate = (e) => {
        e.preventDefault();
        if(!name || !email || !phone || !password) {
            console.log("sadad");
            toast.error("Fill the all inputs!");
        }
        else{
            if(phone.length < 9){
                toast.error("Enter the valid phone number!");
            }
            else{
                setUserData({name: name, email: email, country: 'in', countryCode: phone.substring(0, 2), phone: phone.substring(2, phone.length),  password: password});
                setModalShow(true)
            }   
        }
    }

    const handleConfirmUpdate = () => {
        toast.success("Profile Updated Successful!", {autoClose: 1800})
        setModalShow(false);
        dispatch(AddUser(userData));
        setShowButton(true)
    }


  return (
        <Container className='my-3 py-5'>
            <ToastContainer />
            <ModalOpen
                email = {email}
                contact = {`+${phone.substring(0, 2)} ${phone.substring(2, phone.length)}`}
                show={modalShow}
                handleconfirm = {handleConfirmUpdate}
                onHide={() => setModalShow(false)}
            />
            {userInfo ? 
            <Row>
                <Col md={6}>
                    <div className="container">
                        <img className='w-75' src='https://cdn.pixabay.com/photo/2015/10/30/10/40/key-1013662_640.jpg' />
                    </div>
                </Col>
                <Col md={6} className='py-5'>
                    <h2 className='my-4'>My Profile</h2>
                    <Row className='my-3 d-flex '>
                        <Col md={4}>
                            <p className=' fs-5 fw-bol'>User Name : </p>
                        </Col>
                        <Col md={2}>
                            <input readOnly = {showButton} type='text' className='p-2' style={{border: '1px solid grey', borderRadius: '10px', width: '300px'}} value={name} onChange={(e) => setName(e.target.value)} placeholder={"Enter Your Name"} />
                        </Col>
                    </Row>
                    <Row className='my-3 d-flex '>
                        <Col md={4}>
                            <p className=' fs-5 fw-bol'>Email : </p>
                        </Col>
                        <Col md={2}>
                            <input readOnly = {showButton} type='email' className='p-2' style={{border: '1px solid grey', borderRadius: '10px', width: '300px'}} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"Enter Your Email"} />
                        </Col>
                    </Row>
                    <Row className='my-3 d-flex '>
                        <Col md={4}>
                            <p className=' fs-5 fw-bol'>Contact No. : </p>
                        </Col>
                        <Col md={2}>
                        <PhoneInput
                            disabled = {showButton}
                            country={userInfo.country}
                            inputStyle={{border: '1px solid grey',borderRadius: '10px'}}
                            value={userInfo.countryCode+userInfo.phone}
                            onChange={phone => setPhone(phone)}
                        />    
                        </Col>
                    </Row>
                    <Row className='my-3 d-flex '>
                        <Col md={4}>
                            <p className=' fs-5 fw-bol'>Password : </p>
                        </Col>
                        <Col md={2}>
                            <input readOnly = {showButton} type={showButton ? 'password' : 'text'} className='p-2' style={{border: '1px solid grey', borderRadius: '10px', width: '300px'}} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={"Enter Your New Password"} />
                            
                        </Col>
                        <a className='text-decoration-none text-primary' onClick={() => setShowButton(false)}>want to Edit?</a>
                        <button className='btn btn-primary my-3' disabled={showButton} onClick={(e) => handleUpdate(e)}>Update</button>
                    </Row>
                    
                </Col>
            </Row>
            : 
            ""}
        </Container>
  )
}

export default User