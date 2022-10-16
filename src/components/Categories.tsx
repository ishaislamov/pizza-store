import React from 'react';

type categoryType = {
  categoryId: number;
  onClickCategory: (id: number) => void;
}

const Categories: React.FC<categoryType> = ({ categoryId, onClickCategory }) => {

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']


  return (
    <div className="categories">
      <ul>
        {
          categories.map((value, id) => <li onClick={() => onClickCategory(id)}
            className={categoryId === id ? 'active' : ''}>{value}
          </li>)
        }
      </ul>
    </div>
  )
}

export default Categories;