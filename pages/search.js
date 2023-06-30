import { useState, useEffect, useContext } from 'react';
import Link from "next/link";
import { createClient, OAuthStrategy } from '@wix/api-client';
import { services } from '@wix/bookings'
import Cookies from 'js-cookie';
import Card from '../components/Card'
import {searchContext} from '../pages/_app'
import Map from '../components/Map'

const myWixClient = createClient({
    modules: { services },
    auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
        tokens: JSON.parse(Cookies.get('session') || null)
    })
})


const Search = () => {


    const [servicList, setServiceList] = useState([]);
    const[searchTerm,setSearcTerm] = useContext(searchContext);

    const fetchService = async () => {
        let serviceList
        if (searchTerm){
            serviceList = await myWixClient.services.queryServices().contains('name',decodeURIComponent(searchTerm)).find();
        }
        else{
            serviceList = await myWixClient.services.queryServices().find(); 
               }
      
        setServiceList(serviceList.items);


    }

    useEffect(() => {
        fetchService();
    }, [searchTerm]);
    console.log(servicList);

let coords = servicList.map((serviceItem)=> serviceItem.locations[0].business.address.location)
console.log('coords',coords)

    return (
        <div className='search-container'>
            <div className='results-container'>
                <h2 >Choose the Clinic</h2>
                {/* <Map coords={coords}/> */}
                <ul>
                    {servicList.map((service) =>
                        <li key={service._id}>
                            <Link href={`/service/${service.mainSlug.name}`} className='card-link'>
                                <Card service={service} />
                            </Link>

                        </li>
                    )}
                </ul>
                
            </div>
            {/* <div className='map-contain'> */}
            <Map coords={coords}/>
            {/* </div> */}
           
        </div>
    )
}

export default Search