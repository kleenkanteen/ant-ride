"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { CarpoolDetails } from "@/components/carpoolDetails";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import ky, { type HTTPError } from "ky";
import { useEffect, useRef, useState } from "react";

import Dialog, { CopyElement } from "@/components/dialog";
import { toast } from "sonner";


interface IFormInputs {
  name: string;
  address: string;
  date: Date;
  time: Date;
}

const schema = yup.object().shape({
  name: yup.string().max(40).required(),
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
  const [domain, set_domain] = useState("");

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
            name: data.name as string,
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

  useEffect(() => {
    set_domain(window.location.host);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <CarpoolDetails
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
          />
        </form>
        <Dialog
          ref={dialog}
          title="Share this link for others to sign up:"
        >
          { domain && <CopyElement label="Carpool link" code={`${domain}/join?event-code=${event}`} /> }
          <p>Screenshot these 2 codes to change event details later:</p>
          <CopyElement label="Event code" code={event} />
          <CopyElement label="Edit code" code={edit} />
        </Dialog>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
