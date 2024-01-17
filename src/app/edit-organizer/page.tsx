"use client"

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useRouter } from 'next/navigation';
import { CarpoolDetails } from '@/components/carpoolDetails';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

interface IEditDetails {
    event_code: string;
    edit_code: string;
    event_name: string;
    location: string;
    date: Date;
    time: Date;
}

const schema = yup.object().shape({
    event_code: yup.string().min(6).max(6).matches(/^[a-zA-Z0-9]+$/, "Code must be only letters or numbers").required(),
    edit_code: yup.string().min(6).max(6).matches(/^[a-zA-Z0-9]+$/, "Code must be only letters or numbers").required(),
    event_name: yup.string().max(40).required(),
    location: yup.string().max(90).required(),
    date: yup.date().required(),
    time: yup.date().required(),
});

export default function Edit() {

    // const router = useRouter();

    const onSubmit = (data) => {
        console.log(data);
        // router.push(`/data?code=${data.edit_code}`);
        //router.push(`/data?join_code=${data.join_code}&edit_code=${data.edit_code}`);
        //might use this instead if you want to change response based on both codes instead of just one
    };

    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
        resolver: yupResolver<IEditDetails>(schema),
    });

    return (
        <ThemeProvider theme={darkTheme}>
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
                    <CarpoolDetails register={register} errors={errors} control={control} onSubmit={onSubmit} setValue={setValue} />
                </div>
            </form>
        </ThemeProvider>
    );
}
