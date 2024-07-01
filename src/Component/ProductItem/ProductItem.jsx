import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { ADDItem } from '../../Redux/handleCart';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from '@reduxjs/toolkit';
import { Helmet } from 'react-helmet';
import { getProductsById } from '../../services/api';
import NoPageFound from '../NoPageFound/NoPageFound';

function AppProductItem() {
  // Extracting product ID from URL parameters
  // let { id } = useParams();
  // id = id.slice(id.indexOf('=')+1, id.length)
  // console.log("id 15", id)

  const { search } = useLocation();
  const val = new URLSearchParams(search)
  const id = val.get("val");

  const [state, setState] = useState({ product: {}, loading: true });

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.users); // Getting user info from Redux store

  // Fetch product details based on ID when component mounts
  useEffect(() => {
    let isMounted = true;

    const getProduct = async () => {
      setState({ product: {}, loading: true });
      try {
        const productDetail = await getProductsById(id);
        if (isMounted) {
          setState({ product: productDetail, loading: false });
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        if (isMounted) {
          setState({ product: {}, loading: false });
        }
      }
    };

    getProduct();

    return () => { isMounted = false; };
  }, [id]);

  // Handle adding product to cart
  const handleCart = (product) => {
    if (userInfo) {
      dispatch(ADDItem({ product, id: nanoid() })); // Dispatch action to add item to cart
      toast.success("Item successfully added to your cart", { autoClose: 1800 });
      localStorage.setItem('myitems', JSON.stringify(product)); // Save product to localStorage
    } else {
      toast.info("Please, Register / Login to your account", { autoClose: 3000 });
    }
  };

  // Component to display loading skeleton
  const Loading = () => (
    <>
      <Helmet>
        <title>Loading...</title>
        <meta name='description' content='Loading product details' />
      </Helmet>
      <Col md={6}>
        <Skeleton height={400} />
      </Col>
      <Col md={6} style={{ lineHeight: 2 }}>
        {[50, 75, 25, 50, 150, 50, 50].map((height, idx) => (
          <Skeleton key={idx} height={height} width={idx === 2 ? 150 : undefined} style={idx === 6 ? { marginLeft: 6 } : {}} />
        ))}
      </Col>
    </>
  );

  // Component to display product details
  const ShowProductItem = () => {
    const { product } = state;
    return (
      <>
      {product.id ? <>
        <Col className='my-5' md={6}>
          <img
            style={{ overflow: "hidden", transition: "transform 0.3s" }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.25)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            src={product.image}
            alt={product.title}
            height={400}
            width={400}
          />
        </Col>
        <Col md={6}>
          <h4 className='text-uppercase text-black-50'>
            {product.category}
          </h4>
          <h1 className='display-5'>{product.title}</h1>
          <div className='lead fw-bolder'>
            Rating {product.rating?.rate} <i className='fa fa-star'></i>
          </div>
          <h3 className="display-6 fw-bold my-4">
            $ {product.price}
          </h3>
          <div className='lead py-4'>{product.description}</div>
          <button onClick={() => handleCart(product)} className='btn btn-outline-dark ms-2 px-3 py-2 me-1'>
            Add To Cart
          </button>
          <NavLink to='/cart' className='btn btn-dark ms-2 px-3 py-2 me-1'>
            View Cart
          </NavLink>
        </Col>
        </>
        : 
        <NoPageFound />}
      </>
    );
  };

  return (
    <div>
      <ToastContainer />
      <Container className='py-5'>
        <Row className='py-5'>
          {state.loading ? <Loading /> : <ShowProductItem />}
          {/* <p>Hello</p> */}
        </Row>
      </Container>
    </div>
  );
}

export default AppProductItem;
