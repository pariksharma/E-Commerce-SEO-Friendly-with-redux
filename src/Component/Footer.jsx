import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'

const date = new Date();
const year = date.getFullYear() 

function AppFooter() {
  return (
    <div className='py-3 bg-white border-top'>
        <Container className='d-flex flex-column align-items-center'>
            <Row className='d-flex text-nowrap'>
                <Col>Condition of Use & Sale</Col>
                <Col>Privacy Notice</Col>
                <Col>Interest-Based Ads</Col>
            </Row>
            <Row>
                <Col>&copy; 1996-{year}, IndoTrends.com, Inc. or its affiliates</Col>
            </Row>
        </Container>
    </div>
  )
}

export default AppFooter