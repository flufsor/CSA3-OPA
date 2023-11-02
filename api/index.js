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
//         jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
//     }),
//     // validate aud, iss claims
//     audience: `${process.env.AUTH0_AUDIENCE}`,
//     issuer: `https://${process.env.AUTH0_DOMAIN}/`,
//     algorithms: ["RS256"]
// });

let verifyAccessToken = auth({
    audience: 'https://c7wnrl4p-3000.euw.devtunnels.ms',
    issuerBaseURL: 'https://flufap.eu.auth0.com/',
    tokenSigningAlg: 'RS256'
});

let logClaims = (token) => {
    console.log (jwt_decode(token));
}
  

app.get('/', (req, res) => {
    res.send('Hello from API');
});

app.get('/messages', (req, res) => {
    console.log(jwt_decode.jwtDecode(req.headers.authorization))
})

app.get('/protected', verifyAccessToken, (req, res) => {
    if (!req.auth.admin) return res.sendStatus(401);
    res.send('Hello from protected route');
});



app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
