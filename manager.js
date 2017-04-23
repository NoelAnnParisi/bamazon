const inquirer = require('inquirer');
const prompt = require('prompt');
const mysql = require('mysql');
// const { addToInventory } = require('./addinventory');
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
    viewProducts() {
        this.getItems((err, result) => {
            console.table(result);
            this.chooseAction();
        })
    }
    viewLowInventory() {
        this.getItems((err, result) => {
            if (err) {
                return console.log(err);
            }
            result.forEach(item => {
                if (item.stock_quantity <= 15) {
                    console.log(`You have ${item.stock_quantity} units left of ${item.product_name}`);
                }
            })
            this.chooseAction();
        });
    }
    obtainItems() {
        this.getItems((err, result) => {
            const arrayOfItems = result.map(row => row.product_name);
            return this.chooseItemToAdd(arrayOfItems);
        });
    }
    chooseItemToAdd(arr) {
        addItemPrompt[0].choices = arr;
        return inquirer.prompt(addItemPrompt).then((result) => {
            this.addToInventory(result.item, result.amount);
        });
    }
    addToInventory(productName, amount) {
        const amountToAdd = parseInt(amount);
        connection.query('SELECT stock_quantity from products where product_name = ?', [productName], (err, res) => {
            const currentAmount = res[0].stock_quantity;
            const newAmount = amountToAdd + currentAmount
            connection.query('UPDATE products SET stock_quantity = ? WHERE product_name= ?', [newAmount, productName], (err, res) => {
                console.log(`${productName} now has ${newAmount}, units!`);
                this.chooseAction();
            });
        });
    }
    addNewProduct() {
        prompt.start();
        prompt.get(propertiesAddItem, (err, result) => {
            console.log(result);
            connection.query('INSERT INTO products SET ?', result, (err, res) => {
                console.log('You\'ve added an item!');
                this.chooseAction();
            });
        });
    }
}

exports.Manager = Manager;
