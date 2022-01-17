import {createContext} from "react";
import {FilterContentInterface} from '../interfaces/interfaces';

export const FilterContext = createContext<FilterContentInterface>({
    total: 0,
    count: 0,
    offset: 0,
    limit: 0,
    change: () => {}
});
