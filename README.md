# Cybersecurity Advanced Opdracht 3: Get to know advanced IAM practices
*By Tom Goedemé en Niels van de Ginste*

Demo credentials:
User: jappie@jappie.jappie
Password: P@ssw0rd

## API

## Frontend

In deze sectie bespreken we alle logica die plaatsvindt in de Frontend. Zo leggen we uit op welke manier de loginprocedure is geïmplmeneteerd en hoe de library `oidc-client-ts` in de frontend is geïntegreerd.

### Oidc-client-ts

De library maakt gebruik van een `userManager` object. Dit object houdt de status bij van de gebruiker en bevat alle functies om te authenticeren via de openid-connect authenticatieflow.

#### Config

Oidc-client-ts is een standaard library die de openId connect flow volgt. In deze flow zijn heel wat elementen gedefinieerd om de authenticatie correct te laten verlopen. 

```javascript
const config = {
	authority: environment.auth0_authority,
	client_id: environment.auth0_client_id,
	redirect_uri: environment.auth0_redirect_uri,
	response_type: 'code',
	scope: 'openid profile email',
	post_logout_redirect_uri: environment.auth0_post_logout_redirect_uri,
	metadata: {
		authorization_endpoint: `${environment.auth0_authority}/authorize`,
		token_endpoint: `${environment.auth0_authority}/oauth/token`,
		end_session_endpoint: `${environment.auth0_authority}/v2/logout?returnTo=${encodeURIComponent(environment.auth0_post_logout_redirect_uri)}&client_id=${environment.auth0_client_id}`
	}
};
```

Het instellen van deze elementen gebeurt via een config file dat aan het `userManager` object wordt meegegeven. Hieronder worden de verschillende elementen toegelicht:

- authority: de tenant van onze autho0 server (waar alles van auth0 voor onze app wordt beheerd)
- client_id: de unieke identifier van onze auth0 applicatie
- redirect_uri: de link naar onze frontend die de callback zal behandelen
- response_type: het formaat van het antwoord
- scope: bepaalt welke user attributen worden teruggegeven in het token wanneer een gebruiker zich heeft geauthenticeerd
- post_logout_redirect_url: de URL naar waar gesurft moet worden nadat de user zich heeft afgemeld
- metadata: extra attribuut dat extra info kan bevatten. Voor ons zijn dit de volgende velden:
	- authorization endpoint: due url waar naar gesurft moet worden om met de authenticatieserver te communiceren
	- token_endpoint: de URL waarmee gecommuniceerd moet worden om het token op te vragen
	- end_session_endpoint: de url waarnaar verwezen moet worden wanneer een gebruiker wilt uitloggen

Zoals u kan zien op het bovenstaande codeblok, wordt er gebruik gemaakt van een environment file. Deze file is terug te vinden op de volgende locatie: `frontend/csaMessageApp/src/environments/environment.ts`

Dit bestand bevat de volgende environment variabelen met betreking tot de config:

```json
auth0_authority: 'https://flufap.eu.auth0.com', // e.g. https://you.eu.auth0.com

auth0_client_id: 'iysO4wHMr5oQF7V3F7gQX4Y8rJSHyCol', // e.g. 123456789

auth0_redirect_uri: 'https://6j6z80lj-4200.euw.devtunnels.ms/login/callback', // e.g. https://mydomain.com/login/callback

auth0_post_logout_redirect_uri: 'https://6j6z80lj-4200.euw.devtunnels.ms', // e.g. https://mydomain.com
```




## Login procedure

Voor de loginprocedure maken we gebruik van een service in Angular: de 

### Configuration
Enter the correct credentials for AUTH0 in the `csaMessageApp/src/environments/environment.ts` file.

## OPA