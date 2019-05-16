import React from 'react';
import './App.css';
import MaterialTable from 'material-table';
import mutation_operators from './fields.js'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mutants : []
    };

    this.handleUpload = this.handleUpload.bind(this);
    this.handleFileRead = this.handleFileRead.bind(this);

    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.handleFileRead;
  }

  handleFileRead(e) {
    const content = JSON.parse(this.fileReader.result);
    //const content = this.fileReader.result;

    this.setState({ mutants : content });
  }

  handleUpload(ev) {
    ev.preventDefault();
    // TODO: Display error message if no file uploaded?
    if (this.fileinput.files.length > 0) {
      this.fileReader.readAsText(this.fileinput.files[0]);
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

  render() {
    return (
      <div className="App">
      <h1>Mutation Testing Visualization Tool</h1>
        <form onSubmit={ this.handleUpload }>
          <input ref={(ref) => { this.fileinput = ref; }} type="file" />
          <button>Upload</button>
        </form>
        <br></br>
        <div>{this.createMutantTable()}</div>
      </div>
    );
  }
}

export default App;
