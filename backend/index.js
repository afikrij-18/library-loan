import express from "express";
import cors from "cors";
import loanRoute from "./routes/loanRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Gunakan Routes
app.use(loanRoute);

// Jalankan server pada port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});