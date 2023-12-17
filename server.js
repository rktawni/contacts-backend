const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const connectionStr = process.env.CONNECTION_STRING;

connectDB()

/**
 * This get method is just for example purpose.
 * Always create routes in a different file.
 * Please refer the 'routes' folder at same level.
 */
/*app.get('/api/contacts', (req, res) => {
    res.status(200).json([{
        id: "1", address: 'Dilshad Garden',
        types: [],
        user_history: false,
        precise: false,
        main_text: 'Dilshad Garden',
        secondary_text: 'Delhi, India'
    }]);
})*/

app.use(express.json()) // it is a parser which will parse the data stream/Body from request.
/**
 * 'use' is a middleware.
 */
app.use("/api/contacts", require('./routes/contactRoutes'));
app.use("/api/users", require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})