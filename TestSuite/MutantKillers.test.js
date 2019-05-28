import React from 'react';
import { shallow, mount } from 'enzyme';

import renderer from 'react-test-renderer';
// Components
import MutantKillers from '../src/MutantKillers';
import { wrap } from 'module';


describe('MutantKillers Test Suite', () => {
    const props = {
        killers: [
            [
                "test_add_10_2 (sample_test.SampleTest)",
                "Traceback (most recent call last):\n  File \"../../example/sample_test.py\", line 9, in test_add_10_2\n    self.assertEqual(11, sample.add10(1))\nAssertionError: 11 != 10\n"
            ],
            [
                "test_add_10 (sample_test.SampleTest)",
                "Traceback (most recent call last):\n  File \"../../example/sample_test.py\", line 6, in test_add_10\n    self.assertEqual(20, sample.add10(10))\nAssertionError: 20 != 100\n"
            ]
        ]
    }
    const wrapper = shallow(<MutantKillers {...props} />);
    const mountWrapper = mount(<MutantKillers {...props} />);

    it('Matches snapshot', () => {
        const tree = renderer.create(<MutantKillers {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Component renders without crashing providing proper JSON', () => {
        expect(wrapper.exists()).toBe(true);
        expect(mountWrapper.exists()).toBe(true);
    });

    it('Displays killed tests correctly', () => {
        expect(wrapper.find('li')).toHaveLength(4);
        expect(wrapper.find('strong')).toHaveLength(2);
        expect(wrapper.find('ul')).toHaveLength(3);
        expect(wrapper.find('h4')).toHaveLength(1);
    });

    it('Returns null if no killers', () => {
        const emptyProps = {
            killers: []
        }
        let result = MutantKillers(emptyProps)
        expect(result).toBe(null);
    });

});