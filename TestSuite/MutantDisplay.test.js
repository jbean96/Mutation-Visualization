import React from 'react';
import { shallow, mount } from 'enzyme';

// Components
import MutantDisplay from '../src/MutantDisplay';

describe('Mutant Display Test Suite', () => {
    const props = {
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
            },
            {
                mutated_lineno: 8,
                mutated_output: "\n\ndef sub5(x):\n    return x - 5\n\n\ndef double_me(x):\n    return x // 2\n\n\ndef triple_me(x):",
                productive: false,
                mutation_operator: "AOR",
                equivalent: false,
                mutated_output_lineno: 3,
                unmutated_output: "\n\ndef sub5(x):\n    return x - 5\n\n\ndef double_me(x):\n    return x * 2\n\n\ndef triple_me(x):",
                killers: [
                    [
                        "test_double_me (sample_test.MoreSampleTests)",
                        "Traceback (most recent call last):\n  File \"../../example/sample_test.py\", line 19, in test_double_me\n    self.assertEqual(20, sample.double_me(10))\nAssertionError: 20 != 5\n"
                    ]
                ],
                unmutated_output_lineno: 3,
                mutant_name: "mutant_AOR_BinOp_10",
                killed: true,
                mutated_ast_node: "BinOp"
            },
            {
                mutated_lineno: 8,
                mutated_output: "\n\ndef sub5(x):\n    return x - 5\n\n\ndef double_me(x):\n    return x / 2\n\n\ndef triple_me(x):",
                productive: false,
                mutation_operator: "AOR",
                equivalent: false,
                mutated_output_lineno: 3,
                unmutated_output: "\n\ndef sub5(x):\n    return x - 5\n\n\ndef double_me(x):\n    return x * 2\n\n\ndef triple_me(x):",
                killers: [
                    [
                        "test_double_me (sample_test.MoreSampleTests)",
                        "Traceback (most recent call last):\n  File \"../../example/sample_test.py\", line 19, in test_double_me\n    self.assertEqual(20, sample.double_me(10))\nAssertionError: 20 != 5\n"
                    ]
                ],
                unmutated_output_lineno: 3,
                mutant_name: "mutant_AOR_BinOp_11",
                killed: true,
                mutated_ast_node: "BinOp"
            },
            {
                mutated_lineno: 8,
                mutated_output: "\n\ndef sub5(x):\n    return x - 5\n\n\ndef double_me(x):\n    return x - 2\n\n\ndef triple_me(x):",
                productive: false,
                mutation_operator: "AOR",
                equivalent: false,
                mutated_output_lineno: 3,
                unmutated_output: "\n\ndef sub5(x):\n    return x - 5\n\n\ndef double_me(x):\n    return x * 2\n\n\ndef triple_me(x):",
                killers: [
                    [
                        "test_double_me (sample_test.MoreSampleTests)",
                        "Traceback (most recent call last):\n  File \"../../example/sample_test.py\", line 19, in test_double_me\n    self.assertEqual(20, sample.double_me(10))\nAssertionError: 20 != 8\n"
                    ]
                ],
                unmutated_output_lineno: 3,
                mutant_name: "mutant_AOR_BinOp_12",
                killed: true,
                mutated_ast_node: "BinOp"
            },
            {
                mutated_lineno: 8,
                mutated_output: "\n\ndef sub5(x):\n    return x - 5\n\n\ndef double_me(x):\n    return x + 2\n\n\ndef triple_me(x):",
                productive: false,
                mutation_operator: "AOR",
                equivalent: false,
                mutated_output_lineno: 3,
                unmutated_output: "\n\ndef sub5(x):\n    return x - 5\n\n\ndef double_me(x):\n    return x * 2\n\n\ndef triple_me(x):",
                killers: [
                    [
                        "test_double_me (sample_test.MoreSampleTests)",
                        "Traceback (most recent call last):\n  File \"../../example/sample_test.py\", line 19, in test_double_me\n    self.assertEqual(20, sample.double_me(10))\nAssertionError: 20 != 12\n"
                    ]
                ],
                unmutated_output_lineno: 3,
                mutant_name: "mutant_AOR_BinOp_13",
                killed: true,
                mutated_ast_node: "BinOp"
            },
            {
                mutated_lineno: 11,
                mutated_output: "    return x - 5\n\n\ndef double_me(x):\n    return x * 2\n\n\ndef triple_me(x):\n    return x // 3\n\n",
                productive: false,
                mutation_operator: "AOR",
                equivalent: false,
                mutated_output_lineno: 6,
                unmutated_output: "    return x - 5\n\n\ndef double_me(x):\n    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n",
                killers: [],
                unmutated_output_lineno: 6,
                mutant_name: "mutant_AOR_BinOp_14",
                killed: false,
                mutated_ast_node: "BinOp"
            },
            {
                mutated_lineno: 11,
                mutated_output: "    return x - 5\n\n\ndef double_me(x):\n    return x * 2\n\n\ndef triple_me(x):\n    return x / 3\n\n",
                productive: false,
                mutation_operator: "AOR",
                equivalent: false,
                mutated_output_lineno: 6,
                unmutated_output: "    return x - 5\n\n\ndef double_me(x):\n    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n",
                killers: [],
                unmutated_output_lineno: 6,
                mutant_name: "mutant_AOR_BinOp_15",
                killed: false,
                mutated_ast_node: "BinOp"
            },
            {
                mutated_lineno: 11,
                mutated_output: "    return x - 5\n\n\ndef double_me(x):\n    return x * 2\n\n\ndef triple_me(x):\n    return x - 3\n\n",
                productive: false,
                mutation_operator: "AOR",
                equivalent: false,
                mutated_output_lineno: 6,
                unmutated_output: "    return x - 5\n\n\ndef double_me(x):\n    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n",
                killers: [],
                unmutated_output_lineno: 6,
                mutant_name: "mutant_AOR_BinOp_16",
                killed: false,
                mutated_ast_node: "BinOp"
            },
            {
                mutated_lineno: 11,
                mutated_output: "    return x - 5\n\n\ndef double_me(x):\n    return x * 2\n\n\ndef triple_me(x):\n    return x + 3\n\n",
                productive: false,
                mutation_operator: "AOR",
                equivalent: false,
                mutated_output_lineno: 6,
                unmutated_output: "    return x - 5\n\n\ndef double_me(x):\n    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n",
                killers: [],
                unmutated_output_lineno: 6,
                mutant_name: "mutant_AOR_BinOp_17",
                killed: false,
                mutated_ast_node: "BinOp"
            },
            {
                mutated_lineno: 15,
                mutated_output: "    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 // 3\n    elif x < 10:",
                productive: false,
                mutation_operator: "AOR",
                equivalent: false,
                mutated_output_lineno: 10,
                unmutated_output: "    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3\n    elif x < 10:",
                killers: [],
                unmutated_output_lineno: 10,
                mutant_name: "mutant_AOR_BinOp_18",
                killed: false,
                mutated_ast_node: "BinOp"
            },
            {
                mutated_lineno: 15,
                mutated_output: "    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 / 3\n    elif x < 10:",
                productive: false,
                mutation_operator: "AOR",
                equivalent: false,
                mutated_output_lineno: 10,
                unmutated_output: "    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3\n    elif x < 10:",
                killers: [],
                unmutated_output_lineno: 10,
                mutant_name: "mutant_AOR_BinOp_19",
                killed: false,
                mutated_ast_node: "BinOp"
            },
            {
                mutated_lineno: 15,
                mutated_output: "    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 * 3\n    elif x < 10:",
                productive: false,
                mutation_operator: "AOR",
                equivalent: false,
                mutated_output_lineno: 10,
                unmutated_output: "    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3\n    elif x < 10:",
                killers: [],
                unmutated_output_lineno: 10,
                mutant_name: "mutant_AOR_BinOp_20",
                killed: false,
                mutated_ast_node: "BinOp"
            },
            {
                mutated_lineno: 15,
                mutated_output: "    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 - 3\n    elif x < 10:",
                productive: false,
                mutation_operator: "AOR",
                equivalent: false,
                mutated_output_lineno: 10,
                unmutated_output: "    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3\n    elif x < 10:",
                killers: [],
                unmutated_output_lineno: 10,
                mutant_name: "mutant_AOR_BinOp_21",
                killed: false,
                mutated_ast_node: "BinOp"
            },
            {
                mutated_lineno: 15,
                mutated_output: "    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x // 4 + 3\n    elif x < 10:",
                productive: false,
                mutation_operator: "AOR",
                equivalent: false,
                mutated_output_lineno: 10,
                unmutated_output: "    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3\n    elif x < 10:",
                killers: [],
                unmutated_output_lineno: 10,
                mutant_name: "mutant_AOR_BinOp_22",
                killed: false,
                mutated_ast_node: "BinOp"
            },
            {
                mutated_lineno: 15,
                mutated_output: "    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x * 4 + 3\n    elif x < 10:",
                productive: false,
                mutation_operator: "AOR",
                equivalent: false,
                mutated_output_lineno: 10,
                unmutated_output: "    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3\n    elif x < 10:",
                killers: [],
                unmutated_output_lineno: 10,
                mutant_name: "mutant_AOR_BinOp_23",
                killed: false,
                mutated_ast_node: "BinOp"
            },
            {
                mutated_lineno: 15,
                mutated_output: "    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x - 4 + 3\n    elif x < 10:",
                productive: false,
                mutation_operator: "AOR",
                equivalent: false,
                mutated_output_lineno: 10,
                unmutated_output: "    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3\n    elif x < 10:",
                killers: [],
                unmutated_output_lineno: 10,
                mutant_name: "mutant_AOR_BinOp_24",
                killed: false,
                mutated_ast_node: "BinOp"
            },
            {
                mutated_lineno: 15,
                mutated_output: "    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x + 4 + 3\n    elif x < 10:",
                productive: false,
                mutation_operator: "AOR",
                equivalent: false,
                mutated_output_lineno: 10,
                unmutated_output: "    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3\n    elif x < 10:",
                killers: [],
                unmutated_output_lineno: 10,
                mutant_name: "mutant_AOR_BinOp_25",
                killed: false,
                mutated_ast_node: "BinOp"
            },
            {
                mutated_lineno: 17,
                mutated_output: "\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3\n    elif x < 10:\n        return +x\n    return 4",
                productive: false,
                mutation_operator: "AOR",
                equivalent: false,
                mutated_output_lineno: 12,
                unmutated_output: "\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3\n    elif x < 10:\n        return -x\n    return 4",
                killers: [],
                unmutated_output_lineno: 12,
                mutant_name: "mutant_AOR_UnaryOp_26",
                killed: false,
                mutated_ast_node: "UnaryOp"
            },
            {
                mutated_lineno: 25,
                mutated_output: "    elif x < 10:\n        return -x\n    return 4\n\n\nclass SomeClass:\n\n    def __init__(self, a):\n        self.a = a\n\n    def negate(self):",
                productive: false,
                mutation_operator: "AOR",
                equivalent: false,
                mutated_output_lineno: 20,
                unmutated_output: "    elif x < 10:\n        return -x\n    return 4\n\n\nclass SomeClass:\n\n    def __init__(self, a):\n        self.a = a\n\n    def negate(self):",
                killers: [],
                unmutated_output_lineno: 20,
                mutant_name: "mutant_AOR_UnaryOp_27",
                killed: false,
                mutated_ast_node: "UnaryOp"
            },
            {
                mutated_lineno: 14,
                mutated_output: "def double_me(x):\n    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3",
                productive: false,
                mutation_operator: "COR",
                equivalent: false,
                mutated_output_lineno: 9,
                unmutated_output: "def double_me(x):\n    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3",
                killers: [],
                unmutated_output_lineno: 9,
                mutant_name: "mutant_COR_Lt_28",
                killed: false,
                mutated_ast_node: "Lt"
            },
            {
                mutated_lineno: 14,
                mutated_output: "def double_me(x):\n    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3",
                productive: false,
                mutation_operator: "COR",
                equivalent: false,
                mutated_output_lineno: 9,
                unmutated_output: "def double_me(x):\n    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3",
                killers: [],
                unmutated_output_lineno: 9,
                mutant_name: "mutant_COR_Lt_29",
                killed: false,
                mutated_ast_node: "Lt"
            },
            {
                mutated_lineno: 14,
                mutated_output: "def double_me(x):\n    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3",
                productive: false,
                mutation_operator: "COR",
                equivalent: false,
                mutated_output_lineno: 9,
                unmutated_output: "def double_me(x):\n    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3",
                killers: [],
                unmutated_output_lineno: 9,
                mutant_name: "mutant_COR_Lt_30",
                killed: false,
                mutated_ast_node: "Lt"
            },
            {
                mutated_lineno: 14,
                mutated_output: "def double_me(x):\n    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3",
                productive: false,
                mutation_operator: "COR",
                equivalent: false,
                mutated_output_lineno: 9,
                unmutated_output: "def double_me(x):\n    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3",
                killers: [],
                unmutated_output_lineno: 9,
                mutant_name: "mutant_COR_Lt_31",
                killed: false,
                mutated_ast_node: "Lt"
            },
            {
                mutated_lineno: 14,
                mutated_output: "def double_me(x):\n    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3",
                productive: false,
                mutation_operator: "COR",
                equivalent: false,
                mutated_output_lineno: 9,
                unmutated_output: "def double_me(x):\n    return x * 2\n\n\ndef triple_me(x):\n    return x * 3\n\n\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3",
                killers: [],
                unmutated_output_lineno: 9,
                mutant_name: "mutant_COR_Lt_32",
                killed: false,
                mutated_ast_node: "Lt"
            },
            {
                mutated_lineno: 21,
                mutated_output: "\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3\n    elif x < 10:\n        return -x\n    return 4\n\n\nclass SomeClass:\n",
                productive: false,
                mutation_operator: "SMD",
                equivalent: false,
                mutated_output_lineno: 16,
                unmutated_output: "\ndef weird_boolean(b, x):\n    if b:\n        return x / 4 + 3\n    elif x < 10:\n        return -x\n    return 4\n\n\nclass SomeClass:\n",
                killers: [],
                unmutated_output_lineno: 16,
                mutant_name: "mutant_SMD_Assign_33",
                killed: false,
                mutated_ast_node: "Assign"
            },
            {
                mutated_lineno: 24,
                mutated_output: "        return x / 4 + 3\n    elif x < 10:\n        return -x\n    return 4\n\n\nclass SomeClass:\n\n    def __init__(self, a):\n        self.a = a\n",
                productive: false,
                mutation_operator: "SMD",
                equivalent: false,
                mutated_output_lineno: 19,
                unmutated_output: "        return x / 4 + 3\n    elif x < 10:\n        return -x\n    return 4\n\n\nclass SomeClass:\n\n    def __init__(self, a):\n        self.a = a\n",
                killers: [],
                unmutated_output_lineno: 19,
                mutant_name: "mutant_SMD_Assign_34",
                killed: false,
                mutated_ast_node: "Assign"
            }
        ]
    }
    const wrapper = shallow(<MutantDisplay {...props} />);
    const mountWrapper = mount(<MutantDisplay {...props} />);

    it('Component renders without crashing', () => {
        expect(wrapper.exists()).toBe(true);
        expect(mountWrapper.exists()).toBe(true);
    });

    it('All elements rendered correctly', () => {
        expect(wrapper.find('button')).toHaveLength(1);
        expect(wrapper.find('MutantTable')).toHaveLength(1);
        expect(wrapper.find('div')).toHaveLength(2);
    });

});