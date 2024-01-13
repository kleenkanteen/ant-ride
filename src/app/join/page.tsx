"use client"

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useRouter } from 'next/navigation';

interface IParticipantDetails {
    event_code: string
}

const schema = yup.object().shape({
    event_code: yup.string().min(6).max(6).matches(/^[a-zA-Z0-9]+$/, "Invalid character(s) entered").required(),
});

export default function Join() {

    // const router = useRouter();
    const onSubmit = (data) => {
        console.log(data);
        // router.push(`/data?code=${data.code}`);
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
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
                    <button className="btn btn-outline btn-md my-4">Submit</button>
                </div>
            </form>
    );
};