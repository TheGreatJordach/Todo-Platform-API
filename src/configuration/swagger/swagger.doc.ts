import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerDoc = new DocumentBuilder()
  .setTitle(process.env.SWAGGER_DES || "API Documentation")
  .setDescription(process.env.SWAGGER_DES || "API Documentation")
  .setVersion(process.env.SWAGGER_VER || "1.0")
  .addServer(process.env.SWAGGER_ADD_SVR || "http://localhost:3000")
  .setLicense("License", process.env.SWAGGER_LICENCE || "MIT")
  .build();
