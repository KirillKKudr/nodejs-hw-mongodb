import { OAuth2Client } from 'google-auth-library';
import path from 'node:path';
import { readFile } from 'fs/promises';

import { getEnvVar } from './getEnvVar.js';
import createHttpError from 'http-errors';

const PATH_JSON = path.join(process.cwd(), 'google-oauth.json');

let googleOAuthClient = null;

try {
  const file = await readFile(PATH_JSON, 'utf-8');
  const oauthConfig = JSON.parse(file);

  googleOAuthClient = new OAuth2Client({
    clientId: getEnvVar('GOOGLE_AUTH_CLIENT_ID'),
    clientSecret: getEnvVar('GOOGLE_AUTH_CLIENT_SECRET'),
    redirectUri: oauthConfig.web.redirect_uris[0],
  });
} catch (error) {
  console.warn('⚠️ Google OAuth config not found or invalid. Skipping OAuth setup.');
}

export const generateAuthUrl = () => {
  if (!googleOAuthClient) {
    throw createHttpError(500, 'OAuth client not configured');
  }

  return googleOAuthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
};

export const validateCode = async (code) => {
  if (!googleOAuthClient) {
    throw createHttpError(500, 'OAuth client not configured');
  }

  const response = await googleOAuthClient.getToken(code);
  if (!response.tokens.id_token) throw createHttpError(401, 'Unauthorized');

  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });
  return ticket;
};

export const getFullNameFromGoogleTokenPayload = (payload) => {
  let fullName = 'Guest';
  if (payload.given_name && payload.family_name) {
    fullName = `${payload.given_name} ${payload.family_name}`;
  } else if (payload.given_name) {
    fullName = payload.given_name;
  }

  return fullName;
};
