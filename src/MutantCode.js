import React from 'react';
import './App.css';
import './MutantDisplay.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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
};

export default MutantCode;