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