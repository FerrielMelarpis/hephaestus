import { Module } from '@nestjs/common';
import { NextModule } from './next/next.module';
import { ServerModule } from './server.module';

@Module({
  imports: [
    // APIs
    ServerModule,
    // Client-side
    NextModule,
  ],
})
export class AppModule {}
