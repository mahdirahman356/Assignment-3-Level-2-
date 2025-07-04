import express, { Application } from "express"
import { booksRouter } from "./app/controllers/books.controller"
import { borrowRouter } from "./app/controllers/borrow.controller"
var cors = require('cors')

export const app: Application = express()
app.use(express.json())
app.use(cors())
app.use("/api/books", booksRouter)
app.use("/api/borrow", borrowRouter)

app.get("/", (req, res) => {
    res.send("Wellcome to Library Management")
})