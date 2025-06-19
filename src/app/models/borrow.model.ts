import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>(
    {
        book: {},
        quantity: {},
        dueDate: {}
    }
)

export const Borrow = model("Borrow", borrowSchema)