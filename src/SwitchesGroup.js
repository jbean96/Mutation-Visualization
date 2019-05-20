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

  render() {
    return (
      <FormControl component="fieldset">
      <FormLabel component="legend">Mutant Properties</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.productive}
                onChange={this.handleChange('productive')}
                value="productive"
              />
            }
            label="Productive"
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.state.equivalent}
                onChange={this.handleChange('equivalent')}
                value="equivalent"
              />
            }
            label="Equivalent"
          />
        </FormGroup>
      </FormControl>
    );
  }
};

export default SwitchesGroup;