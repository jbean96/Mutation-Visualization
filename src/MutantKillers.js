import React from 'react';
import './App.css';
import './MutantDisplay.css';

function MutantKillers(props) {
    if (props.killers.length === 0) return null;

    const tableRows = props.killers.map(killer => {
        return (
            <li>
                <strong>{ killer[0] }</strong>
                <ul>
                    <li>{ killer[1] }</li>
                </ul>
            </li>
        );
    });

    return (
        <div>
            <h4>This mutant was killed by the following tests:</h4>
            <ul>
                {tableRows}
            </ul>
        </div>
    );
};

export default MutantKillers;