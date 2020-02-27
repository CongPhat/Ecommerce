import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


import { AppContext } from '../../../context/AppContext';


export default function Information() {

    const { user } = useContext(AppContext);

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

    return (
        <div className='col-md-9 user__main'>
            <div className='user__title'>
                <h4>Your's Information</h4>
            </div>
            <div className='user__items'>
                <div className='row user__infor'>
                    <div className='col-md-3 user__infor--left'>
                        <span>Your full name:</span>
                    </div>
                    <div className='col-md-7 user__infor--right'>
                        <span id='username'></span>
                    </div>
                </div>
                <div className='row user__infor'>
                    <div className='col-md-3 user__infor--left'>
                        <span>Your email:</span>
                    </div>
                    <div className='col-md-7 user__infor--right'>
                        <span id='email'></span>
                    </div>
                </div>
                <div className='row user__infor'>
                    <div className='col-md-3 user__infor--left'>
                        <span>Phone number:</span>
                    </div>
                    <div className='col-md-7 user__infor--right'>
                        <span id='phonenumber'></span>
                    </div>
                </div>
                <div className='row user__infor'>
                    <div className='col-md-3 user__infor--left'>
                        <span>Your address:</span>
                    </div>
                    <div className='col-md-7 user__infor--right'>
                        <span id='address'></span>
                    </div>
                </div>
            </div>
        </div>
    )
}