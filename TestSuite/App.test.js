import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';

import { shallow, mount } from 'enzyme';

const wrapper = shallow(<App />);

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('Mutants field is empty at start up', () => {
    expect(wrapper.state().mutants.length).toBe(0);

});

it('error field is null at start up', () => {
    expect(wrapper.state().error).toBe(null);
});

it('tabIndex field is 0 at start up', () => {
    expect(wrapper.state().tabIndex).toBe(0);
});

it('logError calls setState', () => {
    let x = new App();
    x.setState = function (s) {
        x.state.error = s
    }
    x.logError("error");
    expect(x.state.error).toStrictEqual({ error: "error" });
});

it('clearError sets error to null', () => {
    let x = new App();
    x.setState = function (s) {
        x.state.error = s
    }
    x.logError("error");
    x.clearError();
    expect(x.state.error).toStrictEqual({ error: null });
});

it('createErrorMessage returns error message component', () => {
    let x = new App();
    x.setState = function (s) {
        x.state.error = s
    }
    x.logError("error");
    let result = x.createErrorMessage();
    expect(result.type).toBe('div');
    expect(result.props.children.type).toBeDefined();
});

it('createErrorMessage returns nothing if there is no error set', () => {
    let x = new App();
    let result = x.createErrorMessage();
    expect(result).toBe(undefined);
});

it('setMutantHandler creates deep copy of provided new mutants and assigns it to state', () => {
    let mutants = [{
        mutated_lineno: 17
    }]

    let x = new App();
    x.state.update = []
    x.setState = function (s) {
        x.state.update.push(s)
    }
    x.setMutantsHandler(mutants);
    mutants[0].mutated_lineno = 20;
    expect(x.state.update[0].mutants[0].mutated_lineno).toBe(17);
    expect(x.state.update[1].tabIndex).toBe(1);
});

it('updateMutantHandler works correctly', () => {
    let mutants = [{
        mutated_lineno: 17
    }, { mutated_lineno: 20 }]

    let mutant = { mutated_lineno: 100 }

    let x = new App();
    x.state.mutants = mutants;
    x.state.update = []
    x.setState = function (s) {
        x.state.mutants = s.mutants;
    }
    x.updateMutantHandler(1, mutant);
    expect(x.state.mutants[0].mutated_lineno).toBe(17);
    expect(x.state.mutants[1].mutated_lineno).toBe(100);
});

it('renders body correctly when there are mutants', () => {
    let x = new App();
    x.state.mutants = [{
        mutated_lineno: 17
    }, { mutated_lineno: 20 }];
    x.state.tabIndex = 1;
    let result = x.renderBody();
    expect(result.props.children.length).toBe(3);
    expect(result.type).toBeDefined();
    expect(result.props.children[2].props.children).toBeDefined();
});

it('renders body correctly when there are no mutants', () => {
    let x = new App();
    x.state.mutants = [];
    x.state.tabIndex = 1;
    let result = x.renderBody();
    expect(result.props.children[2]).toBe(null);
});


