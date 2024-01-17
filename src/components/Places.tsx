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
import { useEffect, useState } from 'react';

export function Places() {
  const [address, setAddress] = useState("")
  const [coordinates, setCoordinates] = useState({
    lat: null,
    long: null
  })

  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
      version: "weekly",
      libraries: ['places'],
    });

    loader.load().then(() => {
      console.log('Google Maps JavaScript API has been loaded');
      setApiLoaded(true);
    });
  }, []);

  const handleSelect = async autocompleted_address => {
    const geocoded_address = await geocodeByAddress(autocompleted_address);
    const latlong = await getLatLng(geocoded_address[0]);
    console.log(geocoded_address);
    console.log(latlong);
    console.log(`${autocompleted_address.formatted_address}|${autocompleted_address.lat}|${autocompleted_address.lng}`);
    setAddress(`${autocompleted_address.formatted_address}|${autocompleted_address.lat}|${autocompleted_address.lng}`);
    setCoordinates(latlong);
  }
  return (
    <div>
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
                  className: "input input-bordered w-full max-w-xs",
                })}
                max="70"
              />
              <div className="dropdown-content bg-base-200 top-14 max-h-96 overflow-auto flex-col rounded-md">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, index) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  return (
                    <div key={index}
                      {...getSuggestionItemProps(suggestion, {
                        className: "border-b border-b-base-content/10 p-4 text-base w-full",
                        /* border-b border-b-base-content/10*/
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