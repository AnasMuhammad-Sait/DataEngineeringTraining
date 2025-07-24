use assessmentDB;

-- Assessment 3 
-- Pet Clinic Management
-- Create and Insert Values into Pets - Table 1 
CREATE TABLE Pets (
pet_id INT PRIMARY KEY,
name VARCHAR(50),
type VARCHAR(20),
breed VARCHAR(50),
age INT,
owner_name VARCHAR(50)
);
INSERT INTO Pets VALUES
(1, 'Buddy', 'Dog', 'Golden Retriever', 5, 'Ayesha'),
(2, 'Mittens', 'Cat', 'Persian', 3, 'Rahul'),
(3, 'Rocky', 'Dog', 'Bulldog', 6, 'Sneha'),
(4, 'Whiskers', 'Cat', 'Siamese', 2, 'John'),
(5, 'Coco', 'Parrot', 'Macaw', 4, 'Divya'),
(6, 'Shadow', 'Dog', 'Labrador', 8, 'Karan');

-- Create and Insert Values into Visits - Table 2 
CREATE TABLE Visits (
visit_id INT PRIMARY KEY,
pet_id INT,
visit_date DATE,
issue VARCHAR(100),
fee DECIMAL(8,2),
FOREIGN KEY (pet_id) REFERENCES Pets(pet_id)
);
INSERT INTO Visits VALUES
(101, 1, '2024-01-15', 'Regular Checkup', 500.00),
(102, 2, '2024-02-10', 'Fever', 750.00),
(103, 3, '2024-03-01', 'Vaccination', 1200.00),
(104, 4, '2024-03-10', 'Injury', 1800.00),
(105, 5, '2024-04-05', 'Beak trimming', 300.00),
(106, 6, '2024-05-20', 'Dental Cleaning', 950.00),
(107, 1, '2024-06-10', 'Ear Infection', 600.00);

-- Query Tasks
-- Basic Queries
-- 1
 select * from pets 
 where type = 'dog';
 
-- 2
select * from visits 
where fee > 800;

-- Joins 
-- 3 
select p.name, p.type, v.issue from pets p
join visits v on p.pet_id = v.pet_id;

-- 4 
select p.name as pet_name, COUNT(v.visit_id) as total_visits from pets p
left join visits v on p.pet_id = v.pet_id
group by p.pet_id, p.name;

-- Aggregation 
-- 5 
select SUM(fee) as total_revenue
from Visits;

-- 6 
select type, avg(age) as avg_age from pets
group by type;

-- Date and Filters 
-- 7 
select * from visits
where month(visit_date)=3;

-- 8 
select p.name as pet_name, COUNT(v.visit_id) as visits from pets p
join visits v on p.pet_id = v.pet_id
group by p.pet_id, p.name
having COUNT(v.visit_id) > 1;

-- Subqueries 
-- 9 
select p.name, v.fee, v.issue from visits v
join pets p on v.pet_id = p.pet_id
where v.fee = (select MAX(fee) from visits);

-- 10 
select * from Pets
where pet_id not in (select distinct pet_id from visits);

-- Update and Delete
-- 11 
update visits
set fee = 350.00
where visit_id = 105;

-- 12 
delete from Visits
where visit_date < '2024-02-01';
