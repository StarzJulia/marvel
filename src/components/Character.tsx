import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {CaracterCardInterface} from '../interfaces/interfaces';
import SliderContainer from './slider/SliderContainer';
import {getImagePath} from '../scripts/common';
import {createSearchPath, createUrl} from '../scripts/common';

export default function Character() {
    const {characterId} = useParams();
    let [character, setCharacter] = useState<CaracterCardInterface>();
    let [appearances, setAppearances] = useState({
        comics: [],
        events: [],
        series: [],
        stories: []
    });
    let [error, setError] = useState('');

    const fetchCharacter = async () => {
        const search = createSearchPath();
        const url = createUrl(characterId);

        const response = await fetch(`${url}${search}`);
        const json = await response.json();
        
        if (json.code != 200) {
            setError(json.status || json.message);
        } else {
            const {
                comics: {items: comicsItems}, 
                events: {items: eventsItems}, 
                series: {items: seriesItems}, 
                stories: {items: storiesItems}, 
                ...data
            } = json.data.results[0];

            setCharacter(data);
            setAppearances({
                comics: comicsItems,
                events: eventsItems,
                series: seriesItems,
                stories: storiesItems
            });
        }
    }

    useEffect(() => {
        fetchCharacter();
    }, []);

    return (
        <>
            {error &&
                <p>{error}</p>
            }
            {character &&
                <>
                    <h1 className="character_name">{character.name}</h1>
                    <div className="character_info-container">
                        <div className="character_image">
                            <div className="character_image-wrapper">
                                <figure>
                                    <img src={getImagePath(character.thumbnail)} />
                                </figure>
                            </div>
                        </div>
                        {character.description &&
                            <div className="character_info">
                                <p>{character.description}</p>
                            </div>
                        }
                    </div>
                    {appearances.comics.length > 0 &&
                        <SliderContainer header="Comics" items={appearances.comics} />
                    }
                    {appearances.events.length > 0 &&
                        <SliderContainer header="Events" items={appearances.events} />
                    }
                    {appearances.stories.length > 0 &&
                        <SliderContainer header="Stories" items={appearances.stories} />
                    }
                    {appearances.series.length > 0 &&
                        <SliderContainer header="Series" items={appearances.series} />
                    }
                </>
            }
        </>
    )
}