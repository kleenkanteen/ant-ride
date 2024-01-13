import { nanoid } from 'nanoid';
import CarpoolService from '../services/carpoolService';
import { CarpoolDataSchema, CarpoolData } from '../types/types';

const createCarpool = async (carpoolData: unknown) => {
    try {
        // Validate the data
        const validatedData = CarpoolDataSchema.parse(carpoolData);

        // Generate random codes using nanoid
        validatedData.event_code = nanoid(4); // 4 characters long
        validatedData.event_edit_code = nanoid(6); // 6 characters long

        // Create the carpool event
        const newCarpool = await CarpoolService.createCarpool(validatedData);
        
        // Return the new carpool event data
        return newCarpool;

    } catch (error) {
        // Throw the error for the calling function to handle
        throw error;
    }
};

export default { createCarpool };




