import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
        paymentMethod: "stripe" // default payment method
    });
    const [showPaymentMethod, setShowPaymentMethod] = useState(false);
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();

        if (!showPaymentMethod) {
            setShowPaymentMethod(true);
            return;
        }

        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
            paymentMethod: data.paymentMethod
        };

        try {
            const response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
            if (response.data.success) {
                if (data.paymentMethod === "stripe") {
                    window.location.replace(response.data.session_url);
                } else {
                    toast.success("Order placed successfully!");
                    navigate('/');
                }
            } else {
                toast.error("Error placing order");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Error placing order");
        }
    };

    useEffect(() => {
        if (!token || getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token, getTotalCartAmount, navigate]);

    return (
        <div>
            <form onSubmit={placeOrder} className='place-order'>
                <div className="place-order-left">
                    <p className='title'>Delivery Information</p>
                    <div className="multi-field">
                        <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
                        <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
                    </div>
                    <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
                    <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
                    <div className="multi-field">
                        <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
                        <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
                    </div>
                    <div className="multi-field">
                        <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
                        <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
                    </div>
                    <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
                </div>
                <div className="place-order-right">
                    <div className="cart-total">
                        <h2>Cart Totals</h2>
                        <div>
                            <div className="cart-total-details">
                                <p>Subtotal</p>
                                <p>${getTotalCartAmount()}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Delivery Fee</p>
                                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <b>Total</b>
                                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                            </div>
                        </div>
                        <button type='submit'>{showPaymentMethod ? 'PLACE ORDER' : 'PROCEED TO PAYMENT'}</button>
                    </div>
                    {showPaymentMethod && (
                        <div className="payment-method">
                            <p>Select Payment Method</p>
                            <select name="paymentMethod" value={data.paymentMethod} onChange={onChangeHandler}>
                                <option value="stripe">Stripe (Credit/Debit)</option>
                                <option value="cod">COD (Cash on Delivery)</option>
                            </select>
                        </div>
                    )}
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default PlaceOrder;
