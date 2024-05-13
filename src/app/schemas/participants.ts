import * as yup from "yup";

export const schema = yup.object().shape({
  event_code: yup.string().min(5).max(5).required(),
  edit_code: yup.string().min(5).max(5).required(),
  remove: yup.boolean().required(),
  name: yup.string().when("remove", {
    is: false,
    then: () => yup.string().max(40).required(),
    otherwise: () => yup.string().notRequired(),
  }),
  phone_num: yup.string().when("remove", {
    is: false,
    then: () => yup.string().max(10).required(),
    otherwise: () => yup.string().notRequired(),
  }),
  gender: yup.string().when("remove", {
    is: false,
    then: () => yup.string().required(),
    otherwise: () => yup.string().notRequired(),
  }),
  address: yup.string().when("remove", {
    is: false,
    then: () => yup.string().max(100).required(),
    otherwise: () => yup.string().notRequired(),
  }),
  can_pickup: yup.boolean().when("remove", {
    is: false,
    then: () => yup.boolean().required(),
    otherwise: () => yup.boolean().notRequired(),
  }),
  seats_available: yup.number().when("remove", {
    is: false,
    then: () => yup.number().max(20).required(),
    otherwise: () => yup.number().notRequired(),
  }),
});

export interface IParticipantDetails {
  event_code: string;
  edit_code: string;
  remove: boolean;
  name: string | undefined;
  phone_num: string | undefined;
  gender: string | undefined;
  address: string | undefined;
  can_pickup: boolean | undefined;
  seats_available: number | undefined;
}
