import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { NavLink } from 'react-router-dom';
import ModalOpen from './Modal';
import Modal2 from './Modal2';

function AppLogin() {
    const [modalShow, setModalShow] = React.useState(false)
  return (
    <div>

        <ModalOpen
            show={modalShow}
            onHide={() => setModalShow(false)}
        />

        <Container className='py-5'>
        <Card>
            <Row className='py-5'>
                <Col md={6}>
                    <Card.Img variant="top" height={350} width={300} src="https://img.freepik.com/free-vector/access-control-system-abstract-concept-vector-illustration-security-system-authorize-entry-login-credentials-electronic-access-password-passphrase-pin-verification-abstract-metaphor_335657-5746.jpg?size=626&ext=jpg&ga=GA1.1.1854687927.1708508513&semt=sph" />
                </Col>
                <Col md={6}>
                    <div >
                        <Card.Title className='fs-3 fw-bold'>Login To Indo Trends</Card.Title>
                        <Form className='py-4'>
                            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email address / User Name</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="*******" />
                            </Form.Group>
                            <NavLink to='' style={{textDecoration: 'none'}} > Forgot your password?</NavLink>
                        </Form>
                        <button onClick={() => setModalShow(true)} className='btn btn-outline-dark'>Login</button>
                    </div>
                </Col>    
            </Row>                 
            </Card>
        </Container>
    </div>
  )
}

export default AppLogin