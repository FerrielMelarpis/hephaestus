import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NextModule } from './next/next.module';
import { ServerModule } from './server.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join(__dirname, '/../', `.env.${process.env.NODE_ENV}`),
      isGlobal: true,
    }),
    // APIs
    ServerModule,
    // Client-side
    NextModule,
  ],
})
export class AppModule {}
