# 1. BMI Calculator
import math

def calc_bmi(weight, height):
    return weight / math.pow(height, 2)

weight = float(input("Enter your weight (kg): "))
height = float(input("Enter your height (m): "))
bmi = calc_bmi(weight, height)

print(f"Your BMI is: {bmi:.2f}")

if bmi < 18.5:
    print("Underweight")
elif bmi < 25:
    print("Normal")
else:
    print("Overweight")

# 2. Strong password checker
import string

def is_strong(password):
    has_capital = any(ch.isupper() for ch in password)
    has_number = any(ch.isdigit() for ch in password)
    has_special = any(ch in "!@#$" for ch in password)
    return has_capital and has_number and has_special

while True:
    pwd = input("Enter password: ")
    if is_strong(pwd):
        print("Strong password!")
        break
    else:
        print("Password must have at least 1 capital, 1 number, and 1 special (!@#$)")

# 3. Weekly expense calculator
def analyze_expenses(expenses):
    total = sum(expenses)
    avg = total / len(expenses)
    max_day = max(expenses)
    print("Total Spent:", total)
    print("Average per Day:", avg)
    print("Highest Spent in a Day:", max_day)

expenses = []
for i in range(1, 8):
    amt = float(input(f"Enter expense for day {i}: "))
    expenses.append(amt)

analyze_expenses(expenses)

# 4. Guess the number
import random

secret = random.randint(1, 50)
chances = 5

for attempt in range(chances):
    guess = int(input("Guess the number (1-50): "))
    if guess == secret:
        print("Correct! You win!")
        break
    elif guess < secret:
        print("Too Low.")
    else:
        print("Too High.")
else:
    print(f"Out of chances! The number was {secret}.")

# 5. Student Report card 
import datetime

def total_and_avg(marks):
    total = sum(marks)
    avg = total / len(marks)
    return total, avg

def get_grade(avg):
    if avg >= 80:
        return "A"
    elif avg >= 60:
        return "B"
    else:
        return "C"

name = input("Enter student name: ")
marks = []
for i in range(1, 4):
    marks.append(float(input(f"Enter marks for subject {i}: ")))

total, avg = total_and_avg(marks)
grade = get_grade(avg)
print("----Report Card----")
print("Name:", name)
print("Marks:", marks)
print("Total:", total)
print("Average:", avg)
print("Grade:", grade)
print("Date:", datetime.date.today())

# 6. Contact Saver
contacts = {}

while True:
    print("1. Add Contact")
    print("2. View Contacts")
    print("3. Save & Exit")
    choice = input("Choose option: ")
    
    if choice == "1":
        name = input("Contact Name: ")
        phone = input("Phone Number: ")
        contacts[name] = phone
    elif choice == "2":
        if not contacts:
            print("No contacts.")
        else:
            for n, p in contacts.items():
                print(f"{n}: {p}")
    elif choice == "3":
        with open("contacts.txt", "w") as f:
            for n, p in contacts.items():
                f.write(f"{n},{p}\n")
        print("Contacts saved. Goodbye!")
        break
    else:
        print("Invalid option. Try again.")
