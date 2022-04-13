import { createContext } from 'react'
import { useContext } from 'react'
import { Country, State, City } from 'country-state-city';

export const LocationContext = createContext();

const LocationProvider = (props) => {

    let countries = [Country.getCountryByCode('US')]
    let states = State.getStatesOfCountry('US')
    // const states = state.map(({ name }) => ({
    //     label: name,
    //     value: name.toLowerCase()

    // }))

    let cities = City.getCitiesOfCountry('US')
    const set = new Set()
    const filter = []
    cities.forEach(({ name }) => {
        if (!set.has(name)) {
            set.add(name)
            filter.push(name)
        }
    })

    const amenities = [
        {
            label: "Parking",
            value: 'parking',
            boolean: true
        },
        {
            label: "Kitchen",
            value: 'kitchen',
            boolean: true
        },
        {
            label: "Pool",
            value: 'pool',
            boolean: true
        },
        {
            label: "Hot-tub",
            value: 'hottub',
            boolean: true
        },
        {
            label: "Wifi",
            value: 'wifi',
            boolean: true
        },
        {
            label: "A.C.",
            value: 'ac',
            boolean: true
        },
        {
            label: "Self Check-in",
            value: 'self_check_in',
            boolean: true
        },
        {
            label: "Pets",
            value: 'pets',
            boolean: true
        },
        {
            label: "First-Aid",
            value: 'first_aid',
            boolean: true
        },
        {
            label: "Fire-extinguisher",
            value: 'fire_extinguisherr',
            boolean: true
        },
        {
            label: "Smoking",
            value: 'smoking',
            boolean: true
        },
        {
            label: "Toilet-Paper",
            value: 'toilet_paper',
            boolean: true
        },
        {
            label: "Soap",
            value: 'soap',
            boolean: true
        },
    ]


    return (
        <LocationContext.Provider value={{ countries, states, filter, amenities }}>
            {props.children}
        </LocationContext.Provider>
    )
}

export const useLocations = () => {
    return useContext(LocationContext)
}

export default LocationProvider