import React from 'react';
import './App.css';
import './MutantDisplay.css';
import mutation_operators from './fields.js';
import MaterialTable from 'material-table';

/* Functional component to display high level data about all of the mutants */
function MutantTable(props) {
    if (props.mutants.length === 0) return null;

    const tableRows = props.mutants.map((mutant, index) => {

        return {
            mutant_name: <span class="mutantName" onClick={() => props.mutantClickHandler(index)}>{mutant.mutant_name}</span>,
            mutation_operator: mutation_operators[mutant.mutation_operator].full_name,
            killed: String(mutant.killed),
            equivalent: String(mutant.equivalent),
            productive: String(mutant.productive)
        };
    });

    return (
        <div style={{ maxWidth: '100%' }}>
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