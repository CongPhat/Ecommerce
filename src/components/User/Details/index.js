import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


import { AppContext } from '../../../context/AppContext';

import ProductsInvoice from './products_invoice';

export default function Details(props) {

    const { id } = useParams();
    
    const [ itemInvoice, setItemInvoices ] = useState([]);
    const [ classInvoice, setClassInvoice ] = useState('');
    const [ total, setTotal ] = useState(0);
    const { user } = useContext(AppContext);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `http://192.168.0.100:8080/server/invoices_detail.php?id=${id}&name=${user.name}`,
            );
            if(result.data.status) {
                setItemInvoices(JSON.parse(result.data.products));
                let classHandle;
                let statusFormat;
                switch(result.data.handle) {
                    case '0': 
                        classHandle = 'process';
                        statusFormat = 'Your order is being processed ...';
                        break;
                    case '1': 
                        classHandle = 'deli';
                        statusFormat = 'Your order is on delivery!';
                        break;
                    case '2': 
                        classHandle = 'succ';
                        statusFormat = 'Your order has been delivered successfully!';
                        break;
                    case '3': 
                        classHandle = 'failed';
                        statusFormat = 'Your order delivery failed!';
                        break;
                    default: 
                        classHandle = '';
                        statusFormat = '';
                        break;
                }

                setClassInvoice(classHandle);
                setTotal(parseInt(result.data.total).toLocaleString());
                document.getElementById('status__invoice').innerText = statusFormat;
            }

        };
        fetchData();
    }, [])


    return (
        <div className='col-md-9 user__main'>
            <div className='user__title'>
                <h4>Code Order: #<span>{id}</span></h4>
            </div>
            <div className='user__des'>
                <span className={classInvoice} id='status__invoice'></span>
            </div>
            <div className='user__items user__invoice'>
                <table className='cart__table invoice__table' cellSpacing='0'>
                    <thead>
                        <tr>
                            <th className='product__thumnail'>Image</th>
                            <th className='product__name'>Name</th>
                            <th className='product__price'>Price</th>
                            <th className='product__quantity'>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemInvoice.map((item, index) => <ProductsInvoice key={index} item={item} />)}
                        <tr>
                            <td colSpan='3' className='cart__total--left'>
                                <span>Total : </span>
                            </td>
                            <td colSpan='1' className='cart__total--right'>
                                <span>{total} VND</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}