DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;
USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("chair", "furniture", 18.50, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("table", "furniture", 150.25, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("socks", "clothing", 3.75, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("hat", "clothing", 5.50, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("earphones", "electronics", 35.80, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("laptop", "electronics", 650.25, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("drums", "instruments", 80.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("clarinet", "instruments", 300.75, 45);