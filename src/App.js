import React from 'react';
import './App.css';
import ReactDataGrid from 'react-data-grid';


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
    return (<ReactDataGrid
      columns={columns}
      rowGetter={i => table_rows[i]}
      rowsCount={rows.length}
    />);
  }

  render() {
    const columns = [
      { key: 'mutant_name', name: 'Mutant Name' },
      { key: 'killed', name: 'Killed' },
      { key: 'equivalent', name: 'Equivalent' },
      { key: 'productive', name: 'Productive' } ];

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
