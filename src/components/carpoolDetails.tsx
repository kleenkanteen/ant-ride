/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Controller } from "react-hook-form";
import { AddressAutocomplete } from "./addressAutocomplete";

export function CarpoolDetails({ register, setValue, errors, control }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col gap-4">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Event name: </span>
          </div>
          <input
            type="text"
            max="40"
            className="input input-bordered w-full max-w-xs"
            {...register("name")}
          />
          {errors.event_name?.message && <br />}
          <p className="text-red-500">{errors.event_name?.message}</p>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Address: </span>
          </div>
          <AddressAutocomplete setValue={setValue} />
          {errors.address?.message && <br />}
          <p className="text-red-500">{errors.address?.message}</p>
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
                    helperText: errors.date ? "Date is a required field" : "",
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
                    helperText: errors.time ? "Time is a required field" : "",
                  },
                }}
              />
            )}
          />
        </label>
        <button type={"submit"} className="btn btn-outline btn-md my-4">
          Submit
        </button>
      </div>
    </LocalizationProvider>
  );
}
