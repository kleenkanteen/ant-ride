/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ParticipantDetails } from "@/components/participantDetails";
import type { IParticipantDetails } from "../schemas/participants";
import { schema } from "../schemas/participants";
import { toast } from "sonner";
import { useRef, useState } from "react";
import ky, { type HTTPError } from "ky";
import Dialog, { CopyElement } from "@/components/dialog";

export default function Join() {
  const dialog = useRef(null);
  const [edit, setEdit] = useState("");
  const onSubmit = async (data) => {
    try {
      const res: any = await ky
        .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/participant`, {
          json: data,
        })
        .json();
      if (res.status == "success") {
        toast.success(res.message);
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

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isLoading, isSubmitting, errors },
  } = useForm({
    resolver: yupResolver<IParticipantDetails>(schema),
    defaultValues: {
      seats_available: 0,
      remove: false,
      edit_code: "aaaaa",
    },
  });

  const onInvalid = (errors) => console.error(errors);
  const eventCode = getValues("event_code");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div className="flex flex-col gap-4">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Event code: </span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              {...register("event_code")}
            />
            {errors.event_code?.message && <br />}
            <p className="text-red-500">{errors.event_code?.message}</p>
          </label>
          <ParticipantDetails
            register={register}
            errors={errors}
            disabled={isSubmitting || isLoading}
            setValue={setValue}
            getValues={getValues}
          />
        </div>
      </form>
      <Dialog
        ref={dialog}
        title="Save these 2 codes in case you want to change your details
            or remove yourself later:"
      >
        <CopyElement label="Event code" code={eventCode} />
        <CopyElement label="Edit code" code={edit} />
        <p>
          If you were matched into a ride, you will get a text message 24 hours before the event starts asking you to confirm your seat. Likewise 
          if you are a driver, but for your route.
        </p>
      </Dialog>
    </>
  );
}
