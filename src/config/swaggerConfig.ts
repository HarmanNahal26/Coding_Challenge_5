import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

// Options passed to swagger-jsdoc to build the OpenAPI specification
const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Resource Library API",
            version: "1.0.0",
            description: "API for managing educational resources on a learning platform.",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}/api/v1`,
                description: "Local development server",
            },
        ],
    },
    // Tell swagger-jsdoc where to find our JSDoc comments
    apis: ["./src/api/v1/routes/*.ts", "./src/app.ts"],
};

// Generate the OpenAPI spec object from our JSDoc comments
export const generateSwaggerSpec = (): object => {
    return swaggerJsdoc(swaggerOptions);
};

// Set up Swagger UI at /api-docs
const setupSwagger = (app: Express): void => {
    const specs = generateSwaggerSpec();
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

export default setupSwagger;