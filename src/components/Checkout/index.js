import React, { useContext } from 'react';


import { AppContext } from '../../context/AppContext';
import CheckoutDefault from './checkout_df';
import CheckoutLogin from './checkout_lg';

import './../../style/components/checkout.scss';

export default function Checkout() {

    window.scrollTo(0, 0);
    const { user } = useContext(AppContext);

    return (
        <main className='main__wrapper'>
            <section className='checkout'>
                <div className='container'>
                    { user === '' ? <CheckoutDefault /> : <CheckoutLogin />}
                </div>
            </section>
        </main>
    )
}