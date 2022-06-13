import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { GithubStrategy } from './github.strategy';
import { UserModule } from 'src/server/user/user.module';
import { JwtAuthModule } from '../jwt/jwt.module';

@Module({
  imports: [UserModule, JwtAuthModule],
  controllers: [GithubController],
  providers: [GithubStrategy, GithubService],
})
export class GithubModule {}
