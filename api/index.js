const axios = require('axios');
const cors = require('cors')
const express = require('express');
const { jwtVerify, JWK } = require('jose');

const Config = require('./config');
const FakeData = require('./fakedata');

const app = express();

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello from API');
});

app.get('/messages', (req, res) => {
    res.json(FakeData.messages);
})

app.get('/protected', (req, res) => {
    const jwt = req.headers['authorization']

    const JWKS = jose.createRemoteJWKSet(new URL(Config.oidc.pubkey_url))
    const { payload, protectedHeader } = jose.jwtVerify(jwt, JWKS)

    result = f`JWT payload: ${payload} \n JWT protected header: ${protectedHeader}`;

    res.send('Hello from protected route');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
