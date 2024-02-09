import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { VersioningType } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as passport from "passport";
import RedisStore from "connect-redis";
import { RedisConnection } from "./modules/redis/redis.provider";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix("api/v1");
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(
    session({
      store: new RedisStore({
        client: RedisConnection,
      }),
      cookie: {
        maxAge: 60 * 600000,
      },
      secret: "movie_app",
      saveUninitialized: false,
      resave: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
