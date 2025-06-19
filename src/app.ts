import express, { Application, json } from "express"
import { booksRouter } from "./app/controllers/books.controller"

export const app: Application = express()
app.use(express.json())

app.use("/api/books", booksRouter)

app.get("/", (req, res) => {
    res.send("Wellcome to Library Management")
})