import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default function HeaderDefault() {
    
    return (
        <div className='header__user--login'>
            <div className='header__user__icons'>
                <FontAwesomeIcon icon={faUser}/>
            </div>
            <div className='header__user--login__direc'>
                <div className='header__user__items'>
                    <Link to='/register'>Register</Link>
                </div>
                <div className='header__user__items'>
                    <Link to='/login'>Login</Link>
                </div>
            </div>
        </div>
    )
}