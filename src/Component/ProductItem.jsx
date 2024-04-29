import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { UseDispatch, useDispatch, useSelector } from 'react-redux';
import { ADDItem } from '../Redux/handleCart';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from '@reduxjs/toolkit';

function AppProductItem() {

  const {id} = useParams();
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.users);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`)
      setProduct(await response.json());
      setLoading(false);
    }
    getProduct();
  }, [])

  const handleCart = (product, id) => {
    if(userInfo !== "" ){
      dispatch(ADDItem({product, id}));
      toast.success("Item successfully added to your cart",{autoClose: 1800})
    }
    else {
      toast.info("Please, Register / Login to your account", {autoClose: 3000})
    }
  }

  const Loading = () => {
    return <>
      <Col md={6}>
        <Skeleton height={400} />
      </Col>
      <Col md={6} style={{lineHeight: 2}}>
        <Skeleton height={50} width={300} />
        <Skeleton height={75} />
        <Skeleton height={25} width={150} />
        <Skeleton height={50} />
        <Skeleton height={150} />
        <Skeleton height={50} width={100} />
        <Skeleton height={50} width={100} style={{marginLeft: 6}} />
      </Col>
    </>
  }

  const ShowProductItem = () => {
    return <>
      <Col className='my-5' md={6}>
        <img className=''
         style={{ overflow: "hidden" }}
        onMouseOver={(e) => (e.currentTarget.style = { transform: "scale(1.25)", overflow: "hidden" })}
        onMouseOut={(e) => (e.currentTarget.style = { transform: "scale(1)", overflow: "hidden" })} 
        src={product.image} alt={product.title} height={400} width={400} />
      </Col>
      <Col md={6}>
        <h4 className='text-uppercase text-block-50'>
          {product.category}
        </h4>
        <h1 className='display-5'>{product.title}</h1>
        <p className='lead fw-bolder'>
          Rating {product.rating && product.rating.rate}
          <i className='fa fa-star'></i>
        </p>
        <h3 className="display-6 fw-bold my-4">
          $ {product.price}
        </h3>
        <p className='lead'>{product.description}</p>
        <button onClick={() => handleCart(product, nanoid())} className='btn btn-outline-dark ms-2 px-3 py-2 me-1'>
          Add To Cart
        </button>
        <NavLink to='/cart' className='btn btn-dark ms-2 px-3 py-2 me-1'>
          View Cart
        </NavLink>
      </Col>
    </>
  }

  return (
    <div>
      <ToastContainer />
      <Container className='py-5'>
        <Row className='py-5'>
          {loading ? <Loading /> : <ShowProductItem />}
        </Row>
      </Container>
    </div>
  )
}

export default AppProductItem