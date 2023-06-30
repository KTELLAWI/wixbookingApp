

import { createClient, OAuthStrategy } from '@wix/api-client'
import { avaiLabiLityCaLender, services } from '@wix/bookings'
import { redirects } from '@wix/redirects'
import Cookies from 'js-cookie'


export const myWixClient = createClient({
    modules: { services, redirects },
    auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
        tokens: JSON.parse(Cookies.get('session') || null)
    })
})
