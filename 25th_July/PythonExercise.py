# 1. FizzBuzz Challenge
for i in range(1, 51):
    if i % 3 == 0 and i % 5 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)

# 2. Login Simulation
correct_user = "admin"
correct_pass = "1234"

for attempt in range(3):
    username = input("Enter username: ")
    password = input("Enter password: ")
    if username == correct_user and password == correct_pass:
        print("Login Successful")
        break
    else:
        print("Incorrect credentials")
else:
    print("Account Locked")

# 3. Palindrome Checker
word = input("Enter a word: ")
if word == word[::-1]:
    print("Palindrome")
else:
    print("Not a palindrome")

# 4. Prime number in range
n = int(input("Enter a number: "))
for num in range(2, n+1):
    is_prime = True
    for i in range(2, int(num**0.5) + 1):
        if num % i == 0:
            is_prime = False
            break
    if is_prime:
        print(num, end=", ")
print()

# 5. Star Pyramid
n = int(input("Enter the number of rows: "))
for i in range(1, n+1):
    print('*' * i)

# 6. Sum of digits
number = input("Enter a number: ")
total = 0
for digit in number:
    total += int(digit)
print("Sum of digits:", total)

# 7. Multiplication Table Generator
num = int(input("Enter the number: "))
for i in range(1, 11):
    print(f"{num} x {i} = {num*i}")

# 8. Count vowels in a string
sentence = input("Enter a sentence: ")
vowels = "aeiouAEIOU"
count = 0
for char in sentence:
    if char in vowels:
        count += 1
print("Number of vowels:", count)
