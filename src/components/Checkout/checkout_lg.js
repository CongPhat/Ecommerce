import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { AppContext } from '../../context/AppContext';

import CheckoutCart from './checkout_cart';

function CheckoutLogin(props) {

    const {
        user,
        cart,
        setCart
    } = useContext(AppContext);

    const totalCart = cart.reduce( (total, item) => {
        return total + (item.price*item.quantity);
    }, 0)

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `http://192.168.0.100:8080/server/information.php?name=${user.name}`
            );
            document.getElementById('username').innerText = result.data.username;
            document.getElementById('email').innerText = result.data.email;
            document.getElementById('phonenumber').innerText = result.data.phonenumber;
            document.getElementById('address').innerText = result.data.address;
        };
        fetchData();
    }, [])

    const PaymentLogin = () => {

        document.getElementById('error_cart').innerText = '';

        if(cart.length === 0) {
            document.getElementById('error_cart').innerText = 'Please select the product in the cart !';
        } else {
            const fetchData = async () => {
                await axios({
                    url: 'http://192.168.0.100:8080/server/payment.php',
                    method: 'post',
                    data: {
                        name : user.name,
                        cart
                    }
                }).then((res) => {
                    if(res.data.status === true) {
                        setCart([]);
                        localStorage.removeItem('cart');
                        props.history.push(`/user/invoice/${res.data.code}`);
                    }
                })
            };
            fetchData();
        }
    }



    return (
        <div className='checkout__main'>
            <div className='row'>
                <div className='col-md-6 checkout__items'>
                    <div className='checkout__title'>
                        <h6>Information</h6>
                    </div>
                    <div className='checkout__des'>
                        <span>If you want to change the information? <Link to='/information'>Please click here!</Link></span>
                    </div>
                    <ul className='checkout__information'>
                        <li className='checkout__information--items'>
                            <strong>Username: </strong>
                            <span id='username'></span>
                        </li>
                        <li className='checkout__information--items'>
                            <strong>Email: </strong>
                            <span id='email'></span>
                        </li>
                        <li className='checkout__information--items'>
                            <strong>Phonenumber: </strong>
                            <span id='phonenumber'></span>
                        </li>
                        <li className='checkout__information--items'>
                            <strong>Address: </strong>
                            <span id='address'></span>
                        </li>
                    </ul>
                </div>
                <div className='col-md-6 checkout__items'>
                    <div className='checkout__title'>
                        <h6>Products</h6>
                    </div>
                    <div className='checkout__error'>
                        <p className='error' id='error_cart'></p>
                    </div>
                    <div className='checkout__cart'>
                        <ul>
                            { cart.map((item, index) => <CheckoutCart item={item} key={index}/>)}
                        </ul>
                    </div>
                    <div className='checkout__total'>
                        <span>Total: </span>
                        <span>{totalCart} VND</span>
                    </div>
                    <button type="button" className='btn-cart btn-full' onClick={() => PaymentLogin()}>Payment</button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(CheckoutLogin);
