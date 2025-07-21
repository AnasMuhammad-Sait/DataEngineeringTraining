Create Database SQLAssignment;
use SQLAssignment;

-- Assignment 1

-- Creation Of Tables
CREATE TABLE employees (
emp_id INT PRIMARY KEY,
emp_name VARCHAR(100),
department VARCHAR(50),
salary INT,
age INT
);

CREATE TABLE departments (
dept_id INT PRIMARY KEY,
dept_name VARCHAR(50),
location VARCHAR(50)
);

-- Inserting values into tables
INSERT INTO employees VALUES
(101, 'Amit Sharma', 'Engineering', 60000, 30),
(102, 'Neha Reddy', 'Marketing', 45000, 28),
(103, 'Faizan Ali', 'Engineering', 58000, 32),
(104, 'Divya Mehta', 'HR', 40000, 29),
(105, 'Ravi Verma', 'Sales', 35000, 26);

INSERT INTO departments VALUES
(1, 'Engineering', 'Bangalore'),
(2, 'Marketing', 'Mumbai'),
(3, 'HR', 'Delhi'),
(4, 'Sales', 'Chennai');

-- Section A 
-- 1
SELECT * FROM employees;

-- 2
SELECT emp_name, salary from employees;

-- 3 
SELECT emp_name, salary from employees where salary > 40000;

-- 4
SELECT * from employees where age between 28 and 32;

-- 5 
SELECT * from employees where department != "HR";

-- 6 
SELECT * from employees order by salary desc;

-- 7
SELECT COUNT(emp_id) as EmployeeCount from employees;

-- 8
SELECT * from employees
ORDER BY salary DESC
LIMIT 1;

-- SECTION B 
-- 1
SELECT e.emp_name,d.location from employees e join departments d 
on e.department = d.dept_name;

-- 2
SELECT e.department, COUNT(*) as EmployeeCount from employees e
group by e.department;

-- 3
select department, avg(salary) as avg_salary
from employees 
group by department;

-- 4 
select d.dept_name from departments d 
left join employees e on d.dept_name = e.department
where e.emp_id Is null; 

-- 5
select department, sum(salary) as total_salary
from employees
group by department;

-- 6 
select department, avg(salary) as avg_salary
from employees
group by department
having avg(salary) > 45000;

-- 7 
select emp_name, department
from employees
where salary > 50000;


