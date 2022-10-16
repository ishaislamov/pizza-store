// @ts-nocheck
import Styles from './NotFound.module.scss';
import React from 'react';

const NotFound: React.FC = () => {
    return (
    <div className={Styles.notfound}>
    <h1> 
        <span>😕 </span>
        <br />
        Ничего не найдено </h1>    
    <p> К сожалени данная страница отсутствует в нашем интернет-магазине </p>
</div>
    )
}

export default NotFound;