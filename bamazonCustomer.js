var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.database_pw,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "choice",
                type: "rawlist",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].product_name);
                    }
                    // display all items for sale (ids, names, prices)
                    return choiceArray;
                },
                // ask user which product they want to buy
                message: "Which item would you like to buy?"
            },
            // ask how many
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to buy?"
            }
        ]).then(function (answer) {
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                if (results[i].product_name === answer.choice) {
                    chosenItem = results[i];
                }
            }
            // check if store has enough quantity
            if (chosenItem.stock_quantity < answer.quantity) {
                console.log("Sorry, insufficient quantity!");
                start();
            } else {
                console.log("Great! We'll get that set up for you.");

                console.log("ID: " + chosenItem.item_id);
                
                // if enough, update database to reflect remaining quantity
                sellInventory(chosenItem.item_id, parseInt(answer.quantity), parseFloat(chosenItem.price));
            }

        });
    });
}


function sellInventory (id, bought, price) {
    var querySQL = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?"
    connection.query(querySQL, [bought,id], function(err, res){
        // after update, show total cost of purchase by multiplying price * quantity bought
        console.log("total: $" + (bought * price));
        start();
    })
}