"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const mongoose_1 = require("mongoose");
const booksSchema = new mongoose_1.Schema({
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
}, {
    versionKey: false,
    timestamps: true,
});
booksSchema.method("updateAvailability", function () {
    this.available = this.copies > 0;
    return this.save();
});
booksSchema.post("save", function (doc) {
    console.log(`Book Saved: ${doc.title}`);
});
booksSchema.pre("deleteOne", { document: true, query: false }, function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Book about to be delete ${this.title}`);
        next();
    });
});
exports.Books = (0, mongoose_1.model)("Books", booksSchema);
