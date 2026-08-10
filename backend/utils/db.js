import mysql from "mysql"
import dotenv from "dotenv"

dotenv.config()

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})

con.connect(function (err) {
  if (err) {
    console.log("Connection Error")
  } else {
    console.log("Successfully Connected")
  }
})

export default con
