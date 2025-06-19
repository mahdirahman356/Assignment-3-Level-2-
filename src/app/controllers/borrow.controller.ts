import express, { Request, Response } from "express"

export const borrowRouter = express.Router()

borrowRouter.get('/', (req: Request, res: Response) => {
    res.send("This is borrow router")
})