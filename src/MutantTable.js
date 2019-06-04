import React from 'react';
import './styles/App.css';
import './styles/MutantDisplay.css';
import MaterialTable from 'material-table';

/* Functional component to display high level data about all of the mutants */
function MutantTable(props) {
    if (props.mutants.length === 0) return null;

    const tableRows = props.mutants.map((mutant, index) => {

        return {
            mutant_name: <span className="mutantName" onClick={() => props.mutantClickHandler(index)}>{mutant.mutant_name}</span>,
            mutation_operator: mutant.mutation_operator,
            killed: String(mutant.killed),
            equivalent: String(mutant.equivalent),
            productive: String(mutant.productive)
        };
    });

    return (
        <div style={{ maxWidth: '100%' }} className="topLevel">
            <MaterialTable
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

export default MutantTable;