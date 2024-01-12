"use client"

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/navigation';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function Join() {

    const router = useRouter();

    const onSubmit = (data) => {
        console.log(data);
        router.push(`/data?code=${data.code}`);
    };

    const schema = yup.object().shape({
        code: yup.string().min(6).max(6).matches(/^[a-zA-Z0-9]+$/, "Invalid character(s) entered").required()
        //, confirmPassword:yup.string().oneOf([yup.ref("password"), null]).required()
    });


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });


    return (
        <ThemeProvider theme={darkTheme}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Join code : </span>
                        </div>
                        <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" 
                        {...register("code")}/>
                        {errors.code?.message && <br />}
                        <p className="text-red-500">{errors.code?.message}</p>
                    </label>
                    <button className="btn btn-outline btn-md my-4">Submit</button>
                </div>
            </form>
        </ThemeProvider>
    );
};