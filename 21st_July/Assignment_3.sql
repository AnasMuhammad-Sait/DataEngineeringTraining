use sqlassignment;
-- Assignment 3
-- PART 1 Design the Database
create table books(
	book_id INT PRIMARY KEY,
    title VARCHAR(100),
    author VARCHAR(100),
    genre VARCHAR(50),
    price DECIMAL(10,2)
);

create table customers(
	customer_id INT PRIMARY KEY,
    name Varchar(100),
    email varchar(100),
    city varchar(100)
);

create table orders(
order_id INT PRIMARY KEY,
customer_id INT,
book_id INT,
order_date DATE,
quantity INT,
foreign key (customer_id) references customers(customer_id),
foreign key (book_id) references books(book_id)
);

-- PART 2 Insert Sample Data 

insert into books values 
(1, 'The Silent Patient', 'Alex Michaelides', 'Thriller', 650.00),
(2, 'Atomic Habits', 'James Clear', 'Self-help', 550.00),
(3, 'To Kill a Mockingbird', 'Harper Lee', 'Fiction', 480.00),
(4, 'Educated', 'Tara Westover', 'Memoir', 720.00),
(5, '1984', 'George Orwell', 'Dystopian', 500.00);

INSERT INTO customers VALUES
(1, 'Gill', 'Gill@gmail.com', 'Punjab'),
(2, 'Sara', 'sara@gmail.com', 'Mumbai'),
(3, 'Rahul', 'rahul@gmail.com', 'Delhi'),
(4, 'Neha', 'neha@gmail.com', 'Hyderabad'),
(5, 'Sachin', 'Sachin@gmail.com', 'Chennai');

INSERT INTO orders VALUES
(1, 1, 1, '2023-01-05', 1),
(2, 2, 2, '2023-02-10', 2),
(3, 3, 3, '2022-12-25', 1),
(4, 4, 4, '2023-03-15', 1),
(5, 5, 2, '2023-01-20', 1),
(6, 1, 5, '2023-05-01', 2),
(7, 2, 1, '2023-06-10', 1);

-- PART 3 Write and execute Queries
-- Basic Queries 
-- 1
Select * from books where price >500;

-- 2 
Select * from customers where city = 'hyderabad';

-- 3
insert into orders values(8,5,1,'2023-01-01',2);
select * from orders where order_date = '2023-01-01';

-- Join and Aggregations
-- 4 
select c.name, b.title from orders o
join customers c on o.customer_id = c.customer_id 
join books b on o.book_id = b.book_id;

-- 5
select b.genre, SUM(o.quantity) as total_books_sold from orders o
join books b on o.book_id = b.book_id
group by b.genre;

-- 6
select b.title, SUM(b.price * o.quantity) as total_sales from orders o
join books b on o.book_id = b.book_id
group by b.title;

-- 7 
select c.name, count(*) as total_num from orders o
left join customers c on o.customer_id = c.customer_id
group by c.name
order by total_num desc
limit 1;

-- 8 
select genre, avg(price) as Average_Price from books
group by genre;

-- 9 
select b.title from books b
left join orders o on b.book_id = o.book_id
where o.book_id is null;

-- 10
select c.name, SUM(b.price * o.quantity) as total_spent from orders o
join customers c on o.customer_id = c.customer_id
join books b on o.book_id = b.book_id
group by c.name
order by total_spent desc
limit 1;





