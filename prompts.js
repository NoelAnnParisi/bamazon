const properties = {
    properties: {
        // The first should ask them the ID of the product they would like to buy.
        id: {
            name: 'id',
            message: 'Type in the item_id of the item you want to buy',
            validator: /^[0-9]*$/,
            warning: 'Sorry, please enter an id number found in the table above'
        },
        // The second message should ask how many units of the product they would like to buy.
        amount: {
            name: 'amount',
            message: 'How many would you like to buy?',
            validator: /^[0-9]*$/,
            warning: 'Sorry, please enter a whole number',
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
            warning: 'Please enter dollar and cents!'
        },

        stock_quantity: {
            name: 'stock_quantity',
            message: 'How many units are you adding?',
            validator: /^[0-9]*$/,
            warning: 'Sorry, please enter a whole number'
        }
    }
};

const identifyUser = [{
    type: 'list',
    name: 'user',
    message: 'Are you a customer or a store manager?',
    choices: ['Customer', 'Manager']
}];

const buyMorePrompt = [{
    type: 'list',
    name: 'continue',
    message: 'Would you like to buy anything else?',
    choices: ['Yes please!', 'No but thanks!']
}];

const addItemPrompt = [{
    type: 'list',
    name: 'item',
    message: 'Which item would you like to restock?',
    choices: []
}, {
    type: 'input',
    name: 'amount',
    message: 'How many items are you adding to your inventory today?',
    validate: val => {
        if (/^[0-9]*$/.test(val)) {
            return true
        }
        return "Please enter an integer";
    }
}];

const managerChooseAction = [{
    type: 'list',
    name: 'action',
    message: 'What would you like to do today?',
    choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
}];

module.exports = {
    properties: properties,
    propertiesAddItem: propertiesAddItem,
    identifyUser: identifyUser,
    buyMorePrompt: buyMorePrompt,
    addItemPrompt: addItemPrompt,
    managerChooseAction: managerChooseAction
}
