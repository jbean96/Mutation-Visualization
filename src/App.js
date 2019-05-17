import React from 'react';
import './App.css';
import MaterialTable from 'material-table';
import mutation_operators from './fields.js'

function ErrorMessage(props) {
  return <div>{ props.message } <button onClick={ props.clearError }>Close</button></div>
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mutants : [],
      currentMutant : null,
      error : null
    };

    this.handleUpload = this.handleUpload.bind(this);
    this.handleFileRead = this.handleFileRead.bind(this);

    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.handleFileRead;
  }

  logError(err) {
    this.setState({ error : err });
  }

  clearError() {
    this.setState({ error : null });
  }

  handleFileRead(e) {
    var content;
    try {
      content = JSON.parse(this.fileReader.result);
    } catch(err) {
      this.logError(err);
      return;
    }

    // TODO: Check the object structure and make sure it's an array of mutants?

    if (!Array.isArray(content)) {
      this.logError("Top level json object must be an array");
    } else if (content.length == 0) {
      this.logError("Uploaded array is empty");
    } else {
      this.setState({ mutants : content });
    }
  }

  handleUpload(ev) {
    ev.preventDefault();

    if (this.fileInput.files.length > 0) {
      this.fileReader.readAsText(this.fileInput.files[0]);
    } else {
      this.logError("No files selected");
    }
  }

  createMutantTable() {
    if (this.state.mutants.length == 0) {
      return;
    }
    const table_rows = this.state.mutants.map(mutant => {
      return {
        mutant_name: mutant.mutant_name,
        mutation_operator: mutation_operators[mutant.mutation_operator].full_name,
        killed: String(mutant.killed),
        equivalent: String(mutant.equivalent),
        productive: String(mutant.productive)
      }
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
          data={table_rows}
          title="Mutants Found"
        />
      </div>
    )
  }

  createErrorMessage() {
    if (this.state.error) {
      return <ErrorMessage message={ this.state.error.toString() }
                           clearError={ this.clearError.bind(this) } />
    }
  }

  render() {
    return (
      <div className="App">
      <h1>Mutation Testing Visualization Tool</h1>
        <form onSubmit={ this.handleUpload }>
          <input ref={ (ref) => { this.fileInput = ref; } } type="file" />
          <button>Upload</button>
        </form>
        <br></br>
        <div>{ this.createMutantTable() }</div>
        { this.createErrorMessage() }
      </div>
    );
  }
}

export default App;
