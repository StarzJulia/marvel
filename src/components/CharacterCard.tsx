import React from 'react';
import {Link} from "react-router-dom";
import {CaracterCardInterface} from '../interfaces/interfaces';
import {getImagePath} from '../scripts/common';

export default function CharacterCard(character: CaracterCardInterface) {
    let {name, realName, thumbnail, id} = character;

    const createLink = (): string => {
        return String(id);
    }

    return (
        <div className="character-card">
            <Link to={createLink()}>
                <div className="character-card_image">
                    <figure className="character-card_image-wrapper">
                        <img src={getImagePath(thumbnail, 'standard_fantastic')} />
                    </figure>
                </div>
                <p className="character-card_name">
                    {name}
                </p>
                {realName &&
                    <p className="character-card_real-name">
                        {realName}
                    </p>
                }
            </Link>
        </div>
    )
}