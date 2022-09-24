# IndigiDAO
## HackerEarth, Web3athon

## TL;DR
### Set address in config.js

### Build contracts
```
yarn web3:build
```
### Deploy or release your contracts on thirdweb. 
You'll be redirected to the thirdweb website to complete the deployment. Take note of the address to which the contract was deployed.
```
yarn web3:deploy
```
### Build or develop the javascipt bundle passing that address as a command line argument
```
yarn web2:dev SOME_ADDRESS
```
### main.bundle.js can be used as an exportable artifact