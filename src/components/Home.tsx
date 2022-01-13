import React, {useEffect, useState} from 'react';
import Filter from './filter/Filter';
import CharacterCard from './CharacterCard';
import {hashLink} from '../api.config';

export default function Home() {
    const LIMIT_NUMBER = 15;
    let [characters, setCharacters] = useState([]);
    let [hash, setHash] = useState<{[key: string]: string | number}>({limit: LIMIT_NUMBER});
    let [loading, setLoader] = useState(true);
    let [error, setError] = useState('');
    let [offsetCounter, setOffset] = useState(0);
    let [totalCounter, setTotal] = useState(0);
    let [countCounter, setCount] = useState(0);
    let [limitCounter, setLimit] = useState(LIMIT_NUMBER);

    const fetchCharacters = () => {
        let url = `https://gateway.marvel.com/v1/public/characters`;
        url += `?${hashLink}`;
        
        if (hash) {
            for (let p in hash) {
                if (hash[p] !== '') {
                    url += `&${p}=${hash[p]}`
                }
            } 
        }

        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(res => {
                if (res.code == 200) {
                    let {results, count, total, offset, limit} = res.data; 
                    setTotal(total);
                    setCount(count);
                    setOffset(offset);
                    setLimit(limit);
                    setCharacters(results);
                } else {
                    setError(res.message);
                }
            })
            .then(() => {
                setLoader(false);
            });
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
            <Filter 
                change={filterCharacters} 
                total={totalCounter} 
                count={countCounter} 
                offset={offsetCounter}
                limit={limitCounter}
            />
            <div className="character-cards">
                {characters && characters.map((character, index) => 
                    <CharacterCard 
                        key={index}
                        {...character}
                    />
                )} 
            </div>
            {error &&
                <div className="error">{error}</div>
            }
            {loading &&
                <div className="loader">Loading...</div>
            }
        </>
    )
}