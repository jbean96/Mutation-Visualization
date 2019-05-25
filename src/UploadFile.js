import React from 'react';
import './App.css';

class UploadFile extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div id = "file-upload">
            <form onSubmit={this.props.handleUpload}>
              <input ref={(ref) => { this.props.setFileInput(ref); }} type='file' />
              <button>Upload</button>
            </form>
        </div>
      );
    }
  }
  
  export default UploadFile;