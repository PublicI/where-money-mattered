const express = require('express');
const cors = require('cors');

const docs = require('./api/docs');

const app = express();

app.use(cors());

// Import API Routes
app.use(docs);

// Export the server middleware
module.exports = {
    path: '/api',
    handler: app
};
