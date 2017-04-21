'use strict';

require('console.table');
const { Marketplace } = require('./customer');

const Bamazon = new Marketplace();
Bamazon.startInteraction();