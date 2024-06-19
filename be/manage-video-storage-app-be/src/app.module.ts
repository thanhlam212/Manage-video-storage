import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'prisma/service/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService], // Đăng ký PrismaService
})
export class AppModule {}
