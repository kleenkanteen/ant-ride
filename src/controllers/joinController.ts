import { nanoid } from 'nanoid';
import UserService from '../services/userService';
import eventParticipantService from '../services/eventParticipantService';
import { JoinCarpoolRequest } from '../types/types';

const joinCarpool = async (joinCarpoolData: JoinCarpoolRequest) => {
    try {
        // Create the user
        const newUser = await UserService.createUser({
            name: joinCarpoolData.userName,
            email: joinCarpoolData.userEmail,
            phone_number: joinCarpoolData.userPhoneNumber
        });

        // Assume newUser contains the user's ID
        const userId = newUser[0].id;

        // Retrieve the carpool event ID using the provided event code
        // This will require a service function to fetch the event by code
        const carpoolEvent = await CarpoolService.getCarpoolEventByEventCode(joinCarpoolData.carpoolEventCode);
        const eventId = carpoolEvent.id;

        // Create the participant
        const newParticipant = await ParticipantService.createParticipant({
            user_id: userId,
            event_id: eventId,
            // other details
        });

        return newParticipant;
    } catch (error) {
        throw error;
    }
};

export default { joinCarpool };
