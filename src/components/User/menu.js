import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faUserAlt, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'


import { AppContext } from '../../context/AppContext';

export default function Menu() {

    const { user } = useContext(AppContext);

    return (
        <div className='col-md-3 menu'>
            <div className='menu__header'>
                <div className='menu__avata'>
                    <FontAwesomeIcon icon={faUserCircle}/>
                </div>
                <div className='menu__name'>
                    <span>Your Account</span>
                    <h6>{user.name}</h6>
                </div>
            </div>
            <div className='menu__list'>
                <ul>
                    <li>
                        <Link to='/user'>
                            <div className='menu__list--icon'>
                                <FontAwesomeIcon icon={faUserAlt}/>
                            </div>
                            <span>Account Information</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/user/invoice'>
                            <div className='menu__list--icon'>
                                <FontAwesomeIcon icon={faFileInvoiceDollar}/>
                            </div>
                            <span>Your Invoices</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}