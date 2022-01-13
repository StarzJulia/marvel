import React, {useState, useEffect} from 'react';
import {CharacterAppearance} from '../../interfaces/interfaces';
import {getImagePath} from '../../scripts/common';
import {hashLink} from '../../api.config';

export default function SliderItem(item: CharacterAppearance) {
    let [image, setImage] = useState('');
    let [error, setError] = useState('');
    let {name, resourceURI} = item;

    const fetchCharacter = () => {
        //console.info('FETCH');
        fetch(`${resourceURI}?${hashLink}`)
            .then((res) => res.json())
            .then((res) => {
                let thumbnail;

                if (res.code == 200) {
                    thumbnail = res.data.results[0].thumbnail;
                } else {
                    setError(res.status);        
                }

                let imageThumb = getImagePath(thumbnail, 'standard_fantastic');
                setImage(imageThumb);
                localStorage.setItem(resourceURI, imageThumb);
            })
            .catch((err) => {
                setError(err);
            });
    }

    useEffect(() => {
        if (localStorage.getItem(resourceURI)) {
            setImage(localStorage.getItem(resourceURI));
        } else {
            fetchCharacter();
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