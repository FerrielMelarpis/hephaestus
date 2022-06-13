import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { GithubModule } from './auth/github/github.module';
import { JwtAuthModule } from './auth/jwt/jwt.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // APIs
    BotModule,
    UserModule,
    GithubModule,
    JwtAuthModule,
  ],
})
export class ServerModule {}
