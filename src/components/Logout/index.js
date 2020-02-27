import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';


import { AppContext } from '../../context/AppContext';

function Logout(props) {

    const { setUser } = useContext(AppContext);

    setUser('');
    localStorage.removeItem('userLogin');
    props.history.push('/login');

    return (
        <div className='logout'>
            
        </div>
    )
}

export default withRouter(Logout);