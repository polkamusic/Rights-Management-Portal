# Video Walkthrough

Here's a video walkthrough of the Rights Management Portal (milestone-1) that showcases how a user can create a contract and retrieve it by going to "My Contracts" section -> https://www.youtube.com/watch?v=drf5ZIQuo84 

# Cache Engine Dependency

Rights Management Portal has a dependency on PolkaMusic Cache Engine which caches all the information in the CRM pallet and stores it in a MySQL database which is used to access data quickly through simple or complex MySQL queries. While the source of truth is the blockchain, the cache engine database allows us to retrieve data with more efficiency than the ledger. The source code is located at -> https://github.com/polkamusic/PolkaMusic-Core/tree/main/cache-engine

# IPFS - Pinata

Rights Management Portal saves the following files to IPFS via Pinata.
1) The music mp3/wav file
2) The cover art image
3) The meta data csv file 

All the meta deta entered by the user such as song name, artist name etc is packaged into csv and pinned on IPFS via Pinata. The hash of the above files are stored on the blockchain at the time of new contract creation.

# Getting Started with PolkaMusic RMP

## Description

A GUI that lets the user enter the data and submit to the Rights Management Pallet in order to create a Smart Record Contract.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements

The following instructions refer to the installation on a Linux/Ubuntu 18:

Install [NodeJS](https://nodejs.org)  
Register and Get a Pinata Key [pinata](https://www.pinata.cloud/) 
Create a .env file at the root directory and supply the pinata key with it, refer to .env.example

from the CLI:  
```sh
npm install
npm start

Deploy to server:
npm run build
upload build files to server


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

