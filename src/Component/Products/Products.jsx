import React, { useState, useEffect } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';
import { getProductsList } from '../../services/api';

function AppProducts() {
    const [state, setState] = useState({ data: [], filter: [], loading: true });

    useEffect(() => {
        let isMounted = true;
        const getProducts = async () => {
            try {
                const response = await getProductsList(); // Fetch product list
                if (isMounted) {
                    const products = await response.json(); 
                    setState({ data: products, filter: products, loading: false }); // Set state with fetched data
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setState({ data: [], filter: [], loading: false }); // Handle error
            }
        };
        getProducts();
        return () => { isMounted = false; };
    }, []);

    // Function to filter products based on category
    const filterProduct = (value) => {
        const filteredData = state.data.filter((item) => item.category === value);
        setState((prevState) => ({ ...prevState, filter: filteredData }));
    };

    // Component to display loading skeleton
    const LoadingProducts = () => (
        <>
            {[...Array(4)].map((_, idx) => (
                <Col key={idx} md={3}>
                    <Skeleton height={300} />
                </Col>
            ))}
        </>
    );

    // Component to display the list of products
    const ShowProducts = () => (
        <>
            <div className="buttons d-flex justify-content-center mb-5 pb-5">
                {/* Buttons to filter products */}
                <button className="btn btn-outline-dark me-1" onClick={() => setState((prevState) => ({ ...prevState, filter: prevState.data }))}>All</button>
                <button className='btn btn-outline-dark me-1' onClick={() => filterProduct("women's clothing")}>Women's Clothing</button>
                <button className='btn btn-outline-dark me-1' onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
                <button className='btn btn-outline-dark me-1' onClick={() => filterProduct("jewelery")}>Jewelery</button>
                <button className='btn btn-outline-dark me-1' onClick={() => filterProduct("electronics")}>Electronic</button>
            </div>
            {state.filter.map((product) => (
                <Col key={product.id} md={3} className='mb-4'>
                    <Card className='h-100 text-center p-4 cardHover'>
                        <Card.Img variant="top" src={product.image} alt={product.title} height="250px" />
                        <Card.Body>
                            <Card.Title className='mb-0'>{product.title.substring(0, 12)}</Card.Title>
                            <Card.Text className='lead fw-bold'>${product.price}</Card.Text>
                            <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark">Buy Now</NavLink>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </>
    );

    return (
        <div>
            <Container className='my-5 py-5'>
                <Row>
                    <Col sm={12} className='mb-5'>
                        <h1 className='display-6 fw-bolder text-center'>Latest Product</h1>
                        <hr />
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    {state.loading ? <LoadingProducts /> : <ShowProducts />}
                </Row>
            </Container>
        </div>
    );
}

export default AppProducts;
