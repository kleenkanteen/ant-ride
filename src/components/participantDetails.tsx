/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Places from "@/components/Autocomplete";

export function ParticipantDetails({ register, errors, onSubmit }) {
    return (
        <div className="flex flex-col gap-4">
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Name: </span>
                </div>
                <input type="text" placeholder="" className="input input-bordered w-full max-w-xs"
                    {...register("name")} />
                {errors.name?.message && <br />}
                <p className="text-red-500">{errors.name?.message}</p>
            </label>
            <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Location: </span>
                    </div>

                     <Places >

                     </Places>
                     
            </label>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Can pickup others: </span>
                    <input type="checkbox" className="checkbox checkbox-primary"
                        {...register("can_pickup")} />
                </label>
            </div>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Seats available: </span>
                </div>
                <input type="text" placeholder="0" className="input input-bordered w-full max-w-xs"
                    {...register("seats_available")} />
                {errors.seats_available?.message && <br />}
                <p className="text-red-500">{errors.seats_available?.message}</p>
            </label>
            <button onClick={onSubmit} className="btn btn-outline btn-md my-4">Submit</button>
        </div>
    );
};