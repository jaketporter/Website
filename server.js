// Import the required modules
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

// Create an Express application
const app = express();
// Create an HTTP server using the Express app
const server = http.createServer(app);
// Initialize a new instance of socket.io by passing the HTTP server object
const io = socketIo(server);

// Set up the serial port with the specified path and baud rate
const port = new SerialPort({ path: "COM5", baudRate: 9600 }); // Adjust 'COM5' to your port
// Create a parser to read data from the serial port line by line
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Define a route for the root URL
app.get("/", (req, res) => {
  // Send the index.html file when the root URL is accessed
  res.sendFile(__dirname + "/public/index.html");
});

// Listen for data events from the serial port
parser.on("data", (data) => {
  // Log the received data to the console
  console.log(data);
  // Emit the received data to all connected clients via socket.io
  io.emit("sensorData", data);
});

// Listen for new client connections
io.on("connection", (socket) => {
  // Log a message when a new client connects
  console.log("Client connected");
});

// Start the server and listen on port 3000
server.listen(3000, () => {
  // Log a message when the server is running
  console.log("Server is running on port 3000");
});
