// MongoDB Assessment 1 
// Step 1: Create Collections and Insert Sample Data
// Products
db.products.insertMany([
{ product_id: 1001, name: "Wireless Mouse", category: "Electronics", price: 750,
stock: 120 },
{ product_id: 1002, name: "Bluetooth Speaker", category: "Electronics", price: 2200,
stock: 80 },
{ product_id: 1003, name: "Yoga Mat", category: "Fitness", price: 599, stock: 150 },
{ product_id: 1004, name: "Office Chair", category: "Furniture", price: 7500, stock:
40 },
{ product_id: 1005, name: "Running Shoes", category: "Footwear", price: 3500, stock:
60 }
])

// Orders
db.orders.insertMany([
{ order_id: 5001, customer: "Ravi Shah", product_id: 1001, quantity: 2, order_date:
new Date("2024-07-01") },
{ order_id: 5002, customer: "Sneha Mehta", product_id: 1002, quantity: 1,
order_date: new Date("2024-07-02") },
{ order_id: 5003, customer: "Arjun Verma", product_id: 1003, quantity: 3,
order_date: new Date("2024-07-03") },
{ order_id: 5004, customer: "Neha Iyer", product_id: 1001, quantity: 1, order_date:
new Date("2024-07-04") },
{ order_id: 5005, customer: "Mohit Jain", product_id: 1005, quantity: 2, order_date:
new Date("2024-07-05") }
])

// Step 2: Query Challenges 
// Basic Queries 
// 1 
db.products.find({ category: "Electronics" })

// 2 
db.orders.find({ customer: "Ravi Shah" })

// 3 
db.orders.find({ order_date: { $gt: new Date("2024-07-02") } })

// 4
db.products.find({ stock: { $lt: 50 } })

// 5 
db.products.find({ price: { $gt: 2000 } })

// Join-Like queries with $lookup
// 6 
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "product_id",
      foreignField: "product_id",
      as: "product_info"
    }
  },
  {
    $unwind: "$product_info"
  },
  {
    $project: {
      order_id: 1,
      customer: 1,
      product_name: "$product_info.name",
      price: "$product_info.price"
    }
  }
])

// 7 
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "product_id",
      foreignField: "product_id",
      as: "product_info"
    }
  },
  { $unwind: "$product_info" },
  {
    $group: {
      _id: "$customer",
      total_spent: {
        $sum: { $multiply: ["$quantity", "$product_info.price"] }
      }
    }
  }
])

// 8 
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "product_id",
      foreignField: "product_id",
      as: "product_info"
    }
  },
  { $unwind: "$product_info" },
  {
    $project: {
      order_id: 1,
      customer: 1,
      category: "$product_info.category"
    }
  }
])

// 9 
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "product_id",
      foreignField: "product_id",
      as: "product_info"
    }
  },
  { $unwind: "$product_info" },
  { $match: { "product_info.category": "Fitness" } },
  { $group: { _id: "$customer" } }
])

// 10 
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "product_id",
      foreignField: "product_id",
      as: "product_info"
    }
  },
  { $unwind: "$product_info" },
  {
    $group: {
      _id: "$product_info.category",
      total_sales: {
        $sum: { $multiply: ["$quantity", "$product_info.price"] }
      }
    }
  }
])

// Aggregation and Grouping 
// 11 
db.orders.aggregate([
  {
    $group: {
      _id: "$product_id",
      total_units_sold: { $sum: "$quantity" }
    }
  }
])

// 12
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      avg_price: { $avg: "$price" }
    }
  }
])

// 13 
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "product_id",
      foreignField: "product_id",
      as: "product_info"
    }
  },
  { $unwind: "$product_info" },
  {
    $addFields: {
      total_amount: { $multiply: ["$quantity", "$product_info.price"] }
    }
  },
  { $sort: { total_amount: -1 } },
  { $limit: 1 },
  { $project: { customer: 1, total_amount: 1 } }
])

// 14 
db.orders.aggregate([
  {
    $group: {
      _id: "$product_id",
      order_count: { $sum: 1 }
    }
  },
  { $sort: { order_count: -1 } },
  { $limit: 3 }
])

// 15 
db.orders.aggregate([
  {
    $group: {
      _id: "$order_date",
      count: { $sum: 1 }
    }
  },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

// Advanced use cases 
// 16
// Add new customer (simulate in new 'customers' collection)
db.customers.insertOne({ name: "Priya Singh" })

// List customers without orders
db.customers.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "name",
      foreignField: "customer",
      as: "order_info"
    }
  },
  { $match: { order_info: { $eq: [] } } }
])

// 17 
// Insert more orders
db.orders.insertOne({
  order_id: 5006,
  customer: "Ravi Shah",
  product_id: 1003,
  quantity: 1,
  order_date: new Date("2024-07-06")
})

// Find customers with more than 1 order
db.orders.aggregate([
  {
    $group: {
      _id: "$customer",
      order_count: { $sum: 1 }
    }
  },
  { $match: { order_count: { $gt: 1 } } }
])

// 18 
db.products.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "product_id",
      foreignField: "product_id",
      as: "order_info"
    }
  },
  { $match: { order_info: { $eq: [] } } }
])

// 19
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "product_id",
      foreignField: "product_id",
      as: "product_info"
    }
  },
  { $unwind: "$product_info" },
  { $match: { "product_info.stock": { $lt: 100 } } },
  { $group: { _id: "$customer" } }
])

// 20
db.products.aggregate([
  {
    $project: {
      name: 1,
      inventory_value: { $multiply: ["$price", "$stock"] }
    }
  },
  {
    $group: {
      _id: null,
      total_inventory_value: { $sum: "$inventory_value" }
    }
  }
])

