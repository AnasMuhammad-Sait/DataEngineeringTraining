// MongoDB Assessment 2 - Library Management System
// Step 1: Create Collections and Insert Sample Data
// Books 
db.books.insertMany([
{ book_id: 201, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction",
copies: 10 },
{ book_id: 202, title: "Atomic Habits", author: "James Clear", genre: "Self-Help",
copies: 5 },
{ book_id: 203, title: "Sapiens", author: "Yuval Noah Harari", genre: "History",
copies: 7 },
{ book_id: 204, title: "The Lean Startup", author: "Eric Ries", genre: "Business",
copies: 3 },
{ book_id: 205, title: "Deep Work", author: "Cal Newport", genre: "Productivity",
copies: 4 }
])

// Members
db.members.insertMany([
{ member_id: 101, name: "Ayesha Khan", joined_on: new Date("2024-01-15") },
{ member_id: 102, name: "Rahul Verma", joined_on: new Date("2024-03-12") },
{ member_id: 103, name: "Nikita Rao", joined_on: new Date("2024-04-10") }
])

// Borrowed
db.borrowed.insertMany([
{ borrow_id: 1, member_id: 101, book_id: 201, date: new Date("2024-06-01"),
returned: true },
{ borrow_id: 2, member_id: 101, book_id: 203, date: new Date("2024-06-15"),
returned: false },
{ borrow_id: 3, member_id: 102, book_id: 202, date: new Date("2024-06-20"),
returned: false },
{ borrow_id: 4, member_id: 103, book_id: 204, date: new Date("2024-06-22"),
returned: true }
])

// Step 2: Query Challenges 
// Basic Queries 
// 1 
db.books.find({ genre: "Self-Help" })

// 2 
db.members.find({ joined_on: { $gt: new Date("2024-03-31") } })

// 3 
db.borrowed.find({ returned: false })

// 4
db.books.find({ copies: { $lt: 5 } })

// 5 
db.books.find({ author: "Cal Newport" })

// Join-Like queries with $lookup
// 6 
db.borrowed.aggregate([
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book_details"
    }
  },
  {
    $lookup: {
      from: "members",
      localField: "member_id",
      foreignField: "member_id",
      as: "member_details"
    }
  },
  { $unwind: "$book_details" },
  { $unwind: "$member_details" },
  {
    $project: {
      borrow_id: 1,
      date: 1,
      returned: 1,
      "book_title": "$book_details.title",
      "member_name": "$member_details.name"
    }
  }
])


// 7 
db.borrowed.aggregate([
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  { $unwind: "$book" },
  { $match: { "book.title": "Sapiens" } },
  {
    $lookup: {
      from: "members",
      localField: "member_id",
      foreignField: "member_id",
      as: "member"
    }
  },
  { $unwind: "$member" },
  { $project: { "member_name": "$member.name", _id: 0 } }
])

// 8 
db.members.aggregate([
  {
    $lookup: {
      from: "borrowed",
      localField: "member_id",
      foreignField: "member_id",
      as: "borrowed_books"
    }
  }
])

// 9 
db.borrowed.aggregate([
  { $match: { returned: false } },
  {
    $lookup: {
      from: "members",
      localField: "member_id",
      foreignField: "member_id",
      as: "member"
    }
  },
  { $unwind: "$member" },
  { $project: { member_name: "$member.name", _id: 0 } }
])

// 10 
db.borrowed.aggregate([
  {
    $group: {
      _id: "$book_id",
      times_borrowed: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "books",
      localField: "_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  { $unwind: "$book" },
  {
    $project: {
      _id: 0,
      book_title: "$book.title",
      times_borrowed: 1
    }
  }
])

// Aggregation and Analysis 
// 11 
db.borrowed.aggregate([
  {
    $group: {
      _id: "$member_id",
      borrowed_count: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "members",
      localField: "_id",
      foreignField: "member_id",
      as: "member"
    }
  },
  { $unwind: "$member" },
  {
    $project: {
      member_name: "$member.name",
      borrowed_count: 1,
      _id: 0
    }
  }
])

// 12
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      total_books: { $sum: "$copies" }
    }
  },
  { $sort: { total_books: -1 } },
  { $limit: 1 }
])
)

// 13 
db.borrowed.aggregate([
  {
    $group: {
      _id: "$book_id",
      borrow_count: { $sum: 1 }
    }
  },
  { $sort: { borrow_count: -1 } },
  { $limit: 2 },
  {
    $lookup: {
      from: "books",
      localField: "_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  { $unwind: "$book" },
  {
    $project: {
      _id: 0,
      title: "$book.title",
      borrow_count: 1
    }
  }
])


// 14 
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      avg_copies: { $avg: "$copies" }
    }
  }
])


// 15 
db.borrowed.aggregate([
  { $match: { returned: false } },
  { $count: "currently_borrowed_books" }
])

// Advanced use cases 
// 16
// Insertion
db.members.insertOne({ member_id: 104, name: "Ishaan Mehta", joined_on: new Date("2024-07-15") })

// Query to find members with no borrowed books
db.members.aggregate([
  {
    $lookup: {
      from: "borrowed",
      localField: "member_id",
      foreignField: "member_id",
      as: "borrow_history"
    }
  },
  { $match: { borrow_history: { $eq: [] } } }
])

// 17 
db.books.aggregate([
  {
    $lookup: {
      from: "borrowed",
      localField: "book_id",
      foreignField: "book_id",
      as: "borrowed_history"
    }
  },
  { $match: { borrowed_history: { $eq: [] } } }
])

// 18 
db.borrowed.aggregate([
  {
    $group: {
      _id: "$member_id",
      borrow_count: { $sum: 1 }
    }
  },
  { $match: { borrow_count: { $gt: 1 } } },
  {
    $lookup: {
      from: "members",
      localField: "_id",
      foreignField: "member_id",
      as: "member"
    }
  },
  { $unwind: "$member" },
  { $project: { member_name: "$member.name", borrow_count: 1, _id: 0 } }
])

// 19
db.borrowed.aggregate([
  {
    $group: {
      _id: {
        year: { $year: "$date" },
        month: { $month: "$date" }
      },
      total_borrowed: { $sum: 1 }
    }
  },
  { $sort: { "_id.year": 1, "_id.month": 1 } }
])

// 20
db.borrowed.aggregate([
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  { $unwind: "$book" },
  { $match: { "book.copies": { $lt: 5 } } },
  {
    $project: {
      borrow_id: 1,
      book_title: "$book.title",
      copies_at_borrow: "$book.copies"
    }
  }
])
