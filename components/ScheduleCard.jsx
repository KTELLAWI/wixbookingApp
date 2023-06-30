// import { moment } from 'moment';
import  * as moment from 'moment';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { createClient, OAuthStrategy } from '@wix/api-client'
import { redirects } from '@wix/redirects'
import Cookies from 'js-cookie'
import { availabilityCalendar, services } from '@wix/bookings';

const myWixClient = createClient({
    modules: { services, availabilityCalendar, redirects },
    auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
        tokens: JSON.parse(Cookies.get('session') || null)
    })
})



const ScheduleCard = ({ availabilityEntry }) => {
    const dd = availabilityEntry.slot;
    const startDate = moment(availabilityEntry.slot.startDate, 'YYYY-MM-DD HH:mm:ss');
    const startDay = startDate.format("dddd MM yy");
    // const endtDate= moment(availabilityEntry.slot.startDate).format('YYYY-MM-DD',"HH:MM:SS");
   const startTime = startDate.format('HH:mm')
    const endTime = moment(availabilityEntry.slot.endDate, 'YYYY-MM-DD HH:mm:ss').format("hh:MM");


    const createRedirect= async(slotAvailability)=>{
        const redirect = await myWixClient.redirects.createRedirectSession({
            bookingsCheckout:{slotAvailability,timezone:"UTC"},
            callbacks:{postFlowUrl:window.location.href}
        })
       window.location= redirect.redirectSession.fullUrl
    }
    console.log("aaaa",dd)
    return (
        <button className='schedule-card-button' onClick={()=>createRedirect(availabilityEntry)}>
            <p>{startDay}</p>
            <p> {startTime}</p>
            <p> {endTime}</p>


        </button>


 )

}


export default ScheduleCard