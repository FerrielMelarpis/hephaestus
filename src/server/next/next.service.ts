import { Injectable, OnModuleInit } from '@nestjs/common';
import next from 'next';
import { NextServer } from 'next/dist/server/next';

@Injectable()
export class NextService implements OnModuleInit {
  private server: NextServer;

  async onModuleInit(): Promise<void> {
    this.server = next({
      dev: true, // todo: this should rely on ENV
      dir: './src/client',
    });
    await this.server.prepare();
  }

  getNextServer(): NextServer {
    return this.server;
  }

  // Alias shortcut
  getRequestHandler() {
    return this.server.getRequestHandler();
  }
}
