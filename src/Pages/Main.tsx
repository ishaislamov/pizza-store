// @ts-nocheck
import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pizza from '../components/Pizza/Pizza';
import Skeleton from '../components/Pizza/Skeleton';
import Pagination from '../components/Pagination/index';
import {useSelector, useDispatch} from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters, FilterStateSlice} from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import qs from 'qs';
import {useNavigate} from  'react-router-dom';
import {RootState, useAppDispatch } from '../redux/store';

const Main: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = React.useRef(false); // при нажататии на главную — ссылка не вшивается
  const categoryId = useSelector((state:RootState) => state.filterSlice.categoryId); // category-redux
  const activePopup = useSelector((state:RootState) => state.filterSlice.sort.sortProperty); // sort-redux
  const currentPage = useSelector((state:RootState) => state.filterSlice.currentPage); // pagination-redux
  const searchValue = useSelector((state:RootState) => state.filterSlice.searchValue); // search-redux
  const {items, isLoading} = useSelector((state:RootState) => state.pizzasSlice) // pizzas-redux

  // Если был первый рендер, то проверяем URL-параметры и сохраняем редаксе
  React.useEffect(() => {
    if (window.location.search)  {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters({params}))
     
    } 
  }, [])

  React.useEffect(() => {
    const order = activePopup.includes('-') ? 'asc' : 'desc'; // сортировка по возрастанию/убыв.
    const search = searchValue ? `&search=${searchValue}` : ''; // поиск пицц из бэкэнда

      dispatch(fetchPizzas({
        order,
        search,
        activePopup,
        currentPage,
        categoryId
      })); 
    window.scrollTo(0 , 0)
  }, [categoryId, activePopup, searchValue, currentPage]);

  // Если был первый рендер, то только тогда вшиваются параметры в ссылку (сначала isMounted=false)
  React.useEffect(() => {
   if(isMounted.current) {
    const queryString = qs.stringify({  // URL 
      categoryId,
      currentPage
    })
    navigate(`?${queryString}`);
   }
   isMounted.current = true;
  }, [categoryId, currentPage]);

  const pizzas = items.map((items:any) => <Pizza {...items}/> )
  const filtredItems = items.filter((items:any) => items.title.
  toLowerCase().includes(searchValue.toLowerCase()))
  const onClickCategory = (id:number) => {
    dispatch(setCategoryId(id)) } // category-redux
  const onChangePage = (number:number) => {
    dispatch(setCurrentPage(number)) } // pagination-redux

    return (
    <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              isLoading ? [...new Array(6)].map((_, index
                ) => <Skeleton key={index} />): pizzas
            }
          </div>
          <Pagination onChangePage={onChangePage} />
        </div>
    </div>
    );
}

export default Main;