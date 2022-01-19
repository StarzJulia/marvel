import React, {useEffect, useState} from 'react';
import Filter from './filter/Filter';
import CharacterCard from './CharacterCard';
import {FilterContext} from '../context/filterContext';
import {createSearchPath, createUrl} from '../scripts/common';

export default function Home() {
    const url = createUrl();
    const LIMIT_NUMBER = 15;
    let [characters, setCharacters] = useState([]);
    let [hash, setHash] = useState<{[key: string]: string | number}>({limit: LIMIT_NUMBER});
    let [loading, setLoader] = useState(true);
    let [error, setError] = useState('');
    let [filterSettings, setFilterSettings] = useState({
        total: 0,
        limit: 0,
        count: 0,
        offset: 0
    });

    const fetchCharacters = async () => {
        const search = createSearchPath(hash);

        const response = await fetch(`${url}${search}`);
        const json = await response.json();
        
        if (json.code != 200) {
            setError(json.message || json.status);
        } else {
            let {results, count, total, offset, limit} = json.data; 
            setFilterSettings({total, count, limit, offset});
            setCharacters(results);
        }

        setLoader(false);
    }

    const filterCharacters = (params: {[key: string]: string | number}) => {
        setHash({...hash, ...params});
    }

    useEffect(() => {
        setLoader(true);
        fetchCharacters();
    }, [hash]);

    return (
        <>
            <FilterContext.Provider value={{
                change: filterCharacters,
                ...filterSettings
            }}>
                <Filter />
            </FilterContext.Provider>
            {error &&
                <div className="error">{error}</div>
            }
            <div className="character-cards">
                {characters && characters.map((character, index) => 
                    <CharacterCard 
                        key={index}
                        {...character}
                    />
                )} 
            </div>
            {loading &&
                <div className="loader">Loading...</div>
            }
        </>
    )
}