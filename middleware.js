import{NextResponse} from'next/server'
// import process from 'next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss';
//import {myWixClient} from "./helper.js"
import { createClient, OAuthStrategy } from '@wix/api-client'
import { avaiLabiLityCaLender, services } from '@wix/bookings'
import { redirects } from '@wix/redirects'
import Cookies from 'js-cookie'

export async function middleware(request){
    


 const myWixClient = createClient({
    modules: { services, redirects },
    auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
        tokens: JSON.parse(Cookies.get('session') || null)
    })
})

    if(!request.cookies.get('session')){
        const response = NextResponse.next();
     
        response.cookies.set('session',JSON.stringify(await myWixClient.auth.generateVisitorTokens())
        );
        return response;


    }
    else{
        const response = NextResponse.next();
        return response;



    }
}