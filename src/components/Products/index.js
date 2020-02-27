import React, {useState, useEffect, useRef, useContext} from 'react';

import { Link } from 'react-router-dom';

import {
    useParams,
} from "react-router-dom";
import { AppContext } from '../../context/AppContext';

import axios from 'axios';

import ErrorFoundProduct from './error_found';
import DetailProduct from './detail_product';
import useOutsideClick from "./../Outside";

import './../../style/components/products.scss';

export default function Products(props) {

    window.scrollTo(0,0);
    const { id } = useParams();

    const [ detailProduct, setDetailProduct ] = useState({});
    const [ errorId, setErrorId ] = useState('');
    const [ relatedProduct, setRelatedProduct ] = useState([]);

    const {
        popupCart, 
        wrapper, 
        HideWrapper,
        HidePopupCart,
        setPopupCart,
        setWrapper,
        productAddToCartSucc 
    } = useContext(AppContext);

    const addToCart = popupCart === false ? {display: 'none'}: {display: 'block'} ;
    const wapperHome = wrapper === false ? {display: 'none'}: {display: 'block'} ;

    const ref = useRef();

    useEffect(() => {
        setPopupCart(false);
        setWrapper(false);
    }, [])

    useEffect(() => {
        if(id === undefined || parseInt(id) === 0 || parseInt(id) < 0) {
            setErrorId(false);
        } else {
            const fetchData = async () => {
                const result = await axios(
                    `http://192.168.0.100:8080/server/detail_product.php?id=${id}`,
                );

                if(result.data.message === true) {
                    setDetailProduct(JSON.parse(result.data.product));
                    setRelatedProduct(JSON.parse(result.data.related));
                    setErrorId(true);
                }
            };

            fetchData();
        }
    }, [id]);

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
            <section className='products'>
                { errorId === false && <ErrorFoundProduct />}
                { errorId === true && <DetailProduct item={detailProduct} related={relatedProduct}/>}
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