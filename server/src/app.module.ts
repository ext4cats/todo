import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'node:path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve('public'),
      exclude: ['/api/{*splat}'],
    }),
  ],
})
export class AppModule {}
