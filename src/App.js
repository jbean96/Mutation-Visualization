import React from 'react';
import './styles/App.css';
import MutantDisplay from './MutantDisplay.js';
import UploadFile from './UploadFile.js';
import Clear from '@material-ui/icons/Clear';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

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
      tabIndex: 0,
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
    const newMutants = JSON.parse(JSON.stringify(mutants));
    this.setState({ mutants: newMutants });
    this.setState({ tabIndex: 1 })
  }

  updateMutantHandler(index, mutant) {
    let newMutants = JSON.parse(JSON.stringify(this.state.mutants));
    newMutants[index] = mutant;
    this.setState({ mutants: newMutants });
  }

  renderBody() {
    const exploreTabHidden = (this.state.mutants.length) ? "hide" : "show";
    return (
      <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
        <TabList>
          <Tab>Upload Mutation Data</Tab>
          {
            (this.state.mutants.length) ? (<Tab>Explore Mutation Data</Tab>) : null
          }
        </TabList>

        <TabPanel>
          <UploadFile setMutantsHandler={this.setMutantsHandler.bind(this)}
            logError={this.logError.bind(this)}
            clearError={this.clearError.bind(this)} />
        </TabPanel>
        {
          (this.state.mutants.length) ?
            (<TabPanel>
              <MutantDisplay mutants={this.state.mutants} updateMutantHandler={this.updateMutantHandler.bind(this)} />
            </TabPanel>) : null
        }
      </Tabs>
    );
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