import React from 'react';

export default function CheckoutCart(props) {

    const { item } = props;

    return (
        <li className='checkout__cart--items'>
            <div className='checkout__cart--left'>
                <div className='checkout__cart--img'>
                    <img src={item.img} alt="" />
                    <span>{item.quantity}</span>
                </div>
                <div className='checkout__cart--name'>
                    <h6>{item.name}</h6>
                </div>
            </div>
            <div className='checkout__cart--right'>
                <span>{item.price} VND</span>
            </div>
        </li>
    )
}


