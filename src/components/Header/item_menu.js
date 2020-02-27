import React from 'react';
import { Link } from 'react-router-dom';


export default function ItemMenu(props) {
    const { item } = props;
    return(
        <li>
            <Link to={item.link}>{item.name}</Link>
        </li>
    )
}