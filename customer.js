const { properties, identifyUser, buyMorePrompt } = require('./prompts');
const { Manager } = require('./manager');
const colors = require("colors/safe");
const prompt = require('prompt');
const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

class Marketplace {
    displayInventory(hollaback) {
        connection.query('SELECT * from products', (err, result) => {
            console.table(result);
            hollaback();
        });
    }
    startInteraction() {
        this.displayInventory(() => {
            inquirer.prompt(identifyUser).then(response => {
                if (response.user === 'Customer') {
                    prompt.get(properties, (err, result) => {
                        this.checkBamazonInventory(result.id, result.amount);
                    })
                } else {
                    const StoreManager = new Manager();
                    StoreManager.chooseAction();
                }
            });
        });
    }
    checkBamazonInventory(id, amount, hollaback) {
        connection.query('SELECT * FROM products where item_id = ?', [id], (err, res) => {
            if (res.length === 0) {
                console.log("We don't seem to have that item. Please, try again.");
                prompt.get(properties, (err, result) => {
                    this.checkBamazonInventory(result.id, result.amount);
                })
            } else {
                const quantity = res[0].stock_quantity
                if (amount >= (quantity)) {
                    console.log(`Insufficient quantity, there's only ${quantity} left!`);
                    prompt.get(properties, (err, result) => {
                        this.checkBamazonInventory(result.id, result.amount);
                    })
                } else {
                    let amountLeft = res[0].stock_quantity - amount;
                    this.updateDB(id, amount, amountLeft);
                }
            }
        });
    }
    updateDB(id, amountPurchased, amountRemaining) {
        connection.query('UPDATE products SET stock_quantity = ? WHERE item_id= ?', [amountRemaining, id], (err, res) => {
            if (!err) {
                console.log(`Thank you, you're purchase is complete.`);
                console.log(`Now, we only have ${amountRemaining} left in stock!`);
                this.calculateTotal(id, amountPurchased)
                    .then(() => {
                        inquirer.prompt(buyMorePrompt).then(response => {
                            const buyMore = response.continue;
                            if (buyMore === 'Yes please!') {
                                this.startInteraction();
                            } else {
                                console.log('See you later!');
                            }
                        });
                    })
                    .catch(error =>{
                        // handle error
                    });
            } else {
                console.log(err);
            }
        });
    }
    calculateTotal(id, quantity) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT price FROM products WHERE item_id = ?', [id], (err, res) => {
                if (!err) {
                    let total = parseInt(quantity) * res[0].price;
                    resolve(total);
                    console.log(`Your total is ${total}`);
                    reject(connection.error);
                }
            });
        });
    }
        // this needs to be resolved and their total needs to be displayed before inquire
        // once that is done then prompt user to buy more
        // inquirer.prompt(buyMorePrompt).then(response => {
        //     const buyMore = response.continue;
        //     if (buyMore === 'Yes please!') {
        //         this.startInteraction();
        //     } else {
        //         console.log('See you later!');
        //     }
        // });
}
exports.Marketplace = Marketplace;
