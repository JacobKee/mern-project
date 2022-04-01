const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8888;


app.use(cors())
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')
const mssqlRouter = require('./routes/mssql')
const ethereumRouter = require('./routes/ethereum')
const binanceRouter = require('./routes/binance')
const polygonRouter = require('./routes/polygon')

app.use('/exercises',exercisesRouter);
app.use('/users', usersRouter)
app.use('/mssql', mssqlRouter)
app.use('/ethereum', ethereumRouter)
app.use('/binance', binanceRouter)
app.use('/polygon', polygonRouter)


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})