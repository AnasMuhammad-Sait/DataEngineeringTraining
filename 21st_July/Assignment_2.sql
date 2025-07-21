use sqlassignment;

-- Assignment 2

-- Create Tables
CREATE TABLE students (
student_id INT PRIMARY KEY,
name VARCHAR(100),
age INT,
gender VARCHAR(10),
department_id INT
);

CREATE TABLE departments1 (
department_id INT PRIMARY KEY,
department_name VARCHAR(100),
head_of_department VARCHAR(100)
);

CREATE TABLE courses (
course_id INT PRIMARY KEY,
course_name VARCHAR(100),
department_id INT,
credit_hours INT
);

-- Insert Values into the tables
INSERT INTO students VALUES
(1, 'Amit Sharma', 20, 'Male', 1),
(2, 'Neha Reddy', 22, 'Female', 2),
(3, 'Faizan Ali', 21, 'Male', 1),
(4, 'Divya Mehta', 23, 'Female', 3),
(5, 'Ravi Verma', 22, 'Male', 2);

INSERT INTO departments1 VALUES
(1, 'Computer Science', 'Dr. Rao'),
(2, 'Electronics', 'Dr. Iyer'),
(3, 'Mechanical', 'Dr. Khan');

INSERT INTO courses VALUES
(101, 'Data Structures', 1, 4),
(102, 'Circuits', 2, 3),
(103, 'Thermodynamics', 3, 4),
(104, 'Algorithms', 1, 3),
(105, 'Microcontrollers', 2, 2);

-- SECTION A BASIC QUERIES
-- 1
SELECT name, age, gender FROM students;

-- 2
SELECT name FROM students WHERE gender = 'Female';

-- 3
SELECT c.course_name
FROM courses c
JOIN departments1 d ON c.department_id = d.department_id
WHERE d.department_name = 'Electronics';

-- 4 
SELECT department_name, head_of_department
FROM departments1
WHERE department_id = 1;

-- 5
SELECT * FROM students WHERE age > 21;

-- SECTION B Intermediate Joins and Aggregations 
-- 6 
SELECT s.name, d.department_name
FROM students s
JOIN departments1 d ON s.department_id = d.department_id;

-- 7 
SELECT d.department_name, COUNT(s.student_id) AS num_students
FROM departments1 d
LEFT JOIN students s ON d.department_id = s.department_id
GROUP BY d.department_name;

-- 8 
SELECT d.department_name, AVG(s.age) AS average_age
FROM departments1 d
JOIN students s ON d.department_id = s.department_id
GROUP BY d.department_name;

-- 9
SELECT c.course_name, d.department_name
FROM courses c
JOIN departments1 d ON c.department_id = d.department_id;

-- 10 
SELECT d.department_name
FROM departments1 d
LEFT JOIN students s ON d.department_id = s.department_id
WHERE s.student_id IS NULL;

-- 11
SELECT d.department_name
FROM departments1 d
JOIN courses c ON d.department_id = c.department_id
GROUP BY d.department_name
ORDER BY COUNT(c.course_id) DESC
LIMIT 1;

-- SECTION C SUBQUERIES AND ADVANCED FILTERS
-- 12
SELECT name,age
FROM students
WHERE age > (SELECT AVG(age) FROM students);

-- 13
SELECT DISTINCT d.department_name
FROM departments1 d
JOIN courses c ON d.department_id = c.department_id
WHERE c.credit_hours > 3;

-- 14
SELECT s.name
FROM students s
WHERE s.department_id = (
  SELECT department_id
  FROM courses
  GROUP BY department_id
  ORDER BY COUNT(*) ASC
  LIMIT 1
);

-- 15
SELECT s.name
FROM students s
JOIN departments1 d ON s.department_id = d.department_id
WHERE d.head_of_department LIKE '%Dr.%';

-- 16
SELECT name, age
FROM students
ORDER BY age DESC
LIMIT 1 OFFSET 1;

-- 17
SELECT c.course_name
FROM courses c
WHERE c.department_id IN (
  SELECT department_id
  FROM students
  GROUP BY department_id
  HAVING COUNT(*) > 2
);
 









