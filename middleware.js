import{NextResponse} from'next/server'
// import process from 'next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss';
import myWixClient from "./helper.js"

export async function middleware(request){
    if(!request.cookies.get('session')){
        const response = NextResponse.next();
     
        response.cookies.set('session',JSON.stringify(await myWixClient.auth.generateVisitorTokens())
        );
        return response;


    }
}