import React from 'react';
import './styles/App.css';
import Info from './Info.js';
import './styles/UploadFile.css'

const MutantSchema = {
    "type": "object",
    "properties": {
        "mutant_name": { "type": "string" },
        "killed": { "type": "boolean" },
        "killers": {
            "type": "array",
            "items": {
                "type": "array",
                "items": { "type": "string" }
            }
        },
        "equivalent": { "type": "boolean" },
        "productive": { "type": "boolean" },
        "mutated_lineno": { "type": "integer" },
        "mutated_output": { "type": "string" },
        "mutated_output_lineno": { "type": "integer" },
        "unmutated_output": { "type": "string" },
        "unmutated_output_lineno": { "type": "integer" },
        "mutation_operator": { "type": "string" },
        "mutated_ast_node": { "type": "string" },
    },
    "required": ["mutant_name", "killed", "killers",
        "equivalent", "productive", "mutated_lineno",
        "mutated_output", "mutated_output_lineno",
        "unmutated_output", "unmutated_output_lineno",
        "mutation_operator", "mutated_ast_node"]
};

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

        if (!Array.isArray(content)) {
            this.props.logError('Top level json object must be an array');
        } else if (content.length === 0) {
            this.props.logError('Uploaded array is empty');
        } else {
            // Validate each element against a json schema
            var validate = require('jsonschema').validate;
            for (var i = 0; i < content.length; i++) {
                const element = content[i];
                // validate each element against the mutant schema
                const validated = validate(element, MutantSchema);
                if (validated.errors.length > 0) {
                    this.props.logError(`mutant ${i} does not follow JSON format`);
                    return;
                }
                
                // Verify that every mutant that's killed is associated with a non-empty array of killers
                if (element.killed && (element.killers.length == 0)) {
                    this.props.logError(`mutant ${i} marked as killed but has no killers`);
                    return;
                } else if (!element.killed && (element.killers.length > 0)) {
                    this.props.logError(`mutant ${i} marked as unkilled but has killers`);
                    return;
                }

                // Verify that any mutant that has been killed is not marked as equivalent
                if (element.killed && element.equivalent) {
                    this.props.logError(`mutant ${i} marked as killed so cannot be equivalent`);
                    return;
                }

                // Verify that every killer is an array of length 2
                for (var j = 0; j < element.killers.length; j++) {
                    const killer = element.killers[j]
                    if (!killer || killer.length !== 2) {
                        this.props.logError(`mutant ${i} killers array improperly formatted`);
                        return;
                    }
                }
            }
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