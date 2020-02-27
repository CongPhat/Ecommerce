import React, { useContext, useEffect  } from 'react';

import { AppContext } from '../../context/AppContext';
import Noitem from './noitem';
import Yesitem from './yesitem';

import './../../style/components/cart.scss';

export default function Cart() {

    const { cart } = useContext(AppContext);
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <main className='main__wrapper'>
            <section className='cart'>
                <div className='cart__title'>
                    <h1>YOUR CART</h1>
                </div>
                <div className='container'>
                    { cart.length === 0 && <Noitem />}
                    { cart.length > 0 && <Yesitem />}
                </div>
            </section>
        </main>
    )
}