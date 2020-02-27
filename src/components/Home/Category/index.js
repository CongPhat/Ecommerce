import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeCategory(props) {
    const { item } = props;

    const link = `/shop/${item.id}`;

    return (
        <div className='col-md-3 home__category__items'>
            <Link to={link}>
                <img src={item.imgCate} alt="" />
                <div className='home__category__items--name'>
                    <h6>{item.nameCate}</h6>
                </div>
            </Link>
        </div>
    )
}