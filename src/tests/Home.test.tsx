import React from 'react';
import {render, screen, act} from '@testing-library/react';
import {CaracterCardInterface} from '../interfaces/interfaces';
import Home from '../components/Home';

import fakeCharacters from './characters.json';

global.fetch = jest.fn(() => 
    Promise.resolve({
        json: () => Promise.resolve(fakeCharacters)
    })
) as jest.Mock;

jest.mock("../components/filter/Filter", () => () => (
    <div>Filter</div>
));

jest.mock("../components/CharacterCard", () => (character: CaracterCardInterface) => (
    <div role="character">{character.name}</div>
));

describe('Home page', () => {
    it("number of characters should be 3", async () => {
        // @ts-ignore`
        await act(async () => render(<Home />));
        expect(screen.getAllByRole('character').length).toBe(3);
    });
});