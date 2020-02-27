import React, { useContext, useRef } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { AppContext } from '../../context/AppContext';

import './../../style/components/register.scss';

function Register(props) {

    const username = useRef();
    const password = useRef();
    const email = useRef();
    const phonenumber = useRef();
    const address = useRef();
    
    const {
        RegisterAccount,
        user,
        setUser
    } = useContext(AppContext);

    if(user !== '') {
        props.history.push('/');
    }

    const Register = (e) => {
        e.preventDefault();
        let errorI = [...document.querySelectorAll('.error')];
        for (let item of errorI) {
            item.innerText = '';
        }

        const valUsername = username.current.value;
        const valPassword = password.current.value;
        const valEmail = email.current.value;
        const valPhoneNumber = phonenumber.current.value;
        const valAddress = address.current.value;

        const error = RegisterAccount(valUsername, valPassword, valEmail, valPhoneNumber, valAddress);

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
                props.history.push('/');
            };
            fetchData();
        }

    };

    return (
        <main className='main__wrapper'>
            <section className='register'>
                <div className='container'>
                    <div className='register__main'>
                        <div className='register__title'>
                            <h5>sign up</h5>
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
                            <button type="submit" className='btn-cart btn--full' onClick={Register}>register</button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default withRouter(Register);