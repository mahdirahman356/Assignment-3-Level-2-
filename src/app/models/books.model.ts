import { Model, model, Schema } from "mongoose";
import { IBooks, IBooksMethods } from "../interfaces/books.interface";


const booksSchema = new Schema<IBooks, Model<IBooks>, IBooksMethods>(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        author: {
            type: String,
            required: [true, "Author name is required"],
        },
        genre: {
            type: String,
            required: [true, "Genre is required"],
            uppercase: true,
            enum: {
                values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
                message: "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY"
            }
        },
        isbn: {
            type: String,
            required: [true, "ISBN is required"],
            unique: true,
        },
        description: {
            type: String
        },
        copies: {
            type: Number,
            required: [true, "Number of copies is required"],
            min: [0, "Copies must be a positive number"]
        },
        available: {
            type: Boolean,
            default: true
        },

    },
    {
        versionKey: false,
        timestamps: true,
    }
)

booksSchema.method("updateAvailability", function (){
    this.available = this.copies > 0
    return this.save()
})

export const Books = model("Books", booksSchema)