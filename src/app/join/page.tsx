"use client"

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useRouter } from 'next/navigation';
import { ParticipantDetails } from '@/components/participantDetails';
import type { IParticipantDetails } from "../schemas/participants";
import { schema } from "../schemas/participants";

export default function Join() {

    // const router = useRouter();
    const onSubmit = (data) => {
        console.log(data);
        // router.push(`/data?code=${data.code}`);
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver<IParticipantDetails>(schema),
        defaultValues: {
            seats_available: 0,
            remove: false,
            edit_code: "aaaaaa"
        }
    });

    return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Event code: </span>
                        </div>
                        <input type="text" className="input input-bordered w-full max-w-xs"
                            {...register("event_code")} />
                        {errors.event_code?.message && <br />}
                        <p className="text-red-500">{errors.event_code?.message}</p>
                    </label>
                    <ParticipantDetails register={register} errors={errors} onSubmit={handleSubmit(onSubmit)} />
                </div>
            </form>
    );
};