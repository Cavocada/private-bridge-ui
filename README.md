Findora ChainBridge - Instructions for Developers

## Technology

react、react-router、mobx、webpack5、less、Antd、Web3

## Project beginning:

### Preconditions:

1. Install [Node.js](https://nodejs.org/en/download/) globally (version >= v10.16.3 );
2. Install **yarn** package management tool globally;

```bash
$ npm install -g yarn
```

3. In the project directory, execute the following command:

```bash
$ yarn install
```

### Build development environment:

Execute the following command in the project root directory.

```bash
$ yarn dev
```

### Build:

Execute the following commands in the project update directory to build resources for execution in the production environment.

```bash
$ yarn build
```

> The constructed resources are located in **"root directory/dist"**

### Problem record:

### Resource

#### ui

https://www.figma.com/file/4cIJBusTmulSCViwh8Cbrq/chainbridge---findora?node-id=211%3A6605

#### solidity

https://github.com/FindoraNetwork/chainbridge-deploy

#### wallet_addEthereumChain

https://eips.ethereum.org/EIPS/eip-3085

#### to do the deployment

> repo:

https://github.com/FindoraNetwork/chainBridge-new

to deploy on developing env:

push commit into the main branch

to deploy on production env:

release a tag like below

https://github.com/FindoraNetwork/chainBridge-new/releases/tag/0.0.1

done, CICD is finished.

dev.bridge.findora.org ---> developing env

bridge.findora.org ---> production env

<!--  -->
