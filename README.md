<a href="https://rebirth.finance/"><img hight="180" width="180" alt="current" src="https://rebirth.finance/assets/img/rebirth-finance-logo.svg">

# Rebirth Smart Contracts
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

[![npm](https://img.shields.io/npm/v/npm.svg)](https://github.com/nodejs/node)
[![truffle](https://img.shields.io/badge/truffle-docs-orange.svg)](http://truffleframework.com/docs/)
[![ganache-cli](https://img.shields.io/badge/ganache-cli-yellowgreen.svg)](http://truffleframework.com/ganache/)
[![solidity](https://img.shields.io/badge/solidity-docs-red.svg)](https://solidity.readthedocs.io/en/develop/)

## Project

### Rebirth Finance // Rebirth Token ( $REPA )

Rebirth Fintech is a solution that offers all the talents of the financial world under the social roof in the best way. Includes Credit Applications, Trading Instruments, Payment and Collection Systems, API Solutions, Trading Applications, B2B, B2C and Asset Management Applications.


## Overview

This project contains a smart contract for a decentralized application on the BNB Smart Chain. The contract is written in Solidity and manages the allocation and distribution of a custom ERC-20 token.


## Development Environment

The development environment for this project includes the following components:

- Truffle: A development framework for Ethereum that provides tools for building, testing, and deploying smart contracts.
- Ganache: A personal Ethereum blockchain for local development and testing.
- OpenZeppelin: A library of reusable smart contract components that provide secure and tested functionality.
- Remix: A web-based Solidity IDE that can be used for contract development and testing.


## Installation

To install the required dependencies, run the following commands:

```
npm install -g truffle
npm install -g ganache-cli
npm install openzeppelin-solidity
```

## Compile Contracts

To compile the smart contracts, run the following command:

```
truffle compile
```

This will compile the contracts in the `contracts` directory and create the corresponding ABI and bytecode files in the `build/contracts` directory.


## Run Tests

To run the tests for the smart contracts, start a local blockchain using Ganache and then run the following command:
This will run the tests in the `test` directory and output the results to the console.

## Deploy Contracts

To deploy the smart contracts to the blockchain, update the `truffle.js` file with the appropriate network configuration and then run the following command:

```
truffle migrate
```

This will deploy the contracts to the specified network and output the contract addresses.


## Usage

To use the smart contracts, import the relevant contracts into your DApp and interact with them using the provided functions and events.


## License

This project is licensed under the MIT License - see the LICENSE file for details.


This README file provides a comprehensive overview of the project, including the development environment, installation instructions, compilation and deployment instructions, and usage information. It also includes a license for the project.
