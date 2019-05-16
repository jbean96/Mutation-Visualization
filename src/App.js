import React from 'react';
import './App.css';
import MaterialTable from 'material-table';


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

  createMutantTable(columns, rows) {
    if (rows.length == 0) {
      return;
    }
    const table_rows = rows.map(row => {
      return {
        mutant_name: row.mutant_name,
        killed: String(row.killed),
        equivalent: String(row.equivalent),
        productive: String(row.productive)
      }
    });
    return (
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'Mutant Name', field: 'mutant_name' },
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
    const columns = [
      { field: 'mutant_name', title: 'Mutant Name' },
      { field: 'killed', title: 'Killed' },
      { field: 'equivalent', title: 'Equivalent' },
      { field: 'productive', title: 'Productive' } ];

    return (
      <div className="App">
      <h1>Mutation Testing Visualization Tool</h1>
        <form onSubmit={ this.handleUpload }>
          <input ref={(ref) => { this.fileinput = ref; }} type="file" />
          <button>Upload</button>
        </form>
        <br></br>
        <div>{this.createMutantTable(columns, this.state.mutants)}</div>
      </div>
    );
  }
}

export default App;
