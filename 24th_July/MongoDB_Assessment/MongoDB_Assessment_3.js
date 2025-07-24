// Assessment 3 - Design and Query Challenge

use AssessmentDB

// Part 1 - Create Collection and Insert Your Own Data
// Jobs
db.jobs.insertMany([
  {
    job_id: 1, title: "Backend Developer", company: "TechNova", location: "Bangalore",
    salary: 1200000, job_type: "remote", posted_on: new Date("2025-07-01")
  },
  {
    job_id: 2, title: "Frontend Developer", company: "CodeCrush", location: "Hyderabad",
    salary: 800000, job_type: "on-site", posted_on: new Date("2025-06-28")
  },
  {
    job_id: 3, title: "Data Scientist", company: "AIForge", location: "Mumbai",
    salary: 1500000, job_type: "hybrid", posted_on: new Date("2025-06-20")
  },
  {
    job_id: 4, title: "Cloud Engineer", company: "CloudNet", location: "Chennai",
    salary: 1100000, job_type: "remote", posted_on: new Date("2025-07-10")
  },
  {
    job_id: 5, title: "DevOps Engineer", company: "TechNova", location: "Pune",
    salary: 1300000, job_type: "remote", posted_on: new Date("2025-06-15")
  }
]);

// Applicants
db.applicants.insertMany([
  { applicant_id: 101, name: "Ananya Sharma", skills: ["Java", "MongoDB", "Docker"], experience: 3, city: "Delhi", applied_on: new Date("2025-07-12") },
  { applicant_id: 102, name: "Ravi Kumar", skills: ["React", "Node.js", "MongoDB"], experience: 2, city: "Hyderabad", applied_on: new Date("2025-07-14") },
  { applicant_id: 103, name: "Meena Iyer", skills: ["Python", "Django", "PostgreSQL"], experience: 4, city: "Mumbai", applied_on: new Date("2025-07-11") },
  { applicant_id: 104, name: "Arjun Verma", skills: ["AWS", "Docker", "Kubernetes"], experience: 5, city: "Hyderabad", applied_on: new Date("2025-07-13") },
  { applicant_id: 105, name: "Fatima Rizvi", skills: ["SQL", "PowerBI", "Excel"], experience: 2, city: "Delhi", applied_on: new Date("2025-07-09") }
]);

// Applications
db.applications.insertMany([
  { application_id: 1, applicant_id: 101, job_id: 1, application_status: "applied", interview_scheduled: false, feedback: "" },
  { application_id: 2, applicant_id: 102, job_id: 1, application_status: "interview scheduled", interview_scheduled: true, feedback: "Good" },
  { application_id: 3, applicant_id: 102, job_id: 2, application_status: "applied", interview_scheduled: false, feedback: "" },
  { application_id: 4, applicant_id: 103, job_id: 3, application_status: "rejected", interview_scheduled: false, feedback: "Lacks required experience" },
  { application_id: 5, applicant_id: 104, job_id: 4, application_status: "interview scheduled", interview_scheduled: true, feedback: "Strong profile" }
]);

// Part 2 - Write the Following Queries
// 1 
db.jobs.find({ job_type: "remote", salary: { $gt: 1000000 } });

// 2 
db.applicants.find({ skills: "MongoDB" });

// 3 
db.jobs.countDocuments({
  posted_on: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
});

// 4 
db.applications.find({ application_status: "interview scheduled" });

// 5 
db.jobs.aggregate([
  { $group: { _id: "$company", totalJobs: { $sum: 1 } } },
  { $match: { totalJobs: { $gt: 2 } } }
]);

// Part 3 - Use $lookup and Aggregation
// 6 
db.applications.aggregate([
  {
    $lookup: {
      from: "jobs",
      localField: "job_id",
      foreignField: "job_id",
      as: "job_info"
    }
  },
  {
    $lookup: {
      from: "applicants",
      localField: "applicant_id",
      foreignField: "applicant_id",
      as: "applicant_info"
    }
  },
  {
    $project: {
      _id: 0,
      job_title: { $arrayElemAt: ["$job_info.title", 0] },
      applicant_name: { $arrayElemAt: ["$applicant_info.name", 0] }
    }
  }
]);

// 7 
db.applications.aggregate([
  { $group: { _id: "$job_id", applications: { $sum: 1 } } }
]);

// 8 
db.applications.aggregate([
  { $group: { _id: "$applicant_id", total: { $sum: 1 } } },
  { $match: { total: { $gt: 1 } } }
]);

// 9 
db.applicants.aggregate([
  { $group: { _id: "$city", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 3 }
]);

// 10
db.jobs.aggregate([
  { $group: { _id: "$job_type", avgSalary: { $avg: "$salary" } } }
]);

// Part 4 - Data Updates 
// 11 
db.applications.updateMany({}, { $set: { shortlisted: false } });

// 12
const appliedJobs = db.applications.distinct("job_id");
db.jobs.deleteOne({ job_id: { $nin: appliedJobs } });

// 13 
db.applications.updateMany({}, { $set: { shortlisted: false } });

// 14 
db.applicants.updateMany(
  { city: "Hyderabad" },
  { $inc: { experience: 1 } }
);

// 15
const appliedApplicants = db.applications.distinct("applicant_id");
db.applicants.deleteMany({ applicant_id: { $nin: appliedApplicants } });
