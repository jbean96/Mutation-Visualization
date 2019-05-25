import React from 'react';
import './App.css';
import MutantDisplay from './MutantDisplay.js';
import UploadFile from './UploadFile.js';
import Clear from '@material-ui/icons/Clear';

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
      error: null,
    };
  }

  logError(err) {
    this.setState({ error: err });
  }

  clearError() {
    this.setState({ error: null });
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

  setMutantsHandler(mutants) {
    const newMutants = JSON.parse(JSON.stringify(this.state.mutants));
    this.setState({ mutants: mutants });
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
        <UploadFile setMutantsHandler={this.setMutantsHandler.bind(this)}
          logError={this.logError.bind(this)}
          clearError={this.clearError.bind(this)} />
      );
    }
  }

  render() {
    return (
      <div className='App'>
        <div id="site-header">
          <h1>Mutation Testing Visualization Tool</h1>
        </div>
        {this.createErrorMessage()}
        {this.renderBody()}
      </div>
    );
  }
}

export default App;