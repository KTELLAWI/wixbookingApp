import {createClient,OAuthStrategy} from '@wix/api-client';

export const myWixClient = createClient({
    auth:OAuthStrategy({clientId:process.env.NEXT_PUBLIC_WIX_CLIENT_ID})
})