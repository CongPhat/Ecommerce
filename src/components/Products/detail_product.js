import React, { useContext } from 'react';
import ReactImageZoom from 'react-image-zoom';

import { AppContext } from '../../context/AppContext';
import RelatedProducts from './related_products';


export default function DetailProduct(props) {

    const { AddToCart } = useContext(AppContext);

    const { item, related } = props;

    const image = {zoomPosition: 'original', img: item.img};

    const AddCart = () => {
        const quantity = document.getElementById('quantity').value;

        let error = document.getElementById('error_quantity');

        error.innerText = "";

        let status = false;

        if(quantity === '' || parseInt(quantity) === 0) {
            error.innerText = "Please enter quantity !";
            status = false;
        } else if(parseInt(quantity) < 0) {
            error.innerText = "Quantity cannot be negative numbers !";
            status = false;
        } else {
            status = true;
        }

        if(status === true) {
            AddToCart(item, parseInt(quantity));
        }
    }

    return (
        <div className='container'>
            <div className='products__main'>
                <div className='row'>
                    <div className='col-md-6 products__main--part'>
                        <ReactImageZoom {...image}/>
                    </div>
                    <div className='col-md-6 products__main--part'>
                        <div className='products__main__infor'>
                            <div className='products__main__infor--title'>
                                <h1>{item.name_product}</h1>
                                <span>{item.price} VND</span>
                            </div>
                            <div className='products__main__infor--des'>
                                <h6>DESCRIPTION</h6>
                                <p>{item.des}</p>
                            </div>
                            <div className='products__main__addcart'>
                                <input type="number" name="quantity" id='quantity' defaultValue='1'/>
                                <button type="button" className='btn--default'onClick={() => AddCart()}>add to cart</button>
                            </div>
                            <div className='products__main__error'>
                                <span id='error_quantity'></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='products__related'>
                <div className='products__related--title'>
                    <h6>Related product</h6>
                </div>
                <div className='products__related__main'>
                    <div className='row'>
                        {related.map((item, index) => <RelatedProducts key={index} item={item}/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}