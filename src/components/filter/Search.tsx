import React, {useRef, useContext} from 'react';
import {FilterContext} from '../../context/filterContext';

export default function Search() {
    let {change} = useContext(FilterContext);
	const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;;

    const btnClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        
        change({
            'nameStartsWith': inputRef.current.value || '',
            'offset': 0
        });
    }

    const clearInput = () => {
        inputRef.current.value = '';

        change({
            'nameStartsWith': '',
            'offset': 0
        });
    }

    return (
        <form className="filter_search">
            <div className="filter_search-content">
                <input 
                    type="text"
                    ref={inputRef}
                    className="filter_search-content_input"
                />
                <button 
                    type="button"
                    className="button button-clear filter_search-content_button"
                    onClick={clearInput}
                >
                    &times;
                </button>
            </div>
            <button 
                className="button button-main"
                onClick={btnClick}
            >
                Ok
            </button>
        </form>
    )
}