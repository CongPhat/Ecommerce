import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../../context/AppContext';
import ItemsCart from './items';

export default function Yesitem() {

    const { cart, UpdateCart } = useContext(AppContext);
    
    const totalCart = cart.reduce( (total, item) => {
        return total + (item.price*item.quantity);
    }, 0)

    return (
        <div className='cart__main'>
            <table className='cart__table' cellSpacing='0'>
                <thead>
                    <tr>
                        <th className='product__thumnail'></th>
                        <th className='product__name'>Product</th>
                        <th className='product__price'>Price</th>
                        <th className='product__quantity'>Quantity</th>
                        <th className='product__total'>Total</th>
                        <th className='product__remove'></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item, index) => <ItemsCart key={index} item={item} />)}
                    <tr>
                        <td colSpan='6' className='actions'>
                            <button type="button" className='btn-cart' onClick={() => UpdateCart(false, false, 'deleteall')}>Clean Cart</button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='4' className='cart__total--left'>
                            <span>Total : </span>
                        </td>
                        <td colSpan='2' className='cart__total--right'>
                            <span>{totalCart} VND</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='cart__direc'>
                <div className='row'>
                    <div className='col-md-6'>
                        <Link to='/shop' className='btn-cart btn-cart--50'>continue shopping</Link>
                    </div>
                    <div className='col-md-6'>
                        <Link to='/checkout' className='btn-cart btn-cart--50'>checkout</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}