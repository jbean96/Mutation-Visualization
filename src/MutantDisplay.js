import React from 'react';
import './App.css';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import mutation_operators from './fields.js';
import MaterialTable from 'material-table';

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

/* Functional component that displays details about an individual mutant */
function MutantCode(props) {
    return (
        <div style={{ maxWidth: '100%' }}>
            <KeyboardBackspace onClick={props.return}/>
            <br/>
            <h3>Mutant Code</h3>
            <code>{props.mutant.mutated_output}</code>
            <h3>Original Code</h3>
            <code>{props.mutant.unmutated_output}</code>
        </div>
    )
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

    render() {
        if (this.state.currentMutant !== null) {
            return (
                <MutantCode return={this.returnToTable.bind(this)} 
                    mutant={this.props.mutants[this.state.currentMutant]}/>
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