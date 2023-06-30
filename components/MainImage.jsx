import {media} from '@wix/api-client'

const MainImage =({service})=>{
    const image = media.getImageUrl(service.media.mainMedia.image) 

    return(
        <div className="main-img-container">
            <img
            src={image.url}
            />
        </div>
    )

}

export default MainImage