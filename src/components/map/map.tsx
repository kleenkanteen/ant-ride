"use client";

// turn off eslint
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useEffect, useRef, useState } from "react";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";

export default function CarpoolMap({ event_data }: { event_data: any }) {
  const mapContainer: any = useRef(null);
  const map: any = useRef(null);
  const carpools: any = useRef(null);
  const jobs: any = useRef(null);
  const [lng] = useState(-79.64630033698033);
  const [lat] = useState(43.55310371818801);
  const [zoom] = useState(14);
  const NEXT_PUBLIC_MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY;
  const [API_KEY] = useState(NEXT_PUBLIC_MAPTILER_KEY);

  useEffect(() => {
    const initializeMap = async () => {
      if (map.current) return;

      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
        center: [lng, lat],
        zoom: zoom,
      });

      carpools.current = event_data.data.carpool_geojson;
      jobs.current = event_data.data.jobs;
    };

    // silecne eslint
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    initializeMap();
  }, [API_KEY, lng, lat, zoom]);

  // from https://www.geoapify.com/route-and-schedule-optimization-for-workers-with-route-planner-api
  // secondary sources: https://apidocs.geoapify.com/docs/route-planner/#about and https://maplibre.org/maplibre-gl-js/docs/examples/geojson-line/
  useEffect(() => {
    if (map.current) {
      map.current.on("load", () => {
        const colors = [
          "#ff4d4d",
          "#1a8cff",
          "#00cc66",
          "#b300b3",
          "#e6b800",
          "#ff3385",
          "#0039e6",
          "#408000",
          "#ffa31a",
          "#990073",
          "#cccc00",
          "#cc5200",
          "#6666ff",
          "#009999",
        ];

        visualizeLocations(jobs.current, map);
        let index = 0;
        for (const [key, value] of Object.entries(carpools.current)) {
          visualizeAgentWaypoints(key, value, colors[index]);
          visualizeAgentRoute(key, value, colors[index], index);
          index += 1;
        }

        function visualizeLocations(all_jobs, map) {
          // collect unique locations
          const locationMap = {};

          all_jobs.forEach((job) => {
            const locationStr = `${job.location[1]} ${job.location[0]}`;
            locationMap[locationStr] = job.location;
          });

          // visualize lication as a layer
          const geoJSONObj = {
            type: "FeatureCollection",
            features: Object.keys(locationMap).map((locationKey) => {
              return {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: locationMap[locationKey],
                },
              };
            }),
          };

          map.current.addSource("locations", {
            type: "geojson",
            data: geoJSONObj,
          });

          map.current.addLayer({
            id: "locations",
            type: "circle",
            source: "locations",
            paint: {
              "circle-radius": 5,
              "circle-color": "#ff9933",
              "circle-stroke-width": 1,
              "circle-stroke-color": "#994d00",
            },
          });
        }

        function visualizeAgentWaypoints(agent_index, data, color) {
          const waypoints = data.properties.waypoints.map((waypoint, index) => {
            return {
              type: "Feature",
              properties: {
                index: index + 1,
              },
              geometry: {
                type: "Point",
                coordinates: [waypoint.lon, waypoint.lat],
              },
            };
          });

          // create points source + layer
          map.current.addSource(`agent-${agent_index}-waypoints`, {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: waypoints,
            },
          });

          map.current.addLayer({
            id: `agent-${agent_index}-waypoints-circle`,
            type: "circle",
            source: `agent-${agent_index}-waypoints`,
            paint: {
              "circle-radius": 10,
              "circle-color": color,
              "circle-stroke-width": 1,
              "circle-stroke-color": "rgba(0,0,0,0.2)",
            },
          });

          map.current.addLayer({
            id: `agent-${agent_index}-waypoints-text`,
            type: "symbol",
            source: `agent-${agent_index}-waypoints`,
            layout: {
              "text-field": "{index}",
              "text-allow-overlap": false,
              "text-font": ["Roboto", "Helvetica Neue", "sans-serif"],
              "text-size": 12,
            },
            paint: {
              "text-color": "rgba(255, 255, 255, 1)",
            },
          });
        }

        function visualizeAgentRoute(agent_index, waypoints, color, index) {
          const lineWidth = 7 - index;
          const shift = -2 + index * 2;

          map.current.addSource(`agent-${agent_index}-route`, {
            type: "geojson",
            data: waypoints,
          });

          map.current.addLayer({
            id: `agent-${agent_index}-route`,
            type: "line",
            source: `agent-${agent_index}-route`,
            layout: {
              "line-cap": "round",
              "line-join": "round",
            },
            paint: {
              "line-color": color,
              "line-width": lineWidth,
              "line-translate": [shift, shift],
            },
          });

          map.current.moveLayer(`agent-${agent_index}-waypoints-circle`);
          map.current.moveLayer(`agent-${agent_index}-waypoints-text`);
        }
      });
    }
  }, [map.current]);

  return (
    <div className="map-wrap text-center">
      <div className="map-wrap">
        <div ref={mapContainer} className="map" />
      </div>
    </div>
  );
}
