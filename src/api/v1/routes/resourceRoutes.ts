import express from "express";
import * as resourceController from "../controllers/resourceController";

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Resource:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         title:
 *           type: string
 *           example: Express.js Guide
 *         type:
 *           type: string
 *           example: documentation
 *         url:
 *           type: string
 *           example: https://expressjs.com/en/guide
 *         description:
 *           type: string
 *           example: Official Express.js documentation
 *         createdAt:
 *           type: string
 *           example: "2025-01-15T10:30:00.000Z"
 */

/**
 * @openapi
 * /resources:
 *   get:
 *     summary: Get all resources
 *     description: Returns a list of all educational resources with a total count
 *     tags:
 *       - Resources
 *     responses:
 *       200:
 *         description: Resources retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Resources retrieved
 *                 count:
 *                   type: number
 *                   example: 4
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Resource'
 */
router.get("/resources", resourceController.getAllResources);

/**
 * @openapi
 * /resources/{id}:
 *   get:
 *     summary: Get a resource by ID
 *     description: Returns a single resource matching the given ID
 *     tags:
 *       - Resources
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The numeric ID of the resource
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Resource retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Resource retrieved
 *                 data:
 *                   $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Resource not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Resource not found
 */
router.get("/resources/:id", resourceController.getResourceById);

/**
 * @openapi
 * /resources:
 *   post:
 *     summary: Create a new resource
 *     description: Adds a new educational resource. title, type, and url are required.
 *     tags:
 *       - Resources
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - type
 *               - url
 *             properties:
 *               title:
 *                 type: string
 *                 example: New Resource
 *               type:
 *                 type: string
 *                 example: article
 *               url:
 *                 type: string
 *                 example: https://example.com/new
 *               description:
 *                 type: string
 *                 example: A helpful new resource
 *     responses:
 *       201:
 *         description: Resource created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Resource created
 *                 data:
 *                   $ref: '#/components/schemas/Resource'
 *       400:
 *         description: Missing required field
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing required field: title"
 */
router.post("/resources", resourceController.createResource);

/**
 * @openapi
 * /resources/{id}:
 *   put:
 *     summary: Update a resource
 *     description: Updates an existing resource by ID
 *     tags:
 *       - Resources
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The numeric ID of the resource to update
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *               url:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Resource updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Resource updated
 *                 data:
 *                   $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Resource not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Resource not found
 */
router.put("/resources/:id", resourceController.updateResource);

/**
 * @openapi
 * /resources/{id}:
 *   delete:
 *     summary: Delete a resource
 *     description: Removes a resource from the library by ID
 *     tags:
 *       - Resources
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The numeric ID of the resource to delete
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Resource deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Resource deleted
 *       404:
 *         description: Resource not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Resource not found
 */
router.delete("/resources/:id", resourceController.deleteResource);

export default router;