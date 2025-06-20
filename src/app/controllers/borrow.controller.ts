import express, { Request, Response } from "express"
import { Books } from "../models/books.model"
import { Borrow } from "../models/borrow.model"
import { IBooks, IBooksMethods } from "../interfaces/books.interface"

export const borrowRouter = express.Router()

borrowRouter.post('/', async (req: Request, res: Response) => {
    const body = req.body

    try {
        const book = await Books.findById(body.book)
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" })
        }
        if (book.copies < body.quantity) {
            return res.status(400).json({ success: false, message: "Not enough copies available" })
        }

        if (book) {
            book.copies = book.copies - body.quantity
            await book.updateAvailability()
        }

        const borrow = await Borrow.create(body)
        res.status(200).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow
        });
    } catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error
        })
    }
})


borrowRouter.get("/", async (req: Request, res: Response) => {
  try {
    const borrow = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" }
        }
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id", 
          as: "bookDetails"
        }
      },
      {
        $unwind: "$bookDetails"
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn"
          },
          totalQuantity: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: borrow
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve borrowed books summary",
      error
    });
  }
});

