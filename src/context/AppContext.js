import React, { createContext } from 'react';
import { useState} from 'react';

export const AppContext = createContext(null);

export default function AppProvider(props) {


    const [category, setCategory ] = useState([]);

    const [bestSell, setBestSell ] = useState([]);

    const [ sale , setSale ] = useState([]);

    const [ products , setProducts ] = useState([]);

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('userLogin')) || ''
    );

    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem('cart')) || []
    );

    const [menuSmart, setMenuSmart] = useState(false);

    // toggle wapper home and popup add to cart
    const [ popupCart, setPopupCart ] = useState(false);

    // wrapper black
    const [ wrapper, setWrapper ] = useState(false);

    //product add to cart success
    const [ productAddToCartSucc, setProductAddToCartSucc ] = useState({});

    const store = {
        menu: [
            { link : '/' , name: 'home'},
            { link : '/shop' , name: 'shop'}
        ],
        user,
        setUser,
        cart,
        setCart,
        menuSmart,
        toggleMenu : () => {
            setMenuSmart(!menuSmart);
        },
        hideMenu : () => {
            setMenuSmart(false);
        },

        // category
        category,
        setCategory,

        //bestsell home
        bestSell,
        setBestSell,

        // sale products home
        sale,
        setSale,

        //add to cart
        AddToCart : (product, quantity) => {
            let cartCurrent = [...cart];

            // set product success show popup
            setProductAddToCartSucc(product);

            const CreateProductCart = () => {
                const idProductCart = Math.floor(100000 + Math.random() * 900000);

                const productCart = {
                    idProductCart,
                    id: product.id,
                    quantity,
                    price: product.price,
                    name: product.name_product,
                    img: product.img
                };
                cartCurrent.push(productCart);
                setCart(cartCurrent);
            }

            if(cartCurrent.length === 0) {
                CreateProductCart();

            } else {
                let { id } = product;

                let found = cartCurrent.find((item) => item.id === id);
                
                if(found !== undefined) {
                    for(let item of cartCurrent) {
                        if(item.id === id) {
                            item.quantity += quantity
                        }
                    }
                } else {
                    CreateProductCart();
                }
            }

            setPopupCart(true);
            setWrapper(true);
            //save local storage
            localStorage.setItem('cart', JSON.stringify(cartCurrent));
        },
        UpdateCart : (id, quantity, action) => {
            
            let cartCurrent = [...cart];

            if(action === 'update') {
                for( let item of cartCurrent) {
                    if(item.idProductCart === id) {
                        item.quantity = quantity;
                    }
                }
            } else if(action === 'delete') {
                cartCurrent = cartCurrent.filter(item => item.idProductCart !== id);
            } else if (action === 'deleteall') {
                cartCurrent = [];
            }

            setCart(cartCurrent);
            localStorage.setItem('cart', JSON.stringify(cartCurrent));
        },
        popupCart,
        HidePopupCart : () => {
            setPopupCart(false);
        },
        wrapper,
        HideWrapper : () => {
            setWrapper(false);
        },

        //product add to cart success
        productAddToCartSucc,


        //products shop
        products,
        setProducts,


        //
        setPopupCart,
        setWrapper,

        //register account
        RegisterAccount : (
            valUsername,
            valPassword,
            valEmail,
            valPhoneNumber,
            valAddress
        ) => {
            let error = [];

            const CheckValue = (val, type) => {
                let action = {};

                if (type === 'email' && val !== '') {
                    let reEmail = /\S+@\S+\.\S+/;
                    if(!reEmail.test(val)) {
                        action.message = `${type} invalidate !`;
                        action.name = type;
                    } 
                } else if (type === 'phonenumber' && val !== '') {
                    let rePhone = /^0(1\d{9}|9\d{8})$/;
                    if(!rePhone.test(val)) {
                        action.message = `${type} invalidate !`;
                        action.name = type;
                    } 
                } else {
                    if(val === '') {
                        action.message = `${type} is required !`;
                        action.name = type;
                    } 
                }

                if(Object.entries(action).length === 0 && action.constructor === Object) {

                } else error.push(action);
            };
    
            CheckValue(valUsername, 'username');
            CheckValue(valPassword, 'password');
            CheckValue(valEmail, 'email');
            CheckValue(valPhoneNumber, 'phonenumber');
            CheckValue(valAddress, 'address');

            if(error.length === 0) {
                return true;
            } else {
                return error;
            }

        },
        
        LoginAccount : (valUsername, valPassword) => {
            let error = [];

            if(valUsername === '') {
                let action = {
                    name: 'username',
                    message: 'Username is required !'
                };
                error.push(action);
            }

            if(valPassword === '') {
                let action = {
                    name: 'password',
                    message: 'Password is required !'
                };
                error.push(action);
            }

            return error;
        },
    }

    return (
        <AppContext.Provider value = {store}>
            {props.children}
        </AppContext.Provider>
    )

}