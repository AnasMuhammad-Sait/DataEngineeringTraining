use assessmentdb;
    
-- SQL Assessment Travel Planner
-- Destinations table
create table Destinations (
  destination_id INT PRIMARY KEY,
  city VARCHAR(50),
  country VARCHAR(50),
  category VARCHAR(30),
  avg_cost_per_day INT
);

-- Trips table
create table Trips (
  trip_id INT PRIMARY KEY,
  destination_id INT,
  traveler_name VARCHAR(50),
  start_date DATE,
  end_date DATE,
  budget INT,
  FOREIGN KEY (destination_id) REFERENCES Destinations(destination_id)
);

-- Insert Values into tables 
-- Destinations
insert into Destinations values
(1, 'Goa', 'India', 'Beach', 2500),
(2, 'Paris', 'France', 'Historical', 4000),
(3, 'Manali', 'India', 'Nature', 2000),
(4, 'Cape Town', 'South Africa', 'Adventure', 3500),
(5, 'Kyoto', 'Japan', 'Historical', 3000),
(6, 'Bali', 'Indonesia', 'Beach', 2800);

-- Trips
insert into Trips values
(101, 1, 'Alice', '2024-12-01', '2024-12-07', 20000),
(102, 2, 'Bob', '2023-07-10', '2023-07-15', 25000),
(103, 3, 'Charlie', '2025-03-01', '2025-03-12', 35000),
(104, 4, 'David', '2022-11-01', '2022-11-10', 28000),
(105, 5, 'Eve', '2023-08-15', '2023-08-22', 32000),
(106, 1, 'Frank', '2023-01-05', '2023-01-09', 15000),
(107, 6, 'Grace', '2025-05-01', '2025-05-05', 12000),
(108, 2, 'Alice', '2024-06-10', '2024-06-18', 33000),
(109, 3, 'Bob', '2025-02-10', '2025-02-14', 18000),
(110, 6, 'Charlie', '2024-10-01', '2024-10-08', 19000);

-- Query Task
-- Basic Queries 
-- 1
select t.* from Trips t
join Destinations d on t.destination_id = d.destination_id
where d.country = 'India';

-- 2
select * from Destinations
where avg_cost_per_day < 3000;

-- Date and Duration 
-- 3
select trip_id, traveler_name, datediff(end_date, start_date) + 1 as duration_days from Trips;

-- 4 
select * from Trips
where datediff(end_date, start_date) + 1 > 7;

-- Join & Aggregation 
-- 5 
select t.traveler_name, d.city,(datediff(t.end_date, t.start_date) + 1) * d.avg_cost_per_day as total_cost from Trips t
join Destinations d on t.destination_id = d.destination_id;

-- 6 
select d.country, COUNT(*) as total_trips from Trips t
join Destinations d on t.destination_id = d.destination_id
group by d.country;

-- Grouping and Filtering 
-- 7 
select d.country, avg(t.budget) as avg_budget from Trips t
join Destinations d on t.destination_id = d.destination_id
group by d.country;

-- 8 
select traveler_name, COUNT(*) as trip_count from Trips
group by traveler_name
order by trip_count desc
limit 1;

-- Subqueries 
-- 9 
select * from Destinations
where destination_id not in (select distinct destination_id from Trips);

-- 10 
select t.*, t.budget / (DATEDIFF(t.end_date, t.start_date) + 1) as cost_per_day from Trips t
order by cost_per_day desc
limit 1;

-- Update and Delete 
-- 11 
update Trips set end_date = DATE_ADD(end_date, INTERVAL 3 DAY), 
budget = budget + (SELECT avg_cost_per_day FROM Destinations WHERE destination_id = Trips.destination_id) * 3
WHERE trip_id = 101;

-- 12
delete from Trips
where end_date < '2023-01-01';



