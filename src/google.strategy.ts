/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, type VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.AUTH_GOOGLE_KEY,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: [
        'email',
        'profile',
        'https://www.googleapis.com/auth/calendar.events',
        'https://www.googleapis.com/auth/calendar.readonly',
      ],
      accessType: 'offline',
      prompt: 'consent',
    });
  }

  validate(
    accessToken: string,
    _refreshToken: string,
    profile: {
      id: string;
      emails: { value: string }[];
      displayName: string;
      photos: { value: string }[];
    },
    done: VerifyCallback,
  ) {
    try {
      const { id, emails, displayName, photos } = profile;
      if (!id || !emails || !displayName || !photos) {
        throw new Error('Invalid profile');
      }
      const user = {
        id,
        email: emails[0].value,
        name: displayName,
        photo: photos[0].value,
        accessToken,
      };

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}
