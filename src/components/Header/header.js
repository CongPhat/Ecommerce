import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import { AppContext } from '../../context/AppContext';

import ItemMenu from './item_menu';
import HeaderDefault from './header_df';
import HeaderLogin from './header_login';
import useOutsideClick from "./../Outside";


import './../../style/components/header.scss';

export default function Header() {

    const ref = useRef();

    const { menu, user, cart, menuSmart, toggleMenu, hideMenu } = useContext(AppContext);
    
    const styleMenu = menuSmart === true ? {display: 'block'} : {display: 'none'} ;

    useOutsideClick(ref, () => {
        hideMenu();
    });

    return(
        <header className='header' ref={ref}>
            <div className='header__wrapper'>
                <div className='header__logo'>
                    <img src="/logo/logo.png" alt="logo" />
                </div>
                <nav className='header__nav' style={styleMenu}>
                    <ul>
                        { menu.map((item, index) => <ItemMenu key={index} item={item} />)}
                    </ul>
                </nav>
                <div className='header__right'>
                    <ul>
                        <li className='header__user'>
                            { user === '' ? <HeaderDefault /> : <HeaderLogin />  }
                        </li>
                        <li className='header__cart'>
                            <Link to='/cart'>
                                <FontAwesomeIcon icon={faShoppingCart}/>
                                <span>{ cart === '' ? 0 : cart.length}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='header__hambuger' onClick={() => toggleMenu()}>
                    <img src="/hambuger.png" alt="hambuger" />
                </div>
            </div>
        </header>
    )
}