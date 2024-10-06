import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule } from "@nestjs/swagger";
import { swaggerDoc } from "./configuration/swagger/swagger.doc";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>("APP_PORT");
  const SWAGGER_PREFIX = configService.get<string>("SWAGGER_PREFIX");

  const document = SwaggerModule.createDocument(app, swaggerDoc);
  SwaggerModule.setup(SWAGGER_PREFIX, app, document);

  await app.listen(PORT);
}
bootstrap();
