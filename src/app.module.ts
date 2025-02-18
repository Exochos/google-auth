import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { AppService } from './app.service';
import { AuthController } from './app.controller';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
