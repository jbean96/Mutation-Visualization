import React from 'react';
import { shallow, mount } from 'enzyme';

// Components
import UploadFile from '../src/UploadFile';
import { isTSAnyKeyword, exportAllDeclaration } from '@babel/types';


describe('handleUpload() tests', () => {
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
    const wrapper = shallow(<UploadFile {...props} />);
    const mountWrapper = mount(<UploadFile {...props} />);


    it('handleUpload logs error when files length == 0', () => {

        let count = 0
        const ev = {
            preventDefault: function () {
                count = count + 1
            }
        };
        const fileInpt = {
            files: []
        }
        let error = 0;
        const props = {
            logError: function (s) {
                error = error + 1
            }
        };
        let uf = new UploadFile(props)

        let readCalled = 0;
        uf.fileReader = {
            readAsText: function (s) {
                readCalled = readCalled + 1
            }
        }
        uf.setFileInput(fileInpt);
        uf.handleUpload(ev);
        expect(count).toBe(1);
        expect(error).toBe(1);
        expect(readCalled).toBe(0);
    });

    it('readAsText method called when files length > 0', () => {
        let error = 0;
        const props = {
            logError: function (s) {
                error = error + 1
            }
        };
        let count = 0;
        const ev = {
            preventDefault: function () {
                count = count + 1
            }
        };
        let uf = new UploadFile(props)
        let returnedVal = "";
        uf.fileReader = {
            readAsText: function (s) {
                returnedVal = s;
            }
        }
        const fileInpt = {
            files: ['a', 'b']
        }

        uf.setFileInput(fileInpt);
        uf.handleUpload(ev);

        expect(returnedVal).toBe('a'); // read is called
        expect(count).toBe(1); // prevent default is called
        expect(error).toBe(0); // log error not called
    });

});

describe("handFileRead() tests", () => {
    it("Logs error when filereader.result is set to bad JSON", () => {
        let error = 0;
        const props = {
            logError: function (s) {
                error = error + 1
            }
        };
        let uf = new UploadFile(props);
        uf.fileReader = {
            result: "bad JSON"
        };
        uf.handleFileRead();
        expect(error).toBe(1);
    });

    it("Logs error when filereader.result is not set to an array", () => {
        let error = 0;
        let returnVal = "";
        const props = {
            logError: function (s) {
                error = error + 1
                returnVal = s
            }
        };
        let uf = new UploadFile(props);
        uf.fileReader = {
            result: '{}'
        };
        uf.handleFileRead();
        expect(error).toBe(1);
        expect(returnVal).toBe('Top level json object must be an array');
    });

    it("Logs error when filereader.result is set to an empty JSON array", () => {
        let error = 0;
        let returnVal = "";
        const props = {
            logError: function (s) {
                error = error + 1
                returnVal = s
            }
        };
        let uf = new UploadFile(props);
        uf.fileReader = {
            result: '[]'
        };
        uf.handleFileRead();
        expect(error).toBe(1);
        expect(returnVal).toBe('Uploaded array is empty')
    });

    it("Logs error when provided JSON is missing the mutated_lineno field", () => {
        let error = 0;
        let returnVal = "";
        const props = {
            logError: function (s) {
                error = error + 1
                returnVal = s
            }
        };
        let uf = new UploadFile(props);
        uf.fileReader = {
            result: '[{\"mutated_output\":\"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturnx\\nreturn4\",\"productive\":false,\"mutation_operator\":\"AOD\",\"equivalent\":false,\"mutated_output_lineno\":12,\"unmutated_output\":\"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturn-x\\nreturn4\",\"killers\":[],\"unmutated_output_lineno\":12,\"mutant_name\":\"mutant_AOD_UnaryOp_0\",\"killed\":false,\"mutated_ast_node\":\"UnaryOp\"}]'
        };
        uf.handleFileRead();
        expect(error).toBe(1);
        expect(returnVal).toBe(`mutant 0 does not follow JSON format`)
    });

    it("Logs error when provided JSON is missing the mutated_output field", () => {
        let error = 0;
        let returnVal = "";
        const props = {
            logError: function (s) {
                error = error + 1
                returnVal = s
            }
        };
        let uf = new UploadFile(props);
        uf.fileReader = {
            result: '[{\"mutated_lineno\":17,\"productive\":false,\"mutation_operator\":\"AOD\",\"equivalent\":false,\"mutated_output_lineno\":12,\"unmutated_output\":\"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturn-x\\nreturn4\",\"killers\":[],\"unmutated_output_lineno\":12,\"mutant_name\":\"mutant_AOD_UnaryOp_0\",\"killed\":false,\"mutated_ast_node\":\"UnaryOp\"}]'
        };
        uf.handleFileRead();
        expect(error).toBe(1);
        expect(returnVal).toBe(`mutant 0 does not follow JSON format`)
    });

    it("Logs error when provided JSON is missing the productive field", () => {
        let error = 0;
        let returnVal = "";
        const props = {
            logError: function (s) {
                error = error + 1
                returnVal = s
            }
        };
        let uf = new UploadFile(props);
        uf.fileReader = {
            result: '[{\"mutated_lineno\":17,\"mutated_output\":\"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturnx\\nreturn4\",\"mutation_operator\":\"AOD\",\"equivalent\":false,\"mutated_output_lineno\":12,\"unmutated_output\":\"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturn-x\\nreturn4\",\"killers\":[],\"unmutated_output_lineno\":12,\"mutant_name\":\"mutant_AOD_UnaryOp_0\",\"killed\":false,\"mutated_ast_node\":\"UnaryOp\"}]'
        };
        uf.handleFileRead();
        expect(error).toBe(1);
        expect(returnVal).toBe(`mutant 0 does not follow JSON format`)
    });

    it("Logs error when provided JSON is missing the mutation_operator field", () => {
        let error = 0;
        let returnVal = "";
        const props = {
            logError: function (s) {
                error = error + 1
                returnVal = s
            }
        };
        let uf = new UploadFile(props);
        uf.fileReader = {
            result: '[{\"mutated_lineno\":17,\"mutated_output\":\"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturnx\\nreturn4\",\"productive\":false,\"equivalent\":false,\"mutated_output_lineno\":12,\"unmutated_output\":\"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturn-x\\nreturn4\",\"killers\":[],\"unmutated_output_lineno\":12,\"mutant_name\":\"mutant_AOD_UnaryOp_0\",\"killed\":false,\"mutated_ast_node\":\"UnaryOp\"}]'
        };
        uf.handleFileRead();
        expect(error).toBe(1);
        expect(returnVal).toBe(`mutant 0 does not follow JSON format`)
    });

    it("Logs error when provided JSON is missing the equivalent field", () => {
        let error = 0;
        let returnVal = "";
        const props = {
            logError: function (s) {
                error = error + 1
                returnVal = s
            }
        };
        let uf = new UploadFile(props);
        uf.fileReader = {
            result: '[{\"mutated_lineno\":17,\"mutated_output\":\"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturnx\\nreturn4\",\"productive\":false,\"mutation_operator\":\"AOD\",\"mutated_output_lineno\":12,\"unmutated_output\":\"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturn-x\\nreturn4\",\"killers\":[],\"unmutated_output_lineno\":12,\"mutant_name\":\"mutant_AOD_UnaryOp_0\",\"killed\":false,\"mutated_ast_node\":\"UnaryOp\"}]'
        };
        uf.handleFileRead();
        expect(error).toBe(1);
        expect(returnVal).toBe(`mutant 0 does not follow JSON format`)
    });

    it("Logs error when provided JSON is missing the mutated_output_lineno field", () => {
        let error = 0;
        let returnVal = "";
        const props = {
            logError: function (s) {
                error = error + 1
                returnVal = s
            }
        };
        let uf = new UploadFile(props);
        uf.fileReader = {
            result: '[{\"mutated_lineno\":17,\"mutated_output\":\"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturnx\\nreturn4\",\"productive\":false,\"mutation_operator\":\"AOD\",\"equivalent\":false,\"unmutated_output\":\"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturn-x\\nreturn4\",\"killers\":[],\"unmutated_output_lineno\":12,\"mutant_name\":\"mutant_AOD_UnaryOp_0\",\"killed\":false,\"mutated_ast_node\":\"UnaryOp\"}]'
        };
        uf.handleFileRead();
        expect(error).toBe(1);
        expect(returnVal).toBe(`mutant 0 does not follow JSON format`)
    });
    // DONE UP TO HERE

    it("Logs error when provided JSON is missing the unmutated_output field", () => {
        let error = 0;
        let returnVal = "";
        const props = {
            logError: function (s) {
                error = error + 1
                returnVal = s
            }
        };
        let uf = new UploadFile(props);
        uf.fileReader = {
            result: '[{\"mutated_lineno\":17,\"mutated_output\":\"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturnx\\nreturn4\",\"productive\":false,\"mutation_operator\":\"AOD\",\"equivalent\":false,\"mutated_output_lineno\":12,\"killers\":[],\"unmutated_output_lineno\":12,\"mutant_name\":\"mutant_AOD_UnaryOp_0\",\"killed\":false,\"mutated_ast_node\":\"UnaryOp\"}]'
        };
        uf.handleFileRead();
        expect(error).toBe(1);
        expect(returnVal).toBe(`mutant 0 does not follow JSON format`)
    });

    it("Logs error when provided JSON is missing the killers field", () => {
        let error = 0;
        let returnVal = "";
        const props = {
            logError: function (s) {
                error = error + 1
                returnVal = s
            }
        };
        let uf = new UploadFile(props);
        uf.fileReader = {
            result: '[{"mutated_lineno":17,"mutated_output":"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturnx\\nreturn4","productive":false,"mutation_operator":"AOD","equivalent":false,"mutated_output_lineno":12,"unmutated_output":"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturn-x\\nreturn4","unmutated_output_lineno":12,"mutant_name":"mutant_AOD_UnaryOp_0","killed":false,"mutated_ast_node":"UnaryOp"}]'
        };
        uf.handleFileRead();
        expect(error).toBe(1);
        expect(returnVal).toBe(`mutant 0 does not follow JSON format`)
    });

    it("Logs error when provided JSON is missing the unmutated_output_lineno field", () => {
        let error = 0;
        let returnVal = "";
        const props = {
            logError: function (s) {
                error = error + 1
                returnVal = s
            }
        };
        let uf = new UploadFile(props);
        uf.fileReader = {
            result: '[{"mutated_lineno":17,"mutated_output":"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturnx\\nreturn4","productive":false,"mutation_operator":"AOD","equivalent":false,"mutated_output_lineno":12,"unmutated_output":"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturn-x\\nreturn4","killers":[],"mutant_name":"mutant_AOD_UnaryOp_0","killed":false,"mutated_ast_node":"UnaryOp"}]'
        };
        uf.handleFileRead();
        expect(error).toBe(1);
        expect(returnVal).toBe(`mutant 0 does not follow JSON format`)
    });

    it("Logs error when provided JSON is missing the mutant_name field", () => {
        let error = 0;
        let returnVal = "";
        const props = {
            logError: function (s) {
                error = error + 1
                returnVal = s
            }
        };
        let uf = new UploadFile(props);
        uf.fileReader = {
            result: '[{"mutated_lineno":17,"mutated_output":"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturnx\\nreturn4","productive":false,"mutation_operator":"AOD","equivalent":false,"mutated_output_lineno":12,"unmutated_output":"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturn-x\\nreturn4","killers":[],"unmutated_output_lineno":12,"killed":false,"mutated_ast_node":"UnaryOp"}]'
        };
        uf.handleFileRead();
        expect(error).toBe(1);
        expect(returnVal).toBe(`mutant 0 does not follow JSON format`)
    });

    it("Logs error when provided JSON is missing the killed field", () => {
        let error = 0;
        let returnVal = "";
        const props = {
            logError: function (s) {
                error = error + 1
                returnVal = s
            }
        };
        let uf = new UploadFile(props);
        uf.fileReader = {
            result: '[{"mutated_lineno":17,"mutated_output":"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturnx\\nreturn4","productive":false,"mutation_operator":"AOD","equivalent":false,"mutated_output_lineno":12,"unmutated_output":"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturn-x\\nreturn4","killers":[],"unmutated_output_lineno":12,"mutant_name":"mutant_AOD_UnaryOp_0","mutated_ast_node":"UnaryOp"}]'
        };
        uf.handleFileRead();
        expect(error).toBe(1);
        expect(returnVal).toBe(`mutant 0 does not follow JSON format`)
    });

    it("Logs error when provided JSON is missing the mutated_ast_node field", () => {
        let error = 0;
        let returnVal = "";
        const props = {
            logError: function (s) {
                error = error + 1
                returnVal = s
            }
        };
        let uf = new UploadFile(props);
        uf.fileReader = {
            result: '[{"mutated_lineno":17,"mutated_output":"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturnx\\nreturn4","productive":false,"mutation_operator":"AOD","equivalent":false,"mutated_output_lineno":12,"unmutated_output":"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturn-x\\nreturn4","killers":[],"unmutated_output_lineno":12,"mutant_name":"mutant_AOD_UnaryOp_0","killed":false}]'
        };
        uf.handleFileRead();
        expect(error).toBe(1);
        expect(returnVal).toBe(`mutant 0 does not follow JSON format`)
    });

    it("logError is called if JSON for mutant indicates it was killed but killers array is empty", () => {
        let error = 0;
        let returnVal = "";
        const props = {
            logError: function (s) {
                error = error + 1
                returnVal = s
            }
        };
        let uf = new UploadFile(props);
        uf.fileReader = {
            result: '[{"mutated_lineno":17,"mutated_output":"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturnx\\nreturn4","productive":false,"mutation_operator":"AOD","equivalent":false,"mutated_output_lineno":12,"unmutated_output":"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturn-x\\nreturn4","killers":[],"unmutated_output_lineno":12,"mutant_name":"mutant_AOD_UnaryOp_0","killed":true,"mutated_ast_node":"UnaryOp"}]'
        };
        uf.handleFileRead();
        expect(error).toBe(1);
        expect(returnVal).toBe('mutant 0 marked as killed but has no killers')
    });

    it("logError is called if JSON for mutant indicates it was not killed but killers array is populated", () => {
        let error = 0;
        let returnVal = "";
        const props = {
            logError: function (s) {
                error = error + 1
                returnVal = s
            }
        };
        let uf = new UploadFile(props);
        uf.fileReader = {
            result: '[{\"mutated_lineno\":2,\"mutated_output\":\"defadd10(x):\\nreturnx//10\\n\\n\\ndefsub5(x):\\nreturnx-5\\n\",\"productive\":false,\"mutation_operator\":\"AOR\",\"equivalent\":false,\"mutated_output_lineno\":1,\"unmutated_output\":\"defadd10(x):\\nreturnx+10\\n\\n\\ndefsub5(x):\\nreturnx-5\\n\",\"killers\":[[\"test_add_10_2(sample_test.SampleTest)\",\"Traceback(mostrecentcalllast):\\nFile\\"../../example/sample_test.py\\",line9,intest_add_10_2\\nself.assertEqual(11,sample.add10(1))\\nAssertionError:11!=0\\n\"],[\"test_add_10(sample_test.SampleTest)\",\"Traceback(mostrecentcalllast):\\nFile\\"../../example/sample_test.py\\",line6,intest_add_10\\nself.assertEqual(20,sample.add10(10))\\nAssertionError:20!=1\\n\"]],\"unmutated_output_lineno\":1,\"mutant_name\":\"mutant_AOR_BinOp_2\",\"killed\":false,\"mutated_ast_node\":\"BinOp\"}]'
        };
        uf.handleFileRead();
        expect(error).toBe(1);
        expect(returnVal).toBe('mutant 0 marked as unkilled but has killers')
    });

    it("logError is called if JSON indicates killed and equivalent", () => {
        let error = 0;
        let returnVal = "";
        const props = {
            logError: function (s) {
                error = error + 1
                returnVal = s
            }
        };
        let uf = new UploadFile(props);
        uf.fileReader = {
            result: '[{\"mutated_lineno\":2,\"mutated_output\":\"defadd10(x):\\nreturnx//10\\n\\n\\ndefsub5(x):\\nreturnx-5\\n\",\"productive\":false,\"mutation_operator\":\"AOR\",\"equivalent\":true,\"mutated_output_lineno\":1,\"unmutated_output\":\"defadd10(x):\\nreturnx+10\\n\\n\\ndefsub5(x):\\nreturnx-5\\n\",\"killers\":[[\"test_add_10_2(sample_test.SampleTest)\",\"Traceback(mostrecentcalllast):\\nFile\\"../../example/sample_test.py\\",line9,intest_add_10_2\\nself.assertEqual(11,sample.add10(1))\\nAssertionError:11!=0\\n\"],[\"test_add_10(sample_test.SampleTest)\",\"Traceback(mostrecentcalllast):\\nFile\\"../../example/sample_test.py\\",line6,intest_add_10\\nself.assertEqual(20,sample.add10(10))\\nAssertionError:20!=1\\n\"]],\"unmutated_output_lineno\":1,\"mutant_name\":\"mutant_AOR_BinOp_2\",\"killed\":true,\"mutated_ast_node\":\"BinOp\"}]'
        };
        uf.handleFileRead();
        expect(error).toBe(1);
        expect(returnVal).toBe('mutant 0 marked as killed so cannot be equivalent')
    });

    it("logError if JSON has a killers array that contains an array not of length 2", () => {
        let error = 0;
        let returnVal = "";
        const props = {
            logError: function (s) {
                error = error + 1
                returnVal = s
            }
        };
        let uf = new UploadFile(props);
        uf.fileReader = {
            result: '[{\"mutated_lineno\":2,\"mutated_output\":\"defadd10(x):\\nreturnx//10\\n\\n\\ndefsub5(x):\\nreturnx-5\\n\",\"productive\":false,\"mutation_operator\":\"AOR\",\"equivalent\":false,\"mutated_output_lineno\":1,\"unmutated_output\":\"defadd10(x):\\nreturnx+10\\n\\n\\ndefsub5(x):\\nreturnx-5\\n\",\"killers\":[[\"test_add_10_2(sample_test.SampleTest)\"]],\"unmutated_output_lineno\":1,\"mutant_name\":\"mutant_AOR_BinOp_2\",\"killed\":true,\"mutated_ast_node\":\"BinOp\"}]'
        };
        uf.handleFileRead();
        expect(error).toBe(1);
        expect(returnVal).toBe('mutant 0 killers array improperly formatted')
    });

    it("if JSON array is perfect, logError is not called, setMutantsHandler is called, and clearError is called", () => {
        let error = 0;
        let returnVal = "";
        let setMutant = 0;
        let setMutantReturn = "";
        let clear = 0;
        const props = {
            logError: function (s) {
                error = error + 1
                returnVal = s
            },
            setMutantsHandler: function (s) {
                setMutant = setMutant + 1
                setMutantReturn = s
            },
            clearError: function () {
                clear = clear + 1
            }
        };
        let uf = new UploadFile(props);
        uf.fileReader = {
            result: '[{\"mutated_lineno\":17,\"mutated_output\":\"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturnx\\nreturn4\",\"productive\":false,\"mutation_operator\":\"AOD\",\"equivalent\":false,\"mutated_output_lineno\":12,\"unmutated_output\":\"\\ndeftriple_me(x):\\nreturnx*3\\n\\n\\ndefweird_boolean(b,x):\\nifb:\\nreturnx/4+3\\nelifx<10:\\nreturn-x\\nreturn4\",\"killers\":[],\"unmutated_output_lineno\":12,\"mutant_name\":\"mutant_AOD_UnaryOp_0\",\"killed\":false,\"mutated_ast_node\":\"UnaryOp\"}]'
        };

        let expected = [{
            mutated_lineno: 17, mutated_output: "\ndeftriple_me(x):\nreturnx*3\n\n\ndefweird_boolean(b,x):\nifb:\nreturnx/4+3\nelifx<10:\nreturnx\nreturn4",
            productive: false,
            mutation_operator: "AOD",
            equivalent: false,
            mutated_output_lineno: 12,
            unmutated_output: "\ndeftriple_me(x):\nreturnx*3\n\n\ndefweird_boolean(b,x):\nifb:\nreturnx/4+3\nelifx<10:\nreturn-x\nreturn4",
            killers: [],
            unmutated_output_lineno: 12,
            mutant_name: "mutant_AOD_UnaryOp_0",
            killed: false,
            mutated_ast_node: "UnaryOp"
        }]

        uf.handleFileRead();
        expect(error).toBe(0);
        expect(returnVal).toBe("");
        expect(setMutant).toBe(1);
        expect(setMutantReturn).toStrictEqual(expected);
        expect(clear).toBe(1);
    });

});
