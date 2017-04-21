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
};

const propertiesAddItem = {
    properties: {
        product_name: {
            name: 'product_name',
            message: 'What is the name of the item you\'d like to add?'
        },

        department_name: {
            name: 'department_name',
            message: 'What department does your item belong in?'
        },

        price: {
            name: 'price',
            message: 'How much will each unit cost?',
            validator: /^\d+\.\d{0,2}$/,
            warning: 'Sorry, please enter a number'
        },

        stock_quantity: {
            name: 'stock_quantity',
            message: 'How many units are you adding?',
            validator: /^[0-9]*$/,
            warning: 'Sorry, please enter a number'
        }
    }
}
module.exports = {
    properties: properties,
    propertiesAddItem: propertiesAddItem
}
