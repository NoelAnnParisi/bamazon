const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

exports.addToInventory = function(productName) {
	const total = _total(); 
    const amountToAdd = parseInt(result.amount);
    connection.query('SELECT stock_quantity from products where product_name = ?', [productName], (err, res) => {
        const currentAmount = res[0].stock_quantity;
        const newAmount = amountToAdd + currentAmount
        connection.query('UPDATE products SET stock_quantity = ? WHERE product_name= ?', [newAmount, productName], (err, res) => {
            console.log(item, 'now has', newAmount, 'units!');
        })
    })

};

// const { addToInventory } = require('./addToInventory'); 
