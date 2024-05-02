import * as yup from "yup";

export const schema = yup.object().shape({
    event_code: yup.string().min(6).max(6).matches(/^[a-zA-Z0-9]+$/, "Invalid character(s) entered").required(),
    edit_code: yup.string().min(6).max(6).matches(/^[a-zA-Z0-9]+$/, "Invalid character(s) entered").required(),
    remove: yup.boolean().required(),
    name: yup.string().max(40).required(),
    gender: yup.string().required(),
    location: yup.string().max(40).required(),
    can_pickup: yup.boolean().required(),
    seats_available: yup.number().max(20).required()
});

export interface IParticipantDetails {
    event_code: string,
    edit_code: string,
    remove: boolean,
    name: string,
    gender: string,
    location: string,
    can_pickup: boolean,
    seats_available: number,
}
