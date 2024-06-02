
## Purpose
(Sabih speaking)

The purpose of ant ride is to minimize the effort needed to organize and create the most distance efficient carpooling groups. The few existing carpooling websites are too manual and don't automatically match riders and drivers. They make people log in and manually choose which carpool they want to join. There is too much bloat.

My website allows an organizer to create an event and a share link. Participants can open the link and all they enter is their name, gender, address, and whether they can drive. Then 48 hours before the event starts, everyone gets a text message to confirm they are going to attend. After everyone is given 24 hours to confirm their spot, the final carpool groups are created and messaged to everyone 24 hours before the event starts. The carpool groups are based on each person's location as to minimize the total distance travelled. This will save both time and fuel. 

When I shared this idea with a researcher who worked at a hospital in Toronto, he said that in 2018, workers of GO trains went on strike which affected him and many of his colleagues who rode the train to the hospital. They then communicated on the internal message board to coordinate carpools. I can only imagine how tedious it was, messaging each other back and forth. There has to be an easier, more efficient way of doing all this.

Work wise, it was 85% me, 10% another friend, and 5% another friend. 

I'm fighting climate change one line at a time.

Public Trello board for the project: [https://dub.sh/ant-ride-trello](https://dub.sh/ant-ride-trello)

## Tech stack
- Frontend framework: Next.js + Typescript - hosted on Vercel
- Backend API framework: Adonis - hosted on a 1gb ram Digitalocean vps
- Database: Supabase (serverless postgres)

## Third Party Services
- Cron jobs: cron-job.org
- Text messaging: Twilio

## Frontend Libraries
- UI: Tailwind + DaisyUI
- Forms: react-hook-form + yup for 
input validation
- MUI for date and time 
picker

## Map
- Address autocomplete: Google Maps Search API
- Carpool routes optimization: [Geoapify Route Planner API](https://www.geoapify.com/route-and-schedule-optimization-for-workers-with-route-planner-api)
- Carpool routes visualization: [maplibre-gl library](https://github.com/maplibre/maplibre-gl-js/) 
- Tiles: [Maptiler](https://www.maptiler.com/cloud/)