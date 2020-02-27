import React, { useContext, useRef } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { AppContext } from '../../context/AppContext';

import './../../style/components/login.scss';

function Login(props) {

    const username = useRef();
    const password = useRef();
    
    const {
        setUser,
        LoginAccount
    } = useContext(AppContext);

    // if(user !== '') {
    //     props.history.go(-1);
    // }

    const Login = (e) => {
        e.preventDefault();
        let errorI = [...document.querySelectorAll('.error')];
        for (let item of errorI) {
            item.innerText = '';
        }

        const valUsername = username.current.value;
        const valPassword = password.current.value;

        const error = LoginAccount(valUsername, valPassword);

        if(error.length  > 0) {
            for (let item of error) {
                let id = `error_${item.name}`;
                document.getElementById(id).innerText = item.message;
            }
        } else {
            const fetchData = async () => {
                const result = await axios(
                    `http://192.168.0.100:8080/server/login.php?username=${valUsername}&pass=${valPassword}`
                );
                if(result.data.status === true) {
                    let userLogin = {
                        name : valUsername,
                        token : result.data.token
                    };
                    setUser(userLogin);
                    localStorage.setItem('userLogin', JSON.stringify(userLogin));
                    props.history.push('/');
                } else {
                    document.getElementById(`error_${result.data.error}`).innerText = result.data.message;
                }
            };
            fetchData();
        }

    };

    const resetPassword = () => {
        password.current.value = '';
    };

    return (
        <main className='main__wrapper'>
            <section className='register'>
                <div className='container'>
                    <div className='register__main'>
                        <div className='register__title'>
                            <h5>sign in</h5>
                        </div>
                        <form>
                            <div className='register__items'>
                                <label htmlFor="username">Username *</label>
                                <input type="text" name="username" id='username' ref={username} onChange={resetPassword}/>
                                <p id='error_username' className='error'></p>
                            </div>
                            <div className='register__items'>
                                <label htmlFor="password">Password *</label>
                                <input type="password" name="password" id='password' ref={password}/>
                                <p id='error_password' className='error'></p>
                            </div>
                            <button type="submit" className='btn-cart btn--full' onClick={Login}>login</button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default withRouter(Login);