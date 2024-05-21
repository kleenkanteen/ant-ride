"use client";

import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useRef, useState } from 'react';
import './map.css';
import { carpools } from "./test";

export default function Carpools() {
  const mapContainer: any = useRef(null);
  const map: any = useRef(null);
  const [lng] = useState(-79.64630033698033);
  const [lat] = useState(43.55310371818801);
  const [zoom] = useState(14);
  const NEXT_PUBLIC_MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY;
  const [API_KEY] = useState(NEXT_PUBLIC_MAPTILER_KEY);

  // async function fetchCarpools() {
  //   const data = {
  //     event_code: "8aTIl",
  //     password: "928dcfaaf338f43baac2de274e683c73cfa67de87a235ac55fafc55b09bc25d5"
  //   }

  //   return await ky
  //     .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/participant`, {
  //       json: data,
  //     })
  //     .json();
  // }

  useEffect(() => {
    const initializeMap = async () => {
      if (map.current) return;

      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
        center: [lng, lat],
        zoom: zoom,
      });

      // const carpools = await fetchCarpools();

      const all = carpools;
      console.log("ALL", carpools.female_carpools.features);
      console.log("REVEAL THEYSELF", all.features);
      let routePlans;
      if (carpools?.features) {
        routePlans = await carpools.features[0]?.properties;
        console.log("FOUND")
      }
      else {
        console.log("NOT FOUND")
      }

      // routePlans.forEach((agentPlan) => {
      //   const items = agentPlan.waypoints.map((waypoint, index) =>
      //     // @ts-ignore
      //     new Point(waypoint.location, { index: index + 1 })
      //   );

      // create points source + layer
      // map.addSource(`waypoints-of-agent-${agentPlan.agentIndex}`, {
      //   type: "geojson",
      //   data: featureCollection(items),
      // });

      //   map.addLayer({
      //     id: `waypoints-of-agent-${agentPlan.agentIndex}`,
      //     type: "circle",
      //     source: `waypoints-of-agent-${agentPlan.agentIndex}`,
      //     paint: {
      //       "circle-radius": 10,
      //       "circle-color": color, // set any color here
      //       "circle-stroke-width": 1,
      //       "circle-stroke-color": darker_color, // set a darker color here
      //     },
      //   });

      //   map.addLayer({
      //     id: `waypoints-text-of-agent-${agentPlan.agentIndex}`,
      //     type: "symbol",
      //     source: `waypoints-of-agent-${agentPlan.agentIndex}`,
      //     layout: {
      //       "text-field": "{index}",
      //       "text-allow-overlap": false,
      //       "text-font": ["Roboto", "Helvetica Neue", "sans-serif"],
      //       "text-size": 12,
      //     },
      //     paint: {
      //       "text-color": textColor, // set contrast to the color textColor
      //     },
      // }


      // });

    };

    initializeMap();

  }, [API_KEY, lng, lat, zoom]);


  useEffect(() => {
    if (map.current) {
    map.current.on('load', () => {
      map.current.addSource('points', {
        "type": "geojson",
        "data": carpools.female_carpools
      });

      map.current.addLayer({
        id: 'points',
        type: 'circle',
        source: 'points',
      });
    });
  }
  }, [map.current]);

  // if (map.current) {
  //   map.current.addSource('carpools', {
  //     "type": "geojson",
  //     "data": carpools.female_carpools.features
  //   });

  //   map.current.addSource('my-data', {
  //     "type": "geojson",
  //     "data": {
  //       "type": "Feature",
  //       "geometry": {
  //         "type": "Point",
  //         "coordinates": [-79.6400354, 43.55777450000001]
  //       },
  //       "properties": {
  //         "title": "Mapbox DC",
  //         "marker-symbol": "monument"
  //       }
  //     }
  //   });
// }, [map]);

return (
  <div className="text-center map-wrap">
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  </div>
)
};
