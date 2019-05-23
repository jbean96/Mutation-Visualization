import React from 'react';
import { shallow, mount } from 'enzyme';

// Components
import Info from '../src/Info';


describe('Info Test Suite', () => {

    const wrapper = shallow(<Info />);
    const mountWrapper = mount(<Info />);

    it('Component renders without crashing', () => {
        expect(wrapper.exists()).toBe(true);
        expect(mountWrapper.exists()).toBe(true);
    });

    it('All elements rendered correctly', () => {
        expect(wrapper.find('div')).toHaveLength(3);
        expect(wrapper.find('p')).toHaveLength(2);
        expect(wrapper.find('#code')).toHaveLength(1);
        expect(wrapper.find('#text')).toHaveLength(1);
        expect(wrapper.find('pre')).toHaveLength(1);
        expect(wrapper.find('code')).toHaveLength(1);
        expect(wrapper.find('h2')).toHaveLength(2);
        expect(wrapper.find('br')).toHaveLength(1);
    });

});