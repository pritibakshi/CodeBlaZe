# CodeBlaZe - An Online Code Compilation Platform
[Watch Demo](https://youtu.be/DqbKi_OigVg?si=AjjQEJsqojTRwnfz) &#x1F680;





<img width="1710" alt="Screenshot 2024-04-24 at 12 33 05 PM" src="https://github.com/pritibakshi/CodeBlaZe/assets/138514545/06ca851f-2f52-4953-a673-a1cbbfbcc388">



## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
5. [Contributing](#contributing)
6. [License](#license)

## Project Overview
CodeBlaZe is a comprehensive Code Compilation Platform designed to provide users with an intuitive interface for writing, compiling, and testing code in various programming languages including Python, Java, C, and C++. It facilitates efficient code execution and testing by compiling user-written code on the server-side and returning the results in real-time.

### Design Choices & Architecture

In crafting our Code Compilation Platform, we meticulously considered various design choices and architectural strategies to guarantee an optimal and user-centric experience. Here's an elucidation:

1. **Frontend Framework - React.js**:
   - React.js serves as the foundation of our frontend, offering a meticulously crafted environment for building interactive user interfaces. Its component-based architecture fosters modularity and reusability, enabling swift development and maintenance of UI components.

2. **Code Editor Selection - Monaco Editor**:
   - The decision to employ Monaco Editor stems from its unparalleled code editing capabilities, meticulously designed to provide users with a rich and familiar coding experience. Its extensible nature empowers us to integrate additional features seamlessly, enhancing productivity and user satisfaction.

3. **Backend Framework - Express.js**:
   - The backend infrastructure is constructed upon Express.js, renowned for its lightweight and adaptable nature. Express.js facilitates the creation of robust server-side applications with minimal overhead, ensuring efficient handling of HTTP requests and seamless integration with frontend components.

5. **RESTful API Design**:
   - Embracing RESTful principles, our API endpoints are meticulously designed to offer a coherent and intuitive interface for interacting with the platform. Logical route organization facilitates streamlined access to functionalities such as user authentication, code compilation, and data retrieval.

6. **Component-Based Architecture**:
   - Our frontend application is meticulously structured around a component-based architecture, fostering modularity and encapsulation of UI elements. Hierarchical organization of components promotes code maintainability and scalability, facilitating iterative development and enhancement.

7. **Asynchronous Communication**:
   - Asynchronous communication between frontend and backend components is facilitated through Axios, a versatile HTTP client. This asynchronous paradigm ensures seamless interaction with the server, empowering real-time updates and efficient handling of user input during code compilation and testing.

By meticulously aligning our design choices with architectural best practices, we endeavored to create a Code Compilation Platform that epitomizes sophistication, scalability, and user-centricity.


## Features
- Support for multiple programming languages
  ![0*-vBaGtfS12kSByM1](https://github.com/pritibakshi/CodeBlaZe/assets/138514545/289377cd-130e-4f5c-bdae-48a3b7e47db4)

- Syntax highlighting for code editing.
- Boilerplate code generation for quick setup.
  <img width="1710" alt="Screenshot 2024-04-24 at 12 36 21 PM" src="https://github.com/pritibakshi/CodeBlaZe/assets/138514545/31655ab3-2b4b-4831-811c-e58640b50ac9">

- Real-time code compilation
- Customizable themes and font sizes
- Customizable dimensions for a user-friendly interface.
<img width="1710" alt="Screenshot 2024-04-24 at 12 43 50 PM" src="https://github.com/pritibakshi/CodeBlaZe/assets/138514545/a5a8b4cc-1be4-4700-b50e-43bc0d5e0b57">

- Responsive design for seamless usage across devices
  

## Technologies Used
![1*1rCMJTTZ8HBIad8K8H6Lfw](https://github.com/pritibakshi/CodeBlaZe/assets/138514545/67996f3d-ecd9-4362-a8c7-80ea43dc13ac)

- React.js for frontend development
- Express.js for backend development
- Monaco Editor for code editing capabilities
- Axios for asynchronous HTTP requests
- Other libraries and frameworks as necessary

## Getting Started

### Prerequisites
Before running the application, make sure you have the following installed:
- Node.js

### Installation
1. Clone the repository:
git clone https://github.com/pritibakshi/CodeBlaZe.git
2. Navigate to the project directory:
3. Install dependencies for both the client and server:
- For the client:
  ```
  cd client
  npm install
  npm install @monaco-editor/react axios react-select
  ```
- For the server:
  ```
  cd server
  npm install
  npm install express cors axios
  ```

4. Start the server
```
cd server
npm start
```

6. Start the client
```
cd client
npm start
```
## Contributing
We welcome contributions from the community. Feel free to open issues, submit pull requests, or suggest new features.

## License
This project is licensed under the [MIT License](LICENSE).
