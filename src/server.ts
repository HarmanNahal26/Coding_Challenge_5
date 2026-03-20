import app from "./app";
import { Server } from "http";

const PORT: string | number = process.env.PORT || 3000;

const server: Server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});

export { server };
 
