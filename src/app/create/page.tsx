"use client"

import Link from "next/link";
import dayjs from 'dayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const today = dayjs();

export default function Create() {
    return (
        <ThemeProvider theme={darkTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form>
                    <div className="flex flex-col gap-4">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Event name: </span>
                            </div>
                            <input type="text" placeholder="Name..." max="40" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Location: </span>
                            </div>
                            <input type="text" placeholder="Location..." max="40" className="input input-bordered w-full max-w-xs" />
                        </label>
                        {/* <FormInputs /> */}
                        <input className="btn btn-outline btn-md my-4" type="submit" />
                    </div>
                </form>
            </LocalizationProvider>
        </ThemeProvider>
    );
};