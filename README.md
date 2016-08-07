[![Build Status](https://travis-ci.org/elfido/generator-express-middleware.svg?branch=master)](https://travis-ci.org/elfido/generator-express-middleware)
[![Dependencies Status](https://david-dm.org/elfido/generator-express-middleware.svg)](https://david-dm.org/elfido/generator-express-middleware.svg)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/71a01765b09340529ad9fa76ab59712d)](https://www.codacy.com/app/fidencio-garrido/generator-express-middleware?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=elfido/generator-express-middleware&amp;utm_campaign=Badge_Grade)
![Node](https://img.shields.io/badge/node-4.0-brightgreen.svg)

[![NPM](https://nodei.co/npm/generator-express-middleware.png)](https://nodei.co/npm/express-slas/)

# express-middleware-generator
Yeoman generator for ExpressJS middleware in ES6 (Requires at least Node 4 to work or Node 6 to test)

## Requirements
* **Node 5** or above
* Gulp ```npm install -g gulp-cli```

## Installation
Pull the generator from NPM
```sh
npm install -g generator-express-middleware
```

Create your very first project!

```sh
yo express-middleware
```

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
> yo express-middleware --usefile
```

## Gulp Tasks (Developer info)

### Code hint
```sh
gulp jshint
```

### Bumping version
Automatically updates ```package.json```, creates a git tag and pushes. **

Patch (bumps 0.0.1 to 0.0.2)
```sh
gulp bump
```

Minor (bumps 0.0.1 to 0.1.0)
```sh
gulp bump --minor
```

Major (bumps 0.0.1 to 1.0.0)
```sh
gulp bump --major
```

Custom version (bumps to 3.0.0)
```sh
gulp bump --version:3.0.0
```