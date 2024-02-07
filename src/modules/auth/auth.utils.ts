import { Request } from 'express';

export function extractTokenFromHeader(request: Request) {
  console.log(`req: ${request.cookies['access_token']}`);
  return request.cookies['access_token'];
}
