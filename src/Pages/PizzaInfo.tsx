import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PizzaInfo:React.FC = () => {
const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
}>()
const { id } = useParams();
React.useEffect(() => {
    async function fetchData () {
        const { data } = await
        axios.get('https://6329ea1d4c626ff832cda4b9.mockapi.io/Items/' + id)
        setPizza(data)
    }
    fetchData();
}, [])

if (!pizza) {
    return <> Загрузка...</>;
}
    return (
        <div className="container">
            <img src={pizza.imageUrl} alt="Image-pizza"/>
            <h2> {pizza.title} </h2>
          <h3> Цена: {pizza.price} руб. </h3>
        </div>
    )
}

export default PizzaInfo; 
