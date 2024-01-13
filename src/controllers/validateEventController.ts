import CarpoolService from '../services/carpoolService';

const validateEventCode = async (eventCode: string) => {
    const carpoolEvent = await CarpoolService.getCarpoolEventByEventCode(eventCode);
    return carpoolEvent !== null;
};

export default { validateEventCode };