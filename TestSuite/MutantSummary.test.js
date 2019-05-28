import React from 'react';
import { shallow, mount } from 'enzyme';

// Components
import MutantSummary from '../src/MutantSummary';


describe('MutantSummary Test Suite', () => {
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

    it('renders page correctly', () => {
        const wrapper = shallow(<MutantSummary {...props} />)
        expect(wrapper.exists()).toBe(true);
    });


});