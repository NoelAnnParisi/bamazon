const inquirer = require('inquirer');
const prompt = require('prompt');
const mysql = require('mysql');
const { addToInventory } = require('./addinventory');
const { propertiesAddItem, addItemPrompt, managerChooseAction } = require('./prompts');
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

class Manager {
    chooseAction() {
        inquirer.prompt(managerChooseAction).then((response) => {
            switch (response.action) {
                case 'View Products for Sale':
                    this.viewProducts();
                    break;
                case 'View Low Inventory':
                    this.viewLowInventory();
                    break;
                case 'Add to Inventory':
                    this.obtainItems();
                    break;
                case 'Add New Product':
                    this.addNewProduct();
                    break;
            }
        });
    }
    getItems(callback) {
        connection.query('SELECT * from products', callback); 
    }
    obtainItems() {
        this.getItems((err, result) => {
            const arrayOfItems = result.map(row => row.product_name);            
            return this.addItemToInventory(arrayOfItems);                
        }); 
    }
    viewProducts() {
        this.getItems((err, result) => {
            return console.table(result);
        })
    }
    viewLowInventory() {
        this.getItems((err, result) => {
            if (err) {
                return console.log(err);
            }
            return result.forEach(item => {
                if (item.stock_quantity <= 10) {
                    console.log(`You have ${item.stock_quantity} units left of ${item.product_name}`);
                }
            });
        });
    }
    addItemToInventory(arr) {
        addItemPrompt[0].choices = arr; 
        return inquirer.prompt(addItemPrompt).then((result) => {
            addToInventory(result.item, result.amount);
        });
    }
    addNewProduct() {
        prompt.start();
        prompt.get(propertiesAddItem, (err, result) => {
            console.log(result);
            connection.query('INSERT INTO products SET ?', result, (err, res) => {
                console.log('You\'ve added an item!');
            });
        });
    }
}

exports.Manager = Manager;