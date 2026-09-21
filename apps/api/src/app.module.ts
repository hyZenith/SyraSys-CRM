import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import type { StringValue } from "ms";
import { AppController } from "./app.controller.js";
import { AuthController } from "./auth.controller.js";
import { LeadsController } from "./leads.controller.js";
import { CustomersController } from "./customers.controller.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", "../../.env"],
    }),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET", "change-me"),
        signOptions: {
          expiresIn: config.get<string>("JWT_EXPIRES_IN", "15m") as StringValue,
        },
      }),
    }),
  ],
  controllers: [AppController, AuthController, LeadsController, CustomersController],
})
export class AppModule {}
