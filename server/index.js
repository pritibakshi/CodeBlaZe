// Importing required modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const fs = require("fs").promises;
const path = require("path");

// Initializing Express application
const app = express();
const PORT = 8000;

// Setting Middleware & Parsing JSON request bodies
app.use(cors());
app.use(bodyParser.json());

// Function to create a temporary file asynchronously
const createTempFile = async (code, extension) => {
    try {
        const tempFileName = `temp.${extension}`;
        const tempFilePath = path.join(__dirname, tempFileName);
        await fs.writeFile(tempFilePath, code);
        return tempFilePath;
    } catch (error) {
        console.error("Error creating temporary file:", error);
        throw error;
    }
};
// Function to delete temporary files
const deleteTempFile = async (filePath) => {
    try {
        await fs.unlink(filePath);
    } catch (error) {
        console.error("Error deleting temporary file:", error);
    }
};

// Extracting code, language, and input from the request body
app.post("/compile", async (req, res) => {
    const { code, language, input } = req.body;

    let fileExtension;
    let command;

    // Using Switch statement to determine file extension and compilation command
    switch (language) {
        case "c":
            fileExtension = "c";
            command = ["gcc", "-o", "temp", "-xc", "-"];
            break;
        case "cpp":
            fileExtension = "cpp";
            command = ["g++", "-o", "temp", "-xc++", "-"];
            break;
            case "python":
            fileExtension = "py";
            command = ["python"];
            break;
        case "java":
            fileExtension = "java";
            const tempFilePath = await createTempFile(code, fileExtension);
            command = ["javac", tempFilePath];
            break;
        default:
            // Returning error response for unsupported language
            return res.status(400).json({ error: "Unsupported language" });
    }

    try {
        // Creating a temporary file with the user code
        const tempFilePath = await createTempFile(code, fileExtension);

        if (language === "python") {
            // For Python, execute the code asynchronously
            const executionProcess = spawn(command[0], [tempFilePath]);

            let output = "";
            let error = "";

            // Handling stdout data
            executionProcess.stdout.on("data", (data) => {
                output += data.toString();
            });
            // Handling stderr data
            executionProcess.stderr.on("data", (data) => {
                error += data.toString();
            });

            // Handling execution process exit
            executionProcess.on("close", () => {
                if (error) {
                    // If there's any error output, send it to the client
                    console.error("Python execution error:", error);
                    res.status(400).json({ error });
                } else {
                    // Sending output to the client
                    res.status(200).json({ output });
                }
                // Deleting the temporary file
                deleteTempFile(tempFilePath);
            });

            // Passing input to the execution process 
            executionProcess.stdin.write(input);
            executionProcess.stdin.end();
        } else {
            // For other languages (C, C++, Java), handle compilation and execution
            // Compilation command
            const compilerProcess = spawn(command[0], command.slice(1));
            let output = "";
            let error = "";

            // Handling stderr data
            compilerProcess.stderr.on("data", (data) => {
                error += data.toString();
            });

            // Handling process exit
            compilerProcess.on("close", (code) => {
                if (code === 0) {
                    // Compilation successful
                    if (language === "java") {
                        // If Java program, execute the code
                        const executionCommand = ["java", "-cp", path.dirname(tempFilePath), path.basename(tempFilePath, ".java")];
                        const executionProcess = spawn(executionCommand[0], executionCommand.slice(1));

                        let executionOutput = "";
                        let executionError = "";

                        // Handling stdout data
                        executionProcess.stdout.on("data", (data) => {
                            executionOutput += data.toString();
                        });

                        // Handling stderr data
                        executionProcess.stderr.on("data", (data) => {
                            executionError += data.toString();
                        });

                        // Handling execution process exit
                        executionProcess.on("close", () => {
                            if (executionError) {
                                // If there's any error output, send it to the client
                                console.error("Java execution error:", executionError);
                                res.status(400).json({ error: executionError });
                            } else {
                                // Sending output to the client
                                res.status(200).json({ output: executionOutput });
                            }
                            // Deleting the temporary file
                            deleteTempFile(tempFilePath);
                        });

                        // Passing input to the execution process
                        executionProcess.stdin.write(input);
                        executionProcess.stdin.end();
                    } else {
                        // For C, C++, execute the code with input
                        const executionProcess = spawn("./temp");

                        // Handling stdout data
                        executionProcess.stdout.on("data", (data) => {
                            output += data.toString();
                        });

                        // Handling execution process exit
                        executionProcess.on("close", () => {
                            // Sending output to the client
                            res.status(200).json({ output });
                            // Deleting the temporary file
                            deleteTempFile(tempFilePath);
                        });

                        // Passing input to the execution process
                        executionProcess.stdin.write(input);
                        executionProcess.stdin.end();
                    }
                } else {
                    // Compilation or execution error
                    console.error(`Error: ${error}`);
                    res.status(400).json({ error });
                    // Deleting the temporary file
                    deleteTempFile(tempFilePath);
                }
            });

            // Passing code to the compiler process
            compilerProcess.stdin.write(code);
            compilerProcess.stdin.end();
        }
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Starting the server and listening on the port
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
