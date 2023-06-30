import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import {useEffect, useRef} from 'react';

const Map =({coords})=>{
    const mapContainer = useRef(null)
    const map =useRef(null)
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX 

    useEffect(()=>{

        if(map.current) return 
        if (coords[0]?.longitude && coords[0]?.latitude )
       {
           map.current= new mapboxgl.Map({
               container:mapContainer.current,
               style:'mapbox://styles/mapbox/streets-v10',
               center:[coords[3]?.longitude , coords[3]?.latitude],
               zoom:15
           })
           coords.forEach(coord => {
            const marker = new mapboxgl.Marker({
                color:"rgb(2,86,254)",
        
        
            }).setLngLat([coord.longitude,coord.latitude]).addTo(map.current)
            
           });
      
       
       }
       
           },[coords[0]?.longitude , coords[0]?.latitude])

    return(
        <div className='map-container'>
            <div ref={mapContainer}>
            </div>

        </div>

    )
}

export default Map;