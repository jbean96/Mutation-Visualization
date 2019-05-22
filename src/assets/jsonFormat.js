const format = `[
    {
        "mutated_lineno": <int>,            // The line number of the original code that was mutated
        "mutated_output": <string>,         // Mutant code snippet
        "productive": <boolean>,            // Indicates whether or not it was productive
        "mutation_operator": <string>,      // The applied mutation operator
        "equivalent": <boolean>,            // Indicates whether or not the mutant is equivalent
        "mutated_output_lineno": <int>,     // The starting line number for the mutated code snippet
        "unmutated_output": <string>,       // Original code snipped
        "killers": [                        // Array of the tests that killed the mutant
            [
                <string>,                   // Name of failed test
                <string>                    // Error message/traceback
            ],
            ...
        ],
        "unmutated_output_lineno": <int>,   // Starting line number for the original code snippet
        "mutant_name": <string>,            // Unique name for the mutant
        "killed": <boolean>,                // Indicates whether or not the mutant was killed
        "mutated_ast_node": <string>        // Name of the mutated AST Node
    },
    ...
]`;

export default format;