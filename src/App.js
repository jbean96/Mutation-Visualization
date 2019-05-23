import React from 'react';
import './App.css';
import Clear from '@material-ui/icons/Clear';
import MutantDisplay from './MutantDisplay.js';
import Info from './Info.js';

function ErrorMessage(props) {
  return (
    <div id="error"><Clear onClick={props.clearError} /> {props.message}</div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mutants: [],
      error: null
    };

    this.handleUpload = this.handleUpload.bind(this);
    this.handleFileRead = this.handleFileRead.bind(this);

    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.handleFileRead;
  }

  logError(err) {
    this.setState({ error: err });
  }

  clearError() {
    this.setState({ error: null });
  }

  handleFileRead() {
    var content;
    try {
      content = JSON.parse(this.fileReader.result);
    } catch (err) {
      this.logError(err);
      return;
    }

    // TODO: Check the object structure and make sure it's an array of mutants?

    if (!Array.isArray(content)) {
      this.logError('Top level json object must be an array');
    } else if (content.length === 0) {
      this.logError('Uploaded array is empty');
    } else {
      this.setState({ mutants: content });
      this.clearError();
    }
  }

  handleUpload(ev) {
    ev.preventDefault();

    if (this.fileInput.files.length > 0) {
      this.fileReader.readAsText(this.fileInput.files[0]);
    } else {
      this.logError('No files selected');
    }
  }

  createErrorMessage() {
    if (this.state.error) {
      return (
        <div>
          <ErrorMessage message={this.state.error.toString()}
            clearError={this.clearError.bind(this)} />
        </div>
      );
    }
  }

  updateMutantHandler(index, mutant) {
    let newMutants = JSON.parse(JSON.stringify(this.state.mutants));
    newMutants[index] = mutant;
    this.setState({ mutants: newMutants });
  }

  renderBody() {
    if (this.state.mutants.length > 0) {
      return (
        <MutantDisplay mutants={this.state.mutants} updateMutantHandler={this.updateMutantHandler.bind(this)} />
      );
    } else {
      return (
        <Info />
      );
    }
  }

  render() {
    return (
      <div className='App'>
        <div id="site-header">
          <h1>Mutation Testing Visualization Tool</h1>
          <form onSubmit={this.handleUpload}>
            <input ref={(ref) => { this.fileInput = ref; }} type='file' />
            <button>Upload</button>
          </form>
        </div>
        <br />
        {this.createErrorMessage()}
        {this.renderBody()}
      </div>
    );
  }
}

export default App;
