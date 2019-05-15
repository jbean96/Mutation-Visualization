import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mutants : null
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

  render() {
    return (
      <div className="App">
        <p>Before mutants</p>
        {/* <p>{ this.state.mutants }</p> */}
        <p>After mutants</p>
        <form onSubmit={ this.handleUpload }>
          <input ref={(ref) => { this.fileinput = ref; }} type="file" />
          <button>Upload</button>
        </form>
      </div>
    );
  }
}

export default App;
