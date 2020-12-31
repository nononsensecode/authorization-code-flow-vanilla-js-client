# OUath 2.0 Authorization Code Flow - Vanilla JS Client

This code collect authorization code from the `Keycloak` server and then using that _authorization code_ gets the _access token_ and _refersh token_. Using the _access token_ accesses the resource server which will respond with a list of heroes (_As in angular.io heroes example_).

Create `app-config.js` with content as in `app-config.js.example` and replace values according to your configuration.

I am using [https-localhost](https://github.com/daquinoaldo/https-localhost) as the `https` server. When you are using the `PKCE` branch, you need an _https_ server for the _crypto_ code to work. In my opinion _https-localhost_ is a pretty good tool for that.