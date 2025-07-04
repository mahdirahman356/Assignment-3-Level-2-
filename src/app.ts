import express, { Application } from "express"
import { booksRouter } from "./app/controllers/books.controller"
import { borrowRouter } from "./app/controllers/borrow.controller"
import cors from 'cors';

export const app: Application = express()
app.use(express.json())
app.use(cors({
    origin: ["https://book-lovers-alpha.vercel.app", "http://localhost:5173"],
    credentials: true
}))
app.use("/api/books", booksRouter)
app.use("/api/borrow", borrowRouter)

app.get("/", (req, res) => {
    res.send("Wellcome to Library Management")
})