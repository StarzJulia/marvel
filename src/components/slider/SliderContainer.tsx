import React from 'react';
import SliderItem from './SliderItem';
import {CharacterAppearance} from '../../interfaces/interfaces';
import Carousel from 'react-multi-carousel';

interface SliderInterface {
    header: string;
    items: CharacterAppearance[];
}

export default function SliderContainer(props: SliderInterface) {
    let {header, items} = props;

    const settings = {
        arrows: false,
        infinite: true,
        responsive: {
            desktop: {
                breakpoint: { max: 10000, min: 1200 },
                items: 5
            },
            tablet_large: {
                breakpoint: { max: 1200, min: 960 },
                items: 4
            },
            tablet: {
                breakpoint: { max: 960, min: 550 },
                items: 3
            },
            mobile: {
                breakpoint: { max: 550, min: 0 },
                items: 2
            }
        }
    };

    return (
        <div className="character-appearance">
            <h2 className="character-appearance_header">{header}</h2>
            <div className="react-multi-carousel">
                <Carousel {...settings}>
                    {Object.values(items).map((item, index) => 
                        <SliderItem key={index} {...item} />
                    )}
                </Carousel>
            </div>
        </div>
    )
}