import React from 'react';
import './App.css';
import './MutantDisplay.css';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class SwitchesGroup extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          productive: this.props.mutant.productive,
          equivalent: this.props.mutant.equivalent,
      };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    let newMutant = JSON.parse(JSON.stringify(this.props.mutant));
    newMutant[name] = event.target.checked;
    this.props.updateSwitchHandler(newMutant);

  };

  createSwitch(checked, onChangeArg, value, label) {
    return (
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={this.handleChange(onChangeArg)}
            value={value}
          />
        }
        label={label}
      />
    );
  }

  render() {
    const equivalentSwitch = (!this.props.mutant.killed) ? this.createSwitch(this.state.equivalent,
      "equivalent",
      "equivalent",
      "Equivalent") : null;
    const productiveSwitch = this.createSwitch(this.state.productive,
      "productive",
      "productive",
      "Productive");
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">This mutant is:</FormLabel>
        <FormGroup>
          {equivalentSwitch}
          {productiveSwitch}
        </FormGroup>
      </FormControl>
    );
  }
};

export default SwitchesGroup;