import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import {useEffect, useRef} from 'react';


const MiniMaps= ({lng,lat}) =>{
    // const lat = 25.0820321
    // const lng = 55.14139609999999
    const mapContainer = useRef(null)
    const map =useRef(null)
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX 

    useEffect(()=>{

 if(map.current) return 
 if (lng)
{
    map.current= new mapboxgl.Map({
        container:mapContainer.current,
        style:'mapbox://styles/mapbox/streets-v12',
        center:[lng,lat],
        zoom:15
    })
    const marker = new mapboxgl.Marker({
        color:"rgb(2,86,254)",


    }).setLngLat([lng,lat]).addTo(map.current)

}

    },[lng,lat])

    return(
        <div className ='mini-map-container'>
            <div ref={mapContainer}>

            </div>

        </div>

    )
}

export default MiniMaps