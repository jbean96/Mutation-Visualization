import React from 'react';
import './App.css';
import './MutantDisplay.css';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import MutantTable from './MutantTable';
import MutantCode from './MutantCode';
import SwitchesGroup from './SwitchesGroup';


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

    updateMutantHandler(mutant) {
        this.props.updateMutantHandler(this.state.currentMutant, mutant);
    }

    render() {
        if (this.state.currentMutant !== null) {
            const mutant_obj = this.props.mutants[this.state.currentMutant];
            return (
                <div>
                    <KeyboardBackspace onClick={this.returnToTable.bind(this)}/>
                    <br/>
                    <h3>{mutant_obj.mutant_name}</h3>
                    <br/>
                    <SwitchesGroup mutant={mutant_obj}
                        updateSwitchHandler={this.updateMutantHandler.bind(this)}/>
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