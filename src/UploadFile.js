import React from 'react';
import './styles/App.css';
import Info from './Info.js';
import './styles/UploadFile.css'

class UploadFile extends React.Component {
    constructor(props) {
        super(props);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleFileRead = this.handleFileRead.bind(this);
        this.setFileInput = this.setFileInput.bind(this);
        this.fileReader = new FileReader();
        this.fileReader.onloadend = this.handleFileRead;
    }

    setFileInput(ref) {
        this.fileInput = ref;
    }

    handleFileRead() {
        var content;
        try {
            content = JSON.parse(this.fileReader.result);
        } catch (err) {
            this.props.logError(err);
            return;
        }

        // TODO: Additional error checking
        console.log(content);
        content.forEach(element => {
            // Verify that every mutant that's killed is associated with a non-empty array of killers
            if (element.killed && (element.killers.length == 0)) {
                this.props.logError(`mutant ${element.mutant_name} marked as killed but has no killers`);
            } else if (!element.killed && (element.killers.length > 0)) {
                this.props.logError(`mutant ${element.mutant_name} marked as unkilled but has killers`);
            }

            // Verify that any mutant that has been killed is not marked as equivalent
            if (element.killed && element.equivalent) {
                this.props.logError(`mutant ${element.mutant_name} marked as killed so cannot be equivalent`);
            } 
        });

        if (!Array.isArray(content)) {
            this.props.logError('Top level json object must be an array');
        } else if (content.length === 0) {
            this.props.logError('Uploaded array is empty');
        } else {
            this.props.setMutantsHandler(content);
            this.props.clearError();
        }
    }

    handleUpload(ev) {
        ev.preventDefault();

        if (this.fileInput.files.length > 0) {
            this.fileReader.readAsText(this.fileInput.files[0]);
        } else {
            this.props.logError('No files selected');
        }
    }

    render() {
        return (
            <div id="file-upload">
                <div id="file-upload-form">
                    <form onSubmit={this.handleUpload}>
                        <input ref={(ref) => { this.setFileInput(ref); }} type='file' />
                        <button>Upload</button>
                    </form>
                </div>
                <Info />
            </div>
        );
    }
}

export default UploadFile;