import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/permissions/permission.guard';
import { Auth0UserModel } from 'src/shared/model/auth0.user.model';
import { Permissions } from '../permissions/permission.decorator';

import { JwtService } from '../shared/jwt/jwt.service';

@Controller('auth')
export class AuthzController {
  users: Auth0UserModel[] = [];
  constructor(private jwtService: JwtService) {}

  @Get('/auth0-users')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('read:apidata')
  async getAuth0Users(
    @Query('userName') userName: string
  ): Promise<Auth0UserModel[]> {
    return await this.jwtService.getUsers(userName);
  }
  @Get('/auth0-user')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('read:apidata')
  async getAuth0User(@Query('userId') userId: string): Promise<Auth0UserModel> {
    return await this.jwtService.getUser(userId);
  }
}
