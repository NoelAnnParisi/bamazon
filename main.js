'use strict';

require('console.table');
const { Marketplace } = require('./marketplace');

const Bamazon = new Marketplace();
Bamazon.startInteraction();