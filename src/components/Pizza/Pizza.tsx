// @ts-nocheck
import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { addItem } from '../../redux/slices/cartSlice'
import {cartItems} from '../../redux/slices/cartSlice'
import {RootState} from '../../redux/store'
import {Link} from  'react-router-dom';


type pizzaProps = {
  id:string; price: number; title:string; types:number[];
sizes:number[]; imageUrl:string; count:number;
}

const Pizza: React.FC<pizzaProps> = ({title, imageUrl, price, types, sizes, id }) =>{
const dispatch = useDispatch();
const {items} = useSelector((state:RootState, items:pizzaProps) => state.pizzasSlice)
const [typeActive, setTypeActive] = React.useState(0);
const [sizeActive, setSizeActive] = React.useState(0);

//count
const cartItem = useSelector((state:RootState) => state.cartSlice.items.find((obj) => obj.id === id))
const addedCount = cartItem ? cartItem.count : 0;

// add items to redux cart
const onClickAdd = () => {
  const item: cartItems = {
    id,
    title,
    price,
    imageUrl,
    type: typeNames[typeActive],
    size: sizes[sizeActive],
    count: 0
  }
  dispatch(addItem(item));
  console.log(addItem(item))
}


const typeNames = ['тонкое', 'традиционное'];
const sizeName = [26, 30, 40]

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <div className="pizza-block-image-title"> 
      <img
        className="pizza-block__image"
        src={imageUrl}
        alt="Pizza"
      />
      <h4 className="pizza-block__title">{title}</h4> 
      </div>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typesId) => (
           <li onClick={() => setTypeActive(typesId)}
           className={typeActive === typesId ? 'active' : ''}>{typeNames[typesId]}</li> 
          ))}
        </ul>
        <ul>
          {sizes.map((size, id) => (<li onClick={() => setSizeActive(id)}
          className={sizeActive === id ? 'active' : ''}>{size} см.</li>))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span onClick={onClickAdd}>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Pizza;