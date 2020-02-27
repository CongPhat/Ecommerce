import React from 'react';
import { Link } from 'react-router-dom';


export default function ProductsInvoice(props) {
    const { item } = props;
    const link = `/products/${item.id}`;
    const price = parseInt(item.price).toLocaleString();

    return (
        <tr>
            <td className='product__thumnail'>
                <Link to={link} className='link__product'>
                    <img src={item.img} alt="" />
                </Link>
            </td>
            <td className='product__total' data-title='Name'>
                <span className='invoice__name'>{item.name_product}</span>
            </td>
            <td className='product__total' data-title='Price'>
                <span className='invoice__price'>{price} VND</span>
            </td>
            <td className='product__quantity' data-title='Quantity'>
                <span className='invoice__quantity'>{item.quantity}</span>
            </td>
        </tr>
    )
}
