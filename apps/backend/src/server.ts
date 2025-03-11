import express from "express";
import cors from "cors";
import featureFlagRoutes from "./routes/featureFlagRoutes";
import authRoutes from "./routes/authRoutes";
import * as process from "node:process";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:4000",
  credentials: true
}));

app.options("*", cors()); // Handle preflight requests

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", featureFlagRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
