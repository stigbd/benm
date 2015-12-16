[![Build Status](https://travis-ci.org/stigbd/benm-server.svg?branch=master)](https://travis-ci.org/stigbd/benm-server)
[![Coverage Status](https://coveralls.io/repos/stigbd/benm/badge.svg?branch=master&service=github)](https://coveralls.io/github/stigbd/benm?branch=master)
# benm-server
A boilerplate project for Backbone.js, ExpressJS &amp; node.js, MongoDB based on the book by Jason Krol
http://kroltech.com/2013/12/29/boilerplate-web-app-using-backbone-js-expressjs-node-js-mongodb/

It is not a fork of https://github.com/shorttompkins/benm/tree/express-v4 , but is based on it.

This is the server part. For the client, see https://github.com/stigbd/benm-client

## Requirements
node 0.10+ (and npm), mongodb.
Then
$ sudo npm install -g grunt-cli
$ npm install
$ grunt init:dev

## Testing the server using Mocha, Chai and Proxyquire:
$ grunt test

## Running the server
$ grunt server
