const cors = require('cors')
const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');

const barTabRouter = require('./BarTabRouter');

require('dotenv').config();

const app = express();

app.use(cors())

let verifyAccessToken = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER,
    jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`,
});

app.use("/bartab", verifyAccessToken, barTabRouter);

app.get('/', (req, res) => {
    res.json('Hello from API');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
