import React from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {setSearchValue} from "../../redux/slice/filterSlice";

const Search = () => {
    const inputRef = React.useRef();
    const [value, setValue] = React.useState('');
    const dispatch = useDispatch();

    const onClickClose = () => {
        setValue('');
        dispatch(setSearchValue(''));
        inputRef.current.focus();
    }

    const updateSearchValue = React.useCallback(
        debounce((value) => {
            dispatch(setSearchValue(value));
        }, 1000)
        , []
    );

    const onChangeInput = (event) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    }

    return (
        <div className={styles.root}>
            <input
                ref={inputRef}
                value={value}
                onChange={event => onChangeInput(event)}
                className={styles.input}
                type="text"
                placeholder="Поиск..."
            />
            {value &&
            <svg onClick={onClickClose} className={styles.clearIcon} height="512px" id="Layer_1"
                 version="1.1" viewBox="0 0 512 512"
                 width="512px">
                <path
                    d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/>
            </svg>}
        </div>
    );
};

export default Search;