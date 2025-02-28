[![javascript](https://img.shields.io/badge/javascript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![html5](https://img.shields.io/badge/html5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![css3](https://img.shields.io/badge/css3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![node.js](https://img.shields.io/badge/node.js-8CC84B?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![mongodb](https://img.shields.io/badge/mongodb-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

# ToDo List Web Application

This is a user-friendly To-Do List web application built using HTML, CSS, JavaScript, Node.js and MongoDB. It enables users to create and delete tasks, mark them as completed, and store their progress in a database. The app provides a simple and efficient way to manage daily tasks and stay organized.

## ToDo List Design

<img src="todo-list-app-screenshot.png" alt="ToDo List App Design" width="450" />

## Setup and Running

1. **Backend**:
   - Navigate to the `backend/` folder:  
     ```bash
     cd backend
     ```
   - Install Node.js if it is not already installed on your system: [Node.js Official Website](https://nodejs.org/en).  
   - Install the necessary dependencies:  
     ```bash
     npm install
     ```
     > Thanks to `package.json`, all required packages will be installed automatically.  
   - Before starting the server, change a `.env` file in the `/backend` directory and specify the following environment variables:
     ```plaintext
     MONGO_URI=mongodb://<user>:<password>@<host>:<port>/<db>
     PORT=<port_number>
     ```
     This ensures the server correctly connects to the database and runs on the specified port.  
   - Start the server directly using `server.js`:  
     ```bash
     node server.js
     ```

2. **Frontend**:  
   - Open `index.html` in a browser or start a local server to work with the frontend.  

> [!IMPORTANT]
>
> Before starting the client-side part, make sure to start the server (`server.js`) in the `backend/` folder!

## Author

Created by [Denys Bondarchuk](https://github.com/profjuvii). If you have any questions or suggestions, feel free to contact me.
