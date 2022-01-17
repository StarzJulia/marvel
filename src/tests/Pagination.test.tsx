import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Pagination from '../components/filter/Pagination';
import {getPagesCount, getCurrentPage} from '../scripts/pagination';
import {FilterContext} from '../context/filterContext';

configure({ adapter: new Adapter() });

const initialProps = {
    total: 100,
    limit: 20,
    count: 20,
    offset: 40,
    change: jest.fn()
}

describe('Pagination', () => {
    const Component = () => (
        <FilterContext.Provider value={initialProps}>
            <Pagination />
        </FilterContext.Provider>
    );
    const element = mount(<Component />);

    it('should match the snapshot', () => {
        expect(element.html()).toMatchSnapshot();
    });

    it("number of pages should be 5", async () => {
        expect(getPagesCount(initialProps.total, initialProps.limit)).toBe(5);
    });

    it("current page should be 3", async () => {
        expect(getCurrentPage(initialProps.offset, initialProps.count, initialProps.limit)).toBe(3);
    });

    it('should render an pagination item', () => {
        expect(element.find('.filter_pagination-page').exists()).toBe(true);
    });

    it('on click, sendPaginationRequest function should be triggered on click event', () => {
        element.find('.filter_pagination-page').first().simulate('click');
        expect(initialProps.change).toHaveBeenCalled();
    });
});