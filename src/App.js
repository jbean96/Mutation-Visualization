import React from 'react';
import './App.css';
import Clear from '@material-ui/icons/Clear';
import MutantDisplay from './MutantDisplay.js';
import Download from '@axetroy/react-download';

function ErrorMessage(props) {
  //return <div>{ props.message } <button onClick={ props.clearError }>Close</button></div>
  return (
    <div><Clear onClick={props.clearError} /> {props.message}</div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mutants: [],
      error: null,
      disableInputButton: false,
      disableUploadButton: true,
    };

    this.handleUpload = this.handleUpload.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
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
    }
  }

  handleUpload(ev) {
    ev.preventDefault();
    
    if (this.refs.uploadButton.innerHTML === 'Refresh') {
      window.location.reload()
    } else if (this.fileInput.files.length > 0) {
      this.setState({ disableInputButton: true});
      this.refs.uploadButton.innerHTML = 'Refresh'
      this.fileReader.readAsText(this.fileInput.files[0]);
    } else {
      this.logError('No files selected');
    }
  }

  handleInputClick(ev) {
    this.setState({ disableUploadButton: false});
  }

  createErrorMessage() {
    if (this.state.error) {
      return <ErrorMessage message={this.state.error.toString()}
        clearError={this.clearError.bind(this)} />;
    }
  }

  updateMutantHandler(index, mutant) {
    let newMutants = JSON.parse(JSON.stringify(this.state.mutants));
    newMutants[index] = mutant;
    this.setState({ mutants: newMutants });
  }

  mutationButton() {
    if (this.state.mutants.length === 0) {
      return null;
    }
    return (
      <button>
        <Download file={this.fileInput.files[0].name} content={JSON.stringify(this.state.mutants)}>
          Save Mutation Data
        </Download>
      </button>
    );
  }

  render() {
    return (
      <div className='App'>
        <div id="site-header">
        <h1>Mutation Testing Visualization Tool</h1>
          <form onSubmit={this.handleUpload}>
            <input onClick={this.handleInputClick} disabled={this.state.disableInputButton} ref={(ref) => { this.fileInput = ref; }} type='file' />
            <button ref="uploadButton" disabled={this.state.disableUploadButton}>Upload</button>
          </form>
          <br></br>
            <div>{this.mutationButton()}</div>
          <br></br>
        </div>
        <MutantDisplay mutants={this.state.mutants} updateMutantHandler={this.updateMutantHandler.bind(this)} />
        {this.createErrorMessage()}
      </div>
    );
  }
}

export default App;
