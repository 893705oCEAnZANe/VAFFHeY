// 代码生成时间: 2025-10-07 22:45:37
 * Usage:
 *   1. npm install express body-parser
 *   2. node chatbot_service.js
 *   3. Access chatbot endpoint: http://localhost:3000/chatbot
 */

const express = require('express');
const bodyParser = require('body-parser');

// Initialize the Express application
const app = express();

// Set the port number for the server
const PORT = process.env.PORT || 3000;

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define a simple in-memory storage for chatbot responses
const chatbotResponses = {
  'hello': 'Hi there! How can I assist you today?',
  'how are you': 'I am doing well, thank you! How about you?',
  // Add more responses as needed
};

// Middleware to log all incoming requests
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// Define the chatbot endpoint
app.post('/chatbot', (req, res) => {
  try {
    // Extract the user's message from the request body
    const userMessage = req.body.message;
    
    // Check if the message is valid
    if (!userMessage) {
      return res.status(400).json({ error: 'No message provided' });
    }
    
    // Retrieve the chatbot's response based on the user's message
    const response = chatbotResponses[userMessage.toLowerCase()] || 'I am not sure how to respond to that.';
    
    // Send the response back to the client
    res.status(200).json({
      message: response
    });
  } catch (error) {
    // Catch and handle any errors
    console.error('Error in chatbot service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Chatbot service running on port ${PORT}`);
});
