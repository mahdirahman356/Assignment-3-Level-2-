import express, { Request, Response } from "express"
import { Books } from "../models/books.model"

export const booksRouter = express.Router()

booksRouter.post("/", async (req: Request, res: Response) => {
    try {
        const body = req.body
        const book = await Books.create(body)

        res.status(200).json({
            success: true,
            message: "Book created successfully",
            data: book
        })
    } catch (error) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error: error
        })
    }
})

booksRouter.get("/", async (req: Request, res: Response) => {
    const booksGenre = req.query.filter
    const sortBy = req.query.sortBy || "createdAt"
    const sort = req.query.sort === "asc" ? 1 : -1
    const limit = req.query.limit || 10

    const filter: any = {}

    if (booksGenre) {
        filter.genre = booksGenre.toString().toUpperCase()
    }

    const books = await Books.find(filter)
        .sort({ [sortBy as string]: sort })
        .limit(limit as number)

    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: books
    })
})

booksRouter.get("/:bookId", async (req: Request, res: Response) => {
    const bookId = req.params.bookId
    const book = await Books.findById(bookId)

    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: book
    })

})

booksRouter.put("/:bookId", async (req: Request, res: Response) => {
    const bookId = req.params.bookId
    const updatedBody = req.body

    const book = await Books.findByIdAndUpdate(bookId, updatedBody, { new: true })
    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: book
    })
})

booksRouter.delete("/:bookId", async (req: Request, res: Response) => {
    const bookId = req.params.bookId
    const book = await Books.findByIdAndDelete(bookId)

    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: book
    })
})


