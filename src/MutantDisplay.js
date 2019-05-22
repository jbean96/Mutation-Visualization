import React from 'react';
import './App.css';
import './MutantDisplay.css';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import MutantTable from './MutantTable';
import MutantCode from './MutantCode';
import SwitchesGroup from './SwitchesGroup';
import MutantKillers from './MutantKillers';
import Download from '@axetroy/react-download';

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

    mutantClickHandler(row) {
        this.setState({ currentMutant : row});
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
                    <MutantCode mutant={mutant_obj}/>
                    <SwitchesGroup mutant={mutant_obj}
                        updateSwitchHandler={this.updateMutantHandler.bind(this)}/>
                    <MutantKillers killers = {mutant_obj.killers} />
                </div>
            );
        } else if (this.props.mutants.length > 0) {
            return (
                <div>
                    <div style={{"text-align": "center"}}>
                        <button>
                            <Download file="mutation_data.json" 
                                content={JSON.stringify(this.props.mutants)}>
                                Save Mutation Data
                            </Download>
                        </button>
                    </div><br/>
                    <MutantTable mutants={this.props.mutants}
                        mutantClickHandler={this.mutantClickHandler.bind(this)} />
                </div>
            );
        } else {
            return null;
        }
    };
}

export default MutantDisplay;