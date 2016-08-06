# express-middleware-generator
Yeoman generator for ExpressJS middleware in ES6 (Requires at least Node 4)

## Requirements
* Node 4 and above
* Gulp ```npm install -g gulp-cli```

## Features
* ES6 implementation to make it faster, reducing the number of dependencies to 0.
* Gulp, mocha and chai testing scaffolding
* gulp-bump to help you to manage your versions
* Editor config file to enforce your coding style (supported by Webstorm out of the box or sublime/atom and others with plugins)
* Custom JSHint config file to customize your own rules
* Express App included to test some specific scenarios
* Watch task to execute test cases as you modify your middleware or test cases code, boost your productivity
* You can write a wrapper around this generator (for instance a web app) to automate the generator

## Usage

### Testing
There are three ways to run test cases:

```sh
npm test
```

or

```sh
gulp test
```

or let them run automatically every time you make a change by keep this command running in the background (my personal favorite)
```sh
gulp watch
```

### Automated generator
You can just create a folder, dump a file with the name ```project.json``` with the settings that you want and invoke the generator with the flag ```--usefile```.

Example
```bash
> ls
project.json
> yo express-middleware
```