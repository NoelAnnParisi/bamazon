const inquirer = require('inquirer');
const mysql = require('mysql');
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

                    // case 'Add New Product':
                    //     break;
            }
        });

    }

    obtainItems() {
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
        // If a manager selects View Low Inventory, then it should list all items 
        //with a inventory count lower than five.
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
        // If a manager selects Add to Inventory, your app should display a 
        //prompt that will let the manager "add more" of any item currently in the store.
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
                    const amountToAdd = parseInt(result.amount);
                    connection.query('SELECT stock_quantity from products where product_name = ?', ['Coffee Sented Hand Lotion'], (err, res) => {
                        const currentAmount = res[0].stock_quantity;
                        const newAmount = amountToAdd + currentAmount
                        connection.query('UPDATE products SET stock_quantity = ? WHERE product_name= ?', [newAmount, 'Coffee Sented Hand Lotion'], (err, res) => {
                            console.log(item, 'now has', newAmount, 'units!');
                        })
                    })
                    break;
                case 'Queen-sized Bed Frame':
                    const amountToAdd = parseInt(result.amount);
                    connection.query('SELECT stock_quantity from products where product_name = ?', ['Queen-sized Bed Frame'], (err, res) => {
                        const currentAmount = res[0].stock_quantity;
                        const newAmount = amountToAdd + currentAmount
                        connection.query('UPDATE products SET stock_quantity = ? WHERE product_name= ?', [newAmount, 'Queen-sized Bed Frame'], (err, res) => {
                            console.log(item, 'now has', newAmount, 'units!');
                        })
                    })
                    break;
                case 'Organic brown rice ':
                    break;
                case 'Backstreet Boys Best Hits Album':
                    break;
                case 'Women\'s Black Yoga Pants':
                    break;
                case 'Stainless Steel Band':
                    break;
                case 'Nike Air Running Shoes':
                    break;
                case 'Aquqmarine Throw Pillow':
                    break;
                case 'Hydroflask Water Bottle':
                    break;
                case 'iPhone 6 Otterbox':
            }

        });

    }

    // // If a manager selects Add New Product, it should allow the manager to 
    // //add a completely new product to the store.
    // function addNewProduct() {

    // }
}

exports.Manager = Manager;
