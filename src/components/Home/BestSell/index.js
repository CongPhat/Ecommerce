import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';


export default function HomeBestSell(props) {

    const { AddToCart } = useContext(AppContext);

    const { item } = props;

    const link = `/products/${item.id}`

    return (
        <div className='col-md-3 home__bestsell__items'>
            <Link to={link}>
                <div className='home__bestsell__items__main'>
                    <img src={item.img} alt="" />
                </div>
                <div className='home__bestsell__items--infor'>
                    <h6>{item.name_product}</h6>
                    <span>{item.price} VND</span>
                </div>
            </Link>
            <button type="button" className='home__bestsell__items__main--btn' onClick={() => AddToCart(item, 1)}>ADD TO CART</button>
        </div>
    )
}