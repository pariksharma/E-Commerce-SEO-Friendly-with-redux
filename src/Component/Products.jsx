import React, { useState, useEffect} from 'react'
import { Col, Row, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';

function AppProducts() {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false)

    const toggle = true;

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("https://fakestoreapi.com/products");
            if(toggle) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
                console.log(filter)
            }
            return () => {
                toggle = false;
            }
        }
        getProducts();
    }, [])

    const LoadingProducts = () => {
        return (<>
            <div className="col-md-3">
                <Skeleton height={300}/>
            </div>
            <div className="col-md-3">
                <Skeleton height={300}/>
            </div>
            <div className="col-md-3">
                <Skeleton height={300}/>
            </div>
            <div className="col-md-3">
                <Skeleton height={300}/>
            </div>
        </>)
    }

    const filterProduct = (value) => {
        let filterData = [...data];
        console.log("filter", filterData)
        filterData = filterData.filter((item) => item.category === value);
        setFilter(filterData);
    }

    const ShowProducts = () => {
        return (<>
            <div className="buttons d-flex justify-content-center mb-5 pb-5">
                <button className="btn btn-outline-dark me-1" onClick={() => setFilter(data)}>All</button>
                <button className='btn btn-outline-dark me-1' onClick={() => filterProduct("women's clothing")}>Women's Clothing</button>
                <button className='btn btn-outline-dark me-1' onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
                <button className='btn btn-outline-dark me-1' onClick={() => filterProduct("jewelery")}>Jewelery</button>
                <button className='btn btn-outline-dark me-1' onClick={() => filterProduct("electronics")}>Electronic</button>
            </div>
            {filter.map((product) => {
                return <div className='col-md-3 mb-4' key={product.id}>
                    <Card className='h-100 text-center p-4 cardHover'>
                        <Card.Img variant="top" src={product.image} alt={product.title} height="250px" />
                        <Card.Body>
                            <Card.Title className='mb-0'>{product.title.substring(0, 12)}</Card.Title>
                            <Card.Text className='lead fw-bold'>
                                ${product.price}
                            </Card.Text>
                            <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark">
                                Buy Now
                            </NavLink>
                        </Card.Body>
                    </Card>
                </div>
            })}
        </>)
    }
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
                {loading ? <LoadingProducts /> : <ShowProducts />}
            </Row>
        </Container>
    </div>
  )
}

export default AppProducts