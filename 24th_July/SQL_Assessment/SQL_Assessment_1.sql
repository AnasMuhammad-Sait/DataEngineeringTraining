create database assessmentDB;
use assessmentDB;

-- SQL Assessment Personal Fitness Tracker
-- Create Exercises table 1
create table Exercises (
  exercise_id INT PRIMARY KEY,
  exercise_name VARCHAR(50),
  category VARCHAR(20),
  calories_burn_per_min INT
);

-- Create WorkoutLog table 2
create table WorkoutLog (
  log_id INT PRIMARY KEY,
  exercise_id INT,
  date DATE,
  duration_min INT,
  mood VARCHAR(20),
  FOREIGN KEY (exercise_id) REFERENCES Exercises(exercise_id)
);

-- Insert sample data into Exercises
Insert into Exercises values
(1, 'Running', 'Cardio', 10),
(2, 'Cycling', 'Cardio', 8),
(3, 'Weight Lifting', 'Strength', 6),
(4, 'Yoga', 'Flexibility', 4),
(5, 'Swimming', 'Cardio', 11);

-- Insert sample data into WorkoutLog
Insert into WorkoutLog values
(1, 1, '2025-03-02', 30, 'Energized'),
(2, 2, '2025-03-03', 40, 'Tired'),
(3, 3, '2025-03-04', 25, 'Normal'),
(4, 4, '2025-03-05', 60, 'Energized'),
(5, 5, '2025-03-06', 45, 'Tired'),
(6, 1, '2025-03-08', 20, 'Normal'),
(7, 2, '2025-03-10', 35, 'Tired'),
(8, 3, '2025-03-11', 20, 'Normal'),
(9, 4, '2025-02-20', 50, 'Tired'),
(10, 5, '2025-02-22', 60, 'Energized');

-- Queries to Practice
-- Basic Queries 
-- 1
select * from exercises where category = "cardio";

-- 2 
select * from workoutlog where month(date)=3 and year(date)=2025;

-- Calculations
-- 3 
select w.log_id, e.exercise_id, w.duration_min, e.calories_burn_per_min * w.duration_min as calorie_burned from workoutlog w
join exercises e on e.exercise_id = w.exercise_id;

-- 4
select e.category, avg(w.duration_min) from workoutlog w
join exercises e on e.exercise_id = w.exercise_id
group by e.category;

-- Join & Aggregation
-- 5 
select e.exercise_name, w.date, w.duration_min, e.calories_burn_per_min * w.duration_min as calories_burned from exercises e 
join workoutlog w on e.exercise_id = w.exercise_id;

-- 6
select w.date, sum(w.duration_min * e.calories_burn_per_min) as total_calories from workoutlog w
join exercises e on w.exercise_id = e.exercise_id
group by w.date;

-- Subqueries
-- 7 
select e.exercise_name, sum(w.duration_min * e.calories_burn_per_min) as total_calories from workoutlog w 
join exercises e on w.exercise_id = e.exercise_id
group by e.exercise_name
order by total_calories desc
limit 1;

-- 8
select * from exercises
where exercise_id not in (select distinct exercise_id from workoutlog);

-- Conditional and text filters
-- 9 
select * from workoutlog 
where mood = 'Tired' and duration_min > 30;

-- 10
update workoutlog
set mood = 'Energized'
where log_id = 2;

-- Update and Delete 
-- 11
update exercises
set calories_burn_per_min = 12
where exercise_name = 'Running';

-- 12
delete from workoutlog
where month(date) = 2 and year(date) = 2024;



