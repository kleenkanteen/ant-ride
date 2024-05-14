
## Purpose
(Sabih speaking throughout everything)

To minimize the effort needed to organize carpools. The current websites
make people log in, or manually choose which carpool they want to join. This should be automated.

My website allows an organizer to create an event and then share it with a link. Participants can use the link and upon entering, all they enter is their name, gender, address, and whether they can drive. Then 48 hours before the event starts, everyone gets a text message of their assigned driver/riders and to confirm that they can make it. The carpool groups are based on everyone's location as to minimize total distance travelled. This will save both time and fuel. After everyone is given 24 hours to confirm their spot, the final carpool groups are sent out 24 hours before the event starts.

When I shared this idea with a researcher who worked at a hospital in Toronto, he said that in 2018, workers of GO trains went on strike which affected him and many of his colleagues who rode the train. They communicated on the internal message board to coordinate carpools. I can only imagine how tedious it was, messaging each other back and forth. There has to be an easier, more efficient way of doing all this.

The team is mostly me. I had one friend chip in a bit at the beginning with one feature for a couple hours. Another friend joined later on, and still is as at the time of writing this. I'm fighting climate change one line at a time.

Project Trello board: [https://dub.sh/ant-ride-trello](https://dub.sh/ant-ride-trello)

## Tech stack
- Typescript + Next.js for the frontend hosted on Vercel
- Adonis for the backend API
- Supabase (managed postgres)
- Backen hosted on a 2gb ram Hetzner server I rent for $5/month

## Libraries
- UI: Tailwind + DaisyUI
- Forms: react-hook-form + yup for 
input validation
- MUI for date and time 
picker

## Map
- Google Maps API for the address autocomplete