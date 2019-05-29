# User Documentation

## What is MutViz?

MutViz is a web-based interface that can be used to visualize the output of an existing mutation analyzer. The interface accepts a formatted [JSON file](#json-structure) with metadata about each mutant. The main page displays a table consisting of all the mutants described in the input file and allows users to inspect each mutation, marking them as “equivalent” and/or “productive.” The interface also displays an overall summary about the mutants that illustrates how many are live, equivalent, killed, and productive. At any time, the updated input file can be downloaded.

## JSON Structure

```
[
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
]
```

## Motivation

Mutation testing is a powerful method to evaluate the strength of a test suite. However, it has seen little adoption since its inception due to the productivity burden it poses on developers. While generating and executing mutants is relatively cheap, writing tests is expensive. Thus, being able to efficiently reason about mutation data can help developers focus on the important mutants (those that elicit effective tests) rather than those that are unproductive.<br><br>
Many mutation analyzers simply present mutation results as command line output, often displaying little to no additional information than the percentage of mutants killed. Moreover, these mutation tools are often tied to a specific source code language and testing framework, sometimes directly modifying the abstract syntax tree. MutViz aims to solve these issues by providing an intuitive and interactive web-interface that is agnostic to the source code language, test suite, and mutation framework. At any time, the user can save the updated mutation data (with mutants marked as "equivalent" and/or "productive" in-app) to save as a record, use in future uploads, and even be used as potential data to feed back into a mutation analyzer to improve future test executions.
