/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import { Loader } from '@googlemaps/js-api-loader';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import './App.css';

import { useEffect, useState } from 'react';

const googleMapsApiKey = 'AIzaSyBZdmJgO3NVSuKMDNRAnreRh5Hw8SnHotM';


function Places() {


  const [address, setAddress] = useState("")
  const [coordinates, setCoordinates] = useState({
    lat: null,
    long: null
  })

  const [apiLoaded, setApiLoaded] = useState(false);


  useEffect(() => {
    const loader = new Loader({
      apiKey: googleMapsApiKey,
      version: "weekly",
      libraries: ['places'],
    });

    loader.load().then(() => {
      console.log('Google Maps JavaScript API has been loaded');
      setApiLoaded(true);
    });
  }, []);

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);

    const ll = await getLatLng(results[0])
    console.log(ll)
    setAddress(value)
    setCoordinates(ll)
  }


  return (
    <div>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBZdmJgO3NVSuKMDNRAnreRh5Hw8SnHotM&libraries=places"></script>
      {apiLoaded &&
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div

            >
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, index) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div key={index}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span key={index}>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      }

    </div>
  );

}

export default Places;