import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { NavLink } from 'react-router-dom';
import ModalOpen from '../../Containers/Modal/Modal';
import { loginImgUrl } from '../../assets/imageUrl'; 

function AppLogin() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div>
            {/* Modal component for showing login information */}
            <ModalOpen
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

            {/* Container for the main login form content */}
            <Container className='py-5'>
                <Card>
                    <Row className='py-5'>
                        <Col md={6}>
                            <Card.Img variant="top" height={350} width={300} src={loginImgUrl} alt="Login" />
                        </Col>
                        {/* Column for displaying the login form */}
                        <Col md={6}>
                            <div>
                                <Card.Title className='fs-3 fw-bold'>Login To Indo Trends</Card.Title>
                                <Form className='py-4'>
                                    <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Email address / User Name</Form.Label>
                                        <Form.Control type="email" placeholder="name@example.com" />
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="exampleForm.ControlInput2">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="*******" />
                                    </Form.Group>
                                    <NavLink to='' style={{ textDecoration: 'none' }}>Forgot your password?</NavLink>
                                </Form>
                                <button onClick={() => setModalShow(true)} className='btn btn-outline-dark'>Login</button>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </div>
    );
}

export default AppLogin;
