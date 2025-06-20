import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>(
    {
        book: {
            type: Schema.Types.ObjectId,
            ref: "Books",
            required: [true, "Book ID is required"],
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: [1, "Quantity must be at least 1"],
        },
        dueDate: {
            type: Date,
            required: [true, "Due Date is required"]
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

export const Borrow = model("Borrow", borrowSchema)