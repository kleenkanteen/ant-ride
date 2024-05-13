/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { CarpoolDetails } from "@/components/carpoolDetails";
import { toast } from "sonner";
import { useRef, useState } from "react";
import ky, { type HTTPError } from "ky";
import Dialog, { CopyElement } from "@/components/dialog";

interface IFormInputs {
  event_name: string;
  address: string;
  date: Date;
  time: Date;
}

const schema = yup.object().shape({
  event_name: yup.string().max(40).required(),
  address: yup.string().max(100).required(),
  date: yup.date().required(),
  time: yup.date().required(),
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Create() {
  const dialog = useRef(null);
  const [event, setEvent] = useState("");
  const [edit, setEdit] = useState("");
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    // TODO: make a post request with the data to /api/event.
    // TODO: first convert time to UTC
    // TODO: if succesful, make push url to router with the query params being event_code and edit_code
    // TODO: in the new page also show the google maps marker of the location
    // TODO: to makes sure address is turned into the right coordinates. and ask user to check and if wrong, to recreate the event
    // TODO: with the correct address. if any other error, in the new page say "error creating event".
    try {
      const date = new Date(data.date);
      const time = new Date(data.time);
      const date_time = date.setHours(
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
      );
      const res: any = await ky
        .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/event`, {
          json: {
            name: data.event_name as string,
            address: data.address as string,
            date_time: new Date(date_time).toISOString(),
          },
        })
        .json();

      if (res.status === "success") {
        toast.success(res.message);
        setEvent(res.data[0].event_code);
        setEdit(res.data[0].edit_code);
        if (dialog?.current) {
          (dialog.current as HTMLDialogElement).showModal();
        }
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      if ((error as Error).name === "HTTPError") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const err: any = await (error as HTTPError).response.json();
        toast.error(err?.message);
      } else {
        toast.error("An error occurred");
      }
    }
  };
  const onInvalid = (errors) => console.error(errors);

  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <CarpoolDetails
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
            // onSubmit={onSubmit}
          />
        </form>
        <Dialog
          ref={dialog}
          title="Screenshot or copy these codes in case you want to edit your event
              details in the future!"
        >
          <CopyElement label="Event code" code={event} />
          <CopyElement label="Edit code" code={edit} />
        </Dialog>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
