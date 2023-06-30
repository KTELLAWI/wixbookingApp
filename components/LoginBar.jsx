import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { createClient, OAuthStrategy } from '@wix/api-client'
import Cookies from 'js-cookie'
import { members } from '@wix/members'

const myWixClient = createClient({
    modules: {members},
    auth: OAuthStrategy({
        clientId: "27761eb6-dc3e-4cba-910d-602430ceca02",
        tokens: JSON.parse(Cookies.get('session') || null)
    })
})

const LoginBar = () => {
    const [user, setUser] = useState("k")
    const [member, setMember] = useState(null)
    const [authUrl, setAuthUrl] = useState()

    const login = async () => {
        const data = await myWixClient.auth.generateOAuthData(`${window.location.origin}/login-callback`, window.location.href);
        localStorage.setItem("oauthRedirectData", JSON.stringify(data));
        const { authUrl } = await myWixClient.auth.getAuthUrl(data);
        window.location = authUrl;
        setAuthUrl(authUrl);
        // console.log("data",data)
        // console.log('authurl',authUrl)
    }

    const logout = async () => {
        const { logoutUrl } = await myWixClient.auth.logout(window.location.href)
        Cookies.remove('session');
        window.location = logoutUrl

    }

    const fetchMembers = async () => {
        const { member } =  myWixClient.auth.loggedIn() ? await myWixClient.members.getMyMember() : {}
        setMember(member || undefined)
    }
    useEffect(() => {
        fetchMembers()
    }, []);
    useEffect(() => {
        if (myWixClient.auth.loggedIn()) {
            setUser(member?.profile?.nickname || member?.profile?.slug || '')
        } else {
            setUser('visitor')

        }
    }, [ myWixClient.auth.loggedIn()])

console.log('member',member)
console.log('user',myWixClient.auth.loggedIn())

console.log('authUrl',authUrl)

    return (
        <nav>

            <div className="item-container">
                <p>Hello {user}</p>
            </div>
            {member !== null || member !== undefined &&
                <button
                    className='login'
                    onClick={() => myWixClient.auth.loggedIn() ? logout() : login()}
                >{myWixClient.auth.loggedIn() ? "Log outg" : "Log in"}
                </button>}
            <div className='item-container'>
                <button className='primary' onClick={login}>

                    Try for free</button>
            </div>


        </nav>



    )
}

export default LoginBar