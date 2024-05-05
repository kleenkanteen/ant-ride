import * as yup from "yup";

export const schema = yup.object().shape({
  event_code: yup.string().min(5).max(5).required(),
  edit_code: yup.string().min(5).max(5).required(),
  remove: yup.boolean().required(),
  name: yup.string().max(40).required(),
  phone_num: yup.string().max(15).required(),
  gender: yup.string().required(),
  address: yup.string().max(40).required(),
  can_pickup: yup.boolean().required(),
  seats_available: yup.number().max(20).required(),
});

export interface IParticipantDetails {
  event_code: string;
  edit_code: string;
  remove: boolean;
  name: string;
  phone_num: string;
  gender: string;
  address: string;
  can_pickup: boolean;
  seats_available: number;
}
