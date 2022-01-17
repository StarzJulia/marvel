import React from 'react';
import Pagination from './Pagination';
import Search from './Search';
import Sort from './Sort';

export default function Filter() {

    return (
        <div className="filter">
            <Pagination />
            <Sort />
            <Search />
        </div>
    )
}