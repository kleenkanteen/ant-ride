"use client"

import Link from "next/link";

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

export default function Edit(){

    const router = useRouter();

    const onSubmit = (data) => {
        console.log(data);
        router.push(`/data?code=${data.code}`);
    };

    const schema = yup.object().shape({
        join_code: yup.string().min(6).max(6).matches(/^[a-zA-Z0-9]+$/, "Invalid character(s) entered").required(),
        edit_code: yup.string().min(6).max(6).matches(/^[a-zA-Z0-9]+$/, "Invalid character(s) entered").required()
        //, confirmPassword:yup.string().oneOf([yup.ref("password"), null]).required()
    });
    
    const {register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema),
    });

    return(
        <ThemeProvider theme={darkTheme}>
            <form onSubmit= {handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Edit code: </span>
                        </div>
                        <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" 
                        {...register("join_code")}/>
                        <p>{errors.join_code?.message}</p>
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Join code: </span>
                        </div>
                        <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" 
                        {...register("edit_code")}/>
                        <p>{errors.edit_code?.message}</p>
                    </label>
                <button className="btn btn-outline btn-md my-4">Submit</button>
                </div>
            </form>
        </ThemeProvider>
    );
}