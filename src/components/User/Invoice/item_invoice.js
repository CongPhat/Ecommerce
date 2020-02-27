import React from 'react';
import { Link } from 'react-router-dom';

export default function ItemInvoices(props) {

    const { item } = props;
    const link = `/user/invoice/${item.id}`;
    const total = parseInt(item.total).toLocaleString();

    let classHandle;
    let statusFormat;

    switch(item.handle) {
        case '0': 
            classHandle = 'process';
            statusFormat = 'Processing...';
            break;
        case '1': 
            classHandle = 'deli';
            statusFormat = 'Delivery...';
            break;
        case '2': 
            classHandle = 'succ';
            statusFormat = 'Successful delivery';
            break;
        case '3': 
            classHandle = 'failed';
            statusFormat = 'Delivery Failed';
            break;
        default: 
            classHandle = '';
            statusFormat = '';
            break;
    }

    return (
        <tr>
            <td className='product__code' data-title='Code Orders'>
                <Link to={link} className='link__invoice'>
                    {item.id}
                </Link> 
            </td>
            <td className='product__total' data-title='Total'>
                <span className='invoice__total'>{total} VND</span>
            </td>
            <td className='product__status' data-title='Status'>
                <span className={classHandle}>{statusFormat}</span>
            </td>
        </tr>
    )
}