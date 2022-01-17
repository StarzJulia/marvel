import React, {useState, useEffect, useContext} from 'react';
import {getPagesCount, getCurrentPage} from '../../scripts/pagination';
import {FilterContext} from '../../context/filterContext';

export default function Pagination() {
    let {total, count, offset, limit, change} = useContext(FilterContext);
    let [pages, setPages] = useState<number[]>([]);
    let [current, setCurrent] = useState(0);
    let [last, setLast] = useState(0);

    const createPagination = () => {
        let newPages = [];
        const curr = getCurrentPage(offset, count, limit);
        const lst = getPagesCount(total, limit);

        if (total > 0) {
            let start = Math.max(2, curr - 2);
            const end = Math.min(curr + 3, lst - 1);

            newPages.push(1);

            while (start <= end) {
                newPages.push(start);
                start += 1;
            }
            if (lst > 1)
                newPages.push(lst);
        }
        
        setCurrent(curr);
        setLast(lst);
        setPages(newPages);
    }

    const sendPaginationRequest = (page: number) => {
        change({
            offset: (page - 1) * limit
        });
    }

    useEffect(() => {
        createPagination();
    }, [offset, total, limit, count]);

    return (
        <div className="filter_pagination">
            {current > 1 &&
                <span
                    className="filter_pagination-page"
                    onClick={() => sendPaginationRequest(current - 1)}
                >
                    Prev
                </span>
            }
            {pages.map((page, index, pagesArr) => 
                <span key={index}> 
                    {index > 0 && (page - pagesArr[index - 1]) > 1 &&
                        <span>...</span>
                    }
                    <span 
                        className={(page == current ? "current" : "") + " filter_pagination-page"}
                        onClick={() => sendPaginationRequest(page)}
                    >
                        {page}
                    </span>
                </span>
            )}
            {current < last &&
                <span
                    className="filter_pagination-page"
                    onClick={() => sendPaginationRequest(current + 1)}
                >
                    Next
                </span>
            }
        </div>
    )
}