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

export function Places({ register, setValue }) {
  const [address, setAddress] = useState("");
  const [formatted_address, setFormattedAddress] = useState("");
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
      version: "weekly",
      libraries: ['places'],
    });

    loader.load().then(() => {
      setApiLoaded(true);
    });
  }, []);

  useEffect(() => {
    setValue("location", formatted_address);
    console.log("changed: ", formatted_address);
  }, [formatted_address])

  const handleSelect = async autocompleted_address => {
    const geocoded_address = await geocodeByAddress(autocompleted_address);
    const latlong = await getLatLng(geocoded_address[0]);
    console.log(geocoded_address[0]);
    console.log(latlong);
    console.log(`${geocoded_address[0].formatted_address}|${latlong.lat}|${latlong.lng}`);
    setFormattedAddress(`${geocoded_address[0].formatted_address}|${latlong.lat}|${latlong.lng}`);
    setAddress(geocoded_address[0].formatted_address);
  }
  return (
    <div>
      {apiLoaded &&
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div
            >
              <input
                {...getInputProps({
                  className: "input input-bordered w-full max-w-xs",
                })}
                max="90"
              />
              <div className="dropdown-content bg-base-200 top-14 max-h-96 overflow-auto flex-col rounded-md">
                {suggestions.map((suggestion, index) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  return (
                    <div key={index}
                      {...getSuggestionItemProps(suggestion, {
                        className: "border-2 border-gray-600 border-solid p-4 text-base w-full hover:bg-gray-700",
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