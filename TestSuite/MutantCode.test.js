import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
// Components
import MutantCode from '../src/MutantCode';


describe('MutantCode Test Suite', () => {
    const props = {
        mutant: {
            mutated_lineno: 17,
            mutated_output: "\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3\n    elif x < 10:\n        return x\n    return 4",
            productive: false,
            mutation_operator: "AOD",
            equivalent: false,
            mutated_output_lineno: 12,
            unmutated_output: "\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3\n    elif x < 10:\n        return -x\n    return 4",
            killers: [],
            unmutated_output_lineno: 12,
            mutant_name: "mutant_AOD_UnaryOp_0",
            killed: false,
            mutated_ast_node: "UnaryOp"
        }
    }
    const wrapper = shallow(<MutantCode {...props} />);
    const mountWrapper = mount(<MutantCode {...props} />);

    it('Matches snapshot', () => {
        const tree = renderer.create(<MutantCode {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Component renders without crashing providing proper JSON', () => {
        expect(wrapper.exists()).toBe(true);
        expect(mountWrapper.exists()).toBe(true);
        expect(wrapper.find('div')).toHaveLength(5)
    });

    it('Panels for original and mutant code rendered correctly', () => {
        expect(wrapper.find('.panel')).toHaveLength(2);
        expect(wrapper.find('h3')).toHaveLength(2);
        expect(wrapper.find('SyntaxHighlighter')).toHaveLength(2);
    });

});