import React from 'react';
import { shallow, mount } from 'enzyme';

// Components
import MutantDisplay from '../src/MutantDisplay';
import { exportAllDeclaration } from '@babel/types';

const bigProps = {
    mutants: [
        {
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
        },
        {
            mutated_lineno: 25,
            mutated_output: "    elif x < 10:\n        return -x\n    return 4\n\n\nclass SomeClass:\n\n    def __init__(self, a):\n        self.a = a\n\n    def negate(self):",
            productive: false,
            mutation_operator: "AOD",
            equivalent: false,
            mutated_output_lineno: 20,
            unmutated_output: "    elif x < 10:\n        return -x\n    return 4\n\n\nclass SomeClass:\n\n    def __init__(self, a):\n        self.a = a\n\n    def negate(self):",
            killers: [],
            unmutated_output_lineno: 20,
            mutant_name: "mutant_AOD_UnaryOp_1",
            killed: false,
            mutated_ast_node: "UnaryOp"
        },
        {
            mutated_lineno: 2,
            mutated_output: "def add10(x):\n    return x // 10\n\n\ndef sub5(x):\n    return x - 5\n",
            productive: false,
            mutation_operator: "AOR",
            equivalent: false,
            mutated_output_lineno: 1,
            unmutated_output: "def add10(x):\n    return x + 10\n\n\ndef sub5(x):\n    return x - 5\n",
            killers: [
                [
                    "test_add_10_2 (sample_test.SampleTest)",
                    "Traceback (most recent call last):\n  File \"../../example/sample_test.py\", line 9, in test_add_10_2\n    self.assertEqual(11, sample.add10(1))\nAssertionError: 11 != 0\n"
                ],
                [
                    "test_add_10 (sample_test.SampleTest)",
                    "Traceback (most recent call last):\n  File \"../../example/sample_test.py\", line 6, in test_add_10\n    self.assertEqual(20, sample.add10(10))\nAssertionError: 20 != 1\n"
                ]
            ],
            unmutated_output_lineno: 1,
            mutant_name: "mutant_AOR_BinOp_2",
            killed: true,
            mutated_ast_node: "BinOp"
        },
        {
            mutated_lineno: 2,
            mutated_output: "def add10(x):\n    return x / 10\n\n\ndef sub5(x):\n    return x - 5\n",
            productive: false,
            mutation_operator: "AOR",
            equivalent: false,
            mutated_output_lineno: 1,
            unmutated_output: "def add10(x):\n    return x + 10\n\n\ndef sub5(x):\n    return x - 5\n",
            killers: [
                [
                    "test_add_10_2 (sample_test.SampleTest)",
                    "Traceback (most recent call last):\n  File \"../../example/sample_test.py\", line 9, in test_add_10_2\n    self.assertEqual(11, sample.add10(1))\nAssertionError: 11 != 0\n"
                ],
                [
                    "test_add_10 (sample_test.SampleTest)",
                    "Traceback (most recent call last):\n  File \"../../example/sample_test.py\", line 6, in test_add_10\n    self.assertEqual(20, sample.add10(10))\nAssertionError: 20 != 1\n"
                ]
            ],
            unmutated_output_lineno: 1,
            mutant_name: "mutant_AOR_BinOp_3",
            killed: true,
            mutated_ast_node: "BinOp"
        },
        {
            mutated_lineno: 2,
            mutated_output: "def add10(x):\n    return x * 10\n\n\ndef sub5(x):\n    return x - 5\n",
            productive: false,
            mutation_operator: "AOR",
            equivalent: false,
            mutated_output_lineno: 1,
            unmutated_output: "def add10(x):\n    return x + 10\n\n\ndef sub5(x):\n    return x - 5\n",
            killers: [
                [
                    "test_add_10_2 (sample_test.SampleTest)",
                    "Traceback (most recent call last):\n  File \"../../example/sample_test.py\", line 9, in test_add_10_2\n    self.assertEqual(11, sample.add10(1))\nAssertionError: 11 != 10\n"
                ],
                [
                    "test_add_10 (sample_test.SampleTest)",
                    "Traceback (most recent call last):\n  File \"../../example/sample_test.py\", line 6, in test_add_10\n    self.assertEqual(20, sample.add10(10))\nAssertionError: 20 != 100\n"
                ]
            ],
            unmutated_output_lineno: 1,
            mutant_name: "mutant_AOR_BinOp_4",
            killed: true,
            mutated_ast_node: "BinOp"
        },
        {
            mutated_lineno: 2,
            mutated_output: "def add10(x):\n    return x - 10\n\n\ndef sub5(x):\n    return x - 5\n",
            productive: false,
            mutation_operator: "AOR",
            equivalent: false,
            mutated_output_lineno: 1,
            unmutated_output: "def add10(x):\n    return x + 10\n\n\ndef sub5(x):\n    return x - 5\n",
            killers: [
                [
                    "test_add_10_2 (sample_test.SampleTest)",
                    "Traceback (most recent call last):\n  File \"../../example/sample_test.py\", line 9, in test_add_10_2\n    self.assertEqual(11, sample.add10(1))\nAssertionError: 11 != -9\n"
                ],
                [
                    "test_add_10 (sample_test.SampleTest)",
                    "Traceback (most recent call last):\n  File \"../../example/sample_test.py\", line 6, in test_add_10\n    self.assertEqual(20, sample.add10(10))\nAssertionError: 20 != 0\n"
                ]
            ],
            unmutated_output_lineno: 1,
            mutant_name: "mutant_AOR_BinOp_5",
            killed: true,
            mutated_ast_node: "BinOp"
        },
        {
            mutated_lineno: 5,
            mutated_output: "def add10(x):\n    return x + 10\n\n\ndef sub5(x):\n    return x // 5\n\n\ndef double_me(x):\n    return x * 2",
            productive: false,
            mutation_operator: "AOR",
            equivalent: false,
            mutated_output_lineno: 1,
            unmutated_output: "def add10(x):\n    return x + 10\n\n\ndef sub5(x):\n    return x - 5\n\n\ndef double_me(x):\n    return x * 2",
            killers: [],
            unmutated_output_lineno: 1,
            mutant_name: "mutant_AOR_BinOp_6",
            killed: false,
            mutated_ast_node: "BinOp"
        },
        {
            mutated_lineno: 5,
            mutated_output: "def add10(x):\n    return x + 10\n\n\ndef sub5(x):\n    return x / 5\n\n\ndef double_me(x):\n    return x * 2",
            productive: false,
            mutation_operator: "AOR",
            equivalent: false,
            mutated_output_lineno: 1,
            unmutated_output: "def add10(x):\n    return x + 10\n\n\ndef sub5(x):\n    return x - 5\n\n\ndef double_me(x):\n    return x * 2",
            killers: [],
            unmutated_output_lineno: 1,
            mutant_name: "mutant_AOR_BinOp_7",
            killed: false,
            mutated_ast_node: "BinOp"
        },
        {
            mutated_lineno: 5,
            mutated_output: "def add10(x):\n    return x + 10\n\n\ndef sub5(x):\n    return x * 5\n\n\ndef double_me(x):\n    return x * 2",
            productive: false,
            mutation_operator: "AOR",
            equivalent: false,
            mutated_output_lineno: 1,
            unmutated_output: "def add10(x):\n    return x + 10\n\n\ndef sub5(x):\n    return x - 5\n\n\ndef double_me(x):\n    return x * 2",
            killers: [
                [
                    "test_sub_5 (sample_test.SampleTest)",
                    "Traceback (most recent call last):\n  File \"../../example/sample_test.py\", line 12, in test_sub_5\n    self.assertEqual(1, sample.sub5(6))\nAssertionError: 1 != 30\n"
                ]
            ],
            unmutated_output_lineno: 1,
            mutant_name: "mutant_AOR_BinOp_8",
            killed: true,
            mutated_ast_node: "BinOp"
        },
        {
            mutated_lineno: 5,
            mutated_output: "def add10(x):\n    return x + 10\n\n\ndef sub5(x):\n    return x + 5\n\n\ndef double_me(x):\n    return x * 2",
            productive: false,
            mutation_operator: "AOR",
            equivalent: false,
            mutated_output_lineno: 1,
            unmutated_output: "def add10(x):\n    return x + 10\n\n\ndef sub5(x):\n    return x - 5\n\n\ndef double_me(x):\n    return x * 2",
            killers: [
                [
                    "test_sub_5 (sample_test.SampleTest)",
                    "Traceback (most recent call last):\n  File \"../../example/sample_test.py\", line 12, in test_sub_5\n    self.assertEqual(1, sample.sub5(6))\nAssertionError: 1 != 11\n"
                ]
            ],
            unmutated_output_lineno: 1,
            mutant_name: "mutant_AOR_BinOp_9",
            killed: true,
            mutated_ast_node: "BinOp"
        }
    ]
}

function createNewDisplay(props) {
    let result = new MutantDisplay(props);
    result.setState = function (s) {
        result.state = s;
    }
    return result;
}

describe('MutantDisplay functions tests', () => {


    it('currentMutant set to null at initialization', () => {
        let result = createNewDisplay(bigProps);
        expect(result.state.currentMutant).toBe(null);

    });

    it('returnToTable calls setState with currentMutant to null', () => {
        let result = createNewDisplay(bigProps);
        result.setState({ currentMutant: 3 });
        expect(result.state.currentMutant).toBe(3);
        result.returnToTable()
        expect(result.state.currentMutant).toBe(null);
    });

    it('mutantClickHandler calls setState with currentMutant set to the arg passed in', () => {
        let result = createNewDisplay(bigProps);
        expect(result.state.currentMutant).toBe(null);
        result.mutantClickHandler(3);
        expect(result.state.currentMutant).toBe(3);
    });

    it('updateMutantHandler calls the updateMutantHandler in the props', () => {
        let called = 0;
        let result = createNewDisplay(bigProps);
        result.props.updateMutantHandler = function (a, b) {
            called = called + 1;
        }
        result.updateMutantHandler(3);
        expect(called).toBe(1);
    });

});

describe('MutantDisplay render tests', () => {
    it('Correctly renders when no currentMutant is assigned', () => {
        let result = createNewDisplay(bigProps);
        let page = result.render();
        expect(page.type).toBe('div');
        expect(page.props.children[0].props.id).toBe('save-file');
        expect(page.props.children[1].props.id).toBe('summary');
        expect(page.props.children[2].props.mutants.length).toBe(10);
    });

    it('Correctly renders when currentMutant is assigned', () => {
        let result = createNewDisplay(bigProps);
        result.setState({ currentMutant: 3 });
        let page = result.render();

        // Rendering correct elements
        expect(page.type).toBe('div');
        expect(page.props.children[0].type.displayName).toBe('pure(KeyboardBackspaceIcon)');
        expect(page.props.children[1].type).toBe('br');
        expect(page.props.children[2].type).toBe('h3');
        expect(page.props.children[4].type).toBeDefined()
        expect(page.props.children[5].props.killers.length).toBe(2);
        expect(page.props.children.length).toBe(6);

        // Matches expect current mutant
        expect(page.props.children[3].props.mutant).toBe(bigProps.mutants[3]);
    });

    it('Returns null if mutants length is 0 and no current mutant', () => {
        const emptyProps = { mutants: [] };
        let result = createNewDisplay(emptyProps);
        expect(result.render()).toBe(null);
    });
});