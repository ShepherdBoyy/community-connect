import express from "express"
import cors from "cors"
import { adminRouter } from "./routes/AdminRoute.js"

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

app.listen(3000, () => {
  console.log("Server is Runningg")
})
