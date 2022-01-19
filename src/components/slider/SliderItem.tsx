import React, {useState, useEffect} from 'react';
import {CharacterAppearance} from '../../interfaces/interfaces';
import {getImagePath} from '../../scripts/common';
import {createSearchPath} from '../../scripts/common';

export default function SliderItem(item: CharacterAppearance) {
    let [image, setImage] = useState('');
    let [error, setError] = useState('');
    let {name, resourceURI} = item;

    const fetchCharacter = async (url: string) => {
        let thumbnail;
        const search = createSearchPath();

        const response = await fetch(`${url}${search}`);
        const json = await response.json();
        
        if (json.code != 200) {
            setError(json.message || json.status);
        } else {
            thumbnail = json.data.results[0].thumbnail;
        }

        let imageThumb = getImagePath(thumbnail, 'standard_fantastic');
        setImage(imageThumb);
        localStorage.setItem(url, imageThumb);
    }

    useEffect(() => {
        const url = resourceURI.replace(/http[s]?:\/\/gateway.marvel.com/, '');
        if (localStorage.getItem(url)) {
            setImage(localStorage.getItem(url));
        } else {
            fetchCharacter(url);
        }
    }, []);

    return (
        <>
            {!error &&
                <div className="character-appearance-item">
                    <div className="character-appearance-item_header-content">
                        {image &&
                            <img src={image} />
                        }
                        <div className="character-appearance-item_header-content_back">
                            <p className="character-appearance-item_header">
                                {name}
                            </p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}