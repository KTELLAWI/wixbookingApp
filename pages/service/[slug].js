import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { createClient, OAuthStrategy } from '@wix/api-client'
// import { avaiLabiLityCaLender, services } from '@wix/bookings'
import { redirects } from '@wix/redirects'
import Cookies from 'js-cookie'
import ScheduleCard from '../../components/ScheduleCard'
import MiniMaps from '../../components/MiniMaps';
import MainImage from '../../components/MainImage';


// import { createClient } from '@wix/api-client';
import { availabilityCalendar, services } from '@wix/bookings';

// const wixClient = createClient({ modules: { availabilityCalendar } , headers: { Authorization: 'MY-TOKEN' } });

// async function queryAvailability(query, options) {
//   const response = await wixClient.availabilityCalendar.queryAvailability(query, options);
// }


const myWixClient = createClient({
    modules: { services, availabilityCalendar, redirects },
    auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
        tokens: JSON.parse(Cookies.get('session') || null)
    })
})


const ServicePage = () => {
    const [service, setService] = useState();
    const router = useRouter();
    const [availabilityEntries, setAvailabilityEntries] = useState([]);

    const fetchService = async () => {
        if (router.query.slug) {
            const serviceItem = await myWixClient.services.queryServices().eq("mainSlug.name", decodeURIComponent(router.query.slug)).find();
            setService(serviceItem.items[0]);

        }

    }
    const fetchAvailability = async () => {
        const today = new Date();
        const oneWeek = new Date(today)
        oneWeek.setDate(oneWeek.getDate(today) + 7);
        const availablity = await myWixClient.availabilityCalendar.queryAvailability({
            filter: {
                serviceId: [service._id],
                startDate: today.toISOString(),
                endDate: oneWeek.toISOString(),
            }
        }, { timeZone: 'UTC' })

        setAvailabilityEntries(availablity.availabilityEntries);
    }

    useEffect(() => {

        fetchService();
    }, [router.query.slug])


    useEffect(() => {
        if (service) fetchAvailability()
    }, [service])
    console.log("services,", availabilityEntries)

    return (
        <>
            {service &&
                <article className='service-container'>
                    <div className='info-container'>
                        <MainImage
                        service={service}
                        />
                        <h1>{service, name}</h1>
                        <p>{service.tagLine}</p>
                        <p>{service.description}</p>
                        <hr />
                        <h3>Schedule</h3>
                        {availabilityEntries?.map((availabilityEntry)=>
                <ScheduleCard
                key={Object.keys(availabilityEntry)}
                availabilityEntry={availabilityEntry}/>
                )}

                    </div>
                    <div className='address-container'>
                        <MiniMaps
                        lng={service.locations[0].business.address.location.longitude}
                        lat={service.locations[0].business.address.location.latitude}
                        />
                        <p>
                            {service.locations[0].business.address.formatted}
                        </p>
                        <p>{service.locations[0].business.address.city}</p>
                        <p>{service.locations[0].business.address.country}</p>

                    </div>

                </article>

            }
        </>
    )


}


export default ServicePage