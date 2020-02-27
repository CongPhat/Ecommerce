import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Link,
    useParams
} from "react-router-dom";
import axios from 'axios';


import Products from './products';

//scss
import './../../style/components/shop.scss';

export default function Shop() {

    const { id } = useParams();
    const [ products, setProducts ] = useState([])
    const [ offset, setOffset ] = useState(0);
    const [ loadMode, setLoadMode ] = useState(false);
    
    const apiProduct = () => {
        let number = offset * 8;
        const apiCategory = id === undefined ? 'all' : id ;
        const fetchData = async () => {
            const result = await axios(
                `http://192.168.0.100:8080/server/products.php?type=all&numbers=${number}&cate=${apiCategory}`,
            );

            if(result.data.length !== 0) {
                setProducts([...products, ...result.data]);
            }

        };
        fetchData();
        
        setOffset(offset + 1);
    }

    const loadApi = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop
            === document.documentElement.offsetHeight
        ) {
            setLoadMode(true);
        }
    }

    
    const fetchMoreListItems = () => {
        apiProduct();
        setLoadMode(false);
    }

    useEffect(() => {
        apiProduct();

        window.addEventListener('scroll', loadApi)
        return () => window.removeEventListener('scroll', loadApi)
    }, [])

    useEffect(() => {
        if(loadMode) {
            fetchMoreListItems();
        }
    }, [loadMode])

    return (
        <main className='main__wrapper'>
            <section className='shop'>
                <div className='container'>
                    <div className='shop__title'>
                        <h5>Shop</h5>
                    </div>
                    <div className='shop__main'>
                        <div className='row'>
                            { products.map((item, index) => <Products key={index} item={item}/>)}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}