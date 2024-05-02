"use client"

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useRouter } from 'next/navigation';
import { ParticipantDetails } from '@/components/participantDetails';

interface IParticipantDetails {
    event_code: string,
    edit_code: string,
    remove: boolean,
    name: string,
    gender: 'Male' | 'Female',
    location: string,
    can_pickup: boolean,
    seats_available: number,
}

const schema = yup.object().shape({
    event_code: yup.string().min(6).max(6).matches(/^[a-zA-Z0-9]+$/, "Invalid character(s) entered").required(),
    edit_code: yup.string().min(6).max(6).matches(/^[a-zA-Z0-9]+$/, "Invalid character(s) entered").required(),
    remove: yup.boolean().required(),
    name: yup.string().max(40).required(),
    gender: yup.mixed().oneOf(['Male', 'Female']).required(),
    location: yup.string().max(40).required(),
    can_pickup: yup.boolean().required(),
    seats_available: yup.number().max(20).required()
});

export default function Edit() {

    // const router = useRouter();

    const onSubmit = (data) => {
        console.log(data);
        // router.push(`/data?code=${data.code}`);
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver<IParticipantDetails>(schema),
        defaultValues: {
            seats_available: 0,
            remove: false
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
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Edit code: </span>
                    </div>
                    <input type="text" className="input input-bordered w-full max-w-xs"
                        {...register("edit_code")} />
                    {errors.edit_code?.message && <br />}
                    <p className="text-red-500" >{errors.edit_code?.message}</p>
                </label>
                <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Remove from carpool: </span>
                    <input type="checkbox" className="checkbox checkbox-primary"
                        {...register("remove")} />
                </label>
            </div>
                <ParticipantDetails register={register} errors={errors} onSubmit={handleSubmit(onSubmit)} />
            </div>
        </form>
    );
}