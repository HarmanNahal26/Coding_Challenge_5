import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

// Load environment variables BEFORE importing anything that uses them
dotenv.config();

import { helmetConfig } from "./config/helmetConfig";
import { corsConfig } from "./config/corsConfig";
import setupSwagger from "./config/swaggerConfig";
import resourceRoutes from "./api/v1/routes/resourceRoutes";
import { HTTP_STATUS } from "./constants/httpConstants";

const app: Express = express();

// --- Security Middleware ---
app.use(helmetConfig);  // Sets security HTTP headers
app.use(corsConfig);    // Controls which origins can access the API

// --- Body Parsing ---
app.use(express.json()); // Parse incoming JSON request bodies

// --- Swagger Docs ---
setupSwagger(app); // Available at /api-docs

// --- Routes ---

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     description: Returns the current health status of the API server
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 uptime:
 *                   type: number
 *                   example: 45.123
 *                 timestamp:
 *                   type: string
 *                   example: "2025-02-20T10:30:00.000Z"
 *                 version:
 *                   type: string
 *                   example: 1.0.0
 */
app.get("/api/v1/health", (req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

app.use("/api/v1", resourceRoutes);

export default app;
 