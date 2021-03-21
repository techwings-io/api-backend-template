import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/permissions/permission.guard';
import { Permissions } from '../permissions/permission.decorator';

import { JwtService } from '../shared/jwt/jwt.service';
import { Auth0UserModel } from '../shared/model/auth0.user.model';

@Controller('auth')
export class AuthzController {
  users: Auth0UserModel[] = [];
  constructor(private jwtService: JwtService) {}

  @Get('/auth0-users')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('read:feedbackEvents')
  async getAuth0Users(
    @Query('userName') userName: string
  ): Promise<Auth0UserModel[]> {
    return await this.jwtService.getUsers(userName);
  }
  @Get('/auth0-user')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('read:feedbackEvents')
  async getAuth0User(@Query('userId') userId: string): Promise<Auth0UserModel> {
    return await this.jwtService.getUser(userId);
  }
}
