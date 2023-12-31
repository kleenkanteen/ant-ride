"use client"

import Link from "next/link";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function Create() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>

            <div>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Event name: </span>
                    </div>
                    <input type="text" placeholder="Name..." className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Location: </span>
                    </div>
                    <input type="text" placeholder="Location..." className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Date: </span>
                    </div>
                    <input type="text" placeholder="Date..." className="input input-bordered w-full max-w-xs" />
                </label>
                <MobileDatePicker />
                <MobileTimePicker />
            </div>
        </LocalizationProvider>
    );
};