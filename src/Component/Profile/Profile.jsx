import React, { useState } from 'react'
import './user.css';
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import PhoneInput from 'react-phone-input-2'
import { ToastContainer, toast } from 'react-toastify'
import ModalOpen from '../../Containers/Modal/Modal'
import { useDispatch } from 'react-redux'
import { AddUser } from '../../Redux/handleUser'
import { userPageImgUrl } from '../../assets/imageUrl'
import { validationLogin } from '../../utils/validation';

function Profile() {
    
    const userInfo = useSelector((state) => state.user.users)
    // console.log(userInfo)
    const dispatch = useDispatch()
    
    const [showButton, setShowButton] = useState(true)
    const [formData, setFormData] = useState({
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        password: userInfo.password
      });
    const [modalShow, setModalShow] = useState(false);
    const [userData, setUserData] = useState([])


    const handleUpdate = (e) => {
        e.preventDefault();
        const status = validationLogin(formData.name, formData.email, formData.phone, formData.password);
        if(status === "success") {
            setUserData({name: formData.name, email: formData.email, country: 'in', countryCode: 91, phone: formData.phone,  password: formData.password});
            setModalShow(true)
        } 
        else{
            toast.error(status);
        }
    }

    const handleConfirmUpdate = () => {
        toast.success("Profile Updated Successful!", {autoClose: 1800})
        setModalShow(false);
        dispatch(AddUser(userData));
        setShowButton(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };


  return (
        <Container className='my-3 py-5'>
            <ToastContainer />
            <ModalOpen
                email = {formData.email}
                contact = {`+${formData.phone?.substring(0, 2)} ${formData.phone?.substring(2, formData.phone.length)}`}
                show={modalShow}
                handleconfirm = {handleConfirmUpdate}
                onHide={() => setModalShow(false)}
            />
            {userInfo ? 
            <Row>
                <Col md={6}>
                    <div className="container">
                        <img className='w-75' src={userPageImgUrl} />
                    </div>
                </Col>
                <Col md={6} className='py-5'>
                    <h2 className='my-4'>My Profile</h2>
                    <Row className='my-3 d-flex '>
                        <Col md={4}>
                            <div className=' fs-5 fw-bol'>User Name : </div>
                        </Col>
                        <Col md={2}>
                            <input readOnly = {showButton} type='text' className='p-2 inpClass' name= 'name' value={showButton ? userInfo.name : formData.name} onChange={handleChange} placeholder={"Enter Your Name"} />
                        </Col>
                    </Row>
                    <Row className='my-3 d-flex '>
                        <Col md={4}>
                            <div className=' fs-5 fw-bol'>Email : </div>
                        </Col>
                        <Col md={2}>
                            <input readOnly = {showButton} type='email' className='p-2 inpClass' name= 'email' value={showButton ? userInfo.email : formData.email} onChange={handleChange} placeholder={"Enter Your Email"} />
                        </Col>
                    </Row>
                    <Row className='my-3 d-flex '>
                        <Col md={4}>
                            <div className=' fs-5 fw-bol'>Contact No. : </div>
                        </Col>
                        <Col md={2}>
                        <PhoneInput
                            disabled = {true}
                            country={'in'}
                            inputStyle={{border: '1px solid grey',borderRadius: '10px'}}
                            value={'91'+formData.phone}
                            onChange={handleChange}
                        />    
                        </Col>
                    </Row>
                    <Row className='my-3 d-flex '>
                        <Col md={4}>
                            <div className=' fs-5 fw-bol'>Password : </div>
                        </Col>
                        <Col md={2}>
                            <input readOnly = {showButton} type={showButton ? 'password' : 'text'} className='p-2 inpClass' name="password" value={formData.password} onChange={handleChange} placeholder={"Enter Your New Password"} />
                            
                        </Col>
                        {showButton ? <a className='text-decoration-none text-primary' onClick={() => setShowButton(false)}>want to Edit?</a>
                        : <span style={{color: 'red'}}>You have to update or put the same input in every field here</span>}
                        <button className='btn btn-primary my-3' disabled={showButton} onClick={(e) => handleUpdate(e)}>Update</button>
                    </Row>
                </Col>
            </Row>
            : 
            ""}
        </Container>
  )
}

export default Profile