import { Module } from '@nestjs/common';
import { GlobalSubscriber } from './common/GlobalSubscriber';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmLoggerContainer } from './common/TypeOrmLogger';
import { LoggerModule } from 'nestjs-pino';
import { ClsModule } from 'nestjs-cls';
import { ApiModule } from './features/api/api.module';
import { AuthModule } from './features/auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/client`,
      // 存在しないrouteを叩いたときにエラーを出すコード
      serveStaticOptions: {
        fallthrough: false,
      },
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env/.env.development`],
      load: [],
    }),


    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get('DATABASE_TYPE') as 'mysql' | 'oracle',
        host: configService.get('DATABASE_HOST') as string,
        port: Number(configService.get('DATABASE_PORT')) as number,
        username: configService.get('DATABASE_USERNAME') as string,
        password: configService.get('DATABASE_PASSWORD') as string,
        database: configService.get('DATABASE_DATABASE') as string,
        // sid: configService.get('DATABASE_SID') as string,
        requestTimeout: Number(configService.get('DATABASE_REQUEST_TIMEOUT')) as number,
        pool: {
          min: Number(configService.get('MIN_POOL_SIZE')),
          max: Number(configService.get('MAX_POOL_SIZE')),
        },
        synchronize: false,
        extra: {
          authPlugin: 'caching_sha2_password',
          encrypt: false,
          trustServerCertificate: true,
        },
        
        logger: new TypeOrmLoggerContainer(),
        logging: true,
        autoLoadEntities: true,
        maxQueryExecutionTime: Number(configService.get('DATABASE_QUERY_EXECUTION_TIME')) as number,
        driver: require('mysql2'), 
      }),
    }),

    LoggerModule.forRoot({
      pinoHttp: {
        redact: ['request.headers.authorization'],
        level: process.env.LOG_LEVEL || 'info',
        transport: {
          targets: [
            {
              target: 'pino-pretty',
              level: process.env.LOG_LEVEL || 'info',
              options: {
                colorize: process.env.COLORIZE?.toLowerCase() === 'true',
                singleLine: process.env.SINGLE_LINE,
                levelFirst: true,
                translateTime: "SYS:yyyy-mm-dd'T'HH:MM:ss.l'Z'",
                messageFormat: '[{req.id} {req.url}--{req.method}] [{hostname}] [{req.remoteAddress}] [{context}] {msg}',
                ignore: 'pid,hostname,req,context',
              },
            },
          ],
        },
      },
    }),

    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    ApiModule,
    AuthModule
  ],

  providers: [GlobalSubscriber],
})
export class AppModule { }
