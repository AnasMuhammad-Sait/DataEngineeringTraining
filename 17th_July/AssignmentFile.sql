Create database retail_store;
use retail_store;

CREATE TABLE Products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    category VARCHAR(50),
    price DECIMAL(10,2),
    stock_quantity INT,
    added_date DATE
);

INSERT INTO Products (product_id, product_name, category, price, stock_quantity, added_date)
VALUES 
(1, 'Smartphone', 'Electronics', 1499.99, 25, '2024-12-15'),
(2, 'Sofa Set', 'Furniture', 1899.00, 8, '2023-06-20'),
(3, 'Study Table', 'Furniture', 850.00, 0, '2023-02-01'),
(4, 'Smartwatch', 'Electronics', 1999.00, 12, '2025-01-10'),
(5, 'Shoes Rack', 'Furniture', 499.00, 15, '2022-10-30');

Select * from products;
 
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    city VARCHAR(50)
);
 
 
INSERT INTO customers VALUES
(1, 'Amit Sharma', 'Delhi'),
(2, 'Neha Reddy', 'Hyderabad'),
(3, 'Rahul Iyer', 'Mumbai'),
(4, 'Divya Mehta', 'Chennai');
 
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    product_name VARCHAR(100),
    order_amount INT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
 
INSERT INTO orders VALUES
(101, 1, 'Laptop', 55000),
(102, 2, 'Mouse', 500),
(103, 1, 'Keyboard', 1500),
(104, 3, 'Monitor', 7000),
(105, 2, 'Printer', 8500);

Select customers.customer_name, orders.product_name, orders.order_amount
from customers
inner join orders on customers.customer_id=orders.order_id;	

Select customers.customer_name, orders.product_name
from customers 
left join orders 
on customers.customer_id = orders.order_id;

Select customers.customer_name, orders.product_name
from customers 
right join orders 
on customers.customer_id = orders.order_id;

Select customer_name, product_name
from customers 
join orders 
on customers.customer_id = orders.order_id 
where order_amount >5000;

select c.customer_name from customers c 
left join orders o  on c.customer_id = o.customer_id
where o.order_id IS NULL;

select c.city, count(o.order_id) as order_count
from customers c 
join orders o on c.customer_id = o.customer_id
group by c.city;