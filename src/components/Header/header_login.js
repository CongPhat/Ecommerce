import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default function HeaderLogin() {
    return (
        <div className='header__user--login'>
            <div className='header__user__icons'>
                <FontAwesomeIcon icon={faUserTie}/>
            </div>
            <div className='header__user--login__direc'>
                <div className='header__user__items'>
                    <Link to='/user'>Information</Link>
                </div>
                <div className='header__user__items'>
                    <Link to='/logout'>Log Out</Link>
                </div>
            </div>
        </div>
    )
}