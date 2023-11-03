package authz

import input.attributes.request.http as http_request

default allow := false

allow {
    jwt_verified
    claims_verified.age >= 18
}

jwks_request(url) := http.send({
    "url": url,
    "method": "GET",
    "force_cache": true,
    "force_cache_duration_seconds": 3600
})

jwt_unverified := io.jwt.decode(input.attributes.request.http.headers.authorization)
jwt_header := jwt_unverified[0]

jwks_url := concat("?", [
    "https://flufap.eu.auth0.com/.well-known/jwks.json",
    urlquery.encode_object({"kid": jwt_header.kid}),
])
jwks := jwks_request(jwks_url).raw_body

jwt_verified := jwt_unverified {
    io.jwt.verify_rs256(input.attributes.request.http.headers.authorization, jwks)
}

claims_verified := jwt_verified[1]