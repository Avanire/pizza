import React from "react";

export default function Categories({ id, onChangeCategory }) {

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
        <div className="categories">
            <ul>
                {categories.map(
                    (item, key) =>
                        <li
                            key={item}
                            onClick={() => onChangeCategory(key)}
                            className={id === key ? 'active' : ''}
                        >
                            {item}
                        </li>
                )
                }
            </ul>
        </div>
    );
}