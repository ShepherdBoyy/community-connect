import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { adminRouter } from "./routes/AdminRoute.js"

dotenv.config()

const app = express()
app.use(
  cors({
    origin: ["https://shepherdboyy.github.io"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
)
app.use(express.json())
app.use("/auth", adminRouter)
app.use(express.static("public"))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})