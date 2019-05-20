import React from 'react';
import './App.css';
import './MutantDisplay.css';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import mutation_operators from './fields.js';
import MaterialTable from 'material-table';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';

/* Functional component to display high level data about all of the mutants */
function MutantTable(props) {
    if (props.mutants.length == 0) return null;

    const tableRows = props.mutants.map(mutant => {
        return {
            mutant_name: mutant.mutant_name,
            mutation_operator: mutation_operators[mutant.mutation_operator].full_name,
            killed: String(mutant.killed),
            equivalent: String(mutant.equivalent),
            productive: String(mutant.productive)
        };
    });

    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                actions={[
                    { icon: 'zoom_in', onClick: props.mutantClickHandler, tooltip: 'View code' }
                ]}
                columns={[
                    { title: 'Mutant Name', field: 'mutant_name' },
                    { title: 'Mutation Operator', field: 'mutation_operator' },
                    { title: 'Killed', field: 'killed' },
                    { title: 'Equivalent', field: 'equivalent' },
                    { title: 'Productive', field: 'productive' }
                ]}
                data={tableRows}
                title='Mutants Found'
            />
        </div>
    );
};

class SwitchesGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productive: this.props.productive,
            equivalent: this.props.equivalent,
        };
    }

    handleChange = name => event => {
      this.setState({ [name]: event.target.checked });
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
  }

/* Functional component that displays details about an individual mutant */
class MutantCode extends React.Component {
    makeCodePanel(code, lines) {
        return (
            <SyntaxHighlighter showLineNumbers
                language='python'
                style={docco}
                wrapLines='true'
                lineProps={(lineNum) => {
                    if (lines.includes(lineNum)) {
                        return { class : "mutation" };
                    }
                }}>{code}</SyntaxHighlighter>
        );
    }

    render() {
        // TODO: Extract mutated lines for mutant and original
        return (
            <div style={{ maxWidth: '100%' }}>
                <script>hljs.initHighlightingOnLoad();</script>
                <div id="container">
                    <div class="panel" id="panel1">
                        <h3>Original Code</h3>
                        {this.makeCodePanel(this.props.mutant.unmutated_output, [1])}
                    </div>
                    <div class="panel" id="panel2">
                        <h3>Mutant Code</h3>
                        {this.makeCodePanel(this.props.mutant.mutated_output, [1])}
                    </div>
                    <div id="clear"></div>
                </div>
            </div>
        );
    }
}

/* Component that handles the displaying of mutants and the logic to navigate
 * around the mutant interface
 */
class MutantDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMutant: null
        };
    }

    returnToTable() {
        this.setState({ currentMutant : null });
    }

    mutantClickHandler(event, row) {
        console.log(row);
        this.setState({ currentMutant : row.tableData.id });
        console.log(this.state);
    }

    updateMutantHandler(event, mutant) {}

    render() {
        if (this.state.currentMutant !== null) {
            const mutant_obj = this.props.mutants[this.state.currentMutant];
            return (
                <div>
                    <KeyboardBackspace onClick={this.returnToTable.bind(this)}/>
                    <br/>
                    <br/>
                    <SwitchesGroup
                        productive={mutant_obj.productive}
                        equivalent={mutant_obj.equivalent} />
                    <MutantCode mutant={mutant_obj}/>
                </div>
            );
        } else {
            return (
                <MutantTable mutants={this.props.mutants}
                    mutantClickHandler={this.mutantClickHandler.bind(this)} />
            );
        }
    };
}

export default MutantDisplay;