import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { Permissions } from './permissions/permission.decorator';
import { PermissionsGuard } from './permissions/permission.guard';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/secure')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('read:apidata')
  getSecureData(): string {
    return this.appService.getSecurePayload();
  }
}
