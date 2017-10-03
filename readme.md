# Campsite Reservationator
This codebase is a sample utilizing a non-sophisticated
gap-rule-follower algorithm for campsite reservations.  
The code is written in TypeScript.

## Installation

### Requirements
* Node.js
* NPM

### Install Node Dependencies
This project uses NPM for package management.  If you don't have NPM
installed, you can find instructions at: https://docs.npmjs.com/cli/install

Once NPM is installed, pull down the dependencies:
```shell
cd camping (if not in the camping dir)
npm install
```

## Running
To see available reservations, run the npm command:
```shell
npm run available src/test-case.json
```

## Testing

### Linting
This project uses tslint to lint the javascript.  It's a good idea to clear
all linting errors.  To lint (for some reason, npm run lint isn't working atm):
``` shell
./node_modules/.bin/tslint -c tslint.json 'src/**/*.ts'
```

### Unit Tests
``` shell
npm test
```

### Test Coverage
To get a coverage analysis:
``` shell
npm run coverage
```
Coverage data is stored in the `/coverage` folder and summarized on the command line.

## Deployment
To build minified production bundles:
```shell
npm run build:prod
```
The js and css bundles will appear in the `/dist` folder
