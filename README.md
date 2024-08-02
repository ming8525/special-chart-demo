# special-chart-demo

This repository is used to provide some demos about arcgis charts problems that require special steps to reproduce

# How to start

- Clone this repo
- Run `npm ci`
- Run `npm start`
- Open http://localhost:8080/
- Register a ClientID
  - Since the demo data is on Ess Org, we need to register a ClientID first
  - Log in to ess org and [register a ClientID](https://developers.arcgis.com/documentation/security-and-authentication/api-key-authentication/tutorials/create-an-api-key/#steps)
  - Make sure to set the Redirect URL to `http://localhost:8080`
- Paste the ClientID into the appropriate input box and then click 'Sign In'

