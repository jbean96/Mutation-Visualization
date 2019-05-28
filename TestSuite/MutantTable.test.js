import React from 'react';
import { shallow, mount } from 'enzyme';

// Components
import MutantTable from '../src/MutantTable';


describe('MutantTable Test Suite', () => {
    const props = {
        mutants: [
            {
                productive: false,
                mutation_operator: "AOD",
                equivalent: false,
                mutant_name: "mutant_AOD_UnaryOp_0",
                killed: false
            },
            {
                productive: false,
                mutation_operator: "AOD",
                equivalent: false,
                mutant_name: "mutant_AOD_UnaryOp_1",
                killed: false
            },
            {
                productive: false,
                mutation_operator: "AOR",
                equivalent: false,
                mutant_name: "mutant_AOR_BinOp_2",
                killed: true
            },
            {
                productive: false,
                mutation_operator: "AOR",
                equivalent: false,
                mutant_name: "mutant_AOR_BinOp_3",
                killed: true
            },
            {
                productive: false,
                mutation_operator: "AOR",
                equivalent: false,
                mutant_name: "mutant_AOR_BinOp_4",
                killed: true
            }
        ]
    }
    const wrapper = shallow(<MutantTable {...props} />);
    const mountWrapper = mount(<MutantTable {...props} />);

    it('Matches snapshot', () => {
        expect(wrapper.debug()).toMatchSnapshot();
        expect(mountWrapper.debug()).toMatchSnapshot();
    });

    it('Component renders without crashing providing proper JSON', () => {
        expect(wrapper.exists()).toBe(true);
        expect(mountWrapper.exists()).toBe(true);
    });

    it('Displays table of mutants correctly', () => {
        expect(wrapper.find('div')).toHaveLength(1);
        expect(wrapper.find('WithStyles(Component)')).toHaveLength(1);
    });

    it('Returns null if no mutants', () => {
        const emptyProps = {
            mutants: []
        };
        expect(MutantTable(emptyProps)).toBe(null);
    });

});