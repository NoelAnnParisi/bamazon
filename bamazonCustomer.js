'use strict';
require('console.table');
const inquirer = require('inquirer');
const prompt = require('prompt');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

const properties = {
    properties: {
        // The first should ask them the ID of the product they would like to buy.
        id: {
            name: 'id',
            message: 'Type in the id # of the item you want to buy',
            validator: /^[0-9]*$/,
            warning: 'Sorry, please enter a number'
        },
        // The second message should ask how many units of the product they would like to buy.
        amount: {
            name: 'amount',
            message: 'How many would you like to buy?',
            validator: /^[0-9]*$/,
            warning: 'Sorry, please enter a number',
        }
    }
}

class Marketplace {
    displayInventory(hollaback) {
        connection.query('SELECT * from products', (err, result) => {
            console.table(result);
            hollaback();
        });
    }
    startInteraction() {
        this.displayInventory(() => {
            prompt.start();
            prompt.get(properties, (err, result) => {
                this.checkBamazonInventory(result.id, result.amount);
            });
        });
    }
    checkBamazonInventory(id, amount) {
        connection.query('SELECT * FROM products where item_id = ?', [id], (err, res) => {
            // If not, the app should log a phrase like Insufficient quantity!, and then 
            //prevent the order from going through.
            if (amount > (res[0].stock_quantity)) {
                console.log("Insufficient quantity, let\'s try this again");
                startInteraction();
            } else {
                let amountLeft = res[0].stock_quantity - amount;
                this.updateDB(id, amount, amountLeft);
            }
        });
    }
    updateDB(id, amountPurchased, amountRemaining) {
        connection.query('UPDATE products SET stock_quantity = ? WHERE item_id= ?', [amountRemaining, id], (err, res) => {
            if (!err) {
                console.log('Thank you, you\'re purchase is complete.');
                console.log('Now, we only have', amountRemaining, 'left in stock!');
                this.calculateTotal(id, amountPurchased);
            } else {
                console.log(err);
            }
        });
    }
    calculateTotal(id, quantity) {
        connection.query('SELECT price FROM products WHERE item_id = ?',[id], (err, res)=> {
        	if (!err){
        		let total = quantity * res[0].price;
        		console.log('Your total is: $'+total);
        	} else {
        		console.log(err);
        	}
        	
        });
    }
};

const Bamazon = new Marketplace();
Bamazon.startInteraction();
