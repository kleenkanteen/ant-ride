/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { Loader } from "@googlemaps/js-api-loader";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useEffect, useState } from "react";

export function AddressAutocomplete({ setValue }) {
  const [address, setAddress] = useState("");
  const [formatted_address, setFormattedAddress] = useState("");
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      setApiLoaded(true);
    });
  }, []);

  useEffect(() => {
    setValue("address", formatted_address);
  }, [formatted_address]);

  const handleSelect = async (autocompleted_address) => {
    const geocoded_address = await geocodeByAddress(autocompleted_address);
    const latlong = await getLatLng(geocoded_address[0]);
    setFormattedAddress(
      `${geocoded_address[0].formatted_address}|${latlong.lat}|${latlong.lng}`,
    );
    setAddress(geocoded_address[0].formatted_address);
  };
  return (
    <div>
      {apiLoaded ? (
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div>
              <input
                {...getInputProps({
                  className: "input input-bordered w-full max-w-xs",
                })}
                max="90"
              />
              <div className="dropdown-content top-14 max-h-96 flex-col overflow-auto rounded-md bg-base-200">
                {suggestions.map((suggestion, index) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  return (
                    <div
                      key={`${index}`}
                      {...getSuggestionItemProps(suggestion, {
                        className:
                          "border-b cursor-pointer border-b-base-content/10 p-4 text-base w-full",
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
      ) : (
        <input className="input input-bordered w-full max-w-xs" disabled />
      )}
    </div>
  );
}
