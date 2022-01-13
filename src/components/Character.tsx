import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {CaracterCardInterface} from '../interfaces/interfaces';
import SliderContainer from './slider/SliderContainer';
import {getImagePath} from '../scripts/common';
import {hashLink} from '../api.config';

export default function Character() {
    const {characterId} = useParams();
    let [character, setCharacter] = useState<CaracterCardInterface>();
    let [comics, setComics] = useState([]);
    let [events, setEvents] = useState([]);
    let [series, setSeries] = useState([]);
    let [stories, setStories] = useState([]);
    let [error, setError] = useState('');

    const fetchCharacter = () => {
        fetch(`https://gateway.marvel.com/v1/public/characters/${characterId}?${hashLink}`)
            .then((res) => res.json())
            .then((res) => {
                if (res.code == 200) {
                    const {
                        comics: {items: comicsItems}, 
                        events: {items: eventsItems}, 
                        series: {items: seriesItems}, 
                        stories: {items: storiesItems}, 
                        ...data
                    } = res.data.results[0];

                    setCharacter(data);
                    setComics(comicsItems);
                    setEvents(eventsItems);
                    setSeries(seriesItems);
                    setStories(storiesItems);
                } else {
                    setError(res.status || res.message);
                }
            })
            .catch((err) => {
                setError(err);
            });
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
                    {comics.length > 0 &&
                        <SliderContainer header="Comics" items={comics} />
                    }
                    {events.length > 0 &&
                        <SliderContainer header="Events" items={events} />
                    }
                    {stories.length > 0 &&
                        <SliderContainer header="Stories" items={stories} />
                    }
                    {series.length > 0 &&
                        <SliderContainer header="Series" items={series} />
                    }
                </>
            }
        </>
    )
}