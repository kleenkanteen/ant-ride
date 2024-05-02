/* eslint-disable @typescript-eslint/no-unsafe-assignment */

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
            <div className="flex flex-row">
            
            </div>
            <div>
                <span className="label-text font-bold">Gender: </span>
            </div>
            <div>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">Male</span>
                        <input type="radio" name="radio-10" className="radio checked:bg-blue-400"
                        {...register("gender")}/>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">Female</span>
                        <input type="radio" name="radio-10" className="radio checked:bg-rose-300"
                        {...register("gender")}/>
                    </label>
                </div>
            </div>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Location: </span>
                </div>
                <input type="text" placeholder="" className="input input-bordered w-full max-w-xs"
                    {...register("location")} />
                {errors.location?.message && <br />}
                <p className="text-red-500">{errors.location?.message}</p>
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