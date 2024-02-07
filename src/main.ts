import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { VersioningType } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

const port = 3000;
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.setGlobalPrefix("api/v1");
    app.enableVersioning({
      type: VersioningType.URI,
    });

    await app.listen(port);
    console.log(`Server is running at port: ${port}`);
  } catch (error) {
    throw new Error(
      `Something went wrong while connecting to the server at ${port}! \n Error: ${error}`,
    );
  }
}
bootstrap();
