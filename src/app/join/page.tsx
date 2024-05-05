"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useRouter } from 'next/navigation';
import { ParticipantDetails } from "@/components/participantDetails";
import type { IParticipantDetails } from "../schemas/participants";
import { schema } from "../schemas/participants";
import { join } from "../actions";
import { toast } from "sonner";
import { useRef, useState } from "react";
import copy from "copy-text-to-clipboard";

export default function Join() {
  // const router = useRouter();
  const dialog = useRef(null);
  const [edit, setEdit] = useState("");
  const onSubmit = async (data) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const res = await join(data);
      if (res.status == "success") {
        toast.success(res.message);
        setEdit(res.data[0].edit_code);
        if (dialog?.current) {
          (dialog.current as HTMLDialogElement).showModal();
        }
      } else {
        toast.error(res.message);
      }
      console.log("data", res.data);
    } catch (error) {
      toast.error("An error occurred");
    }
    // router.push(`/data?code=${data.code}`);
  };

  const {
    register,
    handleSubmit,
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
          />
        </div>
      </form>
      <dialog
        ref={dialog}
        id="success_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box my-4">
          <h3 className="text-lg font-bold">
            Save the edit code in case you want to change your details later! 24
            hours before the event, you will get a text message confirming if
            you were matched into a ride and who will be your driver. Or your
            riders if you are a driver
          </h3>
          <div className="mt-2">
            <div className="my-2 flex w-full items-center gap-4">
              <span className="w-[150px]">
                Edit code: <strong>{edit}</strong>
              </span>
              <button
                className="btn btn-xs"
                onClick={() => {
                  try {
                    copy(edit);
                    toast.success("Code copied!");
                  } catch (error) {
                    toast.error("Error copying code");
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
                  <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
                </svg>
              </button>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
