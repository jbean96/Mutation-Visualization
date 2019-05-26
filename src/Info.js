import React from 'react';
import './styles/App.css';
import './styles/Info.css';
import format from './assets/jsonFormat.js';

const informationText = "Welcome to the Mutation-Visualization tool. This project " +
    "was created by students in CSE P 590 at the University of Washington in Spring 2019 " +
    "for their class project.";

const usage = "Start by uploading a .json file in the prescribed format below. The tool " +
    "will display a table consisting of all the mutants described in the input file and " +
    "allow you to inspect the mutation and mark them as \"equivalent\" and/or \"productive\". " +
    "The main page will also display overall facts about the mutants including how many " +
    "have been killed, are live and are equivalent. At any time you can download the file with " +
    "your changes by clicking the \"Save Mutation Data\" button.";

function Info() {
    return (
        <div>
            <div id="text">
                <p>{informationText}</p>
                <h2>Usage</h2>
                <p>{usage}</p>
            </div>
            <h2>Data Format</h2>
            <div id="code">
                <pre><code>
                    {format}
                </code></pre>
            </div><br/>
        </div>
    );
}

export default Info;