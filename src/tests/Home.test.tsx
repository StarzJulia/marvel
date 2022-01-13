import React from 'react';
import {render, screen, act} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom"
import Home from '../components/Home';

import fakeCharacters from './characters.json';

global.fetch = jest.fn(() => 
    Promise.resolve({
        json: () => Promise.resolve(fakeCharacters)
    })
) as jest.Mock;

describe('Home page', () => {

    it("should render list of characters", async () => {
        // @ts-ignore`
        await act(async () => render(<MemoryRouter><Home /></MemoryRouter>));
        expect(screen.getAllByRole('link').length).toBe(3);
    });
});