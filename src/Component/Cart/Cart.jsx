import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { DELItem } from '../../Redux/handleCart';
import { emptyCartUrl } from '../../assets/imageUrl';
import './cart.css';

const AppCart = () => {
    // Fetch items from Redux store
    const items = useSelector((state) => state.item.Items);
    const dispatch = useDispatch();

    console.log("items", items);

    // Function to render empty cart message
    const renderEmptyCart = () => (
        <div className='px-4 my-5 bg-white rounded-3 py-3'>
            <div className='container py-4'>
                <div className='d-flex flex-row align-items-center w-75 h-50'>
                    <img className='mx-3 w-50 h-50 emptyImgClass' src={emptyCartUrl} alt='Empty Cart' />
                    <div className='mx-5 text-danger'>
                        <h2>Your Cart is Empty!</h2>
                        <h3 className='text-secondary'>Please, Add Items in cart</h3>
                        <NavLink to="/products" className="my-5 btn btn-outline-dark">Go To Products</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );

    // Function to render each item in the cart
    const renderCartItems = (cartItem) => {
        const handleRemove = (cartItem) => {
            dispatch(DELItem(cartItem));
            toast.success("Item Removed Successfully");
        };

        return (
            <div className="py-5 my-5 bg-light rounded-3" key={cartItem.value?.id}>
                <div className="container py-4">
                    <button onClick={() => handleRemove(cartItem)} className="btn-close float-end"></button>
                    <div className="row cardClass">
                        <div className="col-md-4">
                            <img className='imgClass' src={cartItem.value?.image} alt={cartItem.value?.title} />
                        </div>
                        <div className="col-md-4">
                            <h3>{cartItem.value?.title}</h3>
                            <div>{cartItem.value?.description}</div>
                            <div><i className='fa fa-star'></i>{" "}{cartItem.value?.rating.rate} <span className='fw-bold'>Reviews:</span> {cartItem.value?.rating.count}</div>
                            <div className='lead fw-bold'>$ {cartItem.value?.price}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Button component to proceed to checkout
    const CheckoutButton = () => (
        <div className="container">
            <div className="row">
                <NavLink to="/checkout" className="btn btn-dark mb-5 w-25 mx-auto">Proceed To Checkout</NavLink >
            </div>
        </div>
    );

    return (
        <div>
            <ToastContainer />
            {items.length === 0 && renderEmptyCart()}
            {items.length > 0 && items.map((cartItem) => renderCartItems(cartItem))}
            {items.length > 0 && <CheckoutButton />}
        </div>
    );
};

export default AppCart;
