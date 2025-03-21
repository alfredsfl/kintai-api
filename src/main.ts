import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from 'nestjs-pino';
import { AllExceptionFilter } from './common/AllExceptionFilter';
import fastifyMultipart from '@fastify/multipart';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ bodyLimit: 100 * 1048576 }),
    { bufferLogs: true },
  );
  app.useLogger(app.get(Logger));
  app.useGlobalFilters(new AllExceptionFilter());
  app.register(fastifyMultipart, {limits: {
    fileSize: 100000000,      // For multipart forms, the max file size
    // fieldNameSize: 100, // Max field name size in bytes
    // fieldSize: 1000000, // Max field value size in bytes
    // fields: 10,         // Max number of non-file fields
    // files: 1,           // Max number of file fields
    // headerPairs: 2000   // Max number of header key=>value pairs
  }});

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
