import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


import { AppContext } from '../../context/AppContext';

import CheckoutCart from './checkout_cart';

function CheckoutDefault(props) {

    const {
        RegisterAccount,
        setUser,
        cart,
        setCart
    } = useContext(AppContext);

    const totalCart = cart.reduce( (total, item) => {
        return total + (item.price*item.quantity);
    }, 0)

    let username = useRef();
    let password = useRef();
    let email = useRef();
    let phonenumber = useRef();
    let address = useRef();

    const PaymentDefault = () => {
        let errorI = [...document.querySelectorAll('.error')];
        for (let item of errorI) {
            item.innerText = '';
        }

        document.getElementById('error_cart').innerText = '';

        const valUsername = username.current.value;
        const valPassword = password.current.value;
        const valEmail = email.current.value;
        const valPhoneNumber = phonenumber.current.value;
        const valAddress = address.current.value;

        const error = RegisterAccount(valUsername, valPassword, valEmail, valPhoneNumber, valAddress);

        if(cart.length === 0) {
            document.getElementById('error_cart').innerText = 'Please select the product in the cart !';
        } else {
            if(error !== true) {
                for (let item of error) {
                    let id = `error_${item.name}`;
                    document.getElementById(id).innerText = item.message;
                }
            } else {
                const fetchData = async () => {
                    const result = await axios(
                        `http://192.168.0.100:8080/server/register.php?username=${valUsername}&pass=${valPassword}&email=${valEmail}&phone=${valPhoneNumber}&address=${valAddress}`
                    );
                    let userLogin = {
                        name : valUsername,
                        token : result.data.token
                    };
                    setUser(userLogin);
                    localStorage.setItem('userLogin', JSON.stringify(userLogin));
    
                    await axios({
                        url: 'http://192.168.0.100:8080/server/payment.php',
                        method: 'post',
                        data: {
                            name : valUsername,
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

    }

    return (
        <div className='checkout__main'>
            <div className='row'>
                <div className='col-md-6 checkout__items'>
                    <div className='checkout__title'>
                        <h6>Information</h6>
                    </div>
                    <div className='checkout__des'>
                        <span>Already have an account? <Link to='/login'>Log in</Link></span>
                    </div>
                    <form>
                        <div className='register__items'>
                            <label htmlFor="username">Username *</label>
                            <input type="text" name="username" id='username' ref={username}/>
                            <p className='error' id='error_username'></p>
                        </div>
                        <div className='register__items'>
                            <label htmlFor="password">Password *</label>
                            <input type="password" name="password" id='password' ref={password}/>
                            <p className='error' id='error_password'></p>
                        </div>
                        <div className='register__items'>
                            <label htmlFor="email">Email *</label>
                            <input type="text" name="email" id='email' ref={email}/>
                            <p className='error' id='error_email'></p>
                        </div>
                        <div className='register__items'>
                            <label htmlFor="phonenumber">Phonenumber *</label>
                            <input type="text" name="phonenumber" id='phonenumber' ref={phonenumber}/>
                            <p className='error' id='error_phonenumber'></p>
                        </div>
                        <div className='register__items'>
                            <label htmlFor="address">Address *</label>
                            <input type="text" name="address" id='addres' ref={address}/>
                            <p className='error' id='error_address'></p>
                        </div>
                    </form>
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
                    <button type="button" className='btn-cart btn-full' onClick={() => PaymentDefault()}>Payment</button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(CheckoutDefault);