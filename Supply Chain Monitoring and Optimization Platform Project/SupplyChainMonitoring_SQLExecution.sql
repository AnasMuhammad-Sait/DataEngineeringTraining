CREATE DATABASE supplychaindb;
USE supplychaindb;

-- Create Suppliers Table
CREATE TABLE suppliers (
    supplier_id INT PRIMARY KEY,
    supplier_name VARCHAR(100),
    contact_email VARCHAR(100)
);

-- Create Inventory Table
CREATE TABLE inventory (
    item_id INT PRIMARY KEY,
    item_name VARCHAR(100),
    stock_quantity INT,
    reorder_level INT
);

-- Create Orders Table
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    item_id INT,
    supplier_id INT,
    quantity_ordered INT,
    order_date DATE,
    delivery_date DATE,
    FOREIGN KEY (item_id) REFERENCES inventory(item_id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
);

-- INSERT
INSERT INTO suppliers VALUES (1, 'ABC Corp', 'abc@example.com');
INSERT INTO inventory VALUES (101, 'Steel Rods', 50, 20);
INSERT INTO orders VALUES (201, 101, 1, 30, '2025-07-20', '2025-07-23');

-- READ
SELECT * FROM orders;

-- UPDATE
UPDATE inventory SET stock_quantity = stock_quantity - 30 WHERE item_id = 101;

-- DELETE
DELETE FROM orders WHERE order_id = 201;

-- Auto Reorder Stored Procedure

DELIMITER $$

CREATE PROCEDURE AutoReorder()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE v_item_id INT;
    DECLARE v_stock INT;
    DECLARE v_reorder INT;
    DECLARE cur CURSOR FOR SELECT item_id, stock_quantity, reorder_level FROM inventory;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO v_item_id, v_stock, v_reorder;
        IF done THEN
            LEAVE read_loop;
        END IF;
        IF v_stock <= v_reorder THEN
            INSERT INTO orders(item_id, supplier_id, quantity_ordered, order_date, delivery_date)
            VALUES (v_item_id, 1, 50, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 3 DAY));
        END IF;
    END LOOP;
    CLOSE cur;
END$$

DELIMITER ;





