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
module.exports = properties;