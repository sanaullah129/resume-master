import express, { Express } from 'express'
import dotenv from "dotenv";
import connectDb from './db';
import loginRoutes from './routes/LoginRoutes';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;
const MONGO_URL: string = process.env.MONGO_URL as string;

if (MONGO_URL) {
    connectDb(MONGO_URL);
}
else {
    console.log("Mongo Url not found");
}

app.get("/", (req, res) => {
    res.send("Your backend server for Resume Master is running");
});

app.use("/api/user", loginRoutes);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})