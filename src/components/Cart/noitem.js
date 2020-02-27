import React from 'react';
import { Link } from 'react-router-dom';

export default function Noitem() {
    return (
        <div className='cart__noitem'>
            <h3>No products in the cart</h3>
            <Link to='/shop' className='btn-cart'>continue shopping</Link>
        </div>
    )
}