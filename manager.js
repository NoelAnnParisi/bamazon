const inquirer = require('inquirer');
const prompt = require('prompt');
const mysql = require('mysql');
const { addToInventory } = require('./addinventory');
const { propertiesAddItem } = require('./prompts');
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});
// If a manager selects View Products for Sale, the app should list every 
//available item: the item IDs, names, prices, and quantities.
class Manager {
    chooseAction() {
        inquirer.prompt([{
            type: 'list',
            name: 'action',
            message: 'What would you like to do today?',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
        }]).then((response) => {
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
    obtainItems(config) {
        connection.query('SELECT * from products', (err, result) => {
            const arrayOfItems = [];
            for (let i = 0; i < result.length; i++) {
                arrayOfItems.push(result[i].product_name);
            }            
            this.addItemToInventory(arrayOfItems);                
        })
    }

    viewProducts() {
        connection.query('SELECT * from products', (err, result) => {
            console.table(result);
        })
    }
    viewLowInventory() {
        connection.query('SELECT * from products', (err, result) => {
            if (err) {
                console.log(err);
            }
            for (let i = 0; i < result.length; i++) {
                if (result[i].stock_quantity <= 15) {
                    console.log('You have', result[i].stock_quantity, 'units left of', result[i].product_name);
                }
            }
        });
    }
    addItemToInventory(arr) {
        inquirer.prompt([{
            type: 'list',
            name: 'item',
            message: 'Which item would you like to restock?',
            choices: arr
        }, {
            type: 'input',
            name: 'amount',
            message: 'How many items are you adding to your inventory today?'
        }]).then((result) => {
            const item = result.item;
            switch (item) {
                case 'Coffee Sented Hand Lotion':
                    addToInventory('Coffee Sented Hand Lotion', result.amount);
                    break;
                case 'Queen-sized Bed Frame':
                    addToInventory('Queen-sized Bed Frame', result.amount);
                    break;
                case 'Organic brown rice':
                    addToInventory('Organic brown rice', result.amount);
                    break;
                case 'Backstreet Boys Best Hits Album':
                    addToInventory('Backstreet Boys Best Hits Album', result.amount);
                    break;
                case 'Women\'s Black Yoga Pants':
                    addToInventory('Women\'s Black Yoga Pants', result.amount);
                    break;
                case 'Stainless Steel Band':
                    addToInventory('Stainless Steel Band', result.amount);
                    break;
                case 'Nike Air Running Shoes':
                    addToInventory('Nike Air Running Shoes', result.amount);
                    break;
                case 'Aquqmarine Throw Pillow':
                    addToInventory('Aquqmarine Throw Pillow', result.amount);
                    break;
                case 'Hydroflask Water Bottle':
                    addToInventory('Hydroflask Water Bottle', result.amount);
                    break;
                case 'iPhone 6 Otterbox':
                    addToInventory('iPhone 6 Otterbox', result.amount);
                    break;
            }
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