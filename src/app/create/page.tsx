"use client"

import Link from "next/link";
import dayjs from 'dayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Date: </span>
                    </div>
                    <MobileDatePicker minDate={today} />
                    {/* <Controller
                        name={name}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                    <MobileDatePicker minDate={today} value={value} onChange={onChange} />
                    )}
                    /> */}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Time: </span>
                    </div>
                    <MobileTimePicker />
                </label>
                <button className="btn btn-outline btn-md my-4">Submit</button>
            </div>
        </LocalizationProvider>
        </ThemeProvider>
    );
};