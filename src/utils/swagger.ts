import express, { Response, Request } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { version } from "../../package.json";

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API docs",
      version,
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/middlewares/*.ts", "./prisma/*.prisma"],
};

const swaggerSpec = swaggerJsDoc(options);
function swaggerDocs(app: express.Express, port: number) {
  // Swagger page
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  // Docs in JSON format
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.info(`Docs available at http://localhost:${port}/docs`);
  console.log(
    `Version: ${version} Documentation http://localhost:${port}/docs`
  );
}

export default swaggerDocs;
