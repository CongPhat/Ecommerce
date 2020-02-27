import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

import { AppContext } from '../../../context/AppContext';

import ItemInvoices from './item_invoice';

export default function Invoice(props) {

    const [ invoices, setInvoices ] = useState([]);
    const { user } = useContext(AppContext);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `http://192.168.0.100:8080/server/invoices.php?name=${user.name}`,
            );
            setInvoices(result.data);

        };
        fetchData();
    }, [])

    return (
        <div className='col-md-9 user__main'>
            <div className='user__title'>
                <h4>Your's Invoice</h4>
            </div>
            <div className='user__items user__invoice'>
                <table className='cart__table invoice__table' cellSpacing='0'>
                    <thead>
                        <tr>
                            <th className='product__code'>Code Orders</th>
                            <th className='product__total'>Total</th>
                            <th className='product__status'>Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((item, index) => <ItemInvoices key={index} item={item} />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}