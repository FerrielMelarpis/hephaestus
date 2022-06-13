import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';
import { UserService } from 'src/server/user/user.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get<string>('GH_OAUTH_CLIENT_ID'),
      clientSecret: configService.get<string>('GH_OAUTH_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GH_OAUTH_CALLBACK_URL'),
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const { id } = profile;
    const user = await this.userService.findByCredential({
      provider_subject: {
        provider: 'github',
        subject: id,
      },
    });

    if (!user) {
      return this.userService.createUser({
        username: profile.username,
        credential: {
          create: {
            provider: 'github',
            subject: id,
          },
        },
      });
    }

    return user;
  }
}
