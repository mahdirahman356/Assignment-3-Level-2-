import { Server } from "http"
import { app } from "./app";
import mongoose from "mongoose";
require('dotenv').config();

let server: Server
const PORT = 5000;
async function main() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rz0kihv.mongodb.net/Library-Management?retryWrites=true&w=majority&appName=Cluster0`)
        server = app.listen(PORT, () => {
            console.log(`App is listening to port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

main()