require("dotenv").config();
const db = require("mongoose");

const db_host = process.env.DB_HOST;

async function connectDb() {
  try {
    await db.connect(db_host);

    console.log("Database Succesfully connected");
  } catch (err) {
    console.log("Database connection faliure");
  }
}

module.exports = connectDb;
