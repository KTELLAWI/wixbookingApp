// import { createClient, OAuthStrategy } from '@wix/api-client'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { createClient, OAuthStrategy } from '@wix/api-client'
import { avaiLabiLityCaLender, services } from '@wix/bookings'
import { redirects } from '@wix/redirects'
import Cookies from 'js-cookie'


const myWixClient = createClient({
    modules: { services, redirects },
    auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
        tokens: JSON.parse(Cookies.get('session') || null)
    })
})



const LoginCallback =()=>{

    const[nextPage,setNextPage] = useState(null);
    const [erorrMessage,setErrorMessage] = useState(null)

    const verifyLogin = async()=>{
        const data= JSON.parse(localStorage.getItem('oauthRedirectData'))
        localStorage.removeItem('oauthRedirectData')

        try {
            const {code , state} = myWixClient.auth.parseFromUrl()
            let tokens= await myWixClient.auth.getMemberTokens(code,state, data)
            while (!tokens?.refreshToken?.value){
                tokens= await myWixClient.auth.getMemberTokens(code,state, data)
            }
            Cookies.set("session", JSON.stringify(tokens))
            window.location = data?.originalUri || '/'



        } catch (e) {
            setNextPage(data?.originalUri || '/')
            setErrorMessage(e.toString())
            
        }


    }

    useEffect(()=>{
        verifyLogin()
    },[])

    return(
         <article>
         {erorrMessage && <p>{erorrMessage}</p>}
          {nextPage ? <a href={nextPage}>Continue</a> : <>....Loading</>}
        </article>
    )
}

export default LoginCallback