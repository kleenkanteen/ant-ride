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

  useEffect(() => {
    const initializeMap = async () => {
      if (map.current) return;

      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
        center: [lng, lat],
        zoom: zoom,
      });

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
    };

    initializeMap();

  }, [API_KEY, lng, lat, zoom]);


  
  // from https://www.geoapify.com/route-and-schedule-optimization-for-workers-with-route-planner-api
  // secondary sources: https://apidocs.geoapify.com/docs/route-planner/#about
  // and https://maplibre.org/maplibre-gl-js/docs/examples/geojson-line/
  useEffect(() => {
    if (map.current) {
      map.current.on('load', () => {
        // colors
        const colors = ["#ff4d4d", "#1a8cff", "#00cc66", "#b300b3", "#e6b800", "#ff3385",
          "#0039e6", "#408000", "#ffa31a", "#990073", "#cccc00", "#cc5200", "#6666ff", "#009999"
        ];

        notifyAboutIssues(carpools.female_carpools);
        carpools.female_carpools.features.forEach((feature, index) => visualizeAgentWaypoints(feature, colors[index]));
        carpools.female_carpools.features.forEach((feature, index) => visualizeAgentRoute(feature, colors[index], index));

        const serviceJobsOptimizationInput = carpools.female_carpools.features.properties.params;

        visualizeLocations(serviceJobsOptimizationInput, map);

        function visualizeLocations(routeOptimizationTask, map) {
          // collect unique locations
          const locationMap = {};

          routeOptimizationTask.jobs.forEach(job => {
            const locationStr = `${job.location[1]} ${job.location[0]}`;
            locationMap[locationStr] = job.location;
          });

          // visualize lication as a layer
          const geoJSONObj = {
            "type": "FeatureCollection",
            "features": Object.keys(locationMap).map(locationKey => {
              return {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": locationMap[locationKey]
                }
              }
            })
          };

          map.current.addSource('locations', {
            type: 'geojson',
            data: geoJSONObj
          });


          map.current.addLayer({
            'id': 'locations',
            'type': 'circle',
            'source': 'locations',
            'paint': {
              'circle-radius': 5,
              'circle-color': "#ff9933",
              'circle-stroke-width': 1,
              'circle-stroke-color': '#994d00',
            }
          });
        }

        function notifyAboutIssues(result) {
          if (result.properties.issues) {
            alert(`The solution has issues: ${Object.keys(result.properties.issues).join(', ')}`);
          }
        }

        function visualizeAgentWaypoints(feature, color) {
          const waypoints = feature.properties.waypoints
            .map((waypoint, index) => {
              return {
                "type": "Feature",
                "properties": {
                  index: index + 1
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": waypoint.location
                }
              }
            });

          // create points source + layer
          map.current.addSource(`agent-${feature.properties.agent_index}-waypoints`, {
            type: 'geojson',
            data: {
              "type": "FeatureCollection",
              "features": waypoints
            }
          });

          map.current.addLayer({
            'id': `agent-${feature.properties.agent_index}-waypoints-circle`,
            'type': 'circle',
            'source': `agent-${feature.properties.agent_index}-waypoints`,
            'paint': {
              'circle-radius': 10,
              'circle-color': color,
              'circle-stroke-width': 1,
              'circle-stroke-color': "rgba(0,0,0,0.2)"
            }
          });

          map.current.addLayer({
            'id': `agent-${feature.properties.agent_index}-waypoints-text`,
            'type': 'symbol',
            'source': `agent-${feature.properties.agent_index}-waypoints`,
            'layout': {
              "text-field": '{index}',
              'text-allow-overlap': false,
              "text-font": [
                "Roboto", "Helvetica Neue", "sans-serif"
              ],
              "text-size": 12
            },
            'paint': {
              "text-color": "rgba(255, 255, 255, 1)"
            }
          });
        }

        function visualizeAgentRoute(feature, color, index) {
          const lineWidth = 7 - index;
          const shift = -2 + index * 2;

          const myAPIKey = '';
          // generate a route and visualize it
          const waypoints = feature.properties.waypoints.map(waypoint => waypoint.location[1] + ',' + waypoint.location[0]).join('|');
          fetch(`https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=drive&apiKey=${myAPIKey}`)
            .then(res => res.json())
            .then(res => {
              map.current.addSource(`agent-${feature.properties.agent_index}-route`, {
                type: 'geojson',
                data: res
              });

              map.current.addLayer({
                'id': `agent-${feature.properties.agent_index}-route`,
                'type': 'line',
                'source': `agent-${feature.properties.agent_index}-route`,
                'layout': {
                  'line-cap': "round",
                  'line-join': "round"
                },
                'paint': {
                  'line-color': color,
                  'line-width': lineWidth,
                  'line-translate': [shift, shift]
                }
              });

              map.current.moveLayer(`agent-${feature.properties.agent_index}-waypoints-circle`);
              map.current.moveLayer(`agent-${feature.properties.agent_index}-waypoints-text`);
            });
        }
      }
      )
    }
  }, [map.current]);

  return (
    <div className="text-center map-wrap">
      <div className="map-wrap">
        <div ref={mapContainer} className="map" />
      </div>
    </div>
  )
};
