import { yupResolver } from '@hookform/resolvers/yup';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

interface IFormInputs {
  date: Date,
  time: Date
}

const schema = yup.object().shape({
  date: yup.date().required(),
  time: yup.date().required(),
});

export function FormInputs() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log('data submitted: ', data);

  console.log(watch('date'));
  console.log(watch('time'));
  console.log('errors are', errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <input type="submit" />
      </form>
    </div>
  );
};