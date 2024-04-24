// Index.js is a Entry point of the application, responsible for
// starting the server and initializing routes and middleware

// Importing required modules
const express = require("express"); 

const cors = require("cors"); 
const bodyParser = require("body-parser"); 

// Module for executing shell commands
const { exec } = require("child_process");

// File system module : used to create and delete temporary files.
const fs = require("fs");
const path = require("path"); 

// Initializing Express application
const app = express();
const PORT = 8000;

// Setting Middleware & Parsing JSON request bodies
app.use(cors()); 
app.use(bodyParser.json());

// Function to create a temporary file
const createTempFile = (code, extension) => {
    const tempFilePath = path.join(__dirname, `temp.${extension}`);
    fs.writeFileSync(tempFilePath, code);
    return tempFilePath;
};

// Function to delete temporary files
const deleteTempFile = (filePath) => {
    // Using fs module to unlink (delete) the file
    fs.unlinkSync(filePath);
};

 // Extracting code, language, and input from the request body
app.post("/compile", (req, res) => {
    let code = req.body.code;
    let language = req.body.language;
    let input = req.body.input;

    let fileExtension;
    let command;
    
    // Using Switch statement to determine file extension and compilation command
    switch (language) {
        case "c":
            fileExtension = "c";
            break;
        case "cpp":
            fileExtension = "cpp";
            break;
        case "python":
            fileExtension = "py";
            break;
        case "java":
            fileExtension = "java";
            break;
        default:
            // Returning error response for unsupported language
            return res.status(400).json({ error: "Unsupported language" });
    }

    // Creating a temporary file with the user code
    const tempFilePath = createTempFile(code, fileExtension);

    // Then Adjusting compilation command based on the language
    switch (language) {
        case "c":
            command = `gcc -o temp ${tempFilePath} && echo "${input}" | temp`; //Note:For MacOS : ./temp
            break;
        case "cpp":
            command = `g++ -o temp ${tempFilePath} && echo "${input}" | temp`; //Note:For MacOS : ./temp
            break;
        case "python":
            command = `python3 ${tempFilePath}`;
            break;
        case "java":
            command = `javac ${tempFilePath} && java -cp ${path.dirname(tempFilePath)} Main`;
            break;
        default:
            return res.status(400).json({ error: "Unsupported language" });
    }

    // Executing the compilation command
    exec(command, (error, stdout, stderr) => {
        if (error || stderr) {
            const errorMessage = error ? `Error executing command: ${error}` : `Compilation error: ${stderr}`;
            console.error(errorMessage);
            return res.status(400).json({ error: errorMessage }); // Send compilation error message
        }
        
        res.status(200).json({ output: stdout });
        
        deleteTempFile(tempFilePath);
    });
});

// At the end, Starting the server and listening on the port ...
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
