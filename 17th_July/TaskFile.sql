Create database taskdb;
use taskdb;

Create table departments(
  dept_id INT PRIMARY key,
  dept_name VARCHAR (100)
);

Insert Into departments values
(1,'Human Resources'),
(2,'Engineering'),
(3,'Marketing');

Create table employees(
emp_id INT PRIMARY key,
emp_name Varchar(100),
dept_id INT,
salary INT,
foreign key (dept_id) references departments(dept_id)
);

Insert into employees
values 
(101,'Amit Sharma',1,30000),
(102,'Neha Reddy',2,45000),
(103,'Faizan Ali',2,40000),
(104,'Divya Mehta',3,35000),
(105,'Ravi Verma',Null,20000);

select e.emp_name, d.dept_name from employees e
left join departments d on e.dept_id = d.dept_id;

select e.emp_name from employees e where e.dept_id Is Null;

select d.dept_name, count(e.emp_id) as Employee_count from departments d
left join employees e on e.dept_id = d.dept_id
group by dept_name;

SELECT d.dept_id, d.dept_name
FROM departments d
LEFT JOIN employees e ON d.dept_id = e.dept_id
WHERE e.emp_id IS NULL;

SELECT e.emp_name, d.dept_name, e.salary
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
WHERE e.salary > 40000;

