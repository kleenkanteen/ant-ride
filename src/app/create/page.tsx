"use client"

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';


interface IFormInputs {
    event_name: string,
    location: string,
    date: Date,
    time: Date
}

const schema = yup.object().shape({
    event_name: yup.string().max(40).required(),
    location: yup.string().max(40).required(),
    date: yup.date().required(),
    time: yup.date().required(),
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function Create() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        // make a post request with the data to /api/event. 
        // first convert time to UTC
        // if succesful, make push url to router with the query params being event_code and edit_code
        // in the new page also show the google maps marker of the location 
        // to makes sure address is turned into the right coordinates. and ask user to check and if wrong, to recreate the event
        // with the correct address. if any other error, in the new page say "error creating event".
        console.log(data);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Event name: </span>
                            </div>
                            <input type="text" placeholder="Name..." max="40" className="input input-bordered w-full max-w-xs"
                                {...register("event_name")} />
                                {errors.event_name?.message && <br />}
                                <p className="text-red-500">{errors.event_name?.message}</p>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Location: </span>
                            </div>
                            <input type="text" placeholder="Paste the full address: " max="40" className="input input-bordered w-full max-w-xs"
                                {...register("location")} />
                                {errors.location?.message && <br />}
                                <p className="text-red-500">{errors.location?.message}</p>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Date: </span>
                            </div>
                            <Controller
                                name="date"
                                control={control}
                                render={({ field }) => (
                                    <MobileDatePicker
                                        sx={{ width: "100% " }}
                                        {...field}
                                        slotProps={{
                                            textField: {
                                                helperText: errors.date ? "Date is a required field" : '',
                                            },
                                        }}
                                    />
                                )}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Time: </span>
                            </div>
                            <Controller
                                name="time"
                                control={control}
                                render={({ field }) => (
                                    <MobileTimePicker
                                        sx={{ width: "100% " }}
                                        {...field}
                                        slotProps={{
                                            textField: {
                                                helperText: errors.time ? "Time is a required field" : '',
                                            },
                                        }}
                                    />
                                )}
                            />
                        </label>
                        <button className="btn btn-outline btn-md my-4">Submit</button>
                    </div>
                </form>
            </LocalizationProvider>
        </ThemeProvider>
    );
};