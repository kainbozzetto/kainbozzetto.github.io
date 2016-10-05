'use strict';

var angular = require('angular');
require('angular-ui-router');
global.jQuery = require('jquery'); // necessary for bootstrap to work
require('bootstrap');

//require('../node_modules/bootstrap/dist/css/boostrap.min.css');

angular.module('app', ['ui.router']);

require('./routes');
require('./controllers');