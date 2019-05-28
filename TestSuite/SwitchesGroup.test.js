import React from 'react';
import { shallow, mount } from 'enzyme';

// Components
import SwitchesGroup from '../src/SwitchesGroup';


describe('SwitchesGroup Test Suite', () => {

    it('Initialization correct', () => {
        const props = { mutant: { productive: true, equivalent: false } };
        let result = new SwitchesGroup(props);
        expect(result.state.productive).toBe(true);
        expect(result.state.equivalent).toBe(false);
    });

    it('createSwitch correct', () => {
        const props = { mutant: { productive: true, equivalent: false } };
        let x = new SwitchesGroup(props);
        let result = x.createSwitch('checked', 'onchange', 'value', 'label');
        expect(result.props.control.props.checked).toBe('checked');
        expect(result.props.control.props.onChange).toBeDefined();
        expect(result.props.control.props.value).toBe('value');
        expect(result.props.label).toBe('label');
    });

    it('handleChange correct when mutant is alive', () => {
        let returnVal = {};
        const props = {
            mutant: { productive: true, equivalent: true }, updateSwitchHandler:
                function (s) { returnVal = s; }
        }
        const wrapper = mount(<SwitchesGroup {...props} />)
        wrapper.find("input").first().simulate('change', { target: { checked: false } });
        let target = { productive: true, equivalent: false }
        expect(returnVal).toStrictEqual(target);
    });

    it('handleChange correct when mutant is killed', () => {
        let returnVal = {};
        const props = {
            mutant: { killed: true, productive: true, equivalent: true }, updateSwitchHandler:
                function (s) { returnVal = s; }
        }
        const wrapper = mount(<SwitchesGroup {...props} />)
        wrapper.find("input").first().simulate('change', { target: { checked: false } });
        let target = { killed: true, productive: false, equivalent: true }
        expect(returnVal).toStrictEqual(target);
    });


});