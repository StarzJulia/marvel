import React, {useRef} from 'react';

interface SearchInterface {
    lookFor: (params: {}) => void
}

export default function Search({lookFor}: SearchInterface) {
	const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;;

    const btnClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        
        lookFor({
            'nameStartsWith': inputRef.current.value || '',
            'offset': 0
        });
    }

    const clearInput = () => {
        inputRef.current.value = '';

        lookFor({
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