CREATE DATABASE CustomerOrderDB;
USE CustomerOrderDB;

-- Customers Table
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    city VARCHAR(50)
);

-- Orders Table
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    delivery_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Delivery Status Table
CREATE TABLE delivery_status (
    delivery_id INT PRIMARY KEY,
    order_id INT,
    status VARCHAR(50),
    expected_delivery DATE,
    actual_delivery DATE,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- INSERT
INSERT INTO customers VALUES (101, 'Aman Verma', 'aman@example.com', 'Mumbai');
INSERT INTO orders VALUES (1, 101, '2024-07-01', '2024-07-05');

-- READ
SELECT * FROM orders;
SELECT * FROM customers;

-- UPDATE
UPDATE orders SET delivery_date = '2024-07-06' WHERE order_id = 1;

-- DELETE
DELETE FROM orders WHERE order_id = 1;
DELETE FROM customers WHERE customer_id=101;

-- Creating a Stored Procedure To Fetch All Delayed Deliveries.
DELIMITER $$

CREATE PROCEDURE GetDelayedDeliveries(IN cid INT)
BEGIN
    SELECT o.order_id, o.order_date, ds.actual_delivery, ds.expected_delivery
    FROM orders o
    JOIN delivery_status ds ON o.order_id = ds.order_id
    WHERE o.customer_id = cid
      AND ds.actual_delivery > ds.expected_delivery;
END $$

DELIMITER ;
