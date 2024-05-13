"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useRouter } from 'next/navigation';
import { ParticipantDetails } from "@/components/participantDetails";
import type { IParticipantDetails } from "../schemas/participants";
import { schema } from "../schemas/participants";
import { toast } from "sonner";
import ky, { type HTTPError } from "ky";

export default function Edit() {
  // const router = useRouter();

  const onSubmit = async (data) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await ky
        .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/participant`, {
          json: data,
        })
        .json();
      res.status == "success"
        ? toast.success(res.message)
        : toast.error(res.message);
    } catch (error) {
      if ((error as Error).name === "HTTPError") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
        const err: any = await (error as HTTPError).response.json();
        toast.error(err?.message);
      } else {
        toast.error("An error occurred");
      }
    }
    // router.push(`/data?code=${data.code}`);
  };

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { isLoading, isSubmitting, errors },
  } = useForm({
    resolver: yupResolver<IParticipantDetails>(schema),
    defaultValues: {
      seats_available: 0,
      remove: false,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Edit code: </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            {...register("edit_code")}
          />
          {errors.edit_code?.message && <br />}
          <p className="text-red-500">{errors.edit_code?.message}</p>
        </label>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Remove from carpool: </span>
            <input
              type="checkbox"
              className="checkbox-primary checkbox"
              {...register("remove")}
            />
          </label>
        </div>
        <ParticipantDetails
          register={register}
          errors={errors}
          disabled={isLoading || isSubmitting}
          getValues={getValues}
          setValue={setValue}
        />
      </div>
    </form>
  );
}
