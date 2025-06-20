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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
exports.booksRouter = express_1.default.Router();
exports.booksRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield books_model_1.Books.create(body);
        res.status(200).json({
            success: true,
            message: "Book created successfully",
            data: book
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error: error
        });
    }
}));
exports.booksRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const booksGenre = req.query.filter;
    const sortBy = req.query.sortBy || "createdAt";
    const sort = req.query.sort === "asc" ? 1 : -1;
    const limit = req.query.limit || 10;
    const filter = {};
    if (booksGenre) {
        filter.genre = booksGenre.toString().toUpperCase();
    }
    const books = yield books_model_1.Books.find(filter)
        .sort({ [sortBy]: sort })
        .limit(limit);
    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: books
    });
}));
exports.booksRouter.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield books_model_1.Books.findById(bookId);
    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: book
    });
}));
exports.booksRouter.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const updatedBody = req.body;
    const book = yield books_model_1.Books.findByIdAndUpdate(bookId, updatedBody, { new: true });
    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: book
    });
}));
exports.booksRouter.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield books_model_1.Books.findById(bookId);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found",
        });
    }
    yield book.deleteOne();
    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: book
    });
}));
