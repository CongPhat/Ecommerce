import React from 'react';
import { Link } from 'react-router-dom';

export default function RelatedProducts(props) {

    const { item } = props;
    const link = `/products/${item.id}`

    return (
        <div className='col-md-3 products__related__items'>
            <Link to={link}>
                <div className='products__related__items__main'>
                    <img src={item.img} alt="" />
                </div>
                <div className='products__related__items--infor'>
                    <h6>{item.name_product}</h6>
                    <span>{item.price} VND</span>
                </div>
            </Link>
        </div>
    )
}