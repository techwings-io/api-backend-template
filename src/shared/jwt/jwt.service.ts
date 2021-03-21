import {
  HttpService,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, take, map } from 'rxjs/operators';
import { Auth0UserModel } from '../model/auth0.user.model';

@Injectable()
export class JwtService {
  private auth0AdminTokenUrl;

  private auth0AdminUserUrl;

  private auth0AdminToken: string;

  private fixedSuffix = 'fields=name,email,picture,user_id&search_engine=v3';

  private users: Auth0UserModel[] = [];

  constructor(
    private configService: ConfigService,
    private httpService: HttpService
  ) {
    this.auth0AdminUserUrl = `https://${configService.get(
      'AUTH0_DOMAIN'
    )}/api/v2/users`;
    this.auth0AdminTokenUrl = `https://${configService.get(
      'AUTH0_DOMAIN'
    )}/oauth/token`;
  }

  checkTokenValidity(emailFromJwt: string, emailFromData): void {
    if (emailFromJwt !== emailFromData) {
      const errorMessage = 'Unauthorised';
      console.log(errorMessage);
      throw new UnauthorizedException({
        errorMessage,
      });
    }
  }

  private async getAuth0AdminApiToken(): Promise<AxiosResponse<string>> {
    return await this.httpService
      .post(this.auth0AdminTokenUrl, {
        client_id: this.configService.get('AUTH0_ADMIN_API_CLIENT_ID'),
        client_secret: this.configService.get('AUTH0_ADMIN_API_CLIENT_SECRET'),
        audience: `https://${this.configService.get('AUTH0_DOMAIN')}/api/v2/`,
        grant_type: 'client_credentials',
      })
      .toPromise();
  }

  async getUsers(username: string): Promise<Auth0UserModel[]> {
    const response: any = await this.getAuth0AdminApiToken();

    const config: AxiosRequestConfig = {
      params: {
        fields: 'name,email,picture,user_id',
        search_engine: 'v3',
        per_page: '5',
      },
      headers: { Authorization: `Bearer ${response.data.access_token}` },
    };
    if (username) {
      config.params.q = `*${username}*`;
    }

    const usersPromise = await this.httpService
      .get<Auth0UserModel[]>(this.auth0AdminUserUrl, config)
      .pipe(
        catchError((err) => {
          console.log('Error while invoking the user url', err);
          return throwError('Error while invoking the user url');
        })
      )
      .toPromise();

    this.users = await usersPromise.data.filter((user, i, arr) => {
      return arr.findIndex((t) => t.name === user.name) === i;
    });
    return this.users;
  }

  async getUser(userId: string): Promise<Auth0UserModel> {
    if (!userId) {
      throw new NotFoundException('User not found');
    }
    const response: any = await this.getAuth0AdminApiToken();

    const config: AxiosRequestConfig = {
      params: {
        fields: 'name,email,picture,user_id',
        search_engine: 'v3',
        per_page: '1',
      },
      headers: { Authorization: `Bearer ${response.data.access_token}` },
    };

    const usersPromise = await this.httpService
      .get<Auth0UserModel>(`${this.auth0AdminUserUrl}/${userId}`, config)
      .pipe(
        catchError((err) => {
          console.log('Error while invoking the user url', err);
          return throwError('Error while invoking the user url');
        })
      )
      .toPromise();

    return await usersPromise.data;
  }

  retrieveUsers() {
    return this.users;
  }
}
