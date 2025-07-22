use AssignmentDB22;
//Assignment 2 
// Part 1 - Creating Collections
db.createCollection("users");
db.createCollection("movies");
db.createCollection("watch_history");

// Part 2 - Insert Data
// Insert users
db.users.insertMany([
  { user_id: 1, name: "Ananya", email: "ananya@mail.com", country: "India" },
  { user_id: 2, name: "Liam", email: "liam@mail.com", country: "USA" },
  { user_id: 3, name: "Chen", email: "chen@mail.com", country: "China" },
  { user_id: 4, name: "Sara", email: "sara@mail.com", country: "UK" },
  { user_id: 5, name: "Ahmed", email: "ahmed@mail.com", country: "UAE" }
]);

// Insert movies
db.movies.insertMany([
  { movie_id: 201, title: "Dream Beyond Code", genre: "Sci-Fi", release_year: 2022, duration: 120 },
  { movie_id: 202, title: "Love & Logic", genre: "Romance", release_year: 2021, duration: 95 },
  { movie_id: 203, title: "History 101", genre: "Documentary", release_year: 2019, duration: 80 },
  { movie_id: 204, title: "Fast Track", genre: "Action", release_year: 2023, duration: 110 },
  { movie_id: 205, title: "Haunted Lines", genre: "Horror", release_year: 2020, duration: 105 },
  { movie_id: 206, title: "Pixels & Pints", genre: "Comedy", release_year: 2022, duration: 90 }
]);

// Insert watch history
db.watch_history.insertMany([
  { watch_id: 1, user_id: 1, movie_id: 201, watched_on: new Date("2023-01-05"), watch_time: 120 },
  { watch_id: 2, user_id: 1, movie_id: 202, watched_on: new Date("2023-03-10"), watch_time: 95 },
  { watch_id: 3, user_id: 2, movie_id: 203, watched_on: new Date("2023-01-12"), watch_time: 80 },
  { watch_id: 4, user_id: 3, movie_id: 204, watched_on: new Date("2023-04-18"), watch_time: 110 },
  { watch_id: 5, user_id: 2, movie_id: 202, watched_on: new Date("2023-06-21"), watch_time: 95 },
  { watch_id: 6, user_id: 4, movie_id: 206, watched_on: new Date("2023-02-09"), watch_time: 90 },
  { watch_id: 7, user_id: 5, movie_id: 205, watched_on: new Date("2023-07-02"), watch_time: 105 },
  { watch_id: 8, user_id: 1, movie_id: 202, watched_on: new Date("2023-08-12"), watch_time: 95 }
]);

// Part-3 Query Tasks
// 1
db.movies.find({ duration: { $gt: 100 } });

// 2
db.users.find({ country: "India" });

// 3
db.movies.find({ release_year: { $gt: 2020 } });

// 4 
db.watch_history.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "user_id",
      as: "user_info"
    }
  },
  {
    $lookup: {
      from: "movies",
      localField: "movie_id",
      foreignField: "movie_id",
      as: "movie_info"
    }
  },
  { $unwind: "$user_info" },
  { $unwind: "$movie_info" },
  {
    $project: {
      _id: 0,
      user: "$user_info.name",
      movie: "$movie_info.title",
      watch_time: 1
    }
  }
]);

// 5 
db.watch_history.aggregate([
  {
    $lookup: {
      from: "movies",
      localField: "movie_id",
      foreignField: "movie_id",
      as: "movie_info"
    }
  },
  { $unwind: "$movie_info" },
  {
    $group: {
      _id: "$movie_info.genre",
      watch_count: { $sum: 1 }
    }
  }
]);

// 6 
db.watch_history.aggregate([
  {
    $group: {
      _id: "$user_id",
      total_watch_time: { $sum: "$watch_time" }
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "user_id",
      as: "user_info"
    }
  },
  { $unwind: "$user_info" },
  {
    $project: {
      _id: 0,
      user: "$user_info.name",
      total_watch_time: 1
    }
  }
]);

// 7 
db.watch_history.aggregate([
  {
    $group: {
      _id: "$movie_id",
      count: { $sum: 1 }
    }
  },
  { $sort: { count: -1 } },
  { $limit: 1 },
  {
    $lookup: {
      from: "movies",
      localField: "_id",
      foreignField: "movie_id",
      as: "movie_info"
    }
  },
  { $unwind: "$movie_info" },
  {
    $project: {
      movie: "$movie_info.title",
      watch_count: "$count"
    }
  }
]);

// 8
db.watch_history.aggregate([
  {
    $group: {
      _id: "$user_id",
      movie_ids: { $addToSet: "$movie_id" }
    }
  },
  {
    $project: {
      movie_count: { $size: "$movie_ids" }
    }
  },
  { $match: { movie_count: { $gt: 2 } } },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "user_id",
      as: "user_info"
    }
  },
  { $unwind: "$user_info" },
  {
    $project: {
      user: "$user_info.name",
      movie_count: 1
    }
  }
]);

// 9
db.watch_history.aggregate([
  {
    $group: {
      _id: { user_id: "$user_id", movie_id: "$movie_id" },
      watch_count: { $sum: 1 }
    }
  },
  { $match: { watch_count: { $gt: 1 } } },
  {
    $lookup: {
      from: "users",
      localField: "_id.user_id",
      foreignField: "user_id",
      as: "user_info"
    }
  },
  {
    $lookup: {
      from: "movies",
      localField: "_id.movie_id",
      foreignField: "movie_id",
      as: "movie_info"
    }
  },
  { $unwind: "$user_info" },
  { $unwind: "$movie_info" },
  {
    $project: {
      user: "$user_info.name",
      movie: "$movie_info.title",
      watch_count: 1
    }
  }
]);

// 10
db.watch_history.aggregate([
  {
    $lookup: {
      from: "movies",
      localField: "movie_id",
      foreignField: "movie_id",
      as: "movie_info"
    }
  },
  { $unwind: "$movie_info" },
  {
    $project: {
      movie: "$movie_info.title",
      user_id: 1,
      percentage_watched: {
        $multiply: [
          { $divide: ["$watch_time", "$movie_info.duration"] },
          100
        ]
      }
    }
  }
]);




