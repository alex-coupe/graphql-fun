const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config()

const app = express();

app.use(cors());

mongoose.connect(process.env.ConnectionString,{ useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.once('open', () => {
    console.log('Connected to database');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(4000, () => console.log("Server Started On Port 4000"));