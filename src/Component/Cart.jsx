import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DELItem } from '../Redux/handleCart'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

function AppCart() {

    const state = useSelector((state) => state.item.Items)
    const dispatch = useDispatch()

    console.log("state", state)
    const emptyCart = () => {
        return (
            <div className='px-4 my-5 bg-white rounded-3 py-3'>
                <div className='container py-4'>
                    <div className='d-flex flex-row align-items-center w-75 h-50'>
                        <img className='mx-3 w-50 h-50' src='https://img.freepik.com/free-vector/supermarket-shopping-cart-concept-illustration_114360-22408.jpg?t=st=1711688235~exp=1711691835~hmac=f157167769a5dd4ea693e5e6475f5b10f415c67e1fdc9478dc6dc0633c3ce870&w=740'/>
                        <div className='mx-5 text-danger'>
                            <h2>Your Cart is Empty!</h2>
                            <h3 className='text-secondary'>Please, Add Items in cart</h3>
                            <NavLink to="/products" className="my-5 btn btn-outline-dark">Go To Products</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const cartItems = (cartItem) => {
        const handleRemove = (cartItem) => {
            dispatch(DELItem(cartItem))
            toast.success("Item Removed Successfully")
        }

        return (<div className="py-5 my-5 bg-light rounded-3" key={cartItem.value.id}>
                <div className="container py-4">
                    <button onClick={() => handleRemove(cartItem)} className="btn-close float-end"></button>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <img src={cartItem.value.image} alt={cartItem.title} height="200px" width="180px" />
                        </div>
                        <div className="col-md-4">
                            <h3>{cartItem.value.title}</h3>
                            <p>{cartItem.value.description}</p>
                            <p><i className='fa fa-star'></i>{" "}{cartItem.value.rating.rate} <span className='fw-bold'>Reviews:</span> {cartItem.value.rating.count}</p>
                            <p className='lead fw-bold'>$ {cartItem.value.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const Button = () => {
        return (
            <div className="container">
                <div className="row">
                    <NavLink to="/checkout" className="btn btn-outline-dark mb-5 w-25 mx-auto">Proceed To Checkout</NavLink >
                </div>
            </div>
        )
    }
  return (
    <div>
        <ToastContainer />
        {state.length === 0 && emptyCart()}
        {state.length !== 0 && state.map((cartItem) =>
            cartItems(cartItem)
        )}
        {state.length !== 0 && Button()}
    </div>
  )
}

export default AppCart