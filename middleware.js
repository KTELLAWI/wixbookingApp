import{NextResponse} from'next/server'
// import process from 'next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss';
import {createClient,OAuthStrategy} from '@wix/api-client';


export async function middleware(request){
    if(!request.cookies.get('session')){
        const response = NextResponse.next();
        const myWixClient = createClient({
            auth:OAuthStrategy({clientId:process.env.NEXT_PUBLIC_WIX_CLIENT_ID})
        })
        response.cookies.set('session',JSON.stringify(await myWixClient.auth.generateVisitorTokens())
        );
        return response;


    }
}