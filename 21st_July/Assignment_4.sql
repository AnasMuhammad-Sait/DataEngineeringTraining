use sqlassignment;

-- Assignment 4 
-- Section 1 Database Design 
Create table movies (
	movie_id int primary key,
    title varchar(100),
    genre varchar(100),
    release_year date,
    rental_rate decimal(10,2)
);

Create table customers1(
	customer_id int primary key,
    name varchar(100),
    email varchar(100),
    city varchar(50)
);

Create table rentals (
    rental_id int primary key,
    customer_id int,
    movie_id int,
    rental_date date,
    return_date date,
    foreign key (customer_id) references customers(customer_id),
    foreign key (movie_id) references movies(movie_id)
);

-- Section 2 Data Insertion
-- Insert movies
insert movies values 
(1, 'Inception', 'Sci-Fi', '2010-01-01', 399.00),
(2, 'The Dark Knight', 'Action','2008-02-02', 499.00),
(3, 'Interstellar', 'Sci-Fi','2014-03-03', 450.00),
(4, 'Tenet', 'Thriller', '2020-01-01', 500.00),
(5, 'Dune', 'Sci-Fi', '2021-04-04', 599.00);

-- Insert customers
insert into customers1 values 
(1, 'Amit Sharma', 'amit.sharma@email.com', 'Mumbai'),
(2, 'Priya Verma', 'priya.verma@email.com', 'Bangalore'),
(3, 'Ravi Kumar', 'ravi.kumar@email.com', 'Delhi'),
(4, 'Sneha Reddy', 'sneha.reddy@email.com', 'Hyderabad'),
(5, 'Ankit Mehra', 'ankit.mehra@email.com', 'Bangalore');

-- Insert rentals
insert into rentals values
(1, 1, 1, '2023-06-10', '2023-06-12'),
(2, 1, 3, '2023-07-01', '2023-07-03'),
(3, 2, 2, '2023-06-15', '2023-06-18'),
(4, 3, 4, '2023-06-20', '2023-06-23'),
(5, 3, 5, '2023-07-05', NULL),
(6, 2, 1, '2023-07-10', '2023-07-13'),
(7, 4, 3, '2023-07-11', '2023-07-13'),
(8, 1, 5, '2023-07-15', NULL);

-- Section 3 Query and Exceution
-- Basic Queries 
-- 1
select m.title from rentals r 
join  customers1 c on r.customer_id = c.customer_id
join movies m on r.movie_id = m.movie_id
where c.name = 'Amit Sharma';

-- 2 
select * from customers1
where city ='Bangalore'; 

-- 3 
select * from movies 
where release_year > 2020;

-- 4 
select name, count(*) as total_movies_rented from rentals r 
join  customers1 c on r.customer_id = c.customer_id
join movies m on r.movie_id = m.movie_id
group by name;

-- 5
select m.title, COUNT(r.rental_id) as times_rented from movies m
join rentals r on m.movie_id = r.movie_id
group by m.movie_id
order by times_rented desc
limit 1;

-- 6 
select SUM(m.rental_rate) as total_revenue from rentals r
join movies m on r.movie_id = m.movie_id;

-- 7 
select c.name from customers1 c
left join rentals r on c.customer_id = r.customer_id
where r.rental_id is null;

-- 8
select m.genre, SUM(m.rental_rate) as genre_revenue from rentals r
join movies m on r.movie_id = m.movie_id
group by m.genre;

-- 9
select c.name, SUM(m.rental_rate) as total_spent from rentals r
join customers c on r.customer_id = c.customer_id
join movies m on r.movie_id = m.movie_id
group by c.customer_id
order by total_spent desc
limit 1;

-- 10
select distinct m.title from rentals r
join movies m on r.movie_id = m.movie_id
where r.return_date is null;






