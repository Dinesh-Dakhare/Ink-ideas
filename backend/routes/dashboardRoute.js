import express from "express";
import { getDashboardData } from "../controllers/dashboardController.js";
import { protect } from "../middleware/protect.js";

const dashboard = express.Router();

// Protected route (only logged-in user can see their dashboard)
dashboard.get("/", protect, getDashboardData);

export default dashboard;
