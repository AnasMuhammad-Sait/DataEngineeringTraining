use customer_feedback_db;

db.feedback.insertMany([
  {
    customer_id: 101,
    feedback: "Delivery was late and packaging was damaged.",
    date: ISODate("2024-07-06T10:00:00Z")
  },
  {
    customer_id: 102,
    feedback: "Service was excellent and timely.",
    date: ISODate("2024-07-04T13:30:00Z")
  }
]);

db.feedback.createIndex({ customer_id: 1 });

db.feedback.find({ customer_id: 101 });
