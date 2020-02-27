import React, { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


import { AppContext } from '../../context/AppContext';

import HomeCategory from './Category';
import HomeBestSell from './BestSell';
import HomeSale from './Sale';
import useOutsideClick from "./../Outside";

import './../../style/components/home.scss';

export default function Home() {

    const {
        category,
        setCategory,
        bestSell, 
        setBestSell,
        sale,
        setSale,
        popupCart, 
        wrapper, 
        HideWrapper,
        HidePopupCart,
        setPopupCart,
        setWrapper,
        productAddToCartSucc 
    } = useContext(AppContext);

    useEffect(() => {
        setPopupCart(false);
        setWrapper(false);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://192.168.0.100:8080/server/category.php',
            );
            setCategory(result.data);

            const resultBestSell = await axios(
                'http://192.168.0.100:8080/server/products.php?type=best&numbers=8&cate=all',
            );
            setBestSell(resultBestSell.data);

            const resultSale = await axios(
                'http://192.168.0.100:8080/server/products.php?type=sale&numbers=8&cate=all',
            );
            setSale(resultSale.data);

        };
        fetchData();
    }, []);


    const addToCart = popupCart === false ? {display: 'none'}: {display: 'block'} ;
    const wapperHome = wrapper === false ? {display: 'none'}: {display: 'block'} ;

    const ref = useRef();

    useOutsideClick(ref, () => {
        HideWrapper();
        HidePopupCart();
    });

    useEffect(() => {
        document.getElementById('img--popup').setAttribute('src', productAddToCartSucc.img);
        document.getElementById('title--popup').innerText = productAddToCartSucc.name_product;
    }, [productAddToCartSucc]);


    return (
        <main className='main__wrapper'>
            <section className='home__category'>
                <div className='row home__category__block'>
                    { category.map((item, index) => <HomeCategory key={index} item={item} />)}
                </div>
            </section>
            <section className='home__bestsell'>
                <div className='container'>
                    <div className='home__bestsell__wrapper'>
                        <div className='home__bestsell--title'>
                            <h6>Best Selling Products</h6>
                        </div>
                        <div className='home__bestsell__main'>
                            <div className='row'>
                                { bestSell.map((item, index) => <HomeBestSell key={index} item={item} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='home__bestsell'>
                <div className='container'>
                    <div className='home__bestsell__wrapper'>
                        <div className='home__bestsell--title'>
                            <h6>Sale Products</h6>
                        </div>
                        <div className='home__bestsell__main'>
                            <div className='row'>
                                { sale.map((item, index) => <HomeSale key={index} item={item} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className='home__wrapper' style={wapperHome}>
                
            </div>
            <div className='home__popup--success' style={addToCart} ref={ref}>
                <div className='home__popup--img'>
                    <img src="" alt="" id='img--popup'/>
                </div>
                <h6 className='home__popup--title'>
                    You have successfully added <span id='title--popup'></span> products to your cart.
                </h6>
                <Link to='/cart' className='home__popup--direc'>Cart</Link>
            </div>
        </main>
    )
}