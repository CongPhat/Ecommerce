import React from 'react';
import { Link } from 'react-router-dom';

export default function Products(props) {

    const { item } = props;
    const link = `/products/${item.id}`

    return (
        <div className='col-md-3 shop__items'>
            <Link to={link}>
                <div className='shop__items__main'>
                    <img src={item.img} alt="" />
                </div>
                <div className='shop__items--infor'>
                    <h6>{item.name_product}</h6>
                    <span>{item.price} VND</span>
                </div>
            </Link>
        </div>
    )
}