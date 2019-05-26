import React from 'react';
import './styles/App.css';
import './styles/MutantDisplay.css';

function MutantKillers(props) {
    if (props.killers.length === 0) return null;

    const tableRows = props.killers.map(function (killer, i) {
        return (
            <li key={i}>
                <strong>{killer[0]}</strong>
                <ul>
                    <li>{killer[1]}</li>
                </ul>
            </li>
        );
    });

    return (
        <div className="topLevel">
            <h4>This mutant was killed by the following tests:</h4>
            <ul>
                {tableRows}
            </ul>
        </div>
    );
};

export default MutantKillers;