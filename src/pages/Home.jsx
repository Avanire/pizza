import React from 'react';
import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

import qs from 'qs';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setFilters, setSortDirection, setSortType} from "../redux/slice/filterSlice";
import {fetchPizzasData} from '../redux/slice/pizzasSlice';

const Home = () => {
    const {items, status} = useSelector(state => state.pizzasSlice);
    console.log(items)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isFilter = React.useRef(false);
    const isMounted = React.useRef(false);

    const {categoryId, searchValue, sortType, sortDirection} = useSelector(state => state.filterSlice);

    const fetchData = async () => {
        const category = categoryId > 0 ? 'category=' + categoryId : '';

        dispatch(fetchPizzasData({
            category,
            sortType,
            sortDirection,
            searchValue
        }));
    }

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = sortList.find((obj) => obj.sortProperty === params.sortType);

            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            );

            isFilter.current = true;
        }
    }, [])

    React.useEffect(() => {
        window.scrollTo(0, 0);

        if (!isFilter.current) {
            fetchData();
        }

        isFilter.current = false;

    }, [categoryId, sortType, sortDirection, searchValue]);

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                categoryId,
                sortType: sortType.sortProperty,
                sortDirection
            });

            navigate(`?${queryString}`);
        }


        isMounted.current = true;
    }, [categoryId, sortType, sortDirection])

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    const onChangeSortType = (sortType) => {
        dispatch(setSortType(sortType));
    }

    const onChangeSortDirection = (sortDirection) => {
        dispatch(setSortDirection(sortDirection));
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories id={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort sortType={sortType} onChangeSortType={onChangeSortType} sortDirection={sortDirection}
                      onChangeSortDirection={onChangeSortDirection}/>
            </div>
            <h2 className="content__title">{status === 'error' ? 'Не удалось загрузить контент' : 'Все пиццы'}</h2>
            <div className="content__items">
                {
                    status === 'loading' ?
                        [...new Array(6)].map((_, i) => <Skeleton key={i}/>)
                        :
                        items.length > 0 ? items.map((item) => <PizzaBlock key={item.id} {...item} />) :
                            <div>
                                <p>Попробуйте позже</p>
                            </div>
                }
            </div>

        </div>
    );
};

export default Home;