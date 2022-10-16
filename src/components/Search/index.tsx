// @ts-nocheck
import React from 'react';
import styles from './search.module.scss';
import debounce from 'lodash.debounce';
import {setSearchValue} from '../../redux/slices/filterSlice';
import {useDispatch} from 'react-redux';

const Search = () => {

const dispatch = useDispatch();

const [value, setValue] = React.useState('');
const inputRef = React.useRef<HTMLInputElement>(null) 
const onClickClear = (event: React.MouseEvent<SVGSVGElement>) => {
    dispatch(setSearchValue(''))
    setValue('');
    if(inputRef.current)
    {inputRef.current.focus()} // фокус на инпуте после удаления текста
}
const updateInputValue = React.useCallback(
    debounce((string) => {
    dispatch(setSearchValue(string))
}, 300), [],); // оптимизация запроса на бэк при поиске

const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateInputValue(event.target.value);
}
    return (
        <div className={styles.root}>
        <svg className={styles.icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <title/><g id="search">
        <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z"/></g></svg>
        <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input} placeholder='Поиск пиццы ...'/>
        {value ? (<img onClick={onClickClear} 
        src='./img/close.svg' className={styles.close}/>) : ''}
        </div>
    )
}

export default Search;