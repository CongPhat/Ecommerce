import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


import { AppContext } from '../../context/AppContext';

export default function ItemsCart(props) {

    const { item } = props;

    const { UpdateCart } = useContext(AppContext);

    const link = `/products/${item.id}`;

    const changeQuantity = (e) => {
        let { value } = e.target;

        if(value < 0) {
            alert('Do not enter a negative value !');
        } else {
            UpdateCart(item.idProductCart, value, 'update');
        }
    }

    const removeItem = () => {
        UpdateCart(item.idProductCart, true, 'delete');
    }

    return (
        <tr>
            <td className='product__thumnail'>
                <Link to={link}>
                    <img src={item.img} alt="" />
                </Link> 
            </td>
            <td className='product__name' data-title='Product'>
                <Link to={link}>
                    {item.name}
                </Link> 
            </td>
            <td className='product__price' data-title='Price'>
                <span>{item.price} VND</span>
            </td>
            <td className='product__quantity' data-title='Quantity'>
                <input type="number" defaultValue={item.quantity} onChange={changeQuantity}/>
            </td>
            <td className='product__total' data-title='Total'>
                <span>{item.price*item.quantity} VND</span>
            </td>
            <td className='product__remove'>
                <button type="button" className='btn-icon' onClick={removeItem}>
                    <FontAwesomeIcon icon={faTimes}/>
                </button>
            </td>
        </tr>
    )
}