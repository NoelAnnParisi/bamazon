USE bamazon_db;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(500) not null,
  department_name varchar(300),
  price double(10,2) not null,
  stock_quantity integer(10) not null,
  PRIMARY KEY (item_id)
);

insert into products(product_name, department_name, price, stock_quantity)
values('Coffee Sented Hand Lotion', 'self-care', 5.00, 600);

insert into products(product_name, department_name, price, stock_quantity)
values('Queen-sized Bed Frame', 'home-goods', 220.10, 80);

insert into products(product_name, department_name, price, stock_quantity)
values('Organic brown rice', 'Bamazon Phresh', 4.50, 200);

insert into products(product_name, department_name, price, stock_quantity)
values('Backstreet Boys Best Hits Album', 'Music', 12.99, 1000);

insert into products(product_name, department_name, price, stock_quantity)
values('Women\'s Black Yoga Pants', 'Bamazon Phasion', 22.78, 540);

insert into products(product_name, department_name, price, stock_quantity)
values('Stainless Steel Band', 'Bamazon Phasion', 199.89, 290);

insert into products(product_name, department_name, price, stock_quantity)
values('Nike Air Running Shoes', 'Athletic Wear', 124.43, 110);

insert into products(product_name, department_name, price, stock_quantity)
values('Aquqmarine Throw Pillow', 'Home decor', 15.67, 375);

insert into products(product_name, department_name, price, stock_quantity)
values('Hydroflask Water Bottle', 'self-care', 55.00, 346);

insert into products(product_name, department_name, price, stock_quantity)
values('iPhone 6 Otterbox', 'self-care', 37.99, 79);

select * from products;