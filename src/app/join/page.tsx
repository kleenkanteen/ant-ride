"use client"

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useRouter } from 'next/navigation';
import { ParticipantDetails } from '@/components/participantDetails';

interface IParticipantDetails {
    event_code: string,
    name: string,
    location: string,
    can_pickup: boolean,
    seats_available: number,
}

const schema = yup.object().shape({
    event_code: yup.string().min(6).max(6).matches(/^[a-zA-Z0-9]+$/, "Invalid character(s) entered").required(),
    name: yup.string().max(40).required(),
    location: yup.string().max(70).required(),
    can_pickup: yup.boolean().required(),
    seats_available: yup.number().max(20).required()
});

export default function Join() {

    // const router = useRouter();
    const onSubmit = (data) => {
        console.log(data);
        // router.push(`/data?code=${data.code}`);
    };

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver<IParticipantDetails>(schema)
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
                    <ParticipantDetails register={register} errors={errors} onSubmit={handleSubmit(onSubmit)} setValue={setValue} />
                </div>
            </form>
    );
};