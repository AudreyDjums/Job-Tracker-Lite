require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
// const prisma = require("./config/prisma");
const applicationRoutes = require("./routes/application.routes");
const authRoutes = require("./routes/auth.routes");



const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use("/api/applications", applicationRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
    res.json({ message: " Job Tracker Lite API is running"});
});

// app.get("/api/applications", async (req, res) => {
//     const apps = await prisma.application.findMany();
//     res.json(apps);
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});