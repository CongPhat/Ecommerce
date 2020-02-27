import React from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';

import Menu from './menu';
import Information from './Information';
import Invoice from './Invoice';
import Details from './Details';

import './../../style/components/user.scss';

export default function User() {
    return (
        <main className='main__wrapper main__wrapper--gray'>
            <section className='user'>
                <div className='container'>
                    <div className='row'>
                        <Menu />
                        <Route path='/user' exact component={Information}/>
                        <Route path='/user/invoice' exact component={Invoice}/>
                        <Route path='/user/invoice/:id' component={Details}/>
                    </div>
                </div>
            </section>
        </main>
    )
}