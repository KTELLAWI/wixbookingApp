// import { createClient, OAuthStrategy } from '@wix/api-client';
import{NextResponse} from'next/server'

export async function middleware(request) {
    if (!request.cookies.get('session')) {
      const response = NextResponse.next();
      // const myWixClient = createClient({ auth: OAuthStrategy({ clientId: `27761eb6-dc3e-4cba-910d-602430ceca02` }) });
     // response.cookies.set('session', "JSON.stringify(await myWixClient.auth.generateVisitorTokens())");
      return response;
    }
  }