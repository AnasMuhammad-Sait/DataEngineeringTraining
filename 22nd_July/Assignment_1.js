// Use the database
use AssignmentDB22

// Part 1 && Part 2: Create Collections and Insert Sample Data
// Books
db.books.insertMany([
  {
    book_id: 101,
    title: "The AI Revolution",
    author: "Ray Kurzweil",
    genre: "Technology",
    price: 799,
    stock: 20
  },
  {
    book_id: 102,
    title: "Mystery of the Blue Train",
    author: "Agatha Christie",
    genre: "Mystery",
    price: 450,
    stock: 15
  },
  {
    book_id: 103,
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Programming",
    price: 999,
    stock: 10
  },
  {
    book_id: 104,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    price: 399,
    stock: 25
  },
  {
    book_id: 105,
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Self-help",
    price: 550,
    stock: 18
  }
]);

// Customers
db.customers.insertMany([
  { customer_id: 1, name: "Arjun", email: "arjun@example.com", city: "Hyderabad" },
  { customer_id: 2, name: "Fatima", email: "fatima@example.com", city: "Mumbai" },
  { customer_id: 3, name: "Ravi", email: "ravi@example.com", city: "Hyderabad" },
  { customer_id: 4, name: "Sneha", email: "sneha@example.com", city: "Delhi" },
  { customer_id: 5, name: "John", email: "john@example.com", city: "Chennai" }
]);

// Orders
db.orders.insertMany([
  { order_id: 201, customer_id: 1, book_id: 101, order_date: ISODate("2023-02-10"), quantity: 2 },
  { order_id: 202, customer_id: 2, book_id: 103, order_date: ISODate("2023-06-20"), quantity: 1 },
  { order_id: 203, customer_id: 3, book_id: 104, order_date: ISODate("2024-01-15"), quantity: 3 },
  { order_id: 204, customer_id: 1, book_id: 105, order_date: ISODate("2023-09-18"), quantity: 1 },
  { order_id: 205, customer_id: 4, book_id: 102, order_date: ISODate("2023-12-01"), quantity: 2 },
  { order_id: 206, customer_id: 5, book_id: 103, order_date: ISODate("2024-03-22"), quantity: 1 },
  { order_id: 207, customer_id: 1, book_id: 104, order_date: ISODate("2024-05-10"), quantity: 2 }
]);

// Basic Queries
// 1
db.books.find({ price: { $gt: 500 } })

// 2 
db.customers.find({ city: "Hyderabad" })

// 3
db.orders.find({ order_date: { $gt: ISODate("2023-01-01") } })

// 4
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "customer_id",
      as: "customer_info"
    }
  },
  { $unwind: "$customer_info" },
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book_info"
    }
  },
  { $unwind: "$book_info" },
  {
    $project: {
      order_id: 1,
      order_date: 1,
      quantity: 1,
      customer_name: "$customer_info.name",
      book_title: "$book_info.title"
    }
  }
])

// 5 
db.orders.aggregate([
  {
    $group: {
      _id: "$book_id",
      total_quantity: { $sum: "$quantity" }
    }
  },
  {
    $lookup: {
      from: "books",
      localField: "_id",
      foreignField: "book_id",
      as: "book_info"
    }
  },
  { $unwind: "$book_info" },
  {
    $project: {
      _id: 0,
      book_title: "$book_info.title",
      total_quantity: 1
    }
  }
])

// 6 
db.orders.aggregate([
  {
    $group: {
      _id: "$customer_id",
      order_count: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "customers",
      localField: "_id",
      foreignField: "customer_id",
      as: "customer_info"
    }
  },
  { $unwind: "$customer_info" },
  {
    $project: {
      customer_name: "$customer_info.name",
      order_count: 1
    }
  }
])

// 7 
db.orders.aggregate([
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book_info"
    }
  },
  { $unwind: "$book_info" },
  {
    $group: {
      _id: "$book_id",
      title: { $first: "$book_info.title" },
      total_revenue: { $sum: { $multiply: ["$quantity", "$book_info.price"] } }
    }
  }
])

// 8 
db.orders.aggregate([
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book_info"
    }
  },
  { $unwind: "$book_info" },
  {
    $group: {
      _id: "$book_id",
      title: { $first: "$book_info.title" },
      total_revenue: { $sum: { $multiply: ["$quantity", "$book_info.price"] } }
    }
  },
  { $sort: { total_revenue: -1 } },
  { $limit: 1 }
])

// 9 
db.orders.aggregate([
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book_info"
    }
  },
  { $unwind: "$book_info" },
  {
    $group: {
      _id: "$book_info.genre",
      total_sold: { $sum: "$quantity" }
    }
  },
  {
    $project: {
      genre: "$_id",
      total_sold: 1,
      _id: 0
    }
  }
])

// 10
db.orders.aggregate([
  {
    $group: {
      _id: { customer_id: "$customer_id", book_id: "$book_id" }
    }
  },
  {
    $group: {
      _id: "$_id.customer_id",
      unique_books: { $sum: 1 }
    }
  },
  { $match: { unique_books: { $gt: 2 } } },
  {
    $lookup: {
      from: "customers",
      localField: "_id",
      foreignField: "customer_id",
      as: "customer_info"
    }
  },
  { $unwind: "$customer_info" },
  {
    $project: {
      customer_name: "$customer_info.name",
      unique_books: 1
    }
  }
])




