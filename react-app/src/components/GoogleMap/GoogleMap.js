import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import "./GoogleMap.css"

const GoogleMapComponent = () => {

    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

    if (!isLoaded) {
        return (
            <div>Loading...</div>
        )
    }

    const geocoder = async () => {
        let location = await getGeocode({ address: "490105thAveOaklandCA94603" })
        let { lat, lng } = await getLatLng(location[0])
        console.log(lat,lng)

        return {lat,lng}
        
    }

    geocoder()

    return isLoaded ? (
        <div>
            <GoogleMap
                zoom={10}
                center={{ lat: 44, lng: -80 }}
                mapContainerClassName="map-container"

            ></GoogleMap>

        </div>
    ) : <></>
}



// const Map = () => {
//     console.log("Map is laoded")
//     return <GoogleMap
//         zoom={1}
//         // center={{ center }}
//         mapContainerClassName="map-container"

//     ></GoogleMap>
// }

export default GoogleMapComponent