import React from 'react';
import Pagination from './Pagination';
import Search from './Search';
import Sort from './Sort';

interface FilterInterface {
    total: number;
    count: number;
    offset: number;
    limit: number;
    change: (params: {}) => void
}

export default function Filter({total, count, offset, limit, change}: FilterInterface) {

    const setFilter = (params: {}) => {
        change(params);
    }

    return (
        <div className="filter">
            <Pagination
                total={total} 
                count={count} 
                offset={offset}
                limit={limit}
                paginate={setFilter}
            />
            <Sort orderBy={setFilter} />
            <Search lookFor={setFilter} />
        </div>
    )
}