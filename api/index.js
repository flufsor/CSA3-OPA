const axios = require('axios');
const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const { auth } = require('express-oauth2-jwt-bearer');
const extAuthz = require('@build-security/opa-express-middleware');
var { expressjwt: jwt } = require("express-jwt");
const expressJwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const jwt_decode = require('jwt-decode');
const FakeData = require('./fakedata');

require('dotenv').config();

const app = express();

app.use(cors())

app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(err.status).json({ message: err.message });
});

// let verifyAccessToken = jwt({
//     // dynamically fetch and cache JWKS public key
//     secret: jwksRsa.expressJwtSecret({
//         cache: true,
//         rateLimit: true,
//         jwksRequestsPerMinute: 5,
//         jwksUri: `${process.env.AUTH0_ISSUER}/.well-known/jwks.json`
//     }),
//     // validate aud, iss claims
//     audience: process.env.AUTH0_AUDIENCE,
//     issuer: process.env.AUTH0_ISSUER,
//     algorithms: ["RS256"]
// });

let verifyAccessToken = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER,
});

app.get('/', (req, res) => {
    res.send('Hello from API');
});

app.get('/messages', (req, res) => {
    console.log(jwt_decode.jwtDecode(req.headers.authorization))
})

app.get('/protected', verifyAccessToken, (req, res) => {
    console.log(req.auth.payload);
    res.json({ "result": 'Hello from protected route' });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
